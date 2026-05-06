'use client'

import { useEffect, useRef, useState } from 'react'

function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const dots: { x: number; y: number; vx: number; vy: number }[] = []
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const r = canvas.parentElement!.getBoundingClientRect()
      canvas.width = r.width * devicePixelRatio
      canvas.height = r.height * devicePixelRatio
      canvas.style.width = r.width + 'px'
      canvas.style.height = r.height + 'px'
      ctx.scale(devicePixelRatio, devicePixelRatio)
      dots.length = 0
      const count = Math.floor((r.width * r.height) / 18000)
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * r.width,
          y: Math.random() * r.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
        })
      }
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const tick = () => {
      const r = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, r.width, r.height)
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > r.width) d.vx *= -1
        if (d.y < 0 || d.y > r.height) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(34,211,238,0.4)'
        ctx.fill()
      }
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i],
            b = dots[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(34,211,238,${0.12 * (1 - dist / 110)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
        const dist = Math.hypot(dots[i].x - mouse.x, dots[i].y - mouse.y)
        if (dist < 160) {
          ctx.beginPath()
          ctx.moveTo(dots[i].x, dots[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(165,243,252,${0.5 * (1 - dist / 160)})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'auto' }}
    />
  )
}

function MagneticButton({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.25
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.25
      el.style.transform = `translate(${dx}px, ${dy}px)`
    }
    const onLeave = () => {
      el.style.transform = ''
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      style={{ transition: 'transform 0.25s cubic-bezier(0.2,0.9,0.3,1.4)' }}
    >
      {children}
    </a>
  )
}

const phrases = [
  'fine-tuning a model',
  'shipping a hackathon project',
  'debugging a prompt at 2am',
  'teaching the next cohort',
  'reading the latest paper',
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  const b1Ref = useRef<HTMLDivElement>(null)
  const b2Ref = useRef<HTMLDivElement>(null)
  const b3Ref = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [phrase, setPhrase] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)

  // Typing animation
  useEffect(() => {
    let i = 0,
      dir = 1,
      raf: number,
      start: number | undefined
    const tick = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start
      const target = phrases[phraseIdx]
      const speed = dir === 1 ? 65 : 30
      if (elapsed > speed) {
        start = ts
        i += dir
        if (i > target.length) {
          dir = -1
          i = target.length
          start = ts + 1400
        } else if (i < 0) {
          dir = 1
          i = 0
          setPhraseIdx((p) => (p + 1) % phrases.length)
        }
        setPhrase(target.slice(0, i))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phraseIdx])

  // Mouse parallax + spotlight
  useEffect(() => {
    const sec = sectionRef.current
    if (!sec) return
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf: number
    const onMove = (e: MouseEvent) => {
      const r = sec.getBoundingClientRect()
      tx = (e.clientX - r.left) / r.width - 0.5
      ty = (e.clientY - r.top) / r.height - 0.5
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(600px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(34,211,238,0.10), transparent 60%)`
      }
    }
    const tick = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      if (b1Ref.current) b1Ref.current.style.transform = `translate(${cx * 30}px, ${cy * 20}px)`
      if (b2Ref.current) b2Ref.current.style.transform = `translate(${-cx * 40}px, ${-cy * 30}px)`
      if (b3Ref.current) b3Ref.current.style.transform = `translate(${cx * 20}px, ${-cy * 15}px)`
      if (titleRef.current)
        titleRef.current.style.transform = `translate(${cx * -8}px, ${cy * -6}px)`
      raf = requestAnimationFrame(tick)
    }
    sec.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      sec.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="hero hero-c" ref={sectionRef}>
      <div className="hero-c-canvas">
        <div className="glow-blob b1" ref={b1Ref} />
        <div className="glow-blob b2" ref={b2Ref} />
        <div className="glow-blob b3" ref={b3Ref} />
        <div className="orbit o3">
          <div className="orbit-dot" />
        </div>
        <div className="orbit o2">
          <div className="orbit-dot" />
        </div>
        <div className="orbit o1">
          <div className="orbit-dot" />
        </div>
      </div>
      <div className="hero-c-noise" />
      <div className="hero-c-spot" ref={spotRef} />
      <Constellation />

      <div className="wrap hero-content" style={{ position: 'relative', zIndex: 2 }}>
        <span
          className="hero-eyebrow"
          style={{ animation: 'revealUp 0.6s cubic-bezier(0.2,0.7,0.2,1) both' }}
        >
          <span className="dot" />
          UC · Christchurch · Aotearoa
        </span>

        <h1
          ref={titleRef}
          style={{
            animation: 'revealUp 0.9s cubic-bezier(0.2,0.7,0.2,1) both',
            transition: 'transform 0.3s ease-out',
          }}
        >
          The future is
          <br />
          <span className="accent">built by students.</span>
        </h1>

        <div
          className="hero-c-prompt"
          style={{ animation: 'revealUp 0.9s 0.1s cubic-bezier(0.2,0.7,0.2,1) both' }}
        >
          <span className="hero-c-prompt-prefix">&gt;</span>
          <span className="hero-c-prompt-text">right now, a UC student is {phrase}</span>
          <span className="hero-c-cursor" />
        </div>

        <p
          className="hero-lede"
          style={{ animation: 'revealUp 0.9s 0.2s cubic-bezier(0.2,0.7,0.2,1) both' }}
        >
          A community of 412 University of Canterbury students learning, building, and shipping with
          AI — together. Workshops, panels, tutorials, and the biggest student hackathon in the
          South Island.
        </p>

        <div
          className="hero-cta-row"
          style={{ animation: 'revealUp 0.9s 0.35s cubic-bezier(0.2,0.7,0.2,1) both' }}
        >
          <MagneticButton href="#join" className="btn btn-primary">
            Join the club &nbsp;→
          </MagneticButton>
          <MagneticButton href="/events" className="btn btn-ghost">
            See upcoming events
          </MagneticButton>
        </div>

        <div
          className="hero-meta"
          style={{ animation: 'revealUp 0.9s 0.5s cubic-bezier(0.2,0.7,0.2,1) both' }}
        >
          <div className="hero-meta-item">
            <span className="lab">EST.</span>
            <span className="val">2024</span>
          </div>
          <div className="hero-meta-item">
            <span className="lab">MEMBERS</span>
            <span className="val">412</span>
          </div>
          <div className="hero-meta-item">
            <span className="lab">EVENTS</span>
            <span className="val">24/yr</span>
          </div>
          <div className="hero-meta-item">
            <span className="lab">FREE</span>
            <span className="val">always</span>
          </div>
        </div>
      </div>
    </section>
  )
}
