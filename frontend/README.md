# AI Healthcare Intake & Clinical Summary Assistant

An AI-powered intake assistant that converts unstructured patient symptom descriptions into structured clinical summaries for healthcare staff.

---

## ⚠️ Disclaimer

This tool is for **documentation and intake assistance only**. It does **not** diagnose diseases, prescribe treatment, or claim medical certainty. Always consult a licensed healthcare professional.

---

## 🏗️ Architecture

```
Frontend (React + Tailwind)
        ↓
Backend API (FastAPI)
        ↓
Google Gemini API (gemini-1.5-flash)
        ↓
Structured JSON Output
        ↓
Provider Dashboard
```

---

## 🚀 Quick Start

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

uvicorn main:app --reload --port 8000
```

Backend runs at: http://localhost:8000
API docs at:     http://localhost:8000/docs

---

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

> Make sure the backend is running before using the frontend.

---

## 📡 API Reference

### `POST /analyze`

**Request:**
```json
{
  "symptoms": "I've had chest pain and shortness of breath for 2 days.",
  "age_range": "40-50",
  "duration": "2 days",
  "severity": "moderate"
}
```

**Response:**
```json
{
  "result": {
    "chief_complaint": "Chest pain and shortness of breath",
    "duration": "2 days",
    "urgency": "High",
    "suggested_department": "Cardiology / Urgent Care",
    "summary": "Patient reports chest pain and difficulty breathing persisting for 2 days."
  }
}
```

---

## 🛠️ Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React, TailwindCSS, Vite    |
| Backend   | Python, FastAPI             |
| AI        | Google Gemini 1.5 Flash     |
| HTTP      | httpx (async)               |
| Config    | python-dotenv               |

---

## 📁 Project Structure

```
ai-health-intake-assistant/
│
├── backend/
│   ├── main.py           # FastAPI app + routes
│   ├── ai_service.py     # Gemini API integration
│   ├── requirements.txt
│   ├── .env.example
│   └── .env              # (you create this, never commit it)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── SymptomForm.jsx
│   │   │   └── IntakeSummary.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── docs/
│   ├── architecture.md
│   └── development-log.md
│
└── README.md
```

---

## 🔮 Roadmap

- **Phase 2**: Voice-to-text intake, multilingual support, severity scoring
- **Phase 3**: EHR integration (FHIR), appointment scheduling, insurance pre-check
