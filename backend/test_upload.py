#!/usr/bin/env python3
"""
Test the backend API with an image upload
"""

import requests
import sys
from pathlib import Path

# Find a test image
test_image_paths = [
    r'C:\Users\shyam\Downloads\archive (1)\fake\easy_100_1111.jpg',
    r'C:\Users\shyam\Downloads\archive (1)\real\real_00001.jpg',
    'test_image.jpg'
]

test_image = None
for img_path in test_image_paths:
    if Path(img_path).exists():
        test_image = img_path
        break

if not test_image:
    print("❌ No test image found")
    sys.exit(1)

print(f"📷 Testing with: {test_image}")

# Upload to backend
api_url = 'http://localhost:5000/prediction/predict'

with open(test_image, 'rb') as f:
    files = {'file': f}
    data = {'model_name': 'Ensemble'}
    
    print(f"📤 Uploading to: {api_url}")
    
    try:
        response = requests.post(api_url, files=files, data=data, timeout=300)
        
        print(f"\n✅ Status Code: {response.status_code}")
        print(f"\n📊 Response:")
        print(response.json())
        
    except requests.exceptions.Timeout:
        print("❌ Request Timeout (exceeded 5 minutes)")
    except Exception as e:
        print(f"❌ Error: {e}")
