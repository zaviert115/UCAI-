import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllEvents, getEventBySlug } from '@/lib/events'
import { Badge } from '@/components/ui/badge'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const events = await getAllEvents()
  return events.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) return {}
  return {
    title: event.title,
    description: event.description,
    openGraph: { title: event.title, description: event.description },
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) notFound()

  const dateStr = new Date(event.date).toLocaleDateString('en-NZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    location: {
      '@type': 'Place',
      name: event.location,
    },
    organizer: {
      '@type': 'Organization',
      name: 'UC AI Society',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-navy-800 text-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="text-white/60 text-sm hover:text-white transition-colors mb-6 inline-flex items-center gap-1"
          >
            &larr; All events
          </Link>
          {event.isPast && (
            <Badge variant="secondary" className="mb-4 block w-fit">
              Past event
            </Badge>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl">{event.title}</h1>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              {dateStr}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} aria-hidden="true" />
              {event.location}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Content */}
          <article className="flex-1 min-w-0 prose prose-slate max-w-none">
            <MDXRemote source={event.content} />
          </article>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="rounded-xl border border-border bg-card p-6 sticky top-20">
              <h2 className="font-semibold text-navy-800 mb-4">Event details</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground mb-0.5">Date</dt>
                  <dd className="font-medium">{dateStr}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-0.5">Time</dt>
                  <dd className="font-medium">{event.time}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-0.5">Location</dt>
                  <dd className="font-medium">{event.location}</dd>
                </div>
              </dl>
              {event.rsvpLink && !event.isPast && (
                <a
                  href={event.rsvpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full rounded-md bg-navy-800 px-4 py-2.5 text-white text-sm font-semibold hover:bg-navy-700 transition-colors"
                >
                  RSVP <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
