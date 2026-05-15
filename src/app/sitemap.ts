import { MetadataRoute } from 'next'

const BASE_URL = 'https://bruttonettocalculator.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ── Core Calculator Pages (highest traffic, updated most often) ──
  const calculators = [
    // Tier 1 — Money keyword pages, most competitive
    { url: '/brutto-netto-rechner', priority: 1.0,  changeFrequency: 'weekly'  as const },
    { url: '/',                     priority: 0.98, changeFrequency: 'weekly'  as const },
    { url: '/netto-brutto',         priority: 0.95, changeFrequency: 'weekly'  as const },
    { url: '/stundenlohn',          priority: 0.92, changeFrequency: 'weekly'  as const },
    { url: '/arbeitgeber',          priority: 0.90, changeFrequency: 'weekly'  as const },

    // Tier 2 — High-value long-tail pages
    { url: '/firmenwagen',          priority: 0.90, changeFrequency: 'weekly'  as const },
    { url: '/arbeitslosengeld',     priority: 0.88, changeFrequency: 'weekly'  as const },
    { url: '/kurzarbeitergeld',     priority: 0.88, changeFrequency: 'weekly'  as const },
    { url: '/rente',                priority: 0.87, changeFrequency: 'weekly'  as const },
    { url: '/rentenpunkte',         priority: 0.85, changeFrequency: 'weekly'  as const },
    { url: '/pendlerpauschale',     priority: 0.85, changeFrequency: 'weekly'  as const },

    // Tier 3 — Niche but solid intent
    { url: '/schenkungssteuer',     priority: 0.78, changeFrequency: 'monthly' as const },
    { url: '/urlaubsgeld',          priority: 0.78, changeFrequency: 'monthly' as const },
  ]

  // ── Legal / Trust Pages ──
  const legal = [
    { url: '/impressum',            priority: 0.30, changeFrequency: 'yearly'  as const },
    { url: '/datenschutz',          priority: 0.30, changeFrequency: 'yearly'  as const },
    { url: '/nutzungsbedingungen',  priority: 0.25, changeFrequency: 'yearly'  as const },
  ]

  // ── Brand / About Pages ──
  const brand = [
    { url: '/ueber-uns',            priority: 0.50, changeFrequency: 'monthly' as const },
    { url: '/kontakt',              priority: 0.45, changeFrequency: 'monthly' as const },
  ]

  const allRoutes = [...calculators, ...legal, ...brand]

  return allRoutes.map(({ url, priority, changeFrequency }) => ({
    url:             `${BASE_URL}${url}`,
    lastModified:    now,
    changeFrequency,
    priority,
    // Alternate language tag for German audience
    alternates: {
      languages: {
        'de':    `${BASE_URL}${url}`,
        'de-DE': `${BASE_URL}${url}`,
      },
    },
  }))
}
