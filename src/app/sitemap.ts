import { MetadataRoute } from 'next'

const BASE_URL = 'https://bruttonettocalculator.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/brutto-netto-rechner', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/netto-brutto', priority: 0.95, changeFrequency: 'weekly' as const },
    { url: '/stundenlohn', priority: 0.90, changeFrequency: 'weekly' as const },
    { url: '/firmenwagen', priority: 0.90, changeFrequency: 'weekly' as const },
    { url: '/arbeitgeber', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/arbeitslosengeld', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/kurzarbeitergeld', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/rente', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/rentenpunkte', priority: 0.80, changeFrequency: 'weekly' as const },
    { url: '/pendlerpauschale', priority: 0.80, changeFrequency: 'weekly' as const },
    { url: '/schenkungssteuer', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/urlaubsgeld', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/ueber-uns', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/kontakt', priority: 0.5, changeFrequency: 'yearly' as const },
    { url: '/nutzungsbedingungen', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/impressum', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
