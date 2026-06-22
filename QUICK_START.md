# 🚀 Quick Start - Run Everything Now

## Prerequisites Checklist
- [ ] Python 3.11+ installed (`python --version`)
- [ ] Node.js 18+ installed (`node --version`)
- [ ] pnpm installed (`pnpm --version`)
- [ ] Models present at: `C:\Users\shyam\Downloads\deepfake_models_saved-2026\deepfake_models_saved\`

---

## 🎯 Start in 3 Steps

### Step 1: Start Backend (Port 5000)
```bash
cd backend
npm run dev
```

**Expected Output**:
```
✓ Database connected successfully
✓ Server running on port 5000
```

### Step 2: Start Frontend (Port 3001)
```bash
# In new terminal
cd frontend
npm run dev
```

**Expected Output**:
```
  VITE v7.2.5  ready in XXX ms
  ➜  Local:   http://localhost:3001/
```

### Step 3: Open Browser
- Navigate to: **http://localhost:3001**
- Upload an image
- Click "Analyze"
- See results!

---

## 📋 What Was Fixed

### Critical Fixes
1. ✅ **Auth Routes** - Added missing `/auth` endpoints
2. ✅ **Python Path** - Fixed executable location
3. ✅ **TypeScript** - Removed invalid config options
4. ✅ **Model Names** - Fixed case sensitivity
5. ✅ **Type Safety** - Fixed Prisma types

### Result
- ✅ Backend builds without errors
- ✅ Frontend builds without errors
- ✅ Inference runs successfully
- ✅ API returns correct format
- ✅ All endpoints accessible

---

## 🧪 Test Upload

### Via Browser
1. Go to http://localhost:3001
2. Upload any image file
3. Select model (or use default Ensemble)
4. Click "Analyze"
5. Wait for results (~5-10 seconds)

### Via cURL
```bash
curl -X POST http://localhost:5000/prediction/predict \
  -F "file=@your_image.jpg" \
  -F "model_name=xceptionnet"
```

### Expected Response
```json
{
  "id": "uuid",
  "model": "xceptionnet",
  "ensemble": {
    "prediction": "Fake|Real",
    "confidence": 0.85,
    "score": 0.85
  },
  "individual_models": {
    "XceptionNet": {
      "prediction": "Fake|Real",
      "confidence": 0.85,
      "score": 0.85
    }
  },
  "timestamp": "2026-05-14T..."
}
```

---

## 🔗 Available Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Server status |
| `/health` | GET | Health check |
| `/prediction/predict` | POST | Analyze image |
| `/auth/register` | POST | Register user |
| `/auth/login` | POST | Login user |
| `/contact` | POST | Contact form |

---

## ❌ Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# If in use, kill process
taskkill /PID <PID> /F
```

### Python Not Found
```bash
# Verify Python is installed
python --version

# If not working, check PATH
echo %PATH%
```

### Models Not Found
- Check directory: `C:\Users\shyam\Downloads\deepfake_models_saved-2026\deepfake_models_saved\`
- Should contain 5 model files (*.pt files)

### Frontend Can't Connect to Backend
- Check backend is running on 5000
- Check frontend .env has `VITE_API_BASE_URL=http://localhost:5000`
- Open http://localhost:5000 in browser to verify

---

## 📊 File Locations

| Component | Location |
|-----------|----------|
| Backend | `d:\finalyear (2)\finalyear\backend` |
| Frontend | `d:\finalyear (2)\finalyear\frontend` |
| Models | `C:\Users\shyam\Downloads\deepfake_models_saved-2026\deepfake_models_saved` |
| Inference Script | `backend\inference.py` |
| Uploaded Files | `backend\uploads\` |

---

## 📝 Key Configuration

### Backend (.env)
```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/deepfake
JWT_SECRET=your_jwt_secret_key_here
PYTHON_EXE=C:\Users\shyam\AppData\Local\Microsoft\WindowsApps\python.exe
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000
VITE_USE_MOCK_DATA=false
PORT=3001
```

---

## 🎬 What Happens During Upload

1. **Browser** → Sends image file + model name
2. **Frontend** → FormData request to http://localhost:5000/prediction/predict
3. **Backend** → Receives file, saves to disk
4. **Node.js** → Spawns Python subprocess
5. **Python** → Loads models, preprocesses image, runs inference
6. **Python** → Returns JSON with predictions
7. **Backend** → Formats response, cleans up file
8. **Frontend** → Displays results with confidence scores

---

## 💡 Tips

- **First run is slow** - Models load on first request (~30-60 seconds)
- **Subsequent runs are faster** - Models stay in memory
- **Use small images** - 224x224 recommended
- **Supported formats** - JPG, PNG
- **Ensemble is best** - Uses all 5 models for better accuracy

---

## ✅ Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3001
- [ ] Can see homepage at http://localhost:3001
- [ ] Can upload image
- [ ] Image processes without errors
- [ ] Results appear with prediction and confidence
- [ ] Can see models in dropdown
- [ ] Analyzer works for multiple images

---

## 🎯 Next Steps After Testing

1. **Deploy Backend** - Use Node.js hosting (Heroku, Railway, Render)
2. **Deploy Frontend** - Use static hosting (Vercel, Netlify, S3)
3. **Setup MongoDB Atlas** - For production database
4. **Configure HTTPS** - Required for production
5. **Setup CI/CD** - GitHub Actions for auto-deploy
6. **Monitor Performance** - Add logging and metrics

---

## 📞 Quick Reference

```bash
# Start backend in development
cd backend && npm run dev

# Build backend for production
cd backend && npm run build && node dist/index.js

# Start frontend in development
cd frontend && npm run dev

# Build frontend for production
cd frontend && npm run build

# Run TypeScript check
npm run typecheck

# Check for lint errors
npm run eslint

# Format code
npm run prettier
```

---

**Ready?** Start with Step 1 above! 🎉

Last Updated: 2026-05-14
