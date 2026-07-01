import type { ReactNode } from 'react'

interface SectionHeaderProps {
  index?: string // e.g. "01"
  eyebrow: string
  title: ReactNode
  sub?: ReactNode
  tone?: 'paper' | 'dark'
  align?: 'left' | 'center'
}

/** Mono eyebrow (with optional [ NN ] index) + Space-Grotesk title. */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  sub,
  tone = 'dark',
  align = 'left',
}: SectionHeaderProps) {
  const ink = tone === 'paper'
  const idxColor = ink ? '#2B53FF' : '#00E0CC'
  const eyebrowColor = ink ? 'rgba(11,11,15,0.55)' : 'rgba(242,239,230,0.55)'
  const titleColor = ink ? '#0B0B0F' : '#F2EFE6'
  const subColor = ink ? 'rgba(11,11,15,0.7)' : 'rgba(242,239,230,0.72)'

  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          gap: 14,
          marginBottom: 22,
        }}
      >
        {index && (
          <span className="eyebrow" style={{ color: idxColor }}>
            [ {index} ]
          </span>
        )}
        <span className="eyebrow" style={{ color: eyebrowColor }}>
          {eyebrow}
        </span>
      </div>
      <h2
        style={{
          fontWeight: 700,
          fontSize: 'clamp(30px,5vw,72px)',
          lineHeight: 0.98,
          letterSpacing: '-0.03em',
          color: titleColor,
          margin: 0,
          maxWidth: '20ch',
          ...(align === 'center' ? { marginInline: 'auto' } : {}),
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            marginTop: 22,
            maxWidth: 620,
            fontSize: 'clamp(15px,1.7vw,19px)',
            lineHeight: 1.6,
            color: subColor,
            ...(align === 'center' ? { marginInline: 'auto' } : {}),
          }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}
