import { useState } from 'react'

const AGE_RANGES  = ['Under 18','18–30','31–45','46–60','61–75','75+','Prefer not to say']
const SEVERITIES  = ['Mild','Moderate','Severe']
const EXAMPLES    = [
  'Chest pain and shortness of breath for 2 days, worse with exertion.',
  'Severe headache, fever of 102°F, and stiff neck since yesterday.',
  'Abdominal pain in the lower right quadrant, nausea, no appetite for 3 days.',
]

export default function SymptomForm({ onSubmit, loading }) {
  const [symptoms, setSymptoms]   = useState('')
  const [ageRange, setAgeRange]   = useState('')
  const [duration, setDuration]   = useState('')
  const [severity, setSeverity]   = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!symptoms.trim() || loading) return
    onSubmit({ symptoms, age_range: ageRange || null, duration: duration || null, severity: severity.toLowerCase() || null })
  }

  const isReady = symptoms.trim().length > 8

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden fade-up" style={{boxShadow:'var(--shadow)'}}>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[var(--border)] flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base" style={{background:'var(--teal)'}}>⚕</div>
        <div>
          <h2 className="font-display text-xl" style={{color:'var(--ink)'}}>Patient Symptom Intake</h2>
          <p className="text-sm" style={{color:'var(--ink-3)'}}>Describe symptoms in plain language for AI-assisted documentation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Symptom textarea */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{color:'var(--ink-3)'}}>
            Symptom Description <span style={{color:'var(--red)'}}>*</span>
          </label>
          <textarea
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
            rows={5}
            placeholder="Describe your symptoms in your own words…"
            disabled={loading}
            className="w-full rounded-xl border px-4 py-3 text-sm resize-none transition-all focus-ring disabled:opacity-50"
            style={{
              borderColor: symptoms.length > 0 ? 'var(--teal-mid)' : 'var(--border)',
              background: 'var(--bg)',
              color: 'var(--ink)',
              outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--teal)'}
            onBlur={e => e.target.style.borderColor = symptoms.length > 0 ? 'var(--teal-mid)' : 'var(--border)'}
          />
          <div className="flex justify-between items-center mt-1.5">
            <p className="text-xs" style={{color:'var(--ink-3)'}}>{symptoms.length} characters</p>
            {!isReady && symptoms.length > 0 && (
              <p className="text-xs" style={{color:'var(--amber)'}}>Please add more detail</p>
            )}
          </div>
        </div>

        {/* Example prompts */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{color:'var(--ink-3)'}}>Example inputs</p>
          <div className="space-y-2">
            {EXAMPLES.map((ex, i) => (
              <button key={i} type="button" onClick={() => setSymptoms(ex)}
                className="w-full text-left rounded-lg border px-3 py-2 text-xs transition-all hover:border-[var(--teal-mid)] hover:bg-[var(--teal-light)]"
                style={{borderColor:'var(--border)', color:'var(--ink-2)', background:'var(--bg)'}}>
                <span style={{color:'var(--teal)', marginRight:'6px'}}>→</span>{ex}
              </button>
            ))}
          </div>
        </div>

        {/* Optional fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{color:'var(--ink-3)'}}>Age Range</label>
            <select value={ageRange} onChange={e => setAgeRange(e.target.value)} disabled={loading}
              className="w-full rounded-xl border px-3 py-2.5 text-sm disabled:opacity-50"
              style={{borderColor:'var(--border)', background:'var(--bg)', color:'var(--ink)', outline:'none'}}>
              <option value="">Select…</option>
              {AGE_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{color:'var(--ink-3)'}}>Duration</label>
            <input type="text" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 3 days"
              disabled={loading}
              className="w-full rounded-xl border px-3 py-2.5 text-sm disabled:opacity-50"
              style={{borderColor:'var(--border)', background:'var(--bg)', color:'var(--ink)', outline:'none'}} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{color:'var(--ink-3)'}}>Severity</label>
            <div className="flex gap-2">
              {SEVERITIES.map(s => (
                <button key={s} type="button" onClick={() => setSeverity(severity === s ? '' : s)}
                  disabled={loading}
                  className="flex-1 rounded-lg border py-2 text-xs font-semibold transition-all disabled:opacity-50"
                  style={{
                    borderColor: severity === s ? 'var(--teal)' : 'var(--border)',
                    background:  severity === s ? 'var(--teal)' : 'var(--bg)',
                    color:       severity === s ? '#fff' : 'var(--ink-3)',
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" disabled={!isReady || loading}
          className="w-full rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all"
          style={{
            background: isReady && !loading ? 'var(--teal)' : 'var(--border)',
            color:      isReady && !loading ? '#fff' : 'var(--ink-3)',
            cursor:     isReady && !loading ? 'pointer' : 'not-allowed',
          }}>
          {loading ? 'Processing…' : 'Generate Clinical Summary →'}
        </button>

        <p className="text-xs text-center" style={{color:'var(--ink-3)'}}>
          This tool assists with intake documentation only. It does not diagnose or prescribe.
        </p>
      </form>
    </div>
  )
}
