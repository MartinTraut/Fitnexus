import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { pageGraph, webPageNode, breadcrumbNode, faqNode } from '@/lib/schema'
import { faqItems } from '@/lib/mock-data'

const PATH = '/faq'
const TITLE = 'Häufige Fragen'
const DESCRIPTION =
  'Antworten zu Kosten, Coach-Suche, Anonymität, Verifizierung, Zahlung, Kündigung und Datenschutz auf der FITNEXUS-Plattform.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={pageGraph(
          webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, hasBreadcrumb: true }),
          breadcrumbNode([
            { name: 'Startseite', path: '/' },
            { name: 'FAQ', path: PATH },
          ]),
          // Nur die Fragen, die auf dieser Seite auch sichtbar sind.
          faqNode(faqItems, PATH)
        )}
      />
    </>
  )
}
