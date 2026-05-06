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

const ArrowIcon = () => (
  <svg
    className="proj-arrow"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M7 17L17 7M17 7H8M17 7v9" />
  </svg>
)

export default function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="wrap">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <span className="section-eyebrow">Member projects</span>
            <h2 className="section-title">Built by students at UC.</h2>
            <p className="section-sub">
              A taste of what comes out of our workshops and hackathons. Want yours featured? Submit
              it on Discord.
            </p>
          </div>
          <a
            href="/projects"
            className="btn btn-ghost"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            All projects →
          </a>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div className="proj" key={p.title}>
              <ArrowIcon />
              <div>
                <span className="proj-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
              <div className="proj-vis" aria-hidden="true">
                {i === 0 && (
                  <svg width="100%" height="80" viewBox="0 0 300 80">
                    {[...Array(40)].map((_, j) => (
                      <rect
                        key={j}
                        x={j * 7 + 4}
                        y={40 - Math.abs(Math.sin(j * 0.4)) * 30}
                        width="3"
                        height={Math.abs(Math.sin(j * 0.4)) * 60 + 5}
                        fill="oklch(0.82 0.139 200)"
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
                      stroke="oklch(0.82 0.139 200)"
                      strokeWidth="2"
                    />
                    {[10, 80, 150, 190].map((x, k) => (
                      <circle
                        key={k}
                        cx={x}
                        cy={[50, 30, 20, 40][k]}
                        r="4"
                        fill="oklch(0.82 0.139 200)"
                      />
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
                          background: v ? 'oklch(0.82 0.139 200)' : 'rgba(255,255,255,0.08)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="proj-stack">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
