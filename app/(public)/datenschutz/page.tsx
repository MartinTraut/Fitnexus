import type { Metadata } from 'next'
import { LegalPage, Todo } from '@/components/legal-page'
import { JsonLd } from '@/components/json-ld'
import { pageGraph, webPageNode, breadcrumbNode } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Wie FITNEXUS personenbezogene Daten verarbeitet: Zwecke, Rechtsgrundlagen, Empfänger und deine Rechte nach DSGVO.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: false, follow: true },
}

export default function DatenschutzPage() {
  return (
    <>
      <LegalPage
        title="Datenschutzerklärung"
        intro="Diese Erklärung beschreibt, welche personenbezogenen Daten wir verarbeiten, zu welchem Zweck, auf welcher Rechtsgrundlage und welche Rechte dir zustehen."
      >
        <section>
          <h2>1. Verantwortlicher</h2>
          <p>
            Verantwortlich im Sinne der DSGVO ist <Todo>TODO: Firmierung und Anschrift</Todo>.
            Kontakt: <a href="mailto:hello@fitnexus.de">hello@fitnexus.de</a>.
          </p>
          <p>
            Datenschutzbeauftragter: <Todo>TODO — falls bestellt, sonst Abschnitt streichen</Todo>
          </p>
        </section>

        <section>
          <h2>2. Welche Daten wir verarbeiten</h2>
          <ul>
            <li>
              <strong>Kontodaten:</strong> Name, E-Mail-Adresse, Passwort-Hash, Rolle (Kunde oder
              Coach).
            </li>
            <li>
              <strong>Profildaten von Coaches:</strong> Qualifikationen, Zertifikate, Standort,
              Spezialisierungen, Preise.
            </li>
            <li>
              <strong>Coaching- und Gesundheitsdaten:</strong> Trainingspläne, absolvierte Übungen,
              Gewicht, Körperfett, Muskelmasse, Ernährungsangaben, Fortschrittsfotos. Es handelt
              sich um Gesundheitsdaten nach Art. 9 DSGVO; die Verarbeitung erfolgt ausschließlich
              auf Grundlage deiner ausdrücklichen Einwilligung.
            </li>
            <li>
              <strong>Kommunikationsdaten:</strong> Nachrichten zwischen Kunde und Coach über die
              Plattform.
            </li>
            <li>
              <strong>Vertrags- und Zahlungsdaten:</strong> abgeschlossene Coaching-Verträge,
              Rechnungen, Zahlungsstatus.
            </li>
            <li>
              <strong>Technische Daten:</strong> IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene
              Seite, Browser- und Gerätetyp.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Zwecke und Rechtsgrundlagen</h2>
          <ul>
            <li>
              Bereitstellung von Konto, Coach-Suche, Chat, Trainings- und Ernährungsplanung sowie
              Vertragsabwicklung — Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
            </li>
            <li>
              Verarbeitung von Gesundheitsdaten im Rahmen des Coachings — Art. 9 Abs. 2 lit. a DSGVO
              (ausdrückliche Einwilligung). Die Einwilligung ist jederzeit mit Wirkung für die
              Zukunft widerrufbar.
            </li>
            <li>
              Betriebssicherheit, Missbrauchs- und Betrugsabwehr — Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse).
            </li>
            <li>
              Erfüllung handels- und steuerrechtlicher Aufbewahrungspflichten — Art. 6 Abs. 1 lit. c
              DSGVO.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Anonymität vor Vertragsschluss</h2>
          <p>
            Bis zum Abschluss eines Coaching-Vertrags kommunizierst du gegenüber Coaches unter einem
            Alias. Dein Klarname und deine Kontaktdaten werden dem Coach erst mit Vertragsschluss
            offengelegt.
          </p>
        </section>

        <section>
          <h2>5. Empfänger und Auftragsverarbeiter</h2>
          <ul>
            <li>
              <strong>Supabase</strong> — Datenbank, Authentifizierung und Dateispeicher. Hosting in
              der EU.
            </li>
            <li>
              <strong>Stripe Payments Europe, Ltd.</strong> — Zahlungsabwicklung. Zahlungsdaten
              werden direkt von Stripe erhoben; wir speichern keine vollständigen Kartendaten.
            </li>
            <li>
              <strong>Vercel</strong> — Auslieferung der Website. <Todo>TODO: Region bestätigen</Todo>
            </li>
            <li>
              <strong>Coaches</strong> erhalten die für das jeweilige Coaching erforderlichen Daten
              ihrer eigenen Kunden — und nur diese.
            </li>
          </ul>
          <p>
            Mit allen Auftragsverarbeitern bestehen Verträge nach Art. 28 DSGVO.
            <Todo>TODO: Liste vor dem Livegang gegen die tatsächlich eingesetzten Dienste prüfen</Todo>
          </p>
        </section>

        <section>
          <h2>6. Speicherdauer</h2>
          <p>
            Kontodaten werden bis zur Löschung des Kontos gespeichert. Coaching- und
            Gesundheitsdaten werden mit Ende des Coaching-Vertrags gelöscht oder anonymisiert,
            sofern keine gesetzliche Aufbewahrungspflicht entgegensteht. Rechnungsdaten unterliegen
            der zehnjährigen Aufbewahrungsfrist nach § 147 AO.
          </p>
        </section>

        <section>
          <h2>7. Deine Rechte</h2>
          <p>
            Dir stehen Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung
            der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21)
            zu. Eine erteilte Einwilligung kannst du jederzeit widerrufen; die Rechtmäßigkeit der
            bis dahin erfolgten Verarbeitung bleibt unberührt.
          </p>
          <p>
            Zur Ausübung genügt eine Nachricht an{' '}
            <a href="mailto:hello@fitnexus.de">hello@fitnexus.de</a>. Unabhängig davon kannst du
            dich bei einer Datenschutz-Aufsichtsbehörde beschweren.
          </p>
        </section>

        <section>
          <h2>8. Cookies und Reichweitenmessung</h2>
          <p>
            Wir setzen technisch notwendige Cookies für die Anmeldung und die Sitzungsverwaltung
            ein. <Todo>TODO: Analyse- oder Marketing-Tools ergänzen, sobald eingesetzt — dann ist ein Consent-Banner erforderlich</Todo>
          </p>
        </section>

        <section>
          <h2>9. Stand</h2>
          <p>
            <Todo>TODO: Datum der letzten Aktualisierung eintragen und den Text vor dem Livegang anwaltlich prüfen lassen</Todo>
          </p>
        </section>
      </LegalPage>

      <JsonLd
        data={pageGraph(
          webPageNode({
            path: '/datenschutz',
            name: 'Datenschutzerklärung',
            description:
              'Wie FITNEXUS personenbezogene Daten verarbeitet: Zwecke, Rechtsgrundlagen, Empfänger und deine Rechte nach DSGVO.',
            hasBreadcrumb: true,
          }),
          breadcrumbNode([
            { name: 'Startseite', path: '/' },
            { name: 'Datenschutz', path: '/datenschutz' },
          ])
        )}
      />
    </>
  )
}
