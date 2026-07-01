'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Calendar, MapPin } from 'lucide-react'
import PaperSection from '@/components/layout/PaperSection'
import SectionHeader from '@/components/layout/SectionHeader'
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

function chipStyle(active: boolean): React.CSSProperties {
  return {
    fontSize: 12,
    padding: '7px 16px',
    cursor: 'pointer',
    background: active ? '#0B0B0F' : 'transparent',
    color: active ? '#F2EFE6' : '#0B0B0F',
    border: '1px solid #0B0B0F',
    letterSpacing: '0.04em',
    transition: 'background 0.2s ease, color 0.2s ease',
  }
}

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
    <PaperSection id="events">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 20,
          marginBottom: 48,
        }}
      >
        <SectionHeader index="02" eyebrow="Upcoming" title="What's on." tone="paper" />
        {!teaser && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }} className="mono">
            {FILTERS.map((f) => (
              <button key={f} style={chipStyle(filter === f)} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 22,
        }}
      >
        {filtered.length === 0 ? (
          <p style={{ color: 'rgba(11,11,15,0.6)', gridColumn: '1/-1' }}>
            Nothing scheduled right now — check back soon.
          </p>
        ) : (
          filtered.map((ev) => (
            <Link
              href={`/events/${ev.slug}`}
              className="card-paper"
              key={ev.slug}
              style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit',
                height: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                  borderBottom: '1px solid rgba(11,11,15,0.12)',
                }}
              >
                <span className="eyebrow" style={{ fontSize: 10, color: '#2B53FF' }}>
                  {(ev.category ?? 'Event').toUpperCase()}
                </span>
                <Calendar size={36} strokeWidth={1.5} color="#2B53FF" />
              </div>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="mono" style={{ fontSize: 12, color: 'rgba(11,11,15,0.6)' }}>
                  {fmt(ev.date)} · {ev.time}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: '-0.02em',
                    color: '#0B0B0F',
                    margin: 0,
                  }}
                >
                  {ev.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: 'rgba(11,11,15,0.72)',
                    margin: 0,
                  }}
                >
                  {ev.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    color: 'rgba(11,11,15,0.7)',
                    marginTop: 4,
                  }}
                >
                  <MapPin size={14} strokeWidth={1.8} />
                  <span>{ev.location}</span>
                  {ev.isPast && <span style={{ color: 'rgba(11,11,15,0.5)' }}>· Past event</span>}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <Link href="/events" className="btn btn--outline-ink">
          {teaser ? 'View all events →' : 'View full calendar →'}
        </Link>
      </div>
    </PaperSection>
  )
}
