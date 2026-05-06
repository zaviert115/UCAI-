import type { Metadata } from 'next'
import PageContainer from '@/components/layout/PageContainer'
import EventCard from '@/components/sections/EventCard'
import { getAllEvents } from '@/lib/events'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events from UC AI Society — workshops, panels, and showcases.',
}

export default async function EventsPage() {
  const events = await getAllEvents()
  const upcoming = events.filter((e) => !e.isPast)
  const past = events.filter((e) => e.isPast)

  return (
    <>
      <section className="bg-navy-800 text-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Workshops, panel discussions, showcases, and networking — join us in person.
          </p>
        </div>
      </section>

      <PageContainer>
        {upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-navy-800 mb-6">Upcoming</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </section>
        )}

        {upcoming.length === 0 && (
          <div className="mb-16 rounded-xl border border-border bg-muted/30 p-10 text-center">
            <p className="text-muted-foreground">No upcoming events right now — check back soon.</p>
          </div>
        )}

        {past.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-navy-800 mb-6">Past events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </section>
        )}
      </PageContainer>
    </>
  )
}
