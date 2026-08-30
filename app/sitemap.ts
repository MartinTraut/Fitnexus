import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/schema'

const cities = ['berlin', 'muenchen', 'hamburg', 'koeln', 'frankfurt', 'stuttgart']
const categories = [
  'personal-training',
  'yoga',
  'krafttraining',
  'online-coaching',
  'ernaehrungsberatung',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const core: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, freq: 'weekly' },
    { path: '/fuer-kunden', priority: 0.9, freq: 'monthly' },
    { path: '/for-coaches', priority: 0.9, freq: 'monthly' },
    { path: '/trainers', priority: 0.9, freq: 'daily' },
    { path: '/how-it-works', priority: 0.7, freq: 'monthly' },
    { path: '/pricing', priority: 0.8, freq: 'monthly' },
    { path: '/faq', priority: 0.7, freq: 'monthly' },
    { path: '/about', priority: 0.5, freq: 'yearly' },
    { path: '/contact', priority: 0.5, freq: 'yearly' },
    { path: '/impressum', priority: 0.2, freq: 'yearly' },
    { path: '/datenschutz', priority: 0.2, freq: 'yearly' },
    { path: '/agb', priority: 0.2, freq: 'yearly' },
  ]

  return [
    ...core.map((e) => ({
      url: `${SITE_URL}${e.path}`,
      lastModified: now,
      changeFrequency: e.freq,
      priority: e.priority,
    })),
    ...cities.map((c) => ({
      url: `${SITE_URL}/city/${c}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...categories.map((c) => ({
      url: `${SITE_URL}/category/${c}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]
}
