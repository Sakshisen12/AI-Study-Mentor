# 🧠 AI Study Mentor — Cognitive Flow Optimizer

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?logo=fastapi)](https://fastapi.tiangolo.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/atlas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**AI Study Mentor** is a state-of-the-art academic companion that merges data science with immersive UI design. It monitors focus, predicts performance, and prevents burnout using a neural-themed interface.

---

## 🚀 Live Demo
**[View Live Project](https://ai-study-mentor-alpha.vercel.app/)** *(Replace with your actual Vercel link)*

---

## ✨ Primary Protocols (Features)

### 🧠 Neural Dashboard
Experience a high-fidelity interface that calculates your **Neural Focus Score** and **Rest Balance** in real-time. Features glassmorphic cards and dynamic particle backgrounds.

### 📊 Cognitive Velocity
Visualize your study trends with interactive charts. Track which subjects are draining your "neural net" and where you're excelling.

### 🤖 AI Guidance Protocol
The system analyzes your session difficulty and study time to provide real-time recommendations:
- "Study Physics (Thermodynamics) next: Predicted score is below target."
- "Neural Net Overheated: High study time detected, rest protocol initiated."

### 🔐 Secure Multi-Tenant Sync
Built with standard JWT (JSON Web Token) authentication, ensuring all your data is encrypted and private.

---

## 🛠️ Tech Architecture

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Tailwind CSS 4, Framer Motion, Recharts |
| **Backend** | FastAPI (Python), PyJWT, Uvicorn |
| **Database** | MongoDB Atlas (Cloud NoSQL) |
| **Hosting** | Vercel (Zero-Config Serverless) |

---

## 📥 Local Installation

### 1. Clone the Neural Net
```bash
git clone https://github.com/yourusername/ai-study-mentor.git
cd ai-study-mentor
```

### 2. Configure Backend (Python)
Move to the `api` directory and install dependencies:
```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Configure Frontend (React)
Open a new terminal and initialize the UI:
```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Cloud Deployment Strategy (Vercel)

This project is optimized for Vercel using the `api/` directory pattern for serverless functions.

### Required Environment Variables:
1. `MONGO_URL`: Your MongoDB SRV connection string.
2. `SECRET_KEY`: A secure string for authentication hashing.

---

## 🎨 Aesthetic Intent
The project utilizes a **Cyber-Noir Design System**:
- **Palette**: Deep Indigo (#4f46e5), Cyan (#06b6d4), Obsidian (#0f172a).
- **Animations**: Hardware-accelerated transitions via Framer Motion.
- **Glassmorphism**: 20% opacity white filters with 16px blur backdrops.

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

**Elevate your learning. Optimize your mind.** 🎓✨
