'use client'

import { useEffect, useState } from 'react'

export default function MiniTerminal() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 1500)
    return () => clearInterval(t)
  }, [])

  const cursor = tick % 2 === 0 ? '_' : '|'

  return (
    <section style={{ padding: '80px 0', background: 'var(--navy-900)' }}>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span className="section-eyebrow" style={{ color: 'var(--cyan)' }}>
            It runs on code
          </span>
          <h2 className="section-title" style={{ color: 'white' }}>
            We talk in shells.
          </h2>
        </div>
        <div className="terminal" style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="term-bar">
            <div className="dot d1" />
            <div className="dot d2" />
            <div className="dot d3" />
            <div className="term-title">ucai-cli — zsh</div>
          </div>
          <div className="term-body" style={{ minHeight: 'auto' }}>
            <div>
              <span className="prompt">ucai@uc</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>:</span>
              <span className="key">~</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>$ </span>
              <span>ucai status</span>
            </div>
            <div className="ok">✓ 412 members · 24 events/yr · 38 tutorials</div>
            <div className="ok">✓ 6 industry partners · open source · since 2024</div>
            <div>
              <span className="prompt">ucai@uc</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>:</span>
              <span className="key">~</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>$ </span>
              <span>ucai next</span>
            </div>
            <div className="out">→ Intro to LLMs · Workshop · 12 Jun</div>
            <div>
              <span className="prompt">ucai@uc</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>:</span>
              <span className="key">~</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>$ </span>
              <span style={{ color: 'var(--cyan)' }}>{cursor}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
