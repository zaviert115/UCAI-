'use client'

import { useState } from 'react'
import DarkSection from '@/components/layout/DarkSection'
import SectionHeader from '@/components/layout/SectionHeader'

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
    <DarkSection dataShape="ai">
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <SectionHeader
          index="08"
          eyebrow="Ask UC·AI"
          title="Try the assistant."
          sub="A real model, running live. Powered by the same APIs we teach with."
          tone="dark"
          align="center"
          scramble
        />

        <div
          className="card-dark"
          style={{ marginTop: 48, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && ask(q)}
              placeholder="What is RAG?"
              style={{
                flex: '1 1 220px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#F2EFE6',
                padding: '13px 15px',
                fontFamily: 'inherit',
                fontSize: 15,
                outline: 'none',
              }}
            />
            <button
              className="btn btn--grad"
              disabled={busy || !q.trim()}
              onClick={() => ask(q)}
              style={{ opacity: busy || !q.trim() ? 0.5 : 1 }}
            >
              {busy ? 'Thinking…' : 'Ask →'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                className="mono"
                onClick={() => {
                  setQ(ex)
                  ask(ex)
                }}
                style={{
                  fontSize: 11,
                  padding: '6px 12px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'rgba(242,239,230,0.72)',
                  cursor: 'pointer',
                }}
              >
                {ex}
              </button>
            ))}
          </div>

          {(a || busy) && (
            <div
              className="card-glass"
              style={{
                marginTop: 4,
                padding: 18,
                fontSize: 14.5,
                lineHeight: 1.6,
                color: 'rgba(242,239,230,0.88)',
                minHeight: 64,
              }}
            >
              {busy && !a ? (
                <span
                  className="mono"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 13,
                    color: 'rgba(242,239,230,0.6)',
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#00E0CC',
                      animation: 'dotpulse 1s infinite',
                    }}
                  />
                  Thinking…
                </span>
              ) : (
                a
              )}
            </div>
          )}
        </div>
      </div>
    </DarkSection>
  )
}
