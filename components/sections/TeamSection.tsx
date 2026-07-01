import PaperSection from '@/components/layout/PaperSection'
import SectionHeader from '@/components/layout/SectionHeader'
import Reveal from '@/components/chrome/Reveal'

const team = [
  {
    name: 'Ryder Earp-Jones',
    role: 'President',
    major: '',
    working: 'Leading the club and keeping things moving',
  },
  {
    name: 'Owen Leary',
    role: 'Vice President',
    major: '',
    working: 'Supporting club operations and member experience',
  },
  {
    name: 'Zavier Taylor',
    role: 'Head of Technology',
    major: '',
    working: 'Building and maintaining the club tech stack',
  },
]

const placeholders = 3

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
}

export default function TeamSection() {
  return (
    <PaperSection id="team" dataShape="koru">
      <SectionHeader
        index="06"
        eyebrow="The committee"
        title="Run by students."
        sub="Volunteer-run by UC students who care. Email anyone directly — we read everything."
        tone="paper"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 22,
          marginTop: 48,
        }}
      >
        {team.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <div
              className="card-paper"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                padding: 28,
              }}
            >
              <div
                className="mono"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  color: '#06060e',
                  background: 'linear-gradient(100deg,#00E0CC,#2B53FF,#7A2BFF)',
                }}
              >
                {initials(p.name)}
              </div>
              <div>
                <span
                  className="eyebrow"
                  style={{ fontSize: 10, color: '#2B53FF', display: 'block', marginBottom: 12 }}
                >
                  {p.role}
                </span>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: '-0.02em',
                    color: '#0B0B0F',
                    margin: 0,
                  }}
                >
                  {p.name}
                </h3>
                {p.major && (
                  <p style={{ fontSize: 14, color: 'rgba(11,11,15,0.55)', margin: '6px 0 0' }}>
                    {p.major}
                  </p>
                )}
              </div>
              <p
                style={{
                  marginTop: 'auto',
                  paddingTop: 16,
                  borderTop: '1px solid rgba(11,11,15,0.14)',
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: 'rgba(11,11,15,0.72)',
                }}
              >
                <span className="mono" style={{ fontSize: 11, color: 'rgba(11,11,15,0.5)' }}>
                  Working on:
                </span>{' '}
                {p.working}
              </p>
            </div>
          </Reveal>
        ))}

        {Array.from({ length: placeholders }).map((_, i) => (
          <Reveal key={`placeholder-${i}`} delay={(team.length + i) * 0.08}>
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                padding: 28,
                border: '1px dashed rgba(11,11,15,0.16)',
                background: 'transparent',
              }}
            >
              <div
                className="mono"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'rgba(11,11,15,0.32)',
                  background: 'rgba(11,11,15,0.05)',
                }}
              >
                ?
              </div>
              <div>
                <span
                  className="eyebrow"
                  style={{
                    fontSize: 10,
                    color: 'rgba(11,11,15,0.4)',
                    display: 'block',
                    marginBottom: 12,
                  }}
                >
                  Role TBD
                </span>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: '-0.02em',
                    color: 'rgba(11,11,15,0.4)',
                    margin: 0,
                  }}
                >
                  Your name here
                </h3>
              </div>
              <p
                style={{
                  marginTop: 'auto',
                  paddingTop: 16,
                  borderTop: '1px dashed rgba(11,11,15,0.16)',
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: 'rgba(11,11,15,0.45)',
                }}
              >
                Interested in joining the committee? Get in touch.
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </PaperSection>
  )
}
