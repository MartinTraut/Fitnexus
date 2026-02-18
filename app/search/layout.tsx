import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trainer finden',
  description: 'Finde den perfekten Personal Trainer in deiner Nähe. Filtere nach Stadt, Kategorie, Preis und Bewertung.',
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
