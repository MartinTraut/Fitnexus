/**
 * Schema.org als verbundener @graph.
 *
 * Alle Knoten haengen ueber @id zusammen — Organization ist die Wurzel,
 * WebSite/Service/Breadcrumbs referenzieren sie, statt Fakten zu wiederholen.
 * Bewusst NICHT enthalten: AggregateRating. Die Testimonials auf der Seite
 * sind Platzhalter; ein Rating-Snippet daraus waere erfundene Auszeichnung.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_APP_URL || 'https://fitnexus.de'
).replace(/\/$/, '')

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`
const LOGO_ID = `${SITE_URL}/#logo`

type Node = Record<string, unknown>

export const organizationNode: Node = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'FITNEXUS',
  alternateName: 'Fitnexus',
  url: `${SITE_URL}/`,
  logo: { '@id': LOGO_ID },
  image: { '@id': LOGO_ID },
  description:
    'Plattform, die Fitness-Coaches und Kunden verbindet: Coach-Suche, Kommunikation, Trainings- und Ernaehrungsplaene, Fortschritts-Tracking und digitale Vertraege in einem System.',
  email: 'hello@fitnexus.de',
  areaServed: { '@type': 'Country', name: 'Deutschland' },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@fitnexus.de',
      availableLanguage: ['de'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hello@fitnexus.de',
      availableLanguage: ['de'],
    },
  ],
}

export const logoNode: Node = {
  '@type': 'ImageObject',
  '@id': LOGO_ID,
  url: `${SITE_URL}/logo-icon.png`,
  contentUrl: `${SITE_URL}/logo-icon.png`,
  width: 512,
  height: 512,
  caption: 'FITNEXUS',
}

export const websiteNode: Node = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: 'FITNEXUS',
  inLanguage: 'de-DE',
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/trainers?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

/** Die Plattformleistung inkl. Katalog der beiden Zielgruppen-Angebote. */
export const serviceNode: Node = {
  '@type': 'Service',
  '@id': `${SITE_URL}/#service`,
  name: 'FITNEXUS Coaching-Plattform',
  serviceType: 'Fitness-Coaching-Plattform',
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'Deutschland' },
  audience: [
    { '@type': 'Audience', audienceType: 'Fitness-Kunden' },
    { '@type': 'Audience', audienceType: 'Personal Trainer und Coaches' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'FITNEXUS Angebote',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Coach-Suche fuer Kunden',
        description:
          'Verifizierte Coaches finden, Bewertungen lesen und ein kostenloses Kennenlern-Gespraech buchen.',
        price: 0,
        priceCurrency: 'EUR',
        url: `${SITE_URL}/fuer-kunden`,
        category: 'Kunden',
      },
      {
        '@type': 'Offer',
        name: 'Coach-Workspace',
        description:
          'Kundenverwaltung, Trainings- und Ernaehrungsplaene, Chat, Fortschritts-Tracking und digitale Vertraege.',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: 49,
          priceCurrency: 'EUR',
          unitCode: 'MON',
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
        },
        url: `${SITE_URL}/for-coaches`,
        category: 'Coaches',
      },
    ],
  },
}

export function breadcrumbNode(
  trail: { name: string; path: string }[]
): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${trail[trail.length - 1].path || '/'}#breadcrumb`,
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: `${SITE_URL}${step.path}`,
    })),
  }
}

export function webPageNode(opts: {
  path: string
  name: string
  description: string
  hasBreadcrumb?: boolean
}): Node {
  const url = `${SITE_URL}${opts.path}`
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: 'de-DE',
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@id': LOGO_ID },
    ...(opts.hasBreadcrumb ? { breadcrumb: { '@id': `${url || '/'}#breadcrumb` } } : {}),
  }
}

export function faqNode(
  items: { question: string; answer: string }[],
  path: string
): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${path}#faq`,
    inLanguage: 'de-DE',
    isPartOf: { '@id': SITE_ID },
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/**
 * Basis-Graph — gehoert genau einmal pro Dokument ins Root-Layout.
 * Organization, Logo und WebSite sind die Knoten, auf die alles verweist.
 */
export function buildGraph(...nodes: Node[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode, logoNode, websiteNode, ...nodes],
  }
}

/**
 * Seitenspezifischer Graph. Wiederholt die Basisknoten bewusst NICHT —
 * sie stehen schon im Root-Layout, und dieselbe @id zweimal auszuliefern
 * blaeht das HTML auf, ohne einen Crawler schlauer zu machen.
 */
export function pageGraph(...nodes: Node[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
