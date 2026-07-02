import PaperSection from '@/components/layout/PaperSection'
import Reveal from '@/components/chrome/Reveal'
import CountUp from '@/components/chrome/CountUp'

const stats = [
  { num: '412', label: 'Members', sub: 'and growing' },
  { num: '24', label: 'Events / year', sub: 'workshops, panels, socials' },
  { num: '38', label: 'Tutorials', sub: 'written by members' },
  { num: '6', label: 'Industry partners', sub: 'and counting' },
]

export default function StatsSection() {
  return (
    <PaperSection>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 46 }}>
        <span className="eyebrow" style={{ color: '#2B53FF' }}>
          [ 05 ]
        </span>
        <span className="eyebrow" style={{ color: 'rgba(11,11,15,0.55)' }}>
          By the numbers
        </span>
        <span style={{ flex: 1, height: 1, background: 'rgba(11,11,15,0.18)' }} />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
          gap: 30,
        }}
      >
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 'clamp(48px,7vw,84px)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(120deg,#2B53FF,#7A2BFF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              <CountUp value={s.num} />
            </div>
            <div
              className="mono"
              style={{ fontSize: 13, marginTop: 10, color: '#0B0B0F', fontWeight: 700 }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: 14, marginTop: 4, color: 'rgba(11,11,15,0.6)' }}>{s.sub}</div>
          </Reveal>
        ))}
      </div>
    </PaperSection>
  )
}
