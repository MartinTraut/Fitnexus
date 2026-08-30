import type { Metadata } from 'next'
import { LegalPage, Todo } from '@/components/legal-page'
import { JsonLd } from '@/components/json-ld'
import { pageGraph, webPageNode, breadcrumbNode } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Anbieterkennzeichnung nach § 5 DDG für FITNEXUS.',
  alternates: { canonical: '/impressum' },
  robots: { index: false, follow: true },
}

export default function ImpressumPage() {
  return (
    <>
      <LegalPage
        title="Impressum"
        intro="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 2 Medienstaatsvertrag."
      >
        <section>
          <h2>Anbieter</h2>
          <p>
            <Todo>TODO: Firmierung inkl. Rechtsform</Todo>
            <br />
            <Todo>TODO: Straße und Hausnummer</Todo>
            <br />
            <Todo>TODO: PLZ und Ort</Todo>
            <br />
            Deutschland
          </p>
        </section>

        <section>
          <h2>Vertreten durch</h2>
          <p>
            <Todo>TODO: Vertretungsberechtigte Personen</Todo>
          </p>
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>
            E-Mail: <a href="mailto:hello@fitnexus.de">hello@fitnexus.de</a>
            <br />
            Telefon: <Todo>TODO: Telefonnummer</Todo>
          </p>
        </section>

        <section>
          <h2>Registereintrag</h2>
          <p>
            Registergericht: <Todo>TODO</Todo>
            <br />
            Registernummer: <Todo>TODO</Todo>
          </p>
        </section>

        <section>
          <h2>Umsatzsteuer-Identifikationsnummer</h2>
          <p>
            Gemäß § 27 a Umsatzsteuergesetz: <Todo>TODO: USt-IdNr.</Todo>
          </p>
        </section>

        <section>
          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            <Todo>TODO: Name und vollständige Anschrift</Todo>
          </p>
        </section>

        <section>
          <h2>Verbraucherstreitbeilegung</h2>
          <p>
            Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </LegalPage>

      <JsonLd
        data={pageGraph(
          webPageNode({
            path: '/impressum',
            name: 'Impressum',
            description: 'Anbieterkennzeichnung nach § 5 DDG für FITNEXUS.',
            hasBreadcrumb: true,
          }),
          breadcrumbNode([
            { name: 'Startseite', path: '/' },
            { name: 'Impressum', path: '/impressum' },
          ])
        )}
      />
    </>
  )
}
