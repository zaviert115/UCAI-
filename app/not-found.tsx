import type { Metadata } from 'next'
import Link from 'next/link'
import GradientText from '@/components/ui/GradientText'

export const metadata: Metadata = {
  title: '404 — Page not found',
}

export default function NotFound() {
  return (
    <section
      className="dark-sec"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingBlock: 'clamp(120px,20vh,220px)',
        paddingInline: 24,
      }}
    >
      <span className="mono eyebrow" style={{ color: '#00E0CC', marginBottom: 8 }}>
        PAGE NOT FOUND
      </span>
      <h1
        style={{
          fontWeight: 700,
          fontSize: 'clamp(96px,24vw,300px)',
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
          margin: '8px 0 20px',
        }}
      >
        <GradientText sheen>404</GradientText>
      </h1>
      <p
        style={{
          maxWidth: 460,
          fontSize: 'clamp(16px,1.9vw,20px)',
          lineHeight: 1.6,
          color: 'rgba(242,239,230,0.72)',
          marginBottom: 36,
        }}
      >
        This page doesn&apos;t exist — or it may have moved. Try heading back home.
      </p>
      <Link href="/" className="btn btn--cream">
        Back to home
      </Link>
    </section>
  )
}
