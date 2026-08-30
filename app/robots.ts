import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/schema'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Alles hinter dem Login gehoert nicht in den Index.
      disallow: ['/dashboard/', '/api/', '/login', '/register', '/forgot-password'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
