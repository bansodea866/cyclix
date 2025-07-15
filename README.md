# Cyclix - Women's Health App (Flo Clone)

<div align="center">
  <img src="frontend/src/assets/Cyclixicon.png" alt="Cyclix Logo" width="120" height="120">
  
  <h3>A comprehensive women's health tracking application</h3>
  
  [![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
  [![Flask](https://img.shields.io/badge/Flask-3.1-green.svg)](https://flask.palletsprojects.com/)
  [![Python](https://img.shields.io/badge/Python-3.11-yellow.svg)](https://python.org/)
  [![License](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)
</div>

## 🌟 Overview

Cyclix is a feature-complete clone of the popular Flo women's health app, built with modern web technologies. It provides comprehensive cycle tracking, symptom logging, wellbeing insights, and health predictions with an exact replica of Flo's intuitive user interface.

## ✨ Features

### 🎯 Core Functionality
- **Smart Onboarding**: Goal-based setup with personalized questionnaires
- **Cycle Tracking**: Period logging with intelligent 5-day auto-selection
- **Predictions**: Advanced algorithms for 6-month cycle and ovulation forecasting
- **Wellbeing Battery**: Dynamic health scoring based on multiple factors
- **Symptom Logging**: Comprehensive mood, energy, and physical symptom tracking
- **Sleep Analysis**: Sleep quality and pattern monitoring
- **Activity Tracking**: Exercise and physical activity logging

### 🎨 User Experience
- **Pixel-Perfect UI**: Exact replica of Flo's design system
- **Responsive Design**: Seamless experience across all devices
- **Interactive Calendar**: Visual cycle tracking with predictions
- **Smooth Animations**: Polished micro-interactions and transitions
- **Accessibility**: WCAG compliant interface

### 🔧 Technical Features
- **Real-time Sync**: Instant data synchronization
- **Offline Support**: Works without internet connection
- **Data Privacy**: Local data storage with encryption
- **API-First**: RESTful backend architecture
- **Scalable**: Modular component architecture

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Flask Backend  │
│                 │    │                 │
│  • Vite Build   │◄──►│  • SQLAlchemy   │
│  • Tailwind CSS │    │  • RESTful API  │
│  • Shadcn/UI    │    │  • CORS Enabled │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┘
                   │
            ┌─────────────┐
            │   SQLite    │
            │  Database   │
            └─────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Python 3.11+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bansodea866/cyclix.git
   cd cyclix
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\\Scripts\\activate
   pip install -r requirements.txt
   python src/main.py
   ```

3. **Setup Frontend** (new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
cyclix/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # Reusable UI components
│   │   │   ├── GoalSelection.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Flask API
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API endpoints
│   │   ├── database/       # SQLite database
│   │   └── main.py
│   └── requirements.txt
├── docs/                   # Documentation
├── .gitignore
└── README.md
```

## 🔌 API Documentation

### Authentication
Currently uses session-based user identification. JWT authentication can be easily integrated.

### Core Endpoints

#### User Profile
```http
POST   /api/profile           # Create/update profile
GET    /api/profile/{user_id} # Get user profile
```

#### Cycle Management
```http
POST   /api/cycle                    # Log period data
GET    /api/cycle/{user_id}          # Get cycle history
GET    /api/cycle/predictions/{user_id} # Get predictions
```

#### Health Tracking
```http
POST   /api/symptoms         # Log symptoms
POST   /api/sleep           # Log sleep data
POST   /api/activity        # Log activities
GET    /api/dashboard/{user_id} # Get dashboard summary
```

### Example Request
```bash
curl -X POST http://localhost:5000/api/cycle \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "period_start_date": "2025-07-15",
    "cycle_length": 28,
    "period_length": 5
  }'
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
source venv/bin/activate
python -m pytest
```

### Integration Testing
```bash
# Start both servers and run
npm run test:e2e
```

## 🚀 Deployment

### Development
Follow the Quick Start guide above.

### Production

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy Backend**
   ```bash
   # Copy built frontend to backend static folder
   cp -r frontend/dist/* backend/src/static/
   
   # Deploy to your preferred hosting service
   ```

### Docker Deployment
```bash
docker-compose up -d
```

## 🔒 Security & Privacy

- **Data Encryption**: All sensitive data encrypted at rest
- **HTTPS Only**: Secure communication in production
- **Input Validation**: Comprehensive server-side validation
- **CORS Protection**: Configured for secure cross-origin requests
- **Privacy First**: No external data sharing

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Flo Health Inc.** for the original design inspiration
- **React Team** for the excellent frontend framework
- **Flask Team** for the lightweight backend framework
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

- 📧 Email: support@cyclix.app
- 🐛 Issues: [GitHub Issues](https://github.com/bansodea866/cyclix/issues)
- 📖 Documentation: [Wiki](https://github.com/bansodea866/cyclix/wiki)

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with wearable devices
- [ ] Multi-language support
- [ ] Healthcare provider portal

---

<div align="center">
  <p>Made with ❤️ for women's health</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>

