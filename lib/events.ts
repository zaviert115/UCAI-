import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import type { Event } from '@/types/event'

const EVENTS_DIR = path.join(process.cwd(), 'content', 'events')

async function parseEventFile(filename: string): Promise<Event> {
  const slug = filename.replace(/\.mdx?$/, '')
  const raw = await fs.readFile(path.join(EVENTS_DIR, filename), 'utf-8')
  const { data, content } = matter(raw)
  const isPast = new Date(data.date as string) < new Date()
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    time: data.time as string,
    location: data.location as string,
    description: data.description as string,
    content,
    rsvpLink: data.rsvpLink as string | undefined,
    coverImage: data.coverImage as string | undefined,
    isPast,
  }
}

export async function getAllEvents(): Promise<Event[]> {
  const files = await fs.readdir(EVENTS_DIR)
  const events = await Promise.all(files.filter((f) => /\.mdx?$/.test(f)).map(parseEventFile))
  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  for (const ext of ['mdx', 'md']) {
    try {
      return await parseEventFile(`${slug}.${ext}`)
    } catch {
      // try next extension
    }
  }
  return null
}
