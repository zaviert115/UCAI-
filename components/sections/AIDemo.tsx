'use client'

import { useState } from 'react'

const EXAMPLES = ['What is a transformer?', 'How do I start with AI?', 'Is the club really free?']

export default function AIDemo() {
  const [q, setQ] = useState('')
  const [a, setA] = useState('')
  const [busy, setBusy] = useState(false)

  const ask = async (prompt: string) => {
    if (!prompt.trim()) return
    setBusy(true)
    setA('')
    try {
      const res = await fetch('/api/ai-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      setA(data.answer ?? '// something went wrong, try again')
    } catch {
      setA('// the model is napping. try again in a sec.')
    }
    setBusy(false)
  }

  return (
    <section className="ai-demo-section">
      <div className="wrap">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <span className="section-eyebrow">Try it before you join</span>
          <h2 className="section-title">Ask anything about UC AI.</h2>
          <p className="section-sub" style={{ margin: '12px auto 32px' }}>
            A real model, running live. Powered by the same APIs we teach with.
          </p>
        </div>
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            background: 'white',
            border: '1px solid var(--brand-border)',
            borderRadius: 16,
            padding: 24,
            boxShadow: '0 12px 40px -20px rgba(15,42,68,0.18)',
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && ask(q)}
              placeholder="What is RAG?"
              style={{
                flex: 1,
                border: '1px solid var(--brand-border)',
                borderRadius: 10,
                padding: '12px 14px',
                fontFamily: 'inherit',
                fontSize: 15,
                outline: 'none',
                color: 'var(--navy-900)',
              }}
            />
            <button
              className="btn btn-dark"
              disabled={busy || !q.trim()}
              onClick={() => ask(q)}
              style={{ opacity: busy ? 0.5 : 1 }}
            >
              {busy ? 'Thinking…' : 'Ask →'}
            </button>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                className="chip"
                onClick={() => {
                  setQ(ex)
                  ask(ex)
                }}
              >
                {ex}
              </button>
            ))}
          </div>
          {(a || busy) && (
            <div
              style={{
                marginTop: 18,
                padding: 16,
                background: 'var(--navy-50)',
                borderRadius: 10,
                fontSize: 14.5,
                lineHeight: 1.6,
                color: 'var(--navy-900)',
                minHeight: 60,
                fontFamily: busy ? 'var(--font-jetbrains-mono), monospace' : 'inherit',
              }}
            >
              {busy && !a ? (
                <span style={{ color: 'var(--brand-muted)' }}>generating response…</span>
              ) : (
                a
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
