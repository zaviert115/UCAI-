import type { Metadata } from 'next'
import TutorialsSection from '@/components/sections/TutorialsSection'
import Reveal from '@/components/chrome/Reveal'
import GradientText from '@/components/ui/GradientText'
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
      <section className="dark-sec" style={{ paddingBlock: 'clamp(110px,16vh,190px)' }}>
        <div className="wrap">
          <Reveal>
            <span className="mono eyebrow" style={{ color: '#00E0CC' }}>
              TUTORIALS · UC·AI
            </span>
          </Reveal>
          <Reveal variant="big" delay={0.05}>
            <h1
              style={{
                fontWeight: 700,
                fontSize: 'clamp(48px,9vw,128px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#F2EFE6',
                margin: '20px 0 0',
              }}
            >
              Learn the <GradientText sheen>stack.</GradientText>
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
              Practical guides written by members — prompt engineering, AI tooling, and ethics. Work
              through them at your own pace.
            </p>
          </Reveal>
        </div>
      </section>

      <TutorialsSection tutorials={tutorials} />
    </>
  )
}
