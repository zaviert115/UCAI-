'use client'

import { useEffect, useRef, useState } from 'react'

const GLYPHS = '01<>-_/[]=+·:'

/** Characters ahead of the wipe edge sit calm as this instead of flickering. */
const REST = '·'

/** How many characters around the wipe edge are allowed to flicker. */
const EDGE = 4

/**
 * Resolves `text` into place left-to-right the first time it scrolls into view.
 * Only a short window at the wipe edge flickers — everything ahead of it rests
 * as a static dot, so the heading reads as a clean sweep rather than a screen
 * of noise. Static under reduced motion.
 */
export default function ScrambleText({
  text,
  className,
  style,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let fallback = 0
    let started = false
    const chars = [...text]
    const stagger = 18
    const settle = 150
    const last = (chars.length - 1) * stagger + settle

    const run = () => {
      const t0 = performance.now()
      // rAF stalls in background/throttled tabs; without this the heading can be
      // left stranded mid-wipe as unreadable placeholder glyphs.
      fallback = window.setTimeout(() => {
        cancelAnimationFrame(raf)
        setDisplay(text)
      }, last + 400)
      const tick = (t: number) => {
        const e = t - t0
        let out = ''
        for (let i = 0; i < chars.length; i++) {
          const ch = chars[i]
          if (ch === ' ') {
            out += ' '
            continue
          }
          const done = i * stagger + settle
          if (e >= done) out += ch
          else if (e >= done - EDGE * stagger) out += GLYPHS[(Math.random() * GLYPHS.length) | 0]
          else out += REST
        }
        setDisplay(out)
        if (e < last) raf = requestAnimationFrame(tick)
        else {
          clearTimeout(fallback)
          setDisplay(text)
        }
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting && !started) {
            started = true
            run()
            io.disconnect()
          }
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
      if (fallback) clearTimeout(fallback)
    }
  }, [text])

  return (
    <span ref={ref} className={className} style={style} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}
