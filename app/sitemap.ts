import type { MetadataRoute } from 'next'
import { getAllEvents } from '@/lib/events'
import { getAllTutorials } from '@/lib/tutorials'

const BASE_URL = 'https://ucaisoc.nz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, tutorials] = await Promise.all([getAllEvents(), getAllTutorials()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tutorials`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${BASE_URL}/events/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const tutorialRoutes: MetadataRoute.Sitemap = tutorials.map((t) => ({
    url: `${BASE_URL}/tutorials/${t.slug}`,
    lastModified: new Date(t.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...eventRoutes, ...tutorialRoutes]
}
