import Link from 'next/link'
import Ticker from '@/components/chrome/Ticker'

const META = [
  { lab: 'EST.', val: '2024' },
  { lab: 'MEMBERS', val: '412' },
  { lab: 'EVENTS', val: '24/yr' },
  { lab: 'FREE', val: 'always' },
]

const TICKER = [
  'Workshops',
  'Panels',
  'Tutorials',
  'Hackathon',
  'Prompt engineering',
  'Open to all',
  'Ōtautahi',
  'Aotearoa',
]

function HeroLine({
  children,
  delay,
  gradient,
}: {
  children: string
  delay: number
  gradient?: boolean
}) {
  return (
    <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
      <span
        className={gradient ? 'grad-text sheen' : undefined}
        style={{
          display: 'block',
          animation: `heroLine 1s cubic-bezier(.16,1,.3,1) both`,
          animationDelay: `${delay}s`,
        }}
      >
        {children}
      </span>
    </span>
  )
}

export default function Hero() {
  return (
    <section
      data-shape="brain"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '130px clamp(22px,6vw,120px) 70px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          animation: 'loadIn .8s both',
          animationDelay: '.05s',
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: '#00E0CC',
            boxShadow: '0 0 14px #00E0CC',
            animation: 'blink 2.4s infinite',
          }}
        />
        <span
          className="eyebrow"
          style={{
            fontSize: 'clamp(10px,1.4vw,13px)',
            letterSpacing: '0.24em',
            color: 'rgba(242,239,230,0.72)',
          }}
        >
          University of Canterbury · Ōtautahi, Aotearoa
        </span>
      </div>

      <h1
        style={{
          fontWeight: 700,
          fontSize: 'clamp(44px,9.4vw,168px)',
          lineHeight: 0.9,
          letterSpacing: '-0.035em',
          margin: '20px 0 0',
          color: '#F2EFE6',
        }}
      >
        <HeroLine delay={0.12}>The future is</HeroLine>
        <HeroLine delay={0.22} gradient>
          built by
        </HeroLine>
        <HeroLine delay={0.32}>students.</HeroLine>
      </h1>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 34,
          alignItems: 'flex-end',
          marginTop: 44,
        }}
      >
        <p
          style={{
            maxWidth: 540,
            fontSize: 'clamp(15px,1.7vw,19px)',
            lineHeight: 1.55,
            color: 'rgba(242,239,230,0.74)',
            margin: 0,
            animation: 'loadIn .9s both',
            animationDelay: '.5s',
          }}
        >
          A community of 412 University of Canterbury students learning, building, and shipping with
          AI — together. Workshops, panels, tutorials, and the biggest student hackathon in the
          South Island.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            animation: 'loadIn .9s both',
            animationDelay: '.62s',
          }}
        >
          <a href="#join" className="btn btn--cream">
            Join the club <span style={{ fontSize: 16 }}>→</span>
          </a>
          <Link href="/events" className="btn btn--outline">
            See upcoming events
          </Link>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 38,
          marginTop: 48,
          animation: 'loadIn .9s both',
          animationDelay: '.74s',
        }}
      >
        {META.map((m) => (
          <div key={m.lab} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="eyebrow" style={{ fontSize: 10, color: 'rgba(242,239,230,0.45)' }}>
              {m.lab}
            </span>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#F2EFE6' }}>{m.val}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 26,
          animation: 'fadeIn 1s both',
          animationDelay: '.8s',
        }}
      >
        <Ticker items={TICKER} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 96,
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          className="eyebrow"
          style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(242,239,230,0.4)' }}
        >
          SCROLL
        </span>
        <span className="scroll-cue" />
      </div>
    </section>
  )
}
