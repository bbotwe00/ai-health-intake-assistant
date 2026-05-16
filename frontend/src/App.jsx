import { useState } from 'react'
import SymptomForm from './components/SymptomForm'
import IntakeSummary from './components/IntakeSummary'
import HistoryPanel from './components/HistoryPanel'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setSelectedIndex(null)
    try {
      const res = await fetch('/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.detail || 'Something went wrong.') }
      const data = await res.json()
      const entry = { ...data.result, timestamp: new Date().toLocaleTimeString(), symptoms: formData.symptoms }
      setHistory(prev => [entry, ...prev])
      setResult(data.result)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectHistory = (index) => {
    setSelectedIndex(index)
    setResult(history[index])
    setError(null)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0d7377] flex items-center justify-center text-white text-sm">⚕</div>
            <div>
              <p className="font-display text-lg leading-none" style={{color:'var(--ink)'}}>IntakeAI</p>
              <p className="text-xs text-stone-400">Clinical Intake Assistant</p>
            </div>
          </div>
          <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 rounded-full font-medium">Documentation Only</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 flex gap-6">
        <div className="flex-1">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-xl" style={{fontFamily:'serif'}}>Analyzing symptoms...</p>
              <p className="text-sm text-stone-400 mt-1">Gemini is structuring the intake data</p>
            </div>
          )}
          {error && !loading && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}
          {!loading && (result
            ? <IntakeSummary result={result} onReset={() => { setResult(null); setError(null); setSelectedIndex(null) }} />
            : <SymptomForm onSubmit={handleSubmit} loading={loading} />
          )}
        </div>
        {history.length > 0 && (
          <div className="w-72 shrink-0">
            <HistoryPanel history={history} selectedIndex={selectedIndex} onSelect={handleSelectHistory} />
          </div>
        )}
      </main>
    </div>
  )
}
