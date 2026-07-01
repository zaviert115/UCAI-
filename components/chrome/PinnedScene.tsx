'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface Card {
  code: string
  name: string
  sub?: string
}

interface PinnedSceneProps {
  index?: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  cards: Card[]
  dataShape?: string
}

/**
 * Sticky "staircase" scene replacing the mockup's Chrome-only
 * `view-timeline-name:--disc`. A tall section pins a centered panel; cards
 * scale/fade in as a function of scroll progress through the section.
 */
export default function PinnedScene({
  index,
  eyebrow,
  title,
  intro,
  cards,
  dataShape,
}: PinnedSceneProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = section.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const scrolled = Math.min(Math.max(-r.top, 0), total)
      const progress = total > 0 ? scrolled / total : 1
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const start = (i / cards.length) * 0.55
        const end = start + 0.32
        const p = Math.min(Math.max((progress - start) / (end - start), 0), 1)
        el.style.opacity = String(p)
        el.style.transform = `translateY(${(1 - p) * 46}px) scale(${0.94 + p * 0.06})`
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [cards.length])

  return (
    <section
      ref={sectionRef}
      data-shape={dataShape}
      style={{ position: 'relative', height: '240vh' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px clamp(22px,6vw,120px)',
          overflow: 'hidden',
        }}
      >
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            {index && (
              <span className="eyebrow" style={{ color: '#00E0CC' }}>
                [ {index} ]
              </span>
            )}
            <span className="eyebrow" style={{ color: 'rgba(242,239,230,0.55)' }}>
              {eyebrow}
            </span>
          </div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 'clamp(30px,5.4vw,86px)',
              lineHeight: 0.96,
              letterSpacing: '-0.03em',
              color: '#F2EFE6',
              margin: '0 0 24px',
            }}
          >
            {title}
          </h2>
          {intro && (
            <p
              style={{
                maxWidth: 560,
                fontSize: 'clamp(15px,1.7vw,19px)',
                lineHeight: 1.6,
                color: 'rgba(242,239,230,0.72)',
                margin: '0 0 40px',
              }}
            >
              {intro}
            </p>
          )}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
              gap: 14,
            }}
          >
            {cards.map((c, i) => (
              <div
                key={c.code}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="card-glass"
                style={{
                  padding: '22px 20px',
                  minHeight: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  opacity: 0,
                }}
              >
                <span className="mono grad-text" style={{ fontWeight: 700, fontSize: 24 }}>
                  {c.code}
                </span>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#F2EFE6' }}>{c.name}</span>
                {c.sub && (
                  <span style={{ fontSize: 13, lineHeight: 1.45, color: 'rgba(242,239,230,0.6)' }}>
                    {c.sub}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
