import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { pageGraph, webPageNode, breadcrumbNode } from '@/lib/schema'

const PATH = '/fuer-kunden'
const TITLE = 'Coach finden – kostenlos und anonym starten'
const DESCRIPTION =
  'Finde verifizierte Fitness-Coaches in deiner Stadt oder online, lies echte Bewertungen und buche ein kostenloses Kennenlern-Gespräch. Für Kunden dauerhaft kostenlos.'

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
            { name: 'Für Kunden', path: PATH },
          ])
        )}
      />
    </>
  )
}
