import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/chrome/Reveal'
import GradientText from '@/components/ui/GradientText'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Member projects from UC AI Society — built at workshops, hackathons, and in spare time.',
}

export default function ProjectsPage() {
  return (
    <>
      <section className="dark-sec" style={{ paddingBlock: 'clamp(110px,16vh,190px)' }}>
        <div className="wrap">
          <Reveal>
            <span className="mono eyebrow" style={{ color: '#00E0CC' }}>
              PROJECTS · UC·AI
            </span>
          </Reveal>
          <Reveal variant="big" delay={0.05}>
            <h1
              style={{
                fontWeight: 700,
                fontSize: 'clamp(44px,8vw,120px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#F2EFE6',
                margin: '20px 0 0',
              }}
            >
              Built by <GradientText sheen>students.</GradientText>
            </h1>
          </Reveal>
          <Reveal variant="fade" delay={0.12}>
            <p
              style={{
                marginTop: 26,
                maxWidth: 620,
                fontSize: 'clamp(16px,1.9vw,20px)',
                lineHeight: 1.6,
                color: 'rgba(242,239,230,0.72)',
              }}
            >
              Shipped at workshops, hackathons, and in spare time. Want yours featured? Submit it on
              Discord.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="dark-sec section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
              gap: 1,
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {projects.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.06}
                className="card-dark"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 28,
                  padding: 32,
                  minHeight: 280,
                }}
              >
                <div>
                  <span
                    className="mono"
                    style={{
                      fontSize: 12,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#00E0CC',
                    }}
                  >
                    {p.tag}
                  </span>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: 28,
                      letterSpacing: '-0.02em',
                      color: '#F2EFE6',
                      margin: '14px 0 10px',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(242,239,230,0.66)' }}>
                    {p.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.06em',
                        color: 'rgba(242,239,230,0.7)',
                        border: '1px solid rgba(255,255,255,0.16)',
                        padding: '4px 9px',
                        borderRadius: 999,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <p
              className="mono"
              style={{
                color: 'rgba(242,239,230,0.5)',
                fontSize: 13,
                marginBottom: 18,
              }}
            >
              More projects coming soon — we&apos;re just getting started.
            </p>
            <Link href="/contact" className="btn btn--outline">
              Submit your project →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
