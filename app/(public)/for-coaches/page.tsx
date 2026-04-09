'use client'

import Link from 'next/link'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { SectionHeading } from '@/components/section-heading'
import { FAQAccordion } from '@/components/faq-accordion'
import { AnimatedSection, StaggerGroup, StaggerItem, motion } from '@/components/motion'
import { pricingPlans } from '@/lib/mock-data'
import {
  ArrowRight, Check, MessageSquareWarning, TableProperties, EyeOff,
  Receipt, Users, UserCircle, ClipboardList, Dumbbell, Star, TrendingUp,
  BarChart3, Apple, Calendar, MessageCircle, Shield, BadgeCheck, Trophy,
  Zap, Target, ChevronRight, Sparkles, Clock, Heart,
} from 'lucide-react'

/* ── Pain Points ── */
const painPoints = [
  {
    icon: MessageSquareWarning,
    title: 'WhatsApp-Chaos',
    description: 'Kundenanfragen, Terminabsprachen und Trainingspläne verstreut über Chats. Kein System, kein Überblick.',
  },
  {
    icon: TableProperties,
    title: 'Excel-Listen & Zettelwirtschaft',
    description: 'Kundendaten in Tabellen, Fortschritte auf Papier. Zeitfresser, die dich vom Coaching abhalten.',
  },
  {
    icon: EyeOff,
    title: 'Keine Sichtbarkeit',
    description: 'Potenzielle Kunden finden dich nicht. Mundpropaganda allein reicht nicht mehr.',
  },
  {
    icon: Receipt,
    title: 'Manuelle Abrechnung',
    description: 'Rechnungen schreiben, Zahlungen nachverfolgen, Mahnungen verschicken. Zeit, die du besser investierst.',
  },
]

/* ── What FITNEXUS offers ── */
const offerings = [
  {
    icon: Users,
    title: 'Leads & Neukunden',
    description: 'Kunden finden dich über unsere Suche, filtern nach Spezialisierung und Standort. Du bekommst qualifizierte Anfragen.',
  },
  {
    icon: UserCircle,
    title: 'Professionelles Profil',
    description: 'Dein digitaler Auftritt: Bio, Spezialisierungen, Pakete, Bewertungen, Galerie. Alles in einer hochwertigen Profilseite.',
  },
  {
    icon: ClipboardList,
    title: 'CRM & Kundenverwaltung',
    description: 'Alle Kunden, Verträge, Fortschritte und Notizen an einem Ort. Übersichtlich, strukturiert, immer aktuell.',
  },
  {
    icon: Dumbbell,
    title: 'Trainings- & Ernährungspläne',
    description: 'Erstelle professionelle Pläne mit unserem Builder. Teile sie direkt mit deinen Kunden in der App.',
  },
  {
    icon: Star,
    title: 'Bewertungen & Reputation',
    description: 'Echte, verifizierte Bewertungen von deinen Kunden. Baue Vertrauen auf und hebe dich von der Konkurrenz ab.',
  },
  {
    icon: TrendingUp,
    title: 'Ranking & Sichtbarkeit',
    description: 'Je besser dein Profil, deine Bewertungen und dein Engagement, desto höher dein Ranking in der Suche.',
  },
]

/* ── Feature Grid ── */
const features = [
  { icon: Calendar, label: 'Terminverwaltung', desc: 'Online-Buchung, Kalender-Sync und automatische Erinnerungen.' },
  { icon: MessageCircle, label: 'In-App Messaging', desc: 'Sichere Kommunikation mit deinen Kunden. Kein WhatsApp nötig.' },
  { icon: BarChart3, label: 'Analytics & Reports', desc: 'Umsatz, Kundenwachstum und Performance auf einen Blick.' },
  { icon: Apple, label: 'Ernährungspläne', desc: 'Individuelle Pläne erstellen und direkt mit Kunden teilen.' },
  { icon: Shield, label: 'Sichere Verträge', desc: 'Digitale Verträge mit transparenter Preisstruktur.' },
  { icon: Zap, label: 'Automatische Abrechnung', desc: 'Zahlungen laufen automatisch über Stripe. Kein Mahnwesen.' },
]

/* ── Trust elements ── */
const trustPoints = [
  { icon: BadgeCheck, title: 'Verifizierungs-Badge', description: 'Lade Zertifikate hoch und erhalte ein Vertrauens-Badge auf deinem Profil.' },
  { icon: Star, title: 'Echte Bewertungen', description: 'Nur Kunden mit abgeschlossenem Training können bewerten. Keine Fake-Reviews.' },
  { icon: Trophy, title: 'Top-Coach Ranking', description: 'Konsistente Qualität wird belohnt. Top-Coaches erhalten Premium-Platzierungen.' },
]

/* ── Filter coach plans ── */
const coachPlans = pricingPlans.filter((p) => p.name !== 'Kunde')

export default function ForCoachesPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F1A]" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* Ambient glows - green-dominant for coach page */}
        <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] rotate-[-20deg] bg-gradient-to-b from-[#00FF94]/[0.08] to-transparent blur-[120px] opacity-60" aria-hidden="true" />
        <div className="absolute bottom-[15%] left-[10%] w-[400px] h-[400px] rotate-[25deg] bg-gradient-to-t from-[#00A8FF]/[0.05] to-transparent blur-[100px] opacity-40" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#00FF94]" />
            <span className="text-xs text-muted-foreground font-medium tracking-brand">
              Die Plattform fur ambitionierte Coaches
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.08] mb-6"
          >
            <span className="text-foreground">Mehr Kunden.</span>
            <br />
            <span className="text-foreground">Weniger Chaos.</span>
            <br />
            <span className="gradient-green-text">Dein Nexus.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            FITNEXUS gibt dir die Tools, die Sichtbarkeit und die Struktur,
            damit du dich auf das konzentrierst, was du am besten kannst: Coaching.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <GradientButton variant="green" size="xl">
                Jetzt kostenlos starten <ArrowRight className="w-5 h-5" />
              </GradientButton>
            </Link>
            <Link href="/pricing">
              <GradientButton variant="cyan" size="xl" outline>
                Preise ansehen
              </GradientButton>
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
      </section>

      {/* ═══ PAIN POINTS ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-30" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="Kommt dir das bekannt vor?"
              subtitle="Die meisten Fitness-Coaches kämpfen mit denselben Problemen. Es wird Zeit, sie zu lösen."
              gradient={false}
            />
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {painPoints.map((point) => (
              <StaggerItem key={point.title}>
                <GlassCard className="p-8 h-full group" glow="none">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-red-500/[0.08] border border-red-500/[0.12] flex items-center justify-center group-hover:bg-red-500/[0.12] transition-all duration-300">
                      <point.icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{point.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ TRANSITION ═══ */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-green mb-6">
              <Target className="w-7 h-7 text-[#0B0F1A]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4">
              Es gibt einen <span className="gradient-green-text">besseren Weg.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              FITNEXUS vereint alles, was du als Coach brauchst, in einer einzigen Plattform.
              Kein Tool-Hopping. Kein Chaos. Kein Stress.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ WHAT FITNEXUS OFFERS ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00FF94]/[0.04] blur-[180px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="Was FITNEXUS dir bietet"
              subtitle="Von der Kundenakquise bis zur Trainingsplanung. Alles aus einer Hand."
            />
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item) => (
              <StaggerItem key={item.title}>
                <GlassCard className="p-8 h-full group" glow="green">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00FF94]/[0.08] border border-[#00FF94]/[0.12] mb-6 group-hover:bg-[#00FF94]/[0.14] group-hover:shadow-[0_0_25px_rgba(0,255,148,0.15)] transition-all duration-500">
                    <item.icon className="w-6 h-6 text-[#00FF94]" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ FEATURES GRID ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-20" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="Deine Tools auf einen Blick"
              subtitle="Professionelle Werkzeuge, die deinen Coaching-Alltag transformieren."
            />
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <StaggerItem key={feature.label}>
                <GlassCard className="p-6 h-full group" hover>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl gradient-green flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,148,0.25)] transition-all duration-500">
                      <feature.icon className="w-5 h-5 text-[#0B0F1A]" />
                    </div>
                    <div>
                      <h3 className="text-base font-heading font-semibold text-foreground mb-1">{feature.label}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00A8FF]/[0.03] blur-[200px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="Einfache, faire Preise"
              subtitle="Kein Kleingedrucktes. Monatlich kündbar. Starte mit dem Plan, der zu dir passt."
            />
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {coachPlans.map((plan) => (
              <StaggerItem key={plan.name}>
                <GlassCard
                  className={`flex flex-col p-8 h-full ${plan.highlighted ? 'relative' : ''}`}
                  hover={false}
                  neonBorder={plan.highlighted}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-brand text-[#0B0F1A] text-xs font-bold px-4 py-1 rounded-full shadow-[0_0_15px_rgba(0,168,255,0.3)]">
                      Empfohlen
                    </span>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-heading font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
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
            <Link href="/pricing" className="inline-flex items-center gap-1.5 text-sm text-[#00D4FF] hover:text-[#00FF94] transition-colors duration-300">
              Alle Preise im Detail vergleichen <ChevronRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ TRUST / REPUTATION ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00FF94]/[0.04] blur-[160px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection variants={{
              hidden: { opacity: 0, x: -32 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}>
              <p className="text-sm font-semibold tracking-brand-wide uppercase gradient-green-text mb-3">Reputation</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
                Deine Reputation<br />
                <span className="gradient-green-text">wächst mit dir.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Auf FITNEXUS entscheidet Qualität. Jede Bewertung, jedes abgeschlossene Coaching und jedes Zertifikat
                stärkt dein Profil und deine Sichtbarkeit.
              </p>
              <ul className="space-y-4">
                {trustPoints.map((point) => (
                  <li key={point.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#00FF94]/[0.08] border border-[#00FF94]/[0.12] flex items-center justify-center">
                      <point.icon className="w-5 h-5 text-[#00FF94]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-0.5">{point.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection variants={{
              hidden: { opacity: 0, x: 32 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}>
              <GlassCard className="p-8 lg:p-10" hover={false} neonBorder>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF94]/20 to-[#00A8FF]/20 flex items-center justify-center">
                    <span className="text-lg">💪</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Max Müller</p>
                    <p className="text-xs text-muted-foreground">Personal Trainer, Berlin</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <BadgeCheck className="w-5 h-5 text-[#00A8FF]" />
                  </div>
                </div>

                {/* Mock profile stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { value: '4.9', label: 'Bewertung', icon: Star },
                    { value: '89', label: 'Kunden', icon: Users },
                    { value: '47', label: 'Reviews', icon: Heart },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <stat.icon className="w-4 h-4 text-[#00FF94] mx-auto mb-1.5" />
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mock ranking bar */}
                <div className="p-4 rounded-xl bg-[#00FF94]/[0.04] border border-[#00FF94]/[0.08]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-foreground">Ranking Score</span>
                    <span className="text-xs font-bold gradient-green-text">Top 5%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-[#00CC76] to-[#39FF14]" />
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-20" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <GlassCard className="p-10 lg:p-14 text-center" hover={false}>
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#00FF94] fill-[#00FF94]" />
                  ))}
                </div>
              </div>
              <blockquote className="text-xl sm:text-2xl font-heading text-foreground leading-relaxed mb-8">
                &ldquo;Seit ich FITNEXUS nutze, spare ich mir 10 Stunden pro Woche an Verwaltung.
                Trainingsplanung, Kommunikation, Check-ins &ndash; alles an einem Ort.
                Endlich kann ich mich voll auf meine Kunden konzentrieren.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF94]/20 to-[#00A8FF]/20 flex items-center justify-center">
                  <span className="text-lg font-bold gradient-green-text">MB</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">Markus B.</p>
                  <p className="text-xs text-muted-foreground">Personal Trainer, München</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-white/[0.04]">
                {[
                  { icon: Clock, text: '10h gespart / Woche' },
                  { icon: Users, text: '32 aktive Kunden' },
                  { icon: TrendingUp, text: '+140% Umsatz' },
                ].map((stat) => (
                  <div key={stat.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <stat.icon className="w-3.5 h-3.5 text-[#00FF94]" />
                    {stat.text}
                  </div>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF94]/[0.03] to-transparent" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00FF94]/[0.05] blur-[150px]" aria-hidden="true" />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-green mb-8 shadow-[0_0_40px_rgba(0,255,148,0.2)]">
            <Zap className="w-9 h-9 text-[#0B0F1A]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
            Bereit, dein Coaching<br />
            <span className="gradient-green-text">aufs nächste Level</span> zu bringen?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Erstelle dein Profil in unter 5 Minuten. Kostenlos starten, jederzeit upgraden.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <GradientButton variant="green" size="xl">
                Jetzt als Coach starten <ArrowRight className="w-5 h-5" />
              </GradientButton>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-6">
            Keine Kreditkarte nötig. Profil erstellen ist kostenlos.
          </p>
        </AnimatedSection>
      </section>
    </>
  )
}
