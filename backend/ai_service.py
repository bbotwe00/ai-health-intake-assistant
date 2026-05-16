import os
import json
import httpx
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "gemini-2.5-flash:generateContent"
)


def build_prompt(symptoms: str, age_range: Optional[str], duration: Optional[str], severity: Optional[str]) -> str:
    context_lines = []
    if age_range:
        context_lines.append(f"- Age range: {age_range}")
    if duration:
        context_lines.append(f"- Duration (patient-reported): {duration}")
    if severity:
        context_lines.append(f"- Severity (patient-reported): {severity}")

    context_block = "\n".join(context_lines) if context_lines else "None provided."

    return f"""You are a healthcare intake assistant working in a clinical documentation system.

Your job is to convert a patient's natural language symptom description into structured clinical intake data.

Return ONLY valid JSON — no markdown, no explanation, no extra text.

The JSON must have exactly these keys:
- "chief_complaint": concise clinical statement of the main complaint
- "duration": extracted or inferred duration (e.g. "2 days", "unknown")
- "urgency": one of "Low", "Medium", or "High"
- "suggested_department": one or more relevant departments (e.g. "Cardiology / Urgent Care")
- "summary": one to two sentence clinical summary written in third-person

IMPORTANT CONSTRAINTS:
- Do NOT diagnose the patient.
- Do NOT recommend treatment or medication.
- Do NOT claim medical certainty.
- This is a documentation and intake assistance tool only.

Patient context:
{context_block}

Patient symptom description:
{symptoms}"""


async def analyze_symptoms(
    symptoms: str,
    age_range: Optional[str] = None,
    duration: Optional[str] = None,
    severity: Optional[str] = None,
) -> dict:
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is not set in environment variables.")

    prompt = build_prompt(symptoms, age_range, duration, severity)

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.2,
            "maxOutputTokens": 1024,
        },
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            f"{GEMINI_URL}?key={GEMINI_API_KEY}",
            json=payload,
        )
        response.raise_for_status()

    data = response.json()

    try:
        raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
        # Strip markdown fences if Gemini wraps in ```json ... ```
        cleaned = raw_text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        parsed = json.loads(cleaned)
    except (KeyError, json.JSONDecodeError) as e:
        raise ValueError(f"Failed to parse Gemini response: {e}\nRaw: {data}")

    required_keys = {"chief_complaint", "duration", "urgency", "suggested_department", "summary"}
    missing = required_keys - parsed.keys()
    if missing:
        raise ValueError(f"Gemini response missing keys: {missing}")

    return parsed
