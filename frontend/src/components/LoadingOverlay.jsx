import { useState, useEffect } from 'react'

const MESSAGES = [
  'Analyzing symptoms…',
  'Extracting clinical data…',
  'Classifying urgency level…',
  'Generating intake summary…',
  'Structuring clinical data…',
]

export default function LoadingOverlay() {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 flex flex-col items-center justify-center fade-in" style={{boxShadow:'var(--shadow)'}}>
      {/* Spinner */}
      <div className="relative w-14 h-14 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-[var(--teal-mid)]" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--teal)] spin" />
        <div className="absolute inset-3 rounded-full bg-[var(--teal-light)] flex items-center justify-center">
          <span className="text-[var(--teal)] text-sm">⚕</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs h-1 bg-[var(--border)] rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-[var(--teal)] rounded-full progress-bar" />
      </div>

      {/* Status message */}
      <p className="font-display text-lg text-[var(--ink)] mb-1" key={msgIndex} style={{animation:'fadeUp 0.3s ease forwards'}}>
        {MESSAGES[msgIndex]}
      </p>
      <p className="text-sm text-[var(--ink-3)]">Powered by Google Gemini AI</p>

      {/* Pulse dots */}
      <div className="flex gap-1.5 mt-6">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] pulse-dot" style={{animationDelay:`${i * 0.2}s`}} />
        ))}
      </div>
    </div>
  )
}
