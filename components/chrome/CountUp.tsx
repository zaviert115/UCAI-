'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Counts a numeric string (e.g. "412") up from zero the first time it scrolls
 * into view, preserving any non-numeric prefix/suffix. Jumps straight to the
 * value under reduced motion. Renders an inline span so callers keep their own
 * type styling.
 */
export default function CountUp({
  value,
  className,
  style,
}: {
  value: string
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const m = value.match(/^(\D*)([\d,]+)(.*)$/)
  const prefix = m ? m[1] : ''
  const digits = m ? m[2] : ''
  const suffix = m ? m[3] : ''
  const target = digits ? parseInt(digits.replace(/,/g, ''), 10) : 0
  const grouped = digits.includes(',')
  const fmt = (n: number) => (grouped ? n.toLocaleString('en-US') : String(n))

  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let started = false
    const dur = 1100

    const run = () => {
      if (reduced) {
        setN(target)
        return
      }
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur)
        const eased = 1 - Math.pow(1 - p, 3)
        setN(Math.round(target * eased))
        if (p < 1) raf = requestAnimationFrame(tick)
        else setN(target)
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
      { threshold: 0.4 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [target])

  if (!m) {
    return (
      <span className={className} style={style}>
        {value}
      </span>
    )
  }
  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {fmt(n)}
      {suffix}
    </span>
  )
}
