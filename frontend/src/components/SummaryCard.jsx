import StatusBadge from './StatusBadge'

function Field({ label, value, wide, highlight }) {
  return (
    <div className={`rounded-xl border p-4 ${wide ? 'sm:col-span-2' : ''}`}
      style={{
        borderColor: highlight ? 'var(--teal-mid)' : 'var(--border)',
        background:  highlight ? 'var(--teal-light)' : 'var(--bg)',
      }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{color:'var(--ink-3)'}}>{label}</p>
      <p className="text-sm font-medium leading-snug" style={{color:'var(--ink)'}}>{value || '—'}</p>
    </div>
  )
}

export default function SummaryCard({ result, onReset }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden fade-up" style={{boxShadow:'var(--shadow)'}}>
      {/* Header */}
      <div className="px-8 py-5 border-b border-[var(--border)] flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl" style={{color:'var(--ink)'}}>Clinical Intake Summary</h2>
          <p className="text-xs mt-0.5" style={{color:'var(--ink-3)'}}>AI-generated · For clinical staff review only · Not a diagnosis</p>
        </div>
        <StatusBadge urgency={result.urgency} />
      </div>

      <div className="p-8 space-y-6 stagger">
        {/* Fields grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Chief Complaint"      value={result.chief_complaint}      wide highlight />
          <Field label="Duration"             value={result.duration} />
          <Field label="Urgency Level"        value={result.urgency} />
          <Field label="Suggested Department" value={result.suggested_department} wide />
        </div>

        {/* AI Summary */}
        <div className="rounded-xl border p-5" style={{borderColor:'var(--teal-mid)', background:'var(--teal-light)'}}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{color:'var(--teal)'}}>AI Clinical Summary</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{background:'var(--teal-mid)', color:'var(--teal)'}}>Gemini</span>
          </div>
          <p className="text-sm leading-relaxed" style={{color:'var(--ink)'}}>{result.summary}</p>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border p-4 flex gap-3" style={{borderColor:'var(--border)', background:'var(--bg)'}}>
          <span className="text-xs mt-0.5" style={{color:'var(--amber)'}}>⚠</span>
          <p className="text-xs leading-relaxed" style={{color:'var(--ink-3)'}}>
            This summary is for intake documentation purposes only. It does not constitute a medical diagnosis or treatment recommendation. All clinical decisions must be made by a licensed healthcare provider.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button onClick={onReset}
            className="flex-1 rounded-xl border py-3 text-sm font-semibold transition-all hover:border-[var(--teal-mid)]"
            style={{borderColor:'var(--border)', color:'var(--ink-2)'}}>
            ← New Intake
          </button>
          <button onClick={() => window.print()}
            className="flex-1 rounded-xl py-3 text-sm font-semibold text-white transition-all"
            style={{background:'var(--teal)'}}>
            Print / Export PDF
          </button>
        </div>
      </div>
    </div>
  )
}
