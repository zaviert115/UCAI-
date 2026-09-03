import type { MetadataRoute } from 'next'
import { getAllEvents } from '@/lib/events'
import { getAllTutorials } from '@/lib/tutorials'
import { siteConfig } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, tutorials] = await Promise.all([getAllEvents(), getAllTutorials()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/events`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/tutorials`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/projects`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contact`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${siteConfig.url}/events/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const tutorialRoutes: MetadataRoute.Sitemap = tutorials.map((t) => ({
    url: `${siteConfig.url}/tutorials/${t.slug}`,
    lastModified: new Date(t.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...eventRoutes, ...tutorialRoutes]
}
