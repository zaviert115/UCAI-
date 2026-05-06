'use client'

import { useState } from 'react'

export default function JoinSection() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setMsg('// please enter a valid email')
      return
    }
    setMsg(`✓ welcome to ucai. confirmation sent to ${email}`)
    setEmail('')
  }

  return (
    <section className="join-section" id="join">
      <div className="join-bg" />
      <div className="wrap">
        <div className="join-inner">
          <span
            className="hero-eyebrow"
            style={{ color: 'var(--cyan)', justifyContent: 'center', marginBottom: 24 }}
          >
            <span className="dot" />
            Free · open to all UC students
          </span>
          <h2>Ready to get involved?</h2>
          <p>
            Drop your email for the fortnightly newsletter, or jump straight to StudentLink to sign
            up officially. No prior experience required — just curiosity.
          </p>
          <form className="join-form" onSubmit={submit}>
            <input
              type="email"
              placeholder="you@canterbury.ac.nz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px' }}>
              Subscribe →
            </button>
          </form>
          <div className="join-msg">{msg}</div>
          <div
            style={{
              marginTop: 32,
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a href="#" className="btn btn-ghost">
              Sign up on StudentLink
            </a>
            <a href="#" className="btn btn-ghost">
              Join Discord →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
