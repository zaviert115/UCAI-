import { User } from 'lucide-react'

interface TeamCardProps {
  name: string
  role: string
  bio?: string
  linkedIn?: string
}

export default function TeamCard({ name, role, bio, linkedIn }: TeamCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-navy-800 flex items-center justify-center shrink-0">
          <User size={28} className="text-brand-cyan" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      {bio && <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>}
      {linkedIn && (
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-navy-800 hover:text-brand-cyan-dark transition-colors"
        >
          LinkedIn &rarr;
        </a>
      )}
    </div>
  )
}
