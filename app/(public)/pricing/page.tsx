'use client'

import Link from 'next/link'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { SectionHeading } from '@/components/section-heading'
import { FAQAccordion } from '@/components/faq-accordion'
import { AnimatedSection, StaggerGroup, StaggerItem, motion } from '@/components/motion'
import { pricingPlans } from '@/lib/mock-data'
import {
  Check, X, ArrowRight, Percent, Info, Shield, Zap,
  HelpCircle, Users, Dumbbell, Search,
} from 'lucide-react'

/* ── Comparison table data ── */
const comparisonFeatures = [
  { feature: 'Coach-Suche & Filter', kunde: true, starter: true, pro: true },
  { feature: 'Profilansichten ohne Limit', kunde: true, starter: true, pro: true },
  { feature: 'Erstgespräch buchen', kunde: true, starter: true, pro: true },
  { feature: 'Bewertungen lesen & schreiben', kunde: true, starter: true, pro: true },
  { feature: 'Fortschrittstracking', kunde: true, starter: true, pro: true },
  { feature: 'Eigenes Trainer-Profil', kunde: false, starter: true, pro: true },
  { feature: 'In-App Chat', kunde: false, starter: true, pro: true },
  { feature: 'Terminverwaltung', kunde: false, starter: true, pro: true },
  { feature: 'Trainingsplan-Builder', kunde: false, starter: true, pro: true },
  { feature: 'Basis-Ernährungspläne', kunde: false, starter: true, pro: true },
  { feature: 'Aktive Kunden', kunde: '-', starter: 'Bis zu 15', pro: 'Unbegrenzt' },
  { feature: 'Erweiterte Trainingspläne', kunde: false, starter: false, pro: true },
  { feature: 'Detaillierte Ernährungspläne', kunde: false, starter: false, pro: true },
  { feature: 'Analytics & Reports', kunde: false, starter: false, pro: true },
  { feature: 'Prioritäts-Support', kunde: false, starter: false, pro: true },
  { feature: 'Top-Ranking Boost', kunde: false, starter: false, pro: true },
  { feature: 'Verifizierungs-Badge', kunde: false, starter: false, pro: true },
]

/* ── Pricing FAQ ── */
const pricingFaqItems = [
  {
    question: 'Was kostet FITNEXUS für Kunden?',
    answer: 'FITNEXUS ist für Kunden komplett kostenlos. Du kannst Coaches suchen, Profile ansehen, Erstgespräche buchen und Bewertungen schreiben – ohne einen Cent zu zahlen.',
  },
  {
    question: 'Was ist die Plattformgebühr von 7%?',
    answer: 'Bei jedem Vertrag, der über FITNEXUS abgeschlossen wird, fällt eine Plattformgebühr von 7% auf den Nettobetrag an. Diese deckt Zahlungsabwicklung, Support und die Plattform-Infrastruktur. Nach 6 Monaten durchgängiger Zusammenarbeit mit demselben Kunden entfällt die Gebühr für diesen Vertrag.',
  },
  {
    question: 'Kann ich jederzeit meinen Plan wechseln?',
    answer: 'Ja. Du kannst jederzeit vom Starter- auf den Pro-Plan upgraden. Beim Downgrade behältst du deinen aktuellen Plan bis zum Ende des Abrechnungszeitraums. Upgrades werden sofort wirksam und anteilig berechnet.',
  },
  {
    question: 'Gibt es eine Mindestlaufzeit?',
    answer: 'Nein. Alle Pläne sind monatlich kündbar. Du kannst jederzeit kündigen und behältst Zugang bis zum Ende des bezahlten Zeitraums. Keine versteckten Kosten, keine Bindung.',
  },
  {
    question: 'Welche Zahlungsmethoden werden akzeptiert?',
    answer: 'Wir akzeptieren Kreditkarte (Visa, Mastercard), SEPA-Lastschrift und PayPal. Alle Zahlungen laufen sicher über Stripe. Rechnungen werden automatisch erstellt und per E-Mail versendet.',
  },
  {
    question: 'Wie funktioniert die Abrechnung mit meinen Kunden?',
    answer: 'Wenn ein Kunde ein Paket bei dir bucht, läuft die Zahlung automatisch über FITNEXUS und Stripe. Du erhältst deine Auszahlung abzüglich der Plattformgebühr. Kein manuelles Rechnungsstellen nötig.',
  },
]

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="text-sm text-foreground font-medium">{value}</span>
  }
  if (value) {
    return <Check className="w-5 h-5 text-[#00FF94] mx-auto" />
  }
  return <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
}

export default function PricingPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F1A]" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-gradient-to-b from-[#00A8FF]/[0.06] to-transparent blur-[120px] opacity-50" aria-hidden="true" />
        <div className="absolute bottom-0 left-[15%] w-[300px] h-[300px] bg-gradient-to-t from-[#00FF94]/[0.04] to-transparent blur-[100px] opacity-40" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
          >
            <Shield className="w-4 h-4 text-[#00D4FF]" />
            <span className="text-xs text-muted-foreground font-medium tracking-brand">
              Monatlich kündbar. Keine versteckten Kosten.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-[1.08] mb-6"
          >
            <span className="text-foreground">Transparente </span>
            <span className="gradient-brand-text">Preise</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Kostenlos als Kunde. Faire Pläne als Coach. Wähle den Plan, der zu deinem Business passt.
          </motion.p>
        </div>
      </section>

      {/* ═══ PRICING CARDS ═══ */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {pricingPlans.map((plan) => (
              <StaggerItem key={plan.name}>
                <GlassCard
                  className={`flex flex-col p-8 lg:p-10 h-full ${plan.highlighted ? 'relative lg:scale-105' : ''}`}
                  hover={false}
                  neonBorder={plan.highlighted}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-brand text-[#0B0F1A] text-xs font-bold px-4 py-1 rounded-full shadow-[0_0_15px_rgba(0,168,255,0.3)]">
                      Beliebt
                    </span>
                  )}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      {plan.name === 'Kunde' && <Users className="w-5 h-5 text-[#00D4FF]" />}
                      {plan.name === 'Starter' && <Dumbbell className="w-5 h-5 text-[#00D4FF]" />}
                      {plan.name === 'Pro' && <Zap className="w-5 h-5 text-[#00FF94]" />}
                      <h3 className="text-xl font-heading font-semibold text-foreground">{plan.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="mb-8">
                    <span className="text-5xl font-heading font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                  </div>
                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-[#00FF94] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <GradientButton variant={plan.ctaVariant} outline={!plan.highlighted} size="lg" className="w-full">
                      {plan.ctaText}
                    </GradientButton>
                  </Link>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <AnimatedSection className="text-center mt-8">
            <p className="text-xs text-muted-foreground/60">
              Alle Preise zzgl. MwSt. Monatlich kündbar, ohne Mindestlaufzeit.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-20" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="Alle Features im Vergleich"
              subtitle="Detaillierte Übersicht aller Funktionen nach Plan."
            />
          </AnimatedSection>
          <AnimatedSection>
            <GlassCard className="overflow-hidden" hover={false}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left p-5 text-sm font-semibold text-foreground min-w-[200px]">Feature</th>
                      <th className="p-5 text-center text-sm font-semibold text-foreground w-[120px]">
                        <span className="block">Kunde</span>
                        <span className="block text-xs font-normal text-muted-foreground mt-0.5">Kostenlos</span>
                      </th>
                      <th className="p-5 text-center text-sm font-semibold text-foreground w-[120px]">
                        <span className="block">Starter</span>
                        <span className="block text-xs font-normal text-muted-foreground mt-0.5">49€/Mo</span>
                      </th>
                      <th className="p-5 text-center text-sm font-semibold w-[120px]">
                        <span className="block gradient-brand-text">Pro</span>
                        <span className="block text-xs font-normal text-muted-foreground mt-0.5">99€/Mo</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-white/[0.03] ${i % 2 === 0 ? 'bg-white/[0.01]' : ''} hover:bg-white/[0.02] transition-colors duration-200`}
                      >
                        <td className="p-4 pl-5 text-sm text-muted-foreground">{row.feature}</td>
                        <td className="p-4 text-center"><CellValue value={row.kunde} /></td>
                        <td className="p-4 text-center"><CellValue value={row.starter} /></td>
                        <td className="p-4 text-center"><CellValue value={row.pro} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ PLATFORM FEE ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00A8FF]/[0.03] blur-[180px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <GlassCard className="p-10 lg:p-14" hover={false} neonBorder>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl gradient-cyan flex items-center justify-center">
                  <Percent className="w-7 h-7 text-[#0B0F1A]" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">Plattformgebühr</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">Transparent und fair, mit eingebautem Cap</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#00A8FF]/[0.04] border border-[#00A8FF]/[0.08]">
                  <Info className="w-5 h-5 text-[#00D4FF] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">7% auf abgeschlossene Verträge</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Bei jedem Coaching-Vertrag, der über FITNEXUS abgeschlossen wird, fällt eine Plattformgebühr von 7% auf den Nettobetrag an.
                      Diese Gebühr deckt Zahlungsabwicklung, Plattform-Infrastruktur und Support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#00FF94]/[0.04] border border-[#00FF94]/[0.08]">
                  <Shield className="w-5 h-5 text-[#00FF94] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">Cap nach 6 Monaten</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Nach 6 Monaten durchgängiger Zusammenarbeit mit demselben Kunden entfällt die Plattformgebühr für diesen Vertrag.
                      Du hast den Kunden über FITNEXUS gewonnen und aufgebaut – ab jetzt profitierst du voll von der Zusammenarbeit.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {[
                    { label: 'Monat 1–6', value: '7%', desc: 'Plattformgebühr' },
                    { label: 'Ab Monat 7', value: '0%', desc: 'Keine Gebühr mehr' },
                    { label: 'Beispiel', value: '€ 7', desc: 'bei 100€ Vertrag' },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-2xl font-heading font-bold text-foreground">{item.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="Fragen zu den Preisen"
              subtitle="Hier findest du Antworten auf die häufigsten Fragen rund um Kosten und Abrechnung."
            />
          </AnimatedSection>
          <AnimatedSection>
            <FAQAccordion items={pricingFaqItems} />
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
            Starte kostenlos als Kunde oder wähle deinen Coach-Plan. Jederzeit kündbar.
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
