# DeepFake Detection System - Complete Setup & Deployment Guide

## ✅ All Issues Fixed

### 1. **Backend Configuration**
- ✅ Added missing auth routes to app.ts (`/auth` endpoint)
- ✅ Fixed TypeScript configuration (removed invalid `ignoreDeprecations`)
- ✅ Fixed Prisma client type compatibility issues
- ✅ Fixed modelService.ts (now supports Python-based inference)
- ✅ Corrected Python executable path resolution
- ✅ Fixed inference.py model name case-insensitive matching

### 2. **Frontend Configuration**
- ✅ Fixed TypeScript configuration
- ✅ Verified API endpoint configuration (`http://localhost:5000`)
- ✅ Build system verified and working

### 3. **Python Inference**
- ✅ Fixed model name matching (xceptionnet → XceptionNet)
- ✅ Verified all models are available in correct directory
- ✅ Tested inference pipeline successfully

---

## 🚀 Quick Start Guide

### Prerequisites
1. **Python 3.11+** installed and available in PATH
   - Verify: `python --version`

2. **Node.js 18+** with pnpm
   - Verify: `node --version` and `pnpm --version`

3. **Model Files** in place
   - Location: `C:\Users\shyam\Downloads\deepfake_models_saved-2026\deepfake_models_saved\`
   - Models included: Meso4, MesoInception4, XceptionNet, EfficientNetB4, FrequencyNet

### Backend Setup

```bash
cd backend

# Install dependencies
pnpm install

# Build TypeScript
npm run build

# Start development server
npm run dev
```

Server will run on: **http://localhost:5000**

### Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:3001**

---

## 📚 API Endpoints

### Authentication (`/auth`)
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `POST /auth/register` - Register with email/password
- `POST /auth/login` - Login with email/password
- `POST /auth/refresh` - Refresh access token
- `POST /auth/phone/send-otp` - Send OTP via WhatsApp
- `POST /auth/phone/verify-otp` - Verify OTP
- `GET /auth/me` - Get current user (requires auth)
- `GET /auth/identities` - Get linked providers (requires auth)
- `DELETE /auth/identities/:provider` - Unlink provider (requires auth)

### Prediction (`/prediction`)
- `POST /prediction/predict` - Analyze image/video for deepfakes
  - Form Data:
    - `file`: Image/video file
    - `model_name`: Model to use (optional, defaults to ensemble)
  - Response:
    ```json
    {
      "id": "uuid",
      "model": "Model Name",
      "ensemble": {
        "prediction": "Real|Fake",
        "confidence": 0.95,
        "score": 0.95
      },
      "individual_models": {
        "ModelName": {
          "prediction": "Real|Fake",
          "confidence": 0.95,
          "score": 0.95
        }
      },
      "timestamp": "ISO-8601"
    }
    ```

### Contact (`/contact`)
- `POST /contact` - Submit contact form
  - Body:
    ```json
    {
      "name": "string",
      "email": "string",
      "message": "string"
    }
    ```

### Health Check
- `GET /` - Server status
- `GET /health` - Health check
- `GET /version.json` - Version info

---

## 🎯 Available Models

### Model Selection in Frontend
Pass one of these model names to `/prediction/predict`:

1. **XceptionNet** - Best overall accuracy, recommended
2. **Meso4** - Optimized for facial compression artifacts
3. **MobileNetV2** - Fast mobile-friendly processing
4. **EfficientNetB4** - High precision analysis
5. **FrequencyNet** - Spectral/frequency artifact detection

**Default**: Ensemble (runs all models, averages confidence scores)

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/deepfake
JWT_SECRET=your_jwt_secret_key_here
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
PYTHON_EXE=C:\Users\shyam\AppData\Local\Microsoft\WindowsApps\python.exe
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_AGENT_BASE_URL=http://localhost:3000
VITE_USE_MOCK_DATA=false
PORT=3001
```

---

## 🧪 Testing the API

### Test Image Upload

```bash
curl -X POST http://localhost:5000/prediction/predict \
  -F "file=@test_image.jpg" \
  -F "model_name=xceptionnet"
```

### Test Contact Form

```bash
curl -X POST http://localhost:5000/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test message"
  }'
```

---

## 📊 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── app.ts                 # Main Hono app
│   │   ├── index.ts               # Server entry
│   │   ├── client.ts              # Prisma client
│   │   ├── controllers/           # Route handlers
│   │   │   ├── authController.ts
│   │   │   ├── predictionController.ts
│   │   │   └── contactController.ts
│   │   ├── routes/                # Route definitions
│   │   ├── services/              # Business logic
│   │   ├── middlewares/           # Hono middlewares
│   │   └── utils/                 # Utilities
│   ├── inference.py               # Python ML inference
│   ├── tsconfig.json              # ✅ Fixed
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── components/            # React components
    │   ├── services/              # API services
    │   ├── lib/                   # Utilities
    │   └── main.tsx
    ├── tsconfig.app.json          # ✅ Fixed
    └── package.json
```

---

## ✨ Key Features Implemented

### Backend
- ✅ TypeScript + Hono framework
- ✅ Python ML inference via spawn
- ✅ JWT authentication
- ✅ Google OAuth integration
- ✅ WhatsApp OTP integration
- ✅ Prisma ORM with MongoDB
- ✅ Global soft-delete filter
- ✅ CORS enabled
- ✅ Error handling middleware

### Frontend
- ✅ React 19
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Framer Motion animations
- ✅ Real-time prediction UI
- ✅ Multi-model selection
- ✅ Result visualization

---

## 🐛 Troubleshooting

### Python Not Found
```bash
# Check Python path
python --version

# Set custom Python path
set PYTHON_EXE=C:\path\to\python.exe
```

### Model Loading Issues
- Verify models exist in: `C:\Users\shyam\Downloads\deepfake_models_saved-2026\deepfake_models_saved\`
- Check all 5 model files are present
- Verify read permissions on model directory

### Port Already in Use
```bash
# Backend (port 5000)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend (port 3001)
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Database Connection
- MongoDB must be running locally on port 27017
- Or update DATABASE_URL to point to your MongoDB instance

---

## 📝 Architecture Overview

### Data Flow
1. **User Upload** → Frontend
2. **FormData Send** → Backend API (`/prediction/predict`)
3. **File Processing** → Node.js saves to `/backend/uploads/`
4. **Python Inference** → Spawn Python process with spawnSync
5. **Model Prediction** → PyTorch models run inference
6. **Response Format** → JSON with ensemble + individual predictions
7. **Frontend Display** → Results rendered with confidence

### Models & Inference
- **Framework**: PyTorch + TorchVision
- **Execution**: Python subprocess (spawnSync)
- **Input**: Images (224x224 RGB, normalized)
- **Output**: Probability scores (0-1 range)
- **Ensemble**: Average of all model predictions

---

## 🚢 Production Deployment

### Docker Containerization (Optional)
```dockerfile
# Backend
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install && npm run build
EXPOSE 5000
CMD ["node", "dist/index.js"]

# Frontend
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN pnpm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
```

### Environment-Specific Config
- Development: Debug logging, CORS relaxed
- Production: Secure headers, strict CORS, no debug logs
- Set `NODE_ENV=production` for production

---

## ✅ Verification Checklist

- [ ] Backend TypeScript compiles without errors
- [ ] Frontend builds successfully
- [ ] Python executable is accessible
- [ ] Model files exist and are readable
- [ ] MongoDB running and accessible
- [ ] Backend server starts on port 5000
- [ ] Frontend dev server starts on port 3001
- [ ] Image upload works via `/prediction/predict`
- [ ] All models in ensemble run successfully
- [ ] Response includes ensemble + individual predictions

---

## 📞 Support

For issues, check:
1. Console logs (backend: `npm run dev`, frontend: browser DevTools)
2. Error messages in API responses
3. Troubleshooting section above
4. Environment variables are correctly set

Last Updated: 2026-05-14
