/**
 * Rendert einen Schema.org-@graph als JSON-LD.
 *
 * Server-Komponente: das Skript steht direkt im HTML, Crawler brauchen kein JS.
 * `<` wird escaped, damit ein Zeichenfolge in den Daten das Skript nicht schliessen kann.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
