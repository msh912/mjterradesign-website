import type { MetadataRoute } from 'next'
import { projects } from '@/content/projects'
import { site } from '@/content/site'

/**
 * The apex 308-redirects to www, so every URL here is built on the canonical
 * www host: a sitemap full of redirects costs a crawl hop on every entry.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString()

  return [
    { url: url('/'), changeFrequency: 'monthly', priority: 1 },
    { url: url('/work'), changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/about'), changeFrequency: 'yearly', priority: 0.7 },
    { url: url('/contact'), changeFrequency: 'yearly', priority: 0.7 },
    ...projects.map((p) => ({
      url: url(`/work/${p.slug}`),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ]
}
