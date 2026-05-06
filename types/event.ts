export interface Event {
  slug: string
  title: string
  date: string
  time: string
  location: string
  description: string
  content: string
  rsvpLink?: string
  coverImage?: string
  isPast: boolean
}
