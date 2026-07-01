'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** rise (default), big (riseBig), or fade */
  variant?: 'default' | 'big' | 'fade'
  /** animation-delay in seconds */
  delay?: number
  /** viewport-bottom margin before triggering */
  rootMargin?: string
  style?: React.CSSProperties
}

/**
 * Cross-browser replacement for the mockup's `animation-timeline:view()`:
 * adds `.is-in` when the element scrolls into view, which fires the CSS
 * rise/riseBig/fadeIn keyframes (see globals.css). One observer per node;
 * disconnects after firing. Reduced-motion is handled in CSS.
 */
export default function Reveal({
  children,
  as,
  className = '',
  variant = 'default',
  delay = 0,
  rootMargin = '0px 0px -12% 0px',
  style,
}: RevealProps) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown, rootMargin])

  const variantClass = variant === 'big' ? 'big' : variant === 'fade' ? 'fade' : ''

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${shown ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? { ...style, animationDelay: `${delay}s` } : style}
    >
      {children}
    </Tag>
  )
}
