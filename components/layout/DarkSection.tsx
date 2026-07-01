import type { ReactNode } from 'react'

interface DarkSectionProps {
  children: ReactNode
  id?: string
  dataShape?: string
  className?: string
  /** when true, no horizontal/vertical section padding (e.g. full-bleed hero) */
  bare?: boolean
}

/**
 * Transparent dark section — lets the global NeuralBackground show through.
 * Wraps content in the standard container.
 */
export default function DarkSection({
  children,
  id,
  dataShape,
  className = '',
  bare = false,
}: DarkSectionProps) {
  return (
    <section
      id={id}
      data-shape={dataShape}
      className={`dark-sec ${bare ? '' : 'section-pad'} ${className}`.trim()}
    >
      <div className="wrap">{children}</div>
    </section>
  )
}
