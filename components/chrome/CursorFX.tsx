'use client'

import { useEffect } from 'react'

/**
 * Two pointer effects, disabled on touch + reduced motion:
 *  - a soft radial "spotlight" that trails the cursor, sitting behind page
 *    content (z-0) so it only glows through the dark, canvas-backed sections.
 *  - magnetic `.btn` CTAs that lean toward the cursor when it's near.
 * One rAF loop drives both; buttons are re-scanned periodically so it keeps
 * working across client navigations.
 */
export default function CursorFX() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const spot = document.createElement('div')
    spot.setAttribute('aria-hidden', 'true')
    Object.assign(spot.style, {
      position: 'fixed',
      left: '0',
      top: '0',
      width: '540px',
      height: '540px',
      margin: '-270px 0 0 -270px',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '0',
      opacity: '0',
      transition: 'opacity 0.5s ease',
      mixBlendMode: 'screen',
      background:
        'radial-gradient(circle, rgba(0,224,204,0.06), rgba(43,83,255,0.035) 42%, transparent 66%)',
      willChange: 'transform',
    } as CSSStyleDeclaration)
    document.body.appendChild(spot)

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let sx = mx
    let sy = my
    let shown = false

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!shown) {
        shown = true
        spot.style.opacity = '1'
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let btns: HTMLElement[] = []
    let lastScan = 0
    const R = 76
    const STR = 0.3
    let raf = 0

    const loop = (t: number) => {
      sx += (mx - sx) * 0.16
      sy += (my - sy) * 0.16
      spot.style.transform = `translate(${sx}px,${sy}px)`

      if (t - lastScan > 400) {
        btns = Array.from(document.querySelectorAll<HTMLElement>('.btn'))
        lastScan = t
      }
      for (const b of btns) {
        const r = b.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = mx - cx
        const dy = my - cy
        const reach = Math.max(r.width, r.height) / 2 + R
        if (dx * dx + dy * dy < reach * reach) {
          b.style.transform = `translate(${(dx * STR).toFixed(1)}px,${(dy * STR).toFixed(1)}px)`
        } else if (b.style.transform) {
          b.style.transform = ''
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      spot.remove()
      btns.forEach((b) => (b.style.transform = ''))
    }
  }, [])

  return null
}
