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

      <section
        style={{ background: 'var(--bg, #070710)' }}
        className="text-[#F2EFE6] py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="mono text-[11px] uppercase tracking-[0.2em] text-[#F2EFE6]/55 hover:text-[#00E0CC] transition-colors mb-8 inline-flex items-center gap-1.5"
          >
            &larr; All events
          </Link>
          <div className="eyebrow text-[#00E0CC] mb-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{dateStr}</span>
            <span className="text-[#F2EFE6]/30">·</span>
            <span className="text-[#F2EFE6]/70">{event.location}</span>
          </div>
          {event.isPast && (
            <Badge variant="secondary" className="mb-5 block w-fit">
              Past event
            </Badge>
          )}
          <h1
            className="text-4xl md:text-6xl font-bold mb-8 max-w-3xl"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            {event.title}
          </h1>
          <div className="mono flex flex-col sm:flex-row sm:flex-wrap gap-4 text-[#F2EFE6]/70 text-xs uppercase tracking-[0.12em]">
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

      <div className="paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Content */}
            <article className="flex-1 min-w-0">
              <div className="prose-uc max-w-none">
                <MDXRemote source={event.content} />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-72 shrink-0">
              <div className="card-paper p-6 sticky top-20">
                <h2 className="eyebrow text-[#2B53FF] mb-5">Event details</h2>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="mono text-[10px] uppercase tracking-[0.16em] text-[#0B0B0F]/50 mb-1">
                      Date
                    </dt>
                    <dd className="font-medium text-[#0B0B0F]">{dateStr}</dd>
                  </div>
                  <div>
                    <dt className="mono text-[10px] uppercase tracking-[0.16em] text-[#0B0B0F]/50 mb-1">
                      Time
                    </dt>
                    <dd className="font-medium text-[#0B0B0F]">{event.time}</dd>
                  </div>
                  <div>
                    <dt className="mono text-[10px] uppercase tracking-[0.16em] text-[#0B0B0F]/50 mb-1">
                      Location
                    </dt>
                    <dd className="font-medium text-[#0B0B0F]">{event.location}</dd>
                  </div>
                </dl>
                {event.rsvpLink && !event.isPast && (
                  <a
                    href={event.rsvpLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--grad mt-6 w-full justify-center"
                  >
                    RSVP <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
