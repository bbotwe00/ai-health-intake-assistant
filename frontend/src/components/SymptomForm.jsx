import { useState } from 'react'

const AGE_RANGES = ['Under 18', '18–30', '31–45', '46–60', '61–75', '75+', 'Prefer not to say']
const SEVERITIES = ['Mild', 'Moderate', 'Severe']

export default function SymptomForm({ onSubmit, loading }) {
  const [symptoms, setSymptoms] = useState('')
  const [ageRange, setAgeRange] = useState('')
  const [duration, setDuration] = useState('')
  const [severity, setSeverity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!symptoms.trim()) return
    onSubmit({ symptoms, age_range: ageRange || null, duration: duration || null, severity: severity.toLowerCase() || null })
  }

  const charCount = symptoms.length
  const isReady = symptoms.trim().length > 5

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
      <h2 className="font-display text-2xl text-[var(--ink)] mb-1">Patient Symptom Intake</h2>
      <p className="text-sm text-stone-500 mb-6">
        Describe symptoms in plain language. The AI will structure them for clinical staff.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Symptom textarea */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
            Symptom Description <span className="text-red-400">*</span>
          </label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={5}
            placeholder="e.g. I've had chest pain and shortness of breath for the past 2 days. It gets worse when I climb stairs."
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-[var(--ink)] placeholder-stone-300 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--teal)] transition"
          />
          <p className="text-right text-xs text-stone-300 mt-1">{charCount} characters</p>
        </div>

        {/* Optional fields row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
              Age Range
            </label>
            <select
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)] transition"
            >
              <option value="">Select...</option>
              {AGE_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
              Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 3 days"
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-[var(--ink)] placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[var(--teal)] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
              Severity
            </label>
            <div className="flex gap-2">
              {SEVERITIES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeverity(severity === s ? '' : s)}
                  className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition
                    ${severity === s
                      ? 'bg-[var(--teal)] border-[var(--teal)] text-white'
                      : 'border-stone-200 text-stone-400 hover:border-[var(--teal)] hover:text-[var(--teal)]'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isReady || loading}
          className={`w-full rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all
            ${isReady && !loading
              ? 'bg-[var(--ink)] text-[var(--cream)] hover:bg-[var(--teal)] hover:shadow-lg'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
        >
          {loading ? 'Analyzing...' : 'Generate Clinical Summary →'}
        </button>

        <p className="text-xs text-stone-400 text-center">
          ⚕ This tool does not diagnose or prescribe. For clinical documentation only.
        </p>
      </form>
    </div>
  )
}
