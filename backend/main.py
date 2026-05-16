from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from ai_service import analyze_symptoms

app = FastAPI(title="AI Health Intake Assistant", version="1.0.0")

# Allow requests from your React frontend (adjust origin in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "https://ai-health-intake-assistant.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SymptomInput(BaseModel):
    symptoms: str
    age_range: Optional[str] = None
    duration: Optional[str] = None
    severity: Optional[str] = None


class IntakeResult(BaseModel):
    chief_complaint: str
    duration: str
    urgency: str
    suggested_department: str
    summary: str


class AnalyzeResponse(BaseModel):
    result: IntakeResult


@app.get("/")
def root():
    return {"status": "AI Health Intake Assistant is running"}


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(input: SymptomInput):
    if not input.symptoms.strip():
        raise HTTPException(status_code=400, detail="Symptoms field cannot be empty.")

    try:
        result = await analyze_symptoms(
            symptoms=input.symptoms,
            age_range=input.age_range,
            duration=input.duration,
            severity=input.severity,
        )
        return AnalyzeResponse(result=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
