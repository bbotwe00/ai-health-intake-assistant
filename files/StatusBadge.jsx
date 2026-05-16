export default function StatusBadge({ urgency }) {
  const map = {
    High:   { cls: 'badge-high',   icon: '●', label: 'High Priority' },
    Medium: { cls: 'badge-medium', icon: '●', label: 'Medium Priority' },
    Low:    { cls: 'badge-low',    icon: '●', label: 'Low Priority' },
  }
  const cfg = map[urgency] || map.Medium
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${cfg.cls}`}>
      <span className="text-[8px]">{cfg.icon}</span>
      {cfg.label}
    </span>
  )
}
