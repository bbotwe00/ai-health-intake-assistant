import StatusBadge from './StatusBadge'

export default function HistoryPanel({ history, selectedIndex, onSelect, onClear }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden" style={{boxShadow:'var(--shadow)'}}>
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div>
          <h3 className="font-display text-base" style={{color:'var(--ink)'}}>Intake History</h3>
          <p className="text-xs" style={{color:'var(--ink-3)'}}>{history.length} record{history.length !== 1 ? 's' : ''} this session</p>
        </div>
        {history.length > 0 && (
          <button onClick={onClear} className="text-xs transition-all hover:opacity-70" style={{color:'var(--ink-3)'}}>
            Clear
          </button>
        )}
      </div>

      <div className="p-3 space-y-2 max-h-[500px] overflow-y-auto">
        {history.map((entry, index) => (
          <button key={index} onClick={() => onSelect(index)}
            className="w-full text-left rounded-xl border p-3 transition-all"
            style={{
              borderColor: selectedIndex === index ? 'var(--teal)' : 'var(--border)',
              background:  selectedIndex === index ? 'var(--teal-light)' : 'var(--bg)',
            }}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-xs font-medium leading-snug line-clamp-2" style={{color:'var(--ink)'}}>
                {entry.chief_complaint}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <StatusBadge urgency={entry.urgency} />
              <span className="text-xs" style={{color:'var(--ink-3)'}}>{entry.timestamp}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
