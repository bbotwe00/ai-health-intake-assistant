import { useState } from 'react'
import SymptomForm from './components/SymptomForm'
import SummaryCard from './components/SummaryCard'
import HistoryPanel from './components/HistoryPanel'
import LoadingOverlay from './components/LoadingOverlay'

const API_URL = import.meta.env.VITE_API_URL || ''

export default function App() {
  const [result, setResult]             = useState(null)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)
  const [history, setHistory]           = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [retryData, setRetryData]       = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setSelectedIndex(null)
    setRetryData(formData)

    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const err = await res.json()
        const msg = err.detail || 'Something went wrong.'
        throw new Error(
          msg.includes('429') || msg.includes('Too Many')
            ? 'Our AI service is temporarily busy. Please wait a moment and try again.'
            : msg.includes('403')
            ? 'AI service configuration error. Please try again shortly.'
            : msg
        )
      }
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

  const handleReset = () => { setResult(null); setError(null); setSelectedIndex(null) }
  const handleSelectHistory = (i) => { setSelectedIndex(i); setResult(history[i]); setError(null) }
  const handleClearHistory = () => { setHistory([]); setSelectedIndex(null) }
  const handleRetry = () => retryData && handleSubmit(retryData)

  return (
    <div className="min-h-screen" style={{background:'var(--bg)'}}>
      {/* Topbar */}
      <header style={{background:'var(--surface)', borderBottom:'1px solid var(--border)'}}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{background:'var(--teal)'}}>⚕</div>
            <div>
              <p className="font-display text-lg leading-none" style={{color:'var(--ink)'}}>IntakeAI</p>
              <p className="text-xs" style={{color:'var(--ink-3)'}}>Clinical Intake Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs px-3 py-1.5 rounded-full border font-medium"
              style={{borderColor:'var(--border)', color:'var(--ink-3)', background:'var(--bg)'}}>
              AI-Assisted Documentation
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full font-semibold"
              style={{background:'var(--amber-light)', color:'var(--amber)', border:'1px solid var(--amber-mid)'}}>
              ⚠ Not Medical Advice
            </span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-6xl mx-auto px-6 py-8 flex gap-6 items-start">
        {/* Center content */}
        <div className="flex-1 min-w-0">
          {loading && <LoadingOverlay />}

          {error && !loading && (
            <div className="rounded-2xl border p-6 mb-4 fade-up" style={{borderColor:'var(--red-mid)', background:'var(--red-light)'}}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold mb-1" style={{color:'var(--red)'}}>Unable to process request</p>
                  <p className="text-sm" style={{color:'var(--ink-2)'}}>{error}</p>
                </div>
                <button onClick={handleRetry}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
                  style={{background:'var(--red)', color:'#fff'}}>
                  Retry
                </button>
              </div>
            </div>
          )}

          {!loading && (
            result
              ? <SummaryCard result={result} onReset={handleReset} />
              : <SymptomForm onSubmit={handleSubmit} loading={loading} />
          )}
        </div>

        {/* History sidebar */}
        {history.length > 0 && (
          <div className="w-72 shrink-0 fade-in">
            <HistoryPanel
              history={history}
              selectedIndex={selectedIndex}
              onSelect={handleSelectHistory}
              onClear={handleClearHistory}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center pb-8 pt-2">
        <p className="text-xs" style={{color:'var(--ink-3)'}}>
          IntakeAI is a documentation assistance tool. It does not provide medical diagnosis or treatment advice.
        </p>
      </footer>
    </div>
  )
}
