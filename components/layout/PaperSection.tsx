import type { ReactNode } from 'react'

interface PaperSectionProps {
  children: ReactNode
  id?: string
  dataShape?: string
  className?: string
}

/** Cream "paper" section (#F2EFE6 / ink) with an ink top border. */
export default function PaperSection({
  children,
  id,
  dataShape,
  className = '',
}: PaperSectionProps) {
  return (
    <section id={id} data-shape={dataShape} className={`paper section-pad ${className}`.trim()}>
      <div className="wrap">{children}</div>
    </section>
  )
}
