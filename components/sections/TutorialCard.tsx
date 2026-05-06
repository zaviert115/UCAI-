import Link from 'next/link'
import { Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Tutorial } from '@/types/tutorial'

interface TutorialCardProps {
  tutorial: Tutorial
}

export default function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <Link
      href={`/tutorials/${tutorial.slug}`}
      className="group block rounded-xl border border-border bg-card hover:border-navy-800 hover:shadow-md transition-all duration-200"
    >
      <div className="p-6">
        <div className="mb-3">
          <Badge className="bg-navy-800 text-white hover:bg-navy-700 mb-2 text-xs">
            {tutorial.category}
          </Badge>
          <h3 className="font-semibold text-lg leading-snug group-hover:text-navy-800 transition-colors">
            {tutorial.title}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {tutorial.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User size={14} aria-hidden="true" />
            {tutorial.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} aria-hidden="true" />
            {tutorial.readTime} min read
          </span>
        </div>
      </div>
    </Link>
  )
}
