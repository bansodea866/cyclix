# 🚀 Cyclix Setup Guide

This guide will help you set up the Cyclix application on your local machine for development or testing.

## 📋 Prerequisites

### Required Software

| Software | Version | Download Link |
|----------|---------|---------------|
| Node.js | 18.0+ | [nodejs.org](https://nodejs.org/) |
| Python | 3.11+ | [python.org](https://python.org/) |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

### Verify Installation
```bash
node --version    # Should show v18.0.0 or higher
python --version  # Should show 3.11.0 or higher
git --version     # Should show git version
```

## 🔧 Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/bansodea866/cyclix.git
cd cyclix
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Create and activate virtual environment
```bash
# Create virtual environment
python -m venv venv

# Activate (choose your OS)
# macOS/Linux:
source venv/bin/activate

# Windows:
venv\\Scripts\\activate
```

#### Install dependencies
```bash
pip install -r requirements.txt
```

#### Start backend server
```bash
python src/main.py
```

✅ **Backend should now be running on http://localhost:5000**

### 3. Frontend Setup

#### Open new terminal and navigate to frontend
```bash
cd frontend
```

#### Install dependencies
```bash
# Using npm
npm install

# OR using pnpm (recommended for faster installs)
pnpm install
```

#### Start development server
```bash
# Using npm
npm run dev

# OR using pnpm
pnpm dev
```

✅ **Frontend should now be running on http://localhost:5173**

## 🧪 Verify Installation

### 1. Test Backend API
```bash
curl http://localhost:5000/health
```
Expected response:
```json
{
  "message": "Flo Clone Backend API is running",
  "status": "healthy"
}
```

### 2. Test Frontend
1. Open browser to http://localhost:5173
2. You should see the Cyclix welcome screen
3. Complete the onboarding flow to test functionality

### 3. Test Integration
1. Complete the onboarding process
2. Log some period data
3. Check that data appears in the dashboard

## 🔧 Development Workflow

### Making Changes

#### Backend Changes
1. Edit files in `backend/src/`
2. Flask auto-reloads in debug mode
3. Test changes with API calls

#### Frontend Changes
1. Edit files in `frontend/src/`
2. Vite hot-reloads automatically
3. Changes appear immediately in browser

### Database Management
```bash
# View database (from backend directory)
sqlite3 src/database/app.db

# Reset database
rm src/database/app.db
python src/main.py  # Will recreate tables
```

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'flask_cors'`
```bash
# Solution: Ensure virtual environment is activated
source venv/bin/activate  # or venv\\Scripts\\activate
pip install -r requirements.txt
```

**Problem**: `Port 5000 already in use`
```bash
# Solution: Kill existing process or change port
# Kill process:
lsof -ti:5000 | xargs kill -9

# Or change port in src/main.py:
app.run(host='0.0.0.0', port=5001, debug=True)
```

**Problem**: Database errors
```bash
# Solution: Reset database
rm src/database/app.db
python src/main.py
```

#### Frontend Issues

**Problem**: `npm install` fails
```bash
# Solution: Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem**: `Port 5173 already in use`
```bash
# Solution: Use different port
npm run dev -- --port 3000
```

**Problem**: API calls failing (CORS errors)
- Ensure backend is running on port 5000
- Check browser console for specific errors
- Verify CORS is enabled in Flask app

#### General Issues

**Problem**: Changes not reflecting
```bash
# Solution: Hard refresh browser
# Chrome/Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
# Or clear browser cache
```

**Problem**: Virtual environment issues
```bash
# Solution: Recreate virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 📊 Development Tools

### Recommended VS Code Extensions
- Python
- Pylance
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Bracket Pair Colorizer

### Browser Developer Tools
- **Console**: Check for JavaScript errors
- **Network**: Monitor API requests/responses
- **Application**: Inspect local storage and cookies

### API Testing
Use tools like:
- [Postman](https://postman.com)
- [Insomnia](https://insomnia.rest)
- [curl](https://curl.se) (command line)

## 🚀 Production Setup

### Environment Variables
Create `.env` files for production:

#### Backend `.env`
```bash
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
DATABASE_URL=your-database-url
```

#### Frontend `.env`
```bash
VITE_API_URL=https://your-api-domain.com
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Copy to backend static folder
cp -r dist/* ../backend/src/static/
```

## 📞 Getting Help

If you encounter issues:

1. **Check this guide** for common solutions
2. **Search existing issues** on GitHub
3. **Create new issue** with:
   - Error messages
   - Steps to reproduce
   - Your environment details

## ✅ Success Checklist

After setup, you should have:
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Health endpoint responding correctly
- [ ] Onboarding flow working
- [ ] Data persistence working
- [ ] No console errors

🎉 **Congratulations! Cyclix is now running on your machine.**

