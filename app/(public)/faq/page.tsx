'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { SectionHeading } from '@/components/section-heading'
import { FAQAccordion } from '@/components/faq-accordion'
import { AnimatedSection, motion } from '@/components/motion'
import { faqItems } from '@/lib/mock-data'
import {
  ArrowRight, Search, Zap, HelpCircle, Users, Dumbbell, ShieldCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── FAQ Categories ── */
const categories = [
  { id: 'allgemein', label: 'Allgemein', icon: HelpCircle },
  { id: 'kunden', label: 'Für Kunden', icon: Users },
  { id: 'trainer', label: 'Für Trainer', icon: Dumbbell },
  { id: 'sicherheit', label: 'Sicherheit & Datenschutz', icon: ShieldCheck },
]

const kundenFaqItems = [
  {
    question: 'Wie finde ich den richtigen Coach für mich?',
    answer: 'Nutze unsere Suche mit Filtern für Standort, Spezialisierung, Preisspanne, Bewertung und Coaching-Modus. Lies dir die Profile und Bewertungen durch und buche ein kostenloses Kennenlern-Gespräch, bevor du dich entscheidest.',
  },
  {
    question: 'Was kostet die Nutzung als Kunde?',
    answer: 'FITNEXUS ist für Kunden komplett kostenlos. Du zahlst nur dann, wenn du dich für ein Coaching-Paket bei einem Trainer entscheidest. Die Kosten werden transparent im Profil des Trainers angezeigt.',
  },
  {
    question: 'Wie buche ich ein Erstgespräch?',
    answer: 'Besuche das Profil eines Coaches und klicke auf „Erstgespräch buchen". Wähle einen verfügbaren Termin aus und bestätige. Das Erstgespräch ist immer kostenlos und unverbindlich.',
  },
  {
    question: 'Bleibt meine Identität beim Erstkontakt anonym?',
    answer: 'Ja. Bis du einen Vertrag abschließt, kommunizierst du unter einem anonymen Alias (z.B. Client#4821). Dein richtiger Name, deine E-Mail und Telefonnummer werden erst nach Vertragsabschluss freigegeben.',
  },
  {
    question: 'Was passiert, wenn ich mit meinem Coach unzufrieden bin?',
    answer: 'Du kannst jederzeit eine ehrliche Bewertung abgeben. Bei schwerwiegenden Problemen kontaktiere unser Support-Team. Wir vermitteln und helfen, eine faire Lösung zu finden. Du bist nie an einen Coach gebunden.',
  },
]

const trainerFaqItems = [
  {
    question: 'Wie erstelle ich mein Trainer-Profil?',
    answer: 'Registriere dich als Coach, wähle einen Starter- oder Pro-Plan und fülle dein Profil aus: Bio, Spezialisierungen, Standort, Pakete, Preise und Galerie. Je vollständiger dein Profil, desto besser dein Ranking in der Suche.',
  },
  {
    question: 'Wie erhalte ich neue Kunden über FITNEXUS?',
    answer: 'Kunden finden dich über unsere Suche mit Filtern für Ort, Kategorie, Preis und Bewertung. Ein vollständiges Profil, gute Bewertungen und schnelle Reaktionszeiten verbessern dein Ranking und deine Sichtbarkeit.',
  },
  {
    question: 'Wie funktioniert die Preisgestaltung meiner Pakete?',
    answer: 'Du legst deine Preise und Pakete selbst fest. Es gibt keine Vorgaben von FITNEXUS. Definiere Einzelstunden, Pakete oder monatliche Coaching-Programme mit individuellen Preisen.',
  },
  {
    question: 'Wann und wie erhalte ich meine Auszahlungen?',
    answer: 'Auszahlungen erfolgen automatisch über Stripe. Nach Zahlungseingang beim Kunden wird dein Anteil abzüglich der Plattformgebühr innerhalb von 3–5 Werktagen auf dein hinterlegtes Konto überwiesen.',
  },
  {
    question: 'Kann ich FITNEXUS neben meinem bestehenden Business nutzen?',
    answer: 'Ja. Viele Trainer nutzen FITNEXUS als zusätzlichen Kanal für Kundenakquise und Verwaltung. Du kannst die Plattform so intensiv nutzen, wie es für dich passt.',
  },
]

const sicherheitFaqItems = [
  {
    question: 'Wie werden meine Daten geschützt?',
    answer: 'Alle Daten werden DSGVO-konform in europäischen Rechenzentren gespeichert. Wir nutzen Ende-zu-Ende-Verschlüsselung für sensible Informationen und halten uns an die strengsten Datenschutzstandards.',
  },
  {
    question: 'Ist FITNEXUS DSGVO-konform?',
    answer: 'Ja, vollständig. Wir verarbeiten Daten ausschließlich auf Grundlage der DSGVO. Du hast jederzeit das Recht auf Auskunft, Berichtigung und Löschung deiner Daten. Unser Datenschutzbeauftragter steht für Fragen zur Verfügung.',
  },
  {
    question: 'Wie funktioniert das Bewertungssystem?',
    answer: 'Nur Kunden, die ein abgeschlossenes Coaching-Paket haben, können Bewertungen abgeben. So stellen wir sicher, dass alle Reviews authentisch und aussagekräftig sind. Fake-Reviews werden konsequent entfernt.',
  },
  {
    question: 'Werden meine Zahlungsdaten sicher verarbeitet?',
    answer: 'Alle Zahlungen werden über Stripe abgewickelt – einen der weltweit führenden Zahlungsdienstleister. Deine Kreditkarten- oder Bankdaten werden niemals auf unseren Servern gespeichert, sondern direkt von Stripe verarbeitet und verschlüsselt.',
  },
]

const faqData: Record<string, { question: string; answer: string }[]> = {
  allgemein: faqItems,
  kunden: kundenFaqItems,
  trainer: trainerFaqItems,
  sicherheit: sicherheitFaqItems,
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('allgemein')

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F1A]" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-gradient-to-b from-[#00A8FF]/[0.06] to-transparent blur-[120px] opacity-50" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
          >
            <HelpCircle className="w-4 h-4 text-[#00D4FF]" />
            <span className="text-xs text-muted-foreground font-medium tracking-brand">
              Alles, was du wissen musst
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-[1.08] mb-6"
          >
            <span className="text-foreground">Häufig gestellte </span>
            <span className="gradient-brand-text">Fragen</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Finde schnell Antworten auf deine Fragen zu FITNEXUS, Coaching, Preisen und Datenschutz.
          </motion.p>
        </div>
      </section>

      {/* ═══ CATEGORY TABS + FAQ CONTENT ═══ */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-20" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                    activeCategory === cat.id
                      ? 'bg-[#00A8FF]/[0.12] border border-[#00A8FF]/40 text-[#00D4FF] shadow-[0_0_20px_rgba(0,168,255,0.1)]'
                      : 'glass-card text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  )}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* FAQ Accordion */}
          <div key={activeCategory}>
            <AnimatedSection>
              <FAQAccordion items={faqData[activeCategory]} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ STILL HAVE QUESTIONS ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <GlassCard className="p-10 lg:p-14 text-center" hover={false}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00A8FF]/[0.08] border border-[#00A8FF]/[0.12] mb-6">
                <HelpCircle className="w-7 h-7 text-[#00D4FF]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4">
                Deine Frage war nicht dabei?
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8">
                Kein Problem. Schreib uns eine Nachricht und wir melden uns innerhalb von 24 Stunden bei dir.
              </p>
              <Link href="mailto:support@fitnexus.de">
                <GradientButton variant="cyan" outline size="lg">
                  Support kontaktieren <ArrowRight className="w-4 h-4" />
                </GradientButton>
              </Link>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00A8FF]/[0.04] to-transparent" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00A8FF]/[0.05] blur-[150px]" aria-hidden="true" />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
            Bereit <span className="gradient-brand-text">loszulegen?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Finde deinen perfekten Coach oder starte als Trainer durch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/trainers">
              <GradientButton variant="cyan" size="lg">
                <Search className="w-5 h-5" />
                Coach finden
              </GradientButton>
            </Link>
            <Link href="/register">
              <GradientButton variant="green" size="lg">
                <Zap className="w-5 h-5" />
                Als Coach starten
              </GradientButton>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
