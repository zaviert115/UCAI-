import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'UC AI Society'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#0F2A44',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div
          style={{
            width: '8px',
            height: '64px',
            background: '#22D3EE',
            borderRadius: '4px',
          }}
        />
        <span style={{ color: '#22D3EE', fontSize: '32px', fontWeight: 700, letterSpacing: '4px' }}>
          UC AI
        </span>
      </div>
      <div
        style={{
          color: '#ffffff',
          fontSize: '72px',
          fontWeight: 800,
          lineHeight: 1.1,
          maxWidth: '900px',
        }}
      >
        UC AI Society
      </div>
      <div
        style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '28px',
          marginTop: '24px',
          maxWidth: '760px',
          lineHeight: 1.4,
        }}
      >
        University of Canterbury · Christchurch, NZ
      </div>
    </div>,
    size
  )
}
