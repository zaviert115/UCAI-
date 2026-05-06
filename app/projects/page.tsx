import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Member projects from UC AI Society — built at workshops, hackathons, and in spare time.',
}

const projects = [
  {
    tag: 'NLP · 2025 Hackathon Winner',
    title: 'Kōrero',
    desc: 'Real-time AI transcription and translation tool for te reo Māori, built in 48 hours at the UC Hackathon.',
    stack: ['Whisper', 'Next.js', 'Python', 'FastAPI'],
  },
  {
    tag: 'EdTech · Workshop Project',
    title: 'StudyBuddy',
    desc: 'A RAG-powered study assistant that answers questions about your own lecture slides.',
    stack: ['LangChain', 'Pinecone', 'React'],
  },
  {
    tag: 'Computer Vision · Side Project',
    title: 'Bin Sense',
    desc: 'Uses a phone camera to classify waste into the right recycling bin. 94% accuracy on the UC campus bins.',
    stack: ['YOLOv8', 'Flutter', 'TensorFlow'],
  },
]

export default function ProjectsPage() {
  return (
    <>
      <section className="hero hero-c" style={{ minHeight: 'auto' }}>
        <div className="hero-c-noise" />
        <div className="hero-c-canvas" style={{ opacity: 0.5 }} aria-hidden="true">
          <div className="glow-blob b1" style={{ animationDuration: '30s' }} />
          <div className="glow-blob b2" style={{ animationDuration: '40s' }} />
        </div>
        <div
          className="wrap hero-content"
          style={{ paddingTop: 80, paddingBottom: 80, position: 'relative', zIndex: 2 }}
        >
          <span className="hero-eyebrow" style={{ color: 'var(--cyan)', justifyContent: 'center' }}>
            <span className="dot" />
            UC AI Society
          </span>
          <h1 style={{ fontSize: 'clamp(40px,6vw,72px)', marginBottom: 16 }}>Member Projects</h1>
          <p className="hero-lede" style={{ margin: '0 auto', textAlign: 'center' }}>
            Built by students at UC — at workshops, hackathons, and in spare time.
          </p>
        </div>
      </section>

      <section className="projects-section" style={{ padding: '100px 0' }}>
        <div className="wrap">
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
            <div>
              <span className="section-eyebrow" style={{ color: 'var(--cyan)' }}>
                Member projects
              </span>
              <h2 className="section-title" style={{ color: 'white' }}>
                Built by students at UC.
              </h2>
              <p className="section-sub" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Want yours featured? Submit it on Discord.
              </p>
            </div>
          </div>
          <div className="projects-grid">
            {projects.map((p) => (
              <div className="proj" key={p.title}>
                <div>
                  <span className="proj-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
                <div className="proj-stack">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 14,
                marginBottom: 16,
                fontFamily: 'var(--font-jetbrains-mono), monospace',
              }}
            >
              More projects coming soon — we&apos;re just getting started.
            </p>
            <Link
              href="/contact"
              className="btn btn-ghost"
              style={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              Submit your project →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
