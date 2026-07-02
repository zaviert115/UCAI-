'use client'

import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#·:0101010'

/**
 * Resolves `text` from random glyphs into the final string, left-to-right,
 * the first time it scrolls into view. Reads as a "decoding" / computational
 * effect — on-brand for an AI club. Static under reduced motion.
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
    let started = false
    const chars = [...text]
    const stagger = 34
    const settle = 360
    const last = (chars.length - 1) * stagger + settle

    const run = () => {
      const t0 = performance.now()
      const tick = (t: number) => {
        const e = t - t0
        let out = ''
        for (let i = 0; i < chars.length; i++) {
          const ch = chars[i]
          if (ch === ' ') {
            out += ' '
            continue
          }
          if (e >= i * stagger + settle) out += ch
          else out += GLYPHS[(Math.random() * GLYPHS.length) | 0]
        }
        setDisplay(out)
        if (e < last) raf = requestAnimationFrame(tick)
        else setDisplay(text)
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
    }
  }, [text])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}
