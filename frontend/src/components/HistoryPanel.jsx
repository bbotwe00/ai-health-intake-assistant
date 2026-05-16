const URGENCY_COLORS = {
  High:   'urgency-high',
  Medium: 'urgency-medium',
  Low:    'urgency-low',
}

export default function HistoryPanel({ history, selectedIndex, onSelect }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-[var(--ink)]">Intake History</h3>
        <span className="text-xs bg-stone-100 text-stone-500 px-2 py-1 rounded-full">{history.length} session</span>
      </div>

      <div className="space-y-2">
        {history.map((entry, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-full text-left rounded-xl border p-3 transition-all
              ${selectedIndex === index
                ? 'border-[var(--teal)] bg-[var(--teal)] bg-opacity-5'
                : 'border-stone-100 hover:border-stone-300 bg-stone-50'
              }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-xs font-semibold text-[var(--ink)] leading-snug line-clamp-2">
                {entry.chief_complaint}
              </p>
              <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded-full font-semibold ${URGENCY_COLORS[entry.urgency] || 'urgency-medium'}`}>
                {entry.urgency}
              </span>
            </div>
            <p className="text-xs text-stone-400">{entry.timestamp}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
