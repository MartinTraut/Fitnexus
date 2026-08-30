import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { pageGraph, webPageNode, breadcrumbNode } from '@/lib/schema'

const PATH = '/how-it-works'
const TITLE = 'So funktioniert’s – in vier Schritten zum Ergebnis'
const DESCRIPTION =
  'Entdecken, kennenlernen, trainieren, wachsen: wie Coach-Suche, Erstgespräch, Trainingsplanung und Fortschrittsmessung bei FITNEXUS ineinandergreifen.'

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
            { name: 'So funktioniert’s', path: PATH },
          ])
        )}
      />
    </>
  )
}
