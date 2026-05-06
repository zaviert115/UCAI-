const pillars = [
  {
    tag: '01 / WORKSHOPS',
    title: 'Workshops',
    desc: 'Hands-on sessions covering AI tools, prompt engineering, and building with APIs. Bring a laptop, leave with something deployed.',
  },
  {
    tag: '02 / PANELS',
    title: 'Panel discussions',
    desc: 'Industry guests share how AI is changing their work and what skills matter most for new grads.',
  },
  {
    tag: '03 / NETWORK',
    title: 'Networking',
    desc: 'Connect with students and professionals who are passionate about AI. Casual socials every fortnight.',
  },
  {
    tag: '04 / TUTORIALS',
    title: 'Tutorials',
    desc: 'Structured guides written by members — work through them at your own pace, on your own time.',
  },
]

const GlyphIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
  </svg>
)

export default function PillarsSection() {
  return (
    <section className="pillars">
      <div className="wrap">
        <div style={{ textAlign: 'center' }}>
          <span className="section-eyebrow">What we do</span>
          <h2 className="section-title">Four ways to plug in.</h2>
          <p className="section-sub" style={{ margin: '12px auto 0' }}>
            Membership is free and open to all UC students. Whether you&apos;ve never opened ChatGPT
            or you&apos;re fine-tuning models for fun, there&apos;s a way in.
          </p>
        </div>
        <div className="pillar-grid">
          {pillars.map((p) => (
            <div className="pillar" key={p.title}>
              <div className="pillar-glyph">
                <GlyphIcon />
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span className="pillar-tag">{p.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
