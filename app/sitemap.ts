import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://boostingagencyofficial.site'
  
  const routes = [
    '',
    '/services',
    '/about',
    '/blog',
    '/portfolio',
    '/team',
    '/contact',
    '/privacy',
    '/terms',
    '/search',
  ]

  const now = new Date()

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/services' ? 0.9 : 0.8,
  }))
}
