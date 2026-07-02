'use client'

import { useEffect } from 'react'

/**
 * Global 3D tilt + cursor-following sheen for `.card-dark` / `.card-paper`.
 * Uses one delegated mousemove listener (via closest()) so it covers cards on
 * every route and survives the Events filter re-rendering its grid. The sheen
 * itself is a CSS ::after driven by the --mx/--my/--sheen custom properties set
 * here. Disabled on touch + reduced motion.
 */
const SELECTOR = '.card-dark, .card-paper'

export default function CardTilt() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    let current: HTMLElement | null = null

    const reset = (el: HTMLElement) => {
      el.style.transform = ''
      el.style.setProperty('--sheen', '0')
    }

    const onMove = (e: MouseEvent) => {
      const target = e.target as Element | null
      const card = target?.closest<HTMLElement>(SELECTOR) ?? null
      if (card !== current) {
        if (current) reset(current)
        current = card
      }
      if (!card) return
      const r = card.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width
      const ny = (e.clientY - r.top) / r.height
      card.style.transform = `perspective(900px) rotateY(${((nx - 0.5) * 6).toFixed(2)}deg) rotateX(${((0.5 - ny) * 6).toFixed(2)}deg) translateZ(0)`
      card.style.setProperty('--mx', `${(nx * 100).toFixed(1)}%`)
      card.style.setProperty('--my', `${(ny * 100).toFixed(1)}%`)
      card.style.setProperty('--sheen', '1')
    }

    const onLeave = () => {
      if (current) {
        reset(current)
        current = null
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('blur', onLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('blur', onLeave)
      if (current) reset(current)
    }
  }, [])

  return null
}
