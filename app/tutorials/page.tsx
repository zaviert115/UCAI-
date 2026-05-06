import type { Metadata } from 'next'
import TutorialsSection from '@/components/sections/TutorialsSection'
import { getAllTutorials } from '@/lib/tutorials'

export const metadata: Metadata = {
  title: 'Tutorials',
  description:
    'Free tutorials from UC AI Society — prompt engineering, AI tools, ethics, and more.',
}

export default async function TutorialsPage() {
  const tutorials = await getAllTutorials()

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
          <h1 style={{ fontSize: 'clamp(40px,6vw,72px)', marginBottom: 16 }}>Tutorials</h1>
          <p className="hero-lede" style={{ margin: '0 auto', textAlign: 'center' }}>
            Practical guides written by members — work through them at your own pace.
          </p>
        </div>
      </section>

      <TutorialsSection tutorials={tutorials} />
    </>
  )
}
