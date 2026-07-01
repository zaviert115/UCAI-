import type { ReactNode } from 'react'

/** Teal→blue→purple gradient text; `sheen` animates the gradient sweep. */
export default function GradientText({
  children,
  sheen = false,
  className = '',
}: {
  children: ReactNode
  sheen?: boolean
  className?: string
}) {
  return <span className={`grad-text ${sheen ? 'sheen' : ''} ${className}`.trim()}>{children}</span>
}
