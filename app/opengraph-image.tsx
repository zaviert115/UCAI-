import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'UC AI Society'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#070710',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
        <div
          style={{
            width: '10px',
            height: '64px',
            background: 'linear-gradient(180deg, #00E0CC, #2B53FF, #7A2BFF)',
            borderRadius: '5px',
          }}
        />
        <span
          style={{
            color: '#00E0CC',
            fontSize: '32px',
            fontWeight: 700,
            letterSpacing: '6px',
          }}
        >
          UC·AI
        </span>
      </div>
      <div
        style={{
          color: '#F2EFE6',
          fontSize: '76px',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-2px',
          maxWidth: '900px',
        }}
      >
        UC AI Society
      </div>
      <div
        style={{
          width: '180px',
          height: '8px',
          marginTop: '32px',
          borderRadius: '4px',
          background: 'linear-gradient(100deg, #00E0CC, #2B53FF, #7A2BFF)',
        }}
      />
      <div
        style={{
          color: 'rgba(242,239,230,0.6)',
          fontSize: '28px',
          marginTop: '28px',
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
