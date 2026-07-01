import Link from 'next/link'

const GITHUB = 'https://github.com/zaviert115/UCAI-'

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

const partners = [
  'UC Computer Science',
  'UC Engineering',
  'UC AI Research',
  'Student Volunteer Army',
  'Christchurch Tech',
  'UCSA',
]

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        background: '#06060e',
        borderTop: '1px solid rgba(255,255,255,0.09)',
        padding: 'clamp(56px,8vh,90px) clamp(22px,6vw,120px) 40px',
      }}
    >
      <div className="wrap">
        {/* partners */}
        <div className="eyebrow" style={{ color: 'rgba(242,239,230,0.4)', marginBottom: 20 }}>
          Partners &amp; Community
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
            gap: 1,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: 56,
          }}
        >
          {partners.map((p) => (
            <div
              key={p}
              style={{
                background: '#06060e',
                padding: '22px 18px',
                fontSize: 13,
                color: 'rgba(242,239,230,0.7)',
              }}
            >
              {p}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
            gap: 40,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span
                className="mono"
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 34,
                  height: 34,
                  border: '1.5px solid rgba(255,255,255,0.65)',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#F2EFE6',
                  background: 'linear-gradient(135deg,rgba(0,224,204,0.5),rgba(43,83,255,0.55))',
                }}
              >
                AI
              </span>
              <span style={{ fontWeight: 700, fontSize: 17, color: '#F2EFE6' }}>UC·AI</span>
            </div>
            <p
              style={{
                color: 'rgba(242,239,230,0.6)',
                fontSize: 14,
                lineHeight: 1.6,
                maxWidth: 320,
                margin: 0,
              }}
            >
              A student-led club at the University of Canterbury — making AI accessible, ethical and
              useful for every student.
            </p>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 18,
                padding: '8px 13px',
                border: '1.5px solid rgba(255,255,255,0.22)',
                fontSize: 12,
                color: '#F2EFE6',
              }}
            >
              <GithubIcon size={14} /> GitHub
            </a>
          </div>

          <FootCol title="Explore">
            <Link href="/events">Events</Link>
            <Link href="/tutorials">Tutorials</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/about">About</Link>
          </FootCol>

          <FootCol title="Community">
            <a
              href="https://www.facebook.com/profile.php?id=61582126750231"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a href="https://instagram.com/ucai.soc" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="#">LinkedIn</a>
            <a href="#">Discord</a>
          </FootCol>

          <FootCol title="Contact">
            <a href="mailto:ucaisoc@outlook.com">ucaisoc@outlook.com</a>
            <a href="#">StudentLink sign-up</a>
            <Link href="/contact">Contact form</Link>
          </FootCol>
        </div>

        <div
          className="mono"
          style={{
            marginTop: 56,
            paddingTop: 22,
            borderTop: '1px solid rgba(255,255,255,0.09)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 12,
            fontSize: 11,
            letterSpacing: '0.06em',
            color: 'rgba(242,239,230,0.45)',
          }}
        >
          <span>© {new Date().getFullYear()} UC AI Society · University of Canterbury</span>
          <span>Ōtautahi Christchurch, Aotearoa New Zealand</span>
        </div>
      </div>
    </footer>
  )
}

function FootCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
      <h4 className="eyebrow" style={{ color: 'rgba(242,239,230,0.5)', margin: '0 0 6px' }}>
        {title}
      </h4>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 11,
          fontSize: 14,
          color: 'rgba(242,239,230,0.7)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
