import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { pageGraph, webPageNode, breadcrumbNode } from '@/lib/schema'

const PATH = '/about'
const TITLE = 'Über uns – warum wir die Plattform bauen'
const DESCRIPTION =
  'Wer hinter FITNEXUS steht und warum Fitness-Coaching eine bessere Infrastruktur verdient als WhatsApp, Excel und verstreute Tools.'

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
            { name: 'Über uns', path: PATH },
          ])
        )}
      />
    </>
  )
}
