import Link from 'next/link'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Event } from '@/types/event'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const dateStr = new Date(event.date).toLocaleDateString('en-NZ', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block rounded-xl border border-border bg-card hover:border-navy-800 hover:shadow-md transition-all duration-200"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-lg leading-snug group-hover:text-navy-800 transition-colors">
            {event.title}
          </h3>
          {event.isPast && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              Past
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="shrink-0" aria-hidden="true" />
            {dateStr}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="shrink-0" aria-hidden="true" />
            {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="shrink-0" aria-hidden="true" />
            {event.location}
          </span>
        </div>
      </div>
    </Link>
  )
}
