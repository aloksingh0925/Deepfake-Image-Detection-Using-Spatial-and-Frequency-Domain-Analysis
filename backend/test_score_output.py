"""
Deepfake Detection - Individual Model Score Output
Tests all 5 models with sample images and displays detailed results
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image
import json
import os
from pathlib import Path
import timm
import numpy as np
import warnings
warnings.filterwarnings('ignore')

# ============================================
# MODEL DEFINITIONS
# ============================================

class Meso4(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 8, 3, padding=1), nn.ReLU(),
            nn.BatchNorm2d(8), nn.MaxPool2d(2, 2),
            nn.Conv2d(8, 8, 5, padding=2), nn.ReLU(),
            nn.BatchNorm2d(8), nn.MaxPool2d(2, 2),
            nn.Conv2d(8, 16, 5, padding=2), nn.ReLU(),
            nn.BatchNorm2d(16), nn.MaxPool2d(2, 2),
            nn.Conv2d(16, 16, 5, padding=2), nn.ReLU(),
            nn.BatchNorm2d(16), nn.MaxPool2d(4, 4),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(0.5),
            nn.Linear(16 * 7 * 7, 16),
            nn.LeakyReLU(0.1),
            nn.Dropout(0.5),
            nn.Linear(16, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.classifier(self.features(x))


class InceptionBlock(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.b1 = nn.Conv2d(in_ch, out_ch // 4, 1)
        self.b2 = nn.Sequential(nn.Conv2d(in_ch, out_ch // 4, 1),
                                 nn.Conv2d(out_ch // 4, out_ch // 4, 3, padding=1))
        self.b3 = nn.Sequential(nn.Conv2d(in_ch, out_ch // 4, 1),
                                 nn.Conv2d(out_ch // 4, out_ch // 4, 5, padding=2))
        self.b4 = nn.Sequential(nn.MaxPool2d(3, stride=1, padding=1),
                                 nn.Conv2d(in_ch, out_ch // 4, 1))
        self.norm = nn.BatchNorm2d(out_ch)

    def forward(self, x):
        return F.relu(self.norm(torch.cat([self.b1(x), self.b2(x),
                                           self.b3(x), self.b4(x)], dim=1)))


class MesoInception4(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            InceptionBlock(3, 8), nn.MaxPool2d(2, 2),
            InceptionBlock(8, 8), nn.MaxPool2d(4, 4),
            nn.Conv2d(8, 16, 5, padding=2), nn.ReLU(),
            nn.BatchNorm2d(16), nn.MaxPool2d(2, 2),
            nn.Conv2d(16, 16, 5, padding=2), nn.ReLU(),
            nn.BatchNorm2d(16), nn.MaxPool2d(4, 4),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(0.5),
            nn.Linear(16 * 3 * 3, 16),
            nn.LeakyReLU(0.1),
            nn.Dropout(0.5),
            nn.Linear(16, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.classifier(self.features(x))


class XceptionDetector(nn.Module):
    def __init__(self, num_classes=1, pretrained=True):
        super().__init__()
        self.backbone = timm.create_model('xception', pretrained=pretrained, num_classes=0)
        self.classifier = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(self.backbone.num_features, num_classes),
        )

    def forward(self, x):
        features = self.backbone(x)
        output = self.classifier(features)
        return output.squeeze(1) if output.shape[-1] == 1 else output


class EfficientNetDetector(nn.Module):
    def __init__(self, version='efficientnet_b4', pretrained=True):
        super().__init__()
        self.base = timm.create_model(version, pretrained=pretrained,
                                       num_classes=0, global_pool='avg')
        for name, p in self.base.named_parameters():
            p.requires_grad = 'blocks.6' in name or 'bn2' in name or 'conv_head' in name

        self.attention = nn.Sequential(
            nn.Linear(self.base.num_features, self.base.num_features // 4),
            nn.ReLU(),
            nn.Linear(self.base.num_features // 4, self.base.num_features),
            nn.Sigmoid()
        )
        self.head = nn.Sequential(
            nn.Linear(self.base.num_features, 256),
            nn.SiLU(), nn.Dropout(0.4),
            nn.Linear(256, 64),
            nn.SiLU(),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        f = self.base(x)
        f = f * self.attention(f)
        return self.head(f).squeeze(1)


class FrequencyExtractor(nn.Module):
    def forward(self, x):
        fft = self.fft_features(x)
        dct = self.dct_features(x)
        return torch.cat([fft, dct], dim=1)

    def fft_features(self, x):
        f = torch.fft.fft2(x)
        f_shift = torch.fft.fftshift(f)
        magnitude = torch.log1p(torch.abs(f_shift))
        return magnitude

    def dct_features(self, x):
        B, C, H, W = x.shape
        x_blocks = x.unfold(2, 8, 8).unfold(3, 8, 8)
        dct_proxy = x_blocks.var(dim=[-2, -1])
        return F.interpolate(dct_proxy, size=(H, W), mode='bilinear', align_corners=False)


class FrequencyDetector(nn.Module):
    def __init__(self):
        super().__init__()
        self.freq_extractor = FrequencyExtractor()
        self.freq_cnn = nn.Sequential(
            nn.Conv2d(6, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.BatchNorm2d(64), nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(64, 128, 3, padding=1), nn.BatchNorm2d(128), nn.ReLU(),
            nn.AdaptiveAvgPool2d(4),
        )
        self.spatial_cnn = timm.create_model('mobilenetv2_100', pretrained=True,
                                             num_classes=0, global_pool='avg')
        spatial_dim = self.spatial_cnn.num_features
        freq_dim = 128 * 4 * 4
        self.fusion = nn.Sequential(
            nn.Linear(spatial_dim + freq_dim, 512),
            nn.ReLU(), nn.Dropout(0.4),
            nn.Linear(512, 64),
            nn.ReLU(),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        freq_maps = self.freq_extractor(x)
        freq_feat = self.freq_cnn(freq_maps).flatten(1)
        sp_feat = self.spatial_cnn(x)
        return self.fusion(torch.cat([sp_feat, freq_feat], dim=1))


# ============================================
# EVALUATION
# ============================================

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
MODEL_DIR = r'C:\Users\shyam\Downloads\deepfake_models_saved-2026\deepfake_models_saved'

def load_models():
    models = {}
    model_configs = {
        'Meso4': ('Meso4_best.pth', Meso4()),
        'MesoInception4': ('MesoInception4_best.pt', MesoInception4()),
        'XceptionNet': ('XceptionNet_best.pt', XceptionDetector(pretrained=True)),
        'EfficientNetB4': ('EfficientNetB4_best.pt', EfficientNetDetector()),
        'FrequencyNet': ('FrequencyNet_best.pt', FrequencyDetector()),
    }
    
    for model_name, (filename, model_instance) in model_configs.items():
        try:
            model_path = os.path.join(MODEL_DIR, filename)
            if os.path.exists(model_path):
                model_instance.to(device)
                model_instance.load_state_dict(torch.load(model_path, map_location=device))
                model_instance.eval()
                models[model_name] = model_instance
                print(f"✓ {model_name}")
        except Exception as e:
            print(f"✗ {model_name}: {str(e)[:50]}")
    
    return models


def get_test_images(data_dir, num_images=5):
    """Get sample test images"""
    test_images = []
    
    # Try to find real and fake images
    for label in ['real', 'fake']:
        label_dir = os.path.join(data_dir, label)
        if os.path.exists(label_dir):
            images = list(Path(label_dir).glob('*.jpg')) + list(Path(label_dir).glob('*.png'))
            for img_path in images[:num_images]:
                test_images.append((str(img_path), label))
    
    return test_images


def test_models_on_images():
    print("\n" + "="*100)
    print("DEEPFAKE DETECTION - INDIVIDUAL MODEL SCORES")
    print("="*100 + "\n")
    
    models = load_models()
    
    if not models:
        print("❌ No models loaded!")
        return
    
    # Get test images
    data_dir = r'C:\Users\shyam\Downloads\archive (1)'
    test_images = get_test_images(data_dir, num_images=3)
    
    if not test_images:
        print(f"❌ No test images found in {data_dir}")
        return
    
    # Image preprocessing
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                           std=[0.229, 0.224, 0.225])
    ])
    
    all_results = []
    
    for image_path, true_label in test_images:
        print(f"\n📷 Image: {Path(image_path).name}")
        print(f"   True Label: {true_label.upper()}")
        print(f"   Path: {image_path}")
        print("\n   Model Scores:")
        print("   " + "-"*90)
        
        try:
            image = Image.open(image_path).convert('RGB')
            image_tensor = transform(image).unsqueeze(0).to(device)
            
            image_results = {
                'image': Path(image_path).name,
                'true_label': true_label,
                'model_scores': {}
            }
            
            with torch.no_grad():
                for model_name, model in models.items():
                    try:
                        output = model(image_tensor)
                        if isinstance(output, torch.Tensor):
                            fake_prob = float(output.item()) if output.numel() == 1 else float(output[0].item())
                        else:
                            fake_prob = float(output)
                        
                        prediction = 'FAKE' if fake_prob > 0.5 else 'REAL'
                        
                        image_results['model_scores'][model_name] = {
                            'score': round(fake_prob, 4),
                            'prediction': prediction,
                            'confidence': round(abs(fake_prob - 0.5) * 2, 4)
                        }
                        
                        # Print formatted score
                        bar_length = 30
                        filled = int(bar_length * fake_prob)
                        bar = '█' * filled + '░' * (bar_length - filled)
                        
                        print(f"   {model_name:20} [{bar}] {fake_prob:.4f} → {prediction}")
                        
                    except Exception as e:
                        print(f"   {model_name:20} ❌ Error: {str(e)[:40]}")
            
            # Calculate ensemble
            scores = [v['score'] for v in image_results['model_scores'].values()]
            avg_score = sum(scores) / len(scores) if scores else 0
            ensemble_prediction = 'FAKE' if avg_score > 0.5 else 'REAL'
            
            image_results['ensemble'] = {
                'score': round(avg_score, 4),
                'prediction': ensemble_prediction,
                'confidence': round(abs(avg_score - 0.5) * 2, 4)
            }
            
            print(f"\n   {'ENSEMBLE':20} Score: {avg_score:.4f} → {ensemble_prediction} (Confidence: {round(abs(avg_score - 0.5) * 2, 4)})")
            
            all_results.append(image_results)
            
        except Exception as e:
            print(f"   ❌ Error processing image: {str(e)}")
    
    # Print summary as JSON
    print("\n\n" + "="*100)
    print("DETAILED JSON OUTPUT")
    print("="*100)
    print(json.dumps(all_results, indent=2))
    
    # Save to file
    output_file = 'model_scores.json'
    with open(output_file, 'w') as f:
        json.dump(all_results, f, indent=2)
    
    print(f"\n✅ Results saved to: {output_file}")
    print("="*100)


if __name__ == '__main__':
    test_models_on_images()
