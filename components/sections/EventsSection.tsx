'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Event } from '@/types/event'

const FILTERS = ['upcoming', 'workshop', 'panel', 'all'] as const

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-NZ', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const CalIcon = () => (
  <svg
    className="ev-cover-glyph"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="oklch(0.82 0.139 200)"
    strokeWidth="1.5"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

export default function EventsSection({
  events,
  teaser = false,
}: {
  events: Event[]
  teaser?: boolean
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('upcoming')

  const filtered = useMemo(() => {
    const base = (() => {
      if (teaser) return events.filter((e) => !e.isPast)
      if (filter === 'upcoming') return events.filter((e) => !e.isPast)
      if (filter === 'all') return events
      return events.filter((e) => e.category?.toLowerCase() === filter)
    })()
    return teaser ? base.slice(0, 3) : base
  }, [events, filter, teaser])

  return (
    <section className="events-section" id="events">
      <div className="wrap">
        <div className="events-head">
          <div>
            <span className="section-eyebrow">Events</span>
            <h2 className="section-title">{teaser ? 'What&apos;s coming up.' : "What's on."}</h2>
          </div>
          {!teaser && (
            <div className="filter-row">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`chip${filter === f ? ' on' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="events-grid">
          {filtered.length === 0 ? (
            <p style={{ color: 'var(--brand-muted)', gridColumn: '1/-1' }}>
              Nothing scheduled right now — check back soon.
            </p>
          ) : (
            filtered.map((ev) => (
              <Link href={`/events/${ev.slug}`} className="ev-card" key={ev.slug}>
                <div className="ev-cover">
                  <span className="ev-cover-label">{(ev.category ?? 'Event').toUpperCase()}</span>
                  <CalIcon />
                </div>
                <div className="ev-body">
                  <div className="ev-date">
                    {fmt(ev.date)} · {ev.time}
                  </div>
                  <h3 className="ev-title">{ev.title}</h3>
                  <p className="ev-desc">{ev.description}</p>
                  <div className="ev-meta">
                    <span>📍 {ev.location}</span>
                    {ev.isPast && <span style={{ color: 'var(--brand-muted)' }}>· Past event</span>}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/events" className="btn btn-outline">
            {teaser ? 'All events →' : 'View full calendar →'}
          </Link>
        </div>
      </div>
    </section>
  )
}
