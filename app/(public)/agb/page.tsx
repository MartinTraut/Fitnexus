import type { Metadata } from 'next'
import { LegalPage, Todo } from '@/components/legal-page'
import { JsonLd } from '@/components/json-ld'
import { pageGraph, webPageNode, breadcrumbNode } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen',
  description:
    'Bedingungen für die Nutzung der FITNEXUS-Plattform durch Kunden und Coaches.',
  alternates: { canonical: '/agb' },
  robots: { index: false, follow: true },
}

export default function AgbPage() {
  return (
    <>
      <LegalPage
        title="Allgemeine Geschäftsbedingungen"
        intro="Diese Bedingungen regeln die Nutzung der FITNEXUS-Plattform. Das Coaching selbst kommt zwischen Kunde und Coach zustande — FITNEXUS vermittelt und stellt die Werkzeuge bereit."
      >
        <section>
          <h2>§ 1 Geltungsbereich und Anbieter</h2>
          <p>
            Anbieter der Plattform ist <Todo>TODO: Firmierung und Anschrift</Todo>. Diese
            Bedingungen gelten für alle Nutzerinnen und Nutzer, sowohl für Kunden als auch für
            Coaches.
          </p>
        </section>

        <section>
          <h2>§ 2 Rolle von FITNEXUS</h2>
          <p>
            FITNEXUS stellt eine technische Plattform zur Verfügung, über die Kunden Coaches finden
            und beide Seiten ihr Coaching organisieren. Der Coaching-Vertrag kommt ausschließlich
            zwischen Kunde und Coach zustande. FITNEXUS ist weder Vertragspartei dieses
            Coaching-Vertrags noch schuldet FITNEXUS Trainings- oder Ernährungsberatung.
          </p>
        </section>

        <section>
          <h2>§ 3 Registrierung und Konto</h2>
          <p>
            Für die Nutzung ist ein Konto erforderlich. Die Angaben müssen zutreffend sein.
            Zugangsdaten sind geheim zu halten. Nutzer müssen volljährig sein.
          </p>
        </section>

        <section>
          <h2>§ 4 Leistungen für Kunden</h2>
          <p>
            Registrierung, Coach-Suche, Einsicht in Profile und Bewertungen sowie das erste
            Kennenlern-Gespräch sind für Kunden kostenlos. Das Honorar für das Coaching richtet sich
            nach dem Angebot des jeweiligen Coaches.
          </p>
        </section>

        <section>
          <h2>§ 5 Leistungen und Vergütung für Coaches</h2>
          <p>
            Coaches erstellen ihr Profil kostenlos. Für die aktive Nutzung des Coach-Workspace ist
            ein kostenpflichtiger Plan ab 49 € pro Monat erforderlich. Die Abrechnung erfolgt
            monatlich im Voraus. Die Pläne sind monatlich kündbar; der Zugang bleibt bis zum Ende
            des bezahlten Abrechnungszeitraums bestehen.
          </p>
          <p>
            <Todo>TODO: Preisstaffel, Leistungsumfang je Plan und etwaige Vermittlungsprovision verbindlich festlegen</Todo>
          </p>
        </section>

        <section>
          <h2>§ 6 Verifizierung von Coaches</h2>
          <p>
            Coaches können Qualifikationsnachweise einreichen. FITNEXUS prüft diese und vergibt
            gegebenenfalls einen Verifizierungs-Badge. Die Prüfung ersetzt keine eigene Auswahl
            durch den Kunden; eine Gewähr für den Coaching-Erfolg ist damit nicht verbunden.
          </p>
        </section>

        <section>
          <h2>§ 7 Bewertungen</h2>
          <p>
            Bewertungen können ausschließlich Kunden abgeben, die über die Plattform einen
            Coaching-Vertrag abgeschlossen haben. Unzulässig sind unwahre Tatsachenbehauptungen,
            Schmähkritik und gekaufte Bewertungen. FITNEXUS darf solche Beiträge entfernen.
          </p>
        </section>

        <section>
          <h2>§ 8 Pflichten der Nutzer</h2>
          <ul>
            <li>Keine rechtswidrigen, beleidigenden oder irreführenden Inhalte einstellen.</li>
            <li>Keine Umgehung der Plattform zur Vermeidung von Gebühren.</li>
            <li>Fremde Rechte, insbesondere Urheber- und Persönlichkeitsrechte, beachten.</li>
          </ul>
        </section>

        <section>
          <h2>§ 9 Widerrufsrecht</h2>
          <p>
            Verbrauchern steht ein gesetzliches Widerrufsrecht zu.
            <Todo>TODO: Vollständige Widerrufsbelehrung samt Muster-Widerrufsformular ergänzen</Todo>
          </p>
        </section>

        <section>
          <h2>§ 10 Haftung</h2>
          <p>
            FITNEXUS haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung
            von Leben, Körper oder Gesundheit. Bei einfacher Fahrlässigkeit haftet FITNEXUS nur bei
            Verletzung wesentlicher Vertragspflichten und begrenzt auf den vertragstypischen,
            vorhersehbaren Schaden. Für Inhalte, Ratschläge und Leistungen der Coaches haftet
            FITNEXUS nicht.
          </p>
        </section>

        <section>
          <h2>§ 11 Gesundheitlicher Hinweis</h2>
          <p>
            Trainings- und Ernährungsempfehlungen auf der Plattform ersetzen keine medizinische
            Beratung. Bei Vorerkrankungen, Beschwerden oder Unsicherheit ist vor Trainingsbeginn
            ärztlicher Rat einzuholen.
          </p>
        </section>

        <section>
          <h2>§ 12 Laufzeit und Kündigung</h2>
          <p>
            Das Nutzungsverhältnis läuft auf unbestimmte Zeit und kann von beiden Seiten jederzeit
            gekündigt werden. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt
            unberührt.
          </p>
        </section>

        <section>
          <h2>§ 13 Änderungen dieser Bedingungen</h2>
          <p>
            Änderungen werden mindestens sechs Wochen vor Inkrafttreten in Textform angekündigt.
            Widerspricht ein Nutzer nicht bis zum Wirksamwerden, gelten die Änderungen als
            angenommen; auf diese Folge wird in der Ankündigung gesondert hingewiesen.
          </p>
        </section>

        <section>
          <h2>§ 14 Schlussbestimmungen</h2>
          <p>
            Es gilt deutsches Recht. Ist eine Bestimmung unwirksam, bleibt die Wirksamkeit der
            übrigen Bestimmungen unberührt.
          </p>
          <p>
            <Todo>TODO: Diesen Text vor dem Livegang anwaltlich prüfen lassen</Todo>
          </p>
        </section>
      </LegalPage>

      <JsonLd
        data={pageGraph(
          webPageNode({
            path: '/agb',
            name: 'Allgemeine Geschäftsbedingungen',
            description:
              'Bedingungen für die Nutzung der FITNEXUS-Plattform durch Kunden und Coaches.',
            hasBreadcrumb: true,
          }),
          breadcrumbNode([
            { name: 'Startseite', path: '/' },
            { name: 'AGB', path: '/agb' },
          ])
        )}
      />
    </>
  )
}
