import type { Metadata } from 'next'
import EventsSection from '@/components/sections/EventsSection'
import Reveal from '@/components/chrome/Reveal'
import GradientText from '@/components/ui/GradientText'
import { getAllEvents } from '@/lib/events'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events from UC AI Society — workshops, panels, and showcases.',
}

export default async function EventsPage() {
  const events = await getAllEvents()

  return (
    <>
      <section className="dark-sec" style={{ paddingBlock: 'clamp(110px,16vh,190px)' }}>
        <div className="wrap">
          <Reveal>
            <span className="mono eyebrow" style={{ color: '#00E0CC' }}>
              EVENTS · UC·AI
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
              What&apos;s <GradientText sheen>on.</GradientText>
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
              Workshops, panel discussions, hackathons, and networking — join us in person at the
              University of Canterbury.
            </p>
          </Reveal>
        </div>
      </section>

      <EventsSection events={events} />
    </>
  )
}
