# Architecture

## Overview

```
Patient (Browser)
    → React Frontend (Vite, port 5173)
        → POST /analyze (Vite proxy)
            → FastAPI Backend (port 8000)
                → Google Gemini 1.5 Flash API
                    ← Structured JSON
                ← IntakeResult JSON
            ← { result: IntakeResult }
        ← Dashboard display
```

## Key Design Decisions

### AI Safety
- Gemini is prompted explicitly NOT to diagnose or prescribe
- Temperature set to 0.2 for consistent, structured output
- Response is parsed and validated for required keys before returning to client

### Error Handling
- Backend returns 400 for empty input, 500 for AI/parse failures
- Frontend shows inline error messages, never crashes silently
- Gemini markdown fences are stripped before JSON.parse()

### Scalability Path
- FastAPI is async-native (httpx async client used)
- Can add PostgreSQL for audit logging of intakes
- Can swap Gemini for any LLM by changing ai_service.py only
