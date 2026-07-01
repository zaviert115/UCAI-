import DarkSection from '@/components/layout/DarkSection'
import SectionHeader from '@/components/layout/SectionHeader'
import Reveal from '@/components/chrome/Reveal'
import { projects } from '@/lib/projects'

const ArrowIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ color: '#22D3EE', flexShrink: 0 }}
  >
    <path d="M7 17L17 7M17 7H8M17 7v9" />
  </svg>
)

export default function ProjectsSection() {
  return (
    <DarkSection id="projects" dataShape="koru">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 48,
        }}
      >
        <SectionHeader
          index="03"
          eyebrow="Member projects"
          title="Built by students at UC."
          sub="A taste of what comes out of our workshops and hackathons. Want yours featured? Submit it on Discord."
          tone="dark"
        />
        <a href="/projects" className="btn btn--outline">
          All projects →
        </a>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 22,
        }}
      >
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div
              className="card-dark"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                padding: 28,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <span
                    className="eyebrow"
                    style={{ fontSize: 10, color: '#00E0CC', display: 'block', marginBottom: 14 }}
                  >
                    {p.tag}
                  </span>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: 24,
                      letterSpacing: '-0.02em',
                      color: '#F2EFE6',
                      margin: '0 0 10px',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: 'rgba(242,239,230,0.7)',
                      margin: 0,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
                <ArrowIcon />
              </div>

              <div aria-hidden="true" style={{ marginTop: 'auto' }}>
                {i === 0 && (
                  <svg width="100%" height="80" viewBox="0 0 300 80">
                    {[...Array(40)].map((_, j) => (
                      <rect
                        key={j}
                        x={j * 7 + 4}
                        y={40 - Math.abs(Math.sin(j * 0.4)) * 30}
                        width="3"
                        height={Math.abs(Math.sin(j * 0.4)) * 60 + 5}
                        fill="#22D3EE"
                        opacity={0.3 + (j % 5) * 0.15}
                      />
                    ))}
                  </svg>
                )}
                {i === 1 && (
                  <svg width="100%" height="60" viewBox="0 0 200 60">
                    <path
                      d="M10,50 Q40,10 80,30 T150,20 T190,40"
                      fill="none"
                      stroke="#22D3EE"
                      strokeWidth="2"
                    />
                    {[10, 80, 150, 190].map((x, k) => (
                      <circle key={k} cx={x} cy={[50, 30, 20, 40][k]} r="4" fill="#22D3EE" />
                    ))}
                  </svg>
                )}
                {i === 2 && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[1, 1, 0, 1, 1, 0, 1].map((v, k) => (
                      <div
                        key={k}
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 5,
                          background: v ? '#22D3EE' : 'rgba(255,255,255,0.08)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="mono"
                    style={{
                      fontSize: 11,
                      padding: '4px 10px',
                      border: '1px solid rgba(255,255,255,0.16)',
                      color: 'rgba(242,239,230,0.7)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </DarkSection>
  )
}
