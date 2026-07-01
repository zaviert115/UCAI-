'use client'

import { useState } from 'react'
import DarkSection from '@/components/layout/DarkSection'
import GradientText from '@/components/ui/GradientText'

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

  const isError = msg.startsWith('//')

  return (
    <DarkSection id="join" dataShape="ai">
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <span
          className="eyebrow"
          style={{
            color: '#00E0CC',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 24,
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
          Free · open to all UC students
        </span>

        <h2
          style={{
            fontWeight: 700,
            fontSize: 'clamp(34px,6vw,80px)',
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            color: '#F2EFE6',
            margin: 0,
          }}
        >
          Ready to <GradientText sheen>build the future?</GradientText>
        </h2>

        <p
          style={{
            marginTop: 22,
            maxWidth: 560,
            marginInline: 'auto',
            fontSize: 'clamp(15px,1.7vw,19px)',
            lineHeight: 1.6,
            color: 'rgba(242,239,230,0.72)',
          }}
        >
          Drop your email for the fortnightly newsletter, or jump straight to StudentLink to sign up
          officially. No prior experience required — just curiosity.
        </p>

        <form
          onSubmit={submit}
          style={{
            marginTop: 36,
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="email"
            placeholder="you@canterbury.ac.nz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: '1 1 280px',
              maxWidth: 360,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#F2EFE6',
              padding: '14px 16px',
              fontFamily: 'inherit',
              fontSize: 15,
              outline: 'none',
            }}
          />
          <button type="submit" className="btn btn--grad">
            Subscribe →
          </button>
        </form>

        {msg && (
          <div
            className="mono"
            style={{
              marginTop: 16,
              fontSize: 13,
              color: isError ? '#FF6B6B' : '#00E0CC',
            }}
          >
            {msg}
          </div>
        )}

        <div
          style={{
            marginTop: 32,
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a href="#" className="btn btn--outline">
            Sign up on StudentLink
          </a>
          <a href="#" className="btn btn--outline">
            Join Discord →
          </a>
        </div>
      </div>
    </DarkSection>
  )
}
