# 🎯 CareerIQ AI — AI-Powered Career Coach

> An intelligent career coaching web app powered by Google Gemini AI

![CareerIQ AI](https://img.shields.io/badge/Powered%20by-Google%20Gemini%20AI-blue)
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)

## ✨ Features

- 🧠 **CV Analyzer** — Upload your CV and get instant AI feedback with strengths and skill gaps
- 🎯 **Job Matcher** — Match your CV to any job description with a detailed score
- ✉️ **Cover Letter Generator** — Auto-generate personalized cover letters
- 🎤 **Interview Prep** — Get technical, behavioral and CV-specific interview questions
- 📚 **History** — Save and review all your past analyses

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Vite |
| Backend | FastAPI, Python |
| AI/LLM | Google Gemini 2.5 Flash |
| Database | MongoDB |
| PDF Parsing | PyMuPDF |

## 🚀 Getting Started

### Prerequisites
- Node.js
- Python
- MongoDB
- Google Gemini API Key

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the `backend` folder and add the following variables:

```env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=mongodb://localhost:27017
```

Replace `your_gemini_api_key` with your Google Gemini API key.


## 👩‍💻 Author
**Kethmini Weerasooriya**
- GitHub: [@kethu2001](https://github.com/kethu2001)
- LinkedIn: [Kethmini Weerasooriya](https://linkedin.com/in/kethmini-weerasooriya)
