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
    <section className="team-section">
      <div className="wrap">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 0,
          }}
        >
          <div>
            <span className="section-eyebrow">The committee</span>
            <h2 className="section-title">Six students. One mission.</h2>
            <p className="section-sub">
              Volunteer-run by UC students who care. Email anyone directly — we read everything.
            </p>
          </div>
        </div>
        <div className="team-grid">
          {team.map((p) => (
            <div className="team-card" key={p.name}>
              <div className="team-avatar">{initials(p.name)}</div>
              <div className="team-role">{p.role}</div>
              <h3 className="team-name">{p.name}</h3>
              {p.major && <p className="team-major">{p.major}</p>}
              <p className="team-working">
                <span style={{ color: 'var(--brand-muted)' }}>Working on:</span> {p.working}
              </p>
            </div>
          ))}
          {Array.from({ length: placeholders }).map((_, i) => (
            <div
              className="team-card"
              key={`placeholder-${i}`}
              style={{ opacity: 0.5, border: '1px dashed var(--brand-border)' }}
            >
              <div
                className="team-avatar"
                style={{ background: 'var(--navy-100)', color: 'var(--navy-400)' }}
              >
                ?
              </div>
              <div className="team-role" style={{ color: 'var(--brand-muted)' }}>
                Role TBD
              </div>
              <h3 className="team-name" style={{ color: 'var(--brand-muted)' }}>
                Your name here
              </h3>
              <p
                className="team-working"
                style={{ color: 'var(--brand-muted)', borderTopColor: 'var(--brand-border)' }}
              >
                Interested in joining the committee? Get in touch.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
