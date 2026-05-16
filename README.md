<div align="center">

# ⚕️ IntakeAI — AI Healthcare Intake & Clinical Summary Assistant

**Transforming unstructured patient symptom descriptions into structured clinical summaries using AI.**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=flat&logo=google&logoColor=white)](https://aistudio.google.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌐 **Live Demo:** [ai-health-intake-assistant.vercel.app](https://ai-health-intake-assistant.vercel.app)
&nbsp;|&nbsp;
🔧 **API Docs:** [ai-health-intake-assistant.onrender.com/docs](https://ai-health-intake-assistant.onrender.com/docs)

</div>

---

## 📋 Overview

**IntakeAI** is a full-stack, AI-powered clinical intake assistant designed to reduce administrative burden in healthcare settings. It accepts unstructured patient symptom descriptions in plain language and uses Google Gemini AI to transform them into structured, provider-ready clinical intake summaries — in seconds.

This tool does **not** diagnose or prescribe. It is a **documentation and workflow assistance tool** built to support clinical staff during the patient intake process.

---

## 🚨 Problem Statement

Healthcare staff spend a significant portion of their time manually collecting, interpreting, and documenting patient symptoms during intake. This creates:

- 📝 **Inconsistent documentation** across providers and shifts
- ⏱️ **Longer patient wait times** due to manual data entry
- 🔥 **Administrative overload** and provider burnout
- 🔄 **Inefficient patient flow** in high-volume clinical environments

---

## 💡 Solution

IntakeAI addresses these challenges by providing an AI-assisted intake layer that:

1. Accepts patient symptoms in **natural, conversational language**
2. Sends input to **Google Gemini AI** for intelligent extraction and structuring
3. Returns a **standardized clinical intake summary** with urgency classification and department routing
4. Displays results in a **clean provider dashboard** ready for staff review

---

## ✨ Features

### 👤 Patient-Facing
- Natural language symptom input
- Optional fields: age range, duration, severity
- Mobile-friendly, accessible interface

### 🤖 AI Processing Layer
- Symptom extraction and summarization
- Urgency classification: `Low` / `Medium` / `High`
- Intelligent department routing (e.g. Cardiology, Urgent Care, Neurology)
- Third-person clinical summary generation

### 🏥 Provider Dashboard
- Structured intake card with all key fields
- Color-coded urgency badges
- Intake history panel (session-based)
- Print / PDF export functionality

---

## 🛠️ Tech Stack

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Frontend    | React 18, TailwindCSS, Vite              |
| Backend     | Python 3.13, FastAPI, Uvicorn            |
| AI          | Google Gemini 2.0 Flash                  |
| HTTP Client | httpx (async)                            |
| Config      | python-dotenv                            |
| Deployment  | Vercel (frontend), Render (backend)      |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Patient (Browser)                     │
│         Enters symptoms in natural language              │
└───────────────────────┬─────────────────────────────────┘
                        │ POST /analyze
                        ▼
┌─────────────────────────────────────────────────────────┐
│              React Frontend (Vercel)                     │
│         Vite + TailwindCSS + Component UI                │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP Request
                        ▼
┌─────────────────────────────────────────────────────────┐
│              FastAPI Backend (Render)                    │
│         Input validation + prompt engineering            │
└───────────────────────┬─────────────────────────────────┘
                        │ Gemini API Call
                        ▼
┌─────────────────────────────────────────────────────────┐
│           Google Gemini 2.0 Flash (AI Layer)             │
│      Symptom extraction + urgency + department           │
└───────────────────────┬─────────────────────────────────┘
                        │ Structured JSON
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Provider Dashboard (Frontend)               │
│      Clinical summary card + history panel               │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Example Workflow

**Patient Input:**
> *"I'm a 58-year-old male. For the past 4 days I've had severe chest tightness spreading to my left arm and jaw. I've been sweating a lot, feeling nauseous and dizzy. Last night I woke up unable to breathe. I have a history of high blood pressure and my father died of a heart attack at 62."*

**AI Structured Output:**

```json
{
  "chief_complaint": "Chest tightness radiating to left arm and jaw, with dyspnea, diaphoresis, nausea, and dizziness",
  "duration": "4 days",
  "urgency": "High",
  "suggested_department": "Emergency Department / Cardiology",
  "summary": "A 58-year-old male reports 4 days of severe chest tightness radiating to the left arm and jaw, accompanied by diaphoresis, nausea, dizziness, and nocturnal dyspnea. Symptoms are exacerbated by exertion. Patient has a history of hypertension and a family history of early cardiac death."
}
```

**Provider Dashboard displays:**
- 🔴 **High Priority** badge
- Chief complaint, duration, urgency level
- Suggested department: Emergency Department / Cardiology
- Full AI-generated clinical summary
- Print / Export to PDF

---

## 📸 Screenshots

### Patient Intake Form
![Intake Form](docs/screenshots/form.png)

### AI Clinical Summary Result
![Clinical Summary](docs/screenshots/result.png)

### Print / Export View
![Print View](docs/screenshots/print.png)

---

## 🚀 Installation & Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Google Gemini API key → [Get one free](https://aistudio.google.com/apikey)

### 1. Clone the repository
```bash
git clone https://github.com/bbotwe00/ai-health-intake-assistant.git
cd ai-health-intake-assistant
```

### 2. Backend setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

pip install fastapi uvicorn httpx python-dotenv "pydantic>=2.7" certifi --only-binary=:all:

cp .env.example .env
# Add your GEMINI_API_KEY to .env

python3 -m uvicorn main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`
Interactive API docs: `http://localhost:8000/docs`

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 📡 API Reference

### `POST /analyze`

**Request body:**
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
    "suggested_department": "Emergency Department / Cardiology",
    "summary": "Patient reports chest pain and difficulty breathing persisting for 2 days, exacerbated by physical exertion."
  }
}
```

---

## 🔮 Future Improvements

### Phase 2
- 🎙️ Voice-to-text symptom input (Whisper API / Web Speech API)
- 🌍 Multilingual support for diverse patient populations
- 📊 Severity scoring model with historical pattern analysis
- 🔁 Smarter triage routing logic

### Phase 3
- 🏥 EHR integration (FHIR-compatible API)
- 📅 Appointment scheduling automation
- 💳 Insurance pre-authorization suggestions
- 📈 Analytics dashboard for clinical workflow insights

---

## 🤖 AI Safety Constraints

The Gemini AI prompt is explicitly and strictly constrained:

| ✅ Permitted | ❌ Prohibited |
|-------------|--------------|
| Symptom extraction | Disease diagnosis |
| Urgency classification | Treatment recommendations |
| Department routing | Medication suggestions |
| Clinical summarization | Medical certainty claims |

> **This system is a documentation and intake assistance tool only. It is not a medical device and does not replace clinical judgment.**

---

## 🌟 Vision & Motivation

The global healthcare system faces a documentation crisis. Clinicians spend up to **35% of their time on administrative tasks** rather than direct patient care. AI-assisted intake tools represent a practical, immediately deployable solution to reduce this burden — without replacing human judgment.

IntakeAI is a demonstration of how **large language models can be responsibly applied to real healthcare workflows**: structured, constrained, transparent, and built with safety as a first principle.

This project maps directly to opportunities in:
- Health informatics and clinical AI
- Digital health startups and EHR platforms
- AI engineering roles in regulated industries

---

## 📁 Project Structure

```
ai-health-intake-assistant/
├── backend/
│   ├── main.py              # FastAPI app + /analyze endpoint
│   ├── ai_service.py        # Gemini API integration + prompt engineering
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── SymptomForm.jsx
│   │   │   ├── IntakeSummary.jsx
│   │   │   └── HistoryPanel.jsx
│   │   └── main.jsx
│   └── index.html
│
├── docs/
│   ├── screenshots/
│   │   ├── form.png
│   │   ├── result.png
│   │   └── print.png
│   ├── architecture.md
│   └── development-log.md
│
└── README.md
```

---

## 👤 Author

Built by [@bbotwe00](https://github.com/bbotwe00)

---

<div align="center">

⚕ *This tool is for intake documentation assistance only. It does not constitute medical advice, diagnosis, or treatment.*

</div>
