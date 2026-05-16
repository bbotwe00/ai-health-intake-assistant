# Development Log

## MVP Scaffold — Initial Build

### What was built
- FastAPI backend with `/analyze` endpoint
- Gemini 1.5 Flash integration via async httpx
- Prompt engineering for structured JSON output with safety constraints
- React + Tailwind frontend with:
  - Patient symptom intake form
  - Optional fields: age range, duration, severity
  - Animated loading state
  - Provider dashboard with urgency color coding
  - Print/export action

### Decisions made
- Used `httpx` (async) over `requests` for non-blocking Gemini calls
- Vite proxy routes `/analyze` to backend — no CORS issues in dev
- Gemini temperature = 0.2 for reproducible structured output
- Response validation checks all required keys before returning to client

### Next steps
- [ ] Add unit tests for ai_service.py (mock Gemini responses)
- [ ] Add intake history (local state or simple SQLite)
- [ ] Add voice input (Web Speech API or Whisper)
- [ ] Improve urgency logic with symptom keyword rules as fallback
