import { getAllEvents } from '@/lib/events'
import { getAllTutorials } from '@/lib/tutorials'
import { projects } from '@/lib/projects'

export type SearchKind = 'event' | 'tutorial' | 'project' | 'page'

export interface SearchItem {
  kind: SearchKind
  label: string
  sub: string
  href: string
  /** lowercased haystack for matching */
  key: string
}

export interface SearchIndex {
  items: SearchItem[]
  /** grounding context for the Ask UC·AI assistant */
  aiContext: string
}

const PAGES: SearchItem[] = [
  { kind: 'page', label: 'Home', sub: 'UC AI Society', href: '/', key: 'home uc ai society start' },
  {
    kind: 'page',
    label: 'Events',
    sub: 'Workshops, panels & socials',
    href: '/events',
    key: 'events workshops panels socials calendar',
  },
  {
    kind: 'page',
    label: 'Tutorials',
    sub: 'Guides written by members',
    href: '/tutorials',
    key: 'tutorials guides learn how to',
  },
  {
    kind: 'page',
    label: 'Projects',
    sub: 'Built by students',
    href: '/projects',
    key: 'projects built students hackathon',
  },
  {
    kind: 'page',
    label: 'About',
    sub: 'What is UC AI Society?',
    href: '/about',
    key: 'about what is uc ai society mission',
  },
  {
    kind: 'page',
    label: 'Contact',
    sub: 'Get in touch',
    href: '/contact',
    key: 'contact email get in touch join',
  },
]

export async function buildSearchIndex(): Promise<SearchIndex> {
  const [events, tutorials] = await Promise.all([getAllEvents(), getAllTutorials()])

  const eventItems: SearchItem[] = events.map((e) => ({
    kind: 'event',
    label: e.title,
    sub: `${e.location} · ${new Date(e.date).toLocaleDateString('en-NZ', { month: 'short', year: 'numeric' })}`,
    href: `/events/${e.slug}`,
    key: `${e.title} ${e.description} ${e.location}`.toLowerCase(),
  }))

  const tutorialItems: SearchItem[] = tutorials.map((t) => ({
    kind: 'tutorial',
    label: t.title,
    sub: `${t.category} · ${t.author}`,
    href: `/tutorials/${t.slug}`,
    key: `${t.title} ${t.description} ${t.category} ${t.author}`.toLowerCase(),
  }))

  const projectItems: SearchItem[] = projects.map((p) => ({
    kind: 'project',
    label: p.title,
    sub: p.tag,
    href: '/projects',
    key: `${p.title} ${p.desc} ${p.tag} ${p.stack.join(' ')}`.toLowerCase(),
  }))

  const items = [...PAGES, ...eventItems, ...tutorialItems, ...projectItems]

  const aiContext = [
    'You are the assistant for UC AI Society, a student-led club at the University of Canterbury (Ōtautahi Christchurch, Aotearoa New Zealand). It runs workshops, panels, socials and tutorials, and the biggest student hackathon in the South Island. Membership is free and open to all UC students.',
    `UPCOMING & RECENT EVENTS: ${events.map((e) => e.title).join('; ')}.`,
    `TUTORIALS: ${tutorials.map((t) => t.title).join('; ')}.`,
    `MEMBER PROJECTS: ${projects.map((p) => p.title).join('; ')}.`,
    'Answer only about UC AI Society. If asked something unrelated, say you only cover UC AI Society.',
  ].join('\n')

  return { items, aiContext }
}
