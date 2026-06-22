# 🚀 DeepFake Detection - Model Integration Guide

## ✅ What's Been Set Up

Your PyTorch models are now integrated into the backend with **ensemble predictions**!

### Models Detected:
- ✅ Meso4 (107 KB)
- ✅ MesoInception4 (68-202 KB)
- ✅ XceptionNet (83MB-250MB)
- ✅ EfficientNetB4 (79MB-138MB)
- ✅ FrequencyNet (16MB-49MB)

### Features:
✅ Ensemble predictions (average of all models)  
✅ Individual model scores  
✅ Automatic file handling  
✅ Error handling  

---

## 🔧 Before Running

### 1. Install Python Dependencies
```bash
pip install torch torchvision pillow numpy
```

### 2. Update Python Script with Your Model Classes
The `inference.py` file needs your custom model definitions. **Replace the model classes in the file with your actual definitions** from your training code.

Copy-paste your model classes (Meso4, MesoInception4, XceptionDetector, etc.) into the `inference.py` file.

### 3. Verify Model Paths
The script looks for models in:
```
C:\Users\shyam\Downloads\deepfake_models_saved-2026\deepfake_models_saved
```

If different, update `MODEL_DIR` in `inference.py`

---

## 🚀 Running the Project

### Terminal 1 - Backend
```powershell
cd "d:\finalyear (2)\finalyear\backend"
pnpm run dev
```

### Terminal 2 - Frontend
```powershell
cd "d:\finalyear (2)\finalyear\frontend"
pnpm run dev
```

### Open Browser
```
http://localhost:5173
```

---

## 📤 API Usage

### Endpoint
```
POST /api/predict
```

### Request
```javascript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('model_name', 'Ensemble'); // or specific model name

const response = await fetch('http://localhost:5000/api/predict', {
    method: 'POST',
    body: formData
});
```

### Response
```json
{
    "id": "uuid",
    "model": "Ensemble",
    "ensemble": {
        "prediction": "Fake",
        "confidence": 0.87,
        "score": 0.87
    },
    "individual_models": {
        "Meso4": {
            "prediction": "Fake",
            "confidence": 0.92,
            "score": 0.92
        },
        "XceptionNet": {
            "prediction": "Fake",
            "confidence": 0.82,
            "score": 0.82
        },
        ...
    },
    "timestamp": "2026-05-14T02:15:06.896Z"
}
```

---

## ⚠️ Important Notes

1. **Model Classes Required**: Update `inference.py` with your actual model definitions
2. **First Load**: First prediction will be slower (model loading)
3. **Image Format**: Supports JPG, PNG, etc.
4. **CUDA**: Will auto-detect GPU if available

---

## 🐛 Troubleshooting

### Python not found
```powershell
where python
```
Make sure Python is in PATH

### ImportError for torch
```bash
pip install torch torchvision --upgrade
```

### Model not found
Check the model paths in `inference.py`

---

## ✨ Next Steps

1. Update `inference.py` with your model definitions
2. Test with a single image
3. Monitor logs for errors
4. Deploy!

Enjoy! 🎉
