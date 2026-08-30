import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { pageGraph, webPageNode, breadcrumbNode } from '@/lib/schema'

const PATH = '/pricing'
const TITLE = 'Preise – kostenlos für Kunden, ab 49 € für Coaches'
const DESCRIPTION =
  'Für Kunden ist FITNEXUS kostenlos. Coaches erstellen ihr Profil gratis und starten für aktives Coaching ab 49 € im Monat, monatlich kündbar.'

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
            { name: 'Preise', path: PATH },
          ])
        )}
      />
    </>
  )
}
