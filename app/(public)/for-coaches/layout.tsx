import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { pageGraph, webPageNode, breadcrumbNode } from '@/lib/schema'

const PATH = '/for-coaches'
const TITLE = 'Für Coaches – dein Business auf einer Plattform'
const DESCRIPTION =
  'Kundenverwaltung, Trainings- und Ernährungspläne, Chat, Fortschritts-Tracking und digitale Verträge in einem System. Profil kostenlos, aktives Coaching ab 49 € im Monat.'

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
            { name: 'Für Coaches', path: PATH },
          ])
        )}
      />
    </>
  )
}
