import type { Metadata } from 'next'
import EventsSection from '@/components/sections/EventsSection'
import { getAllEvents } from '@/lib/events'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events from UC AI Society — workshops, panels, and showcases.',
}

export default async function EventsPage() {
  const events = await getAllEvents()

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
          <h1 style={{ fontSize: 'clamp(40px,6vw,72px)', marginBottom: 16 }}>Events</h1>
          <p className="hero-lede" style={{ margin: '0 auto', textAlign: 'center' }}>
            Workshops, panel discussions, hackathons, and networking — join us in person.
          </p>
        </div>
      </section>

      <EventsSection events={events} />
    </>
  )
}
