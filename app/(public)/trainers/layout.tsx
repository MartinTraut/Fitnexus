import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { pageGraph, webPageNode, breadcrumbNode } from '@/lib/schema'

const PATH = '/trainers'
const TITLE = 'Trainer und Coaches finden'
const DESCRIPTION =
  'Durchsuche verifizierte Personal Trainer und Coaches nach Stadt, Spezialisierung, Preis und Bewertung — von Krafttraining über Mobility bis Ernährungsberatung.'

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
            { name: 'Trainer', path: PATH },
          ])
        )}
      />
    </>
  )
}
