'use client'

import Link from 'next/link'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { SectionHeading } from '@/components/section-heading'
import { AnimatedSection, StaggerGroup, StaggerItem } from '@/components/motion'
import {
  ArrowRight, Target, Lightbulb, Shield, Heart,
  MessageSquare, FileSpreadsheet, Smartphone, AlertTriangle,
  Layers, Dumbbell, BarChart3, Calendar, Users, Zap,
} from 'lucide-react'

const problems = [
  {
    icon: MessageSquare,
    label: 'Coaching ueber WhatsApp',
    description: 'Trainingsplaene als Sprachnachricht, Ernaehrungstipps zwischen Memes.',
  },
  {
    icon: FileSpreadsheet,
    label: 'Excel-Tabellen als System',
    description: 'Kundenverwaltung in Tabellen, die niemand pflegt oder wiederfindet.',
  },
  {
    icon: Smartphone,
    label: '5 verschiedene Apps',
    description: 'Kalender hier, Zahlungen dort, Plaene woanders. Kein Ueberblick, keine Effizienz.',
  },
  {
    icon: AlertTriangle,
    label: 'Keine Sicherheit',
    description: 'Muendliche Absprachen, keine Vertraege, keine geschuetzten Daten.',
  },
]

const solutions = [
  {
    icon: Dumbbell,
    title: 'Trainingsplaene',
    description: 'Individuell erstellt und digital verfuegbar.',
  },
  {
    icon: Calendar,
    title: 'Terminbuchung',
    description: 'Einfache Buchung und Verwaltung aller Sessions.',
  },
  {
    icon: BarChart3,
    title: 'Fortschrittstracking',
    description: 'Messbare Ergebnisse fuer Kunden und Coaches.',
  },
  {
    icon: Layers,
    title: 'Kundenverwaltung',
    description: 'Alle Kunden, Vertraege und Plaene an einem Ort.',
  },
  {
    icon: Shield,
    title: 'Sichere Vertraege',
    description: 'Digitale, rechtssichere Vertragsabwicklung.',
  },
  {
    icon: Users,
    title: 'Coach-Matching',
    description: 'Intelligente Vermittlung von Coach und Kunde.',
  },
]

const values = [
  {
    icon: Shield,
    title: 'Vertrauen',
    description: 'Datenschutz, sichere Vertraege und verifizierte Profile bilden das Fundament unserer Plattform. Ohne Vertrauen kein gutes Coaching.',
    color: 'cyan' as const,
  },
  {
    icon: Target,
    title: 'Qualitaet',
    description: 'Wir setzen auf verifizierte Coaches mit nachgewiesener Expertise. Jedes Profil wird geprueft, jede Bewertung ist echt.',
    color: 'green' as const,
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Die Fitnessbranche verdient bessere Tools. Wir entwickeln die Technologie, die Coaches und Kunden wirklich weiterbringt.',
    color: 'cyan' as const,
  },
  {
    icon: Heart,
    title: 'Community',
    description: 'FITNEXUS ist mehr als eine Plattform. Wir bauen ein Oekosystem, in dem Coaches und Kunden gemeinsam wachsen.',
    color: 'green' as const,
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F1A]" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-[15%] w-[400px] h-[400px] bg-gradient-to-b from-[#00A8FF]/[0.06] to-transparent blur-[100px] opacity-50" aria-hidden="true" />
        <div className="absolute bottom-0 right-[10%] w-[350px] h-[350px] bg-gradient-to-t from-[#00FF94]/[0.04] to-transparent blur-[100px] opacity-50" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-sm font-semibold tracking-brand-wide uppercase gradient-cyan-text mb-4">Ueber uns</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.08] mb-6">
              <span className="text-foreground">Die Zukunft des</span>
              <br />
              <span className="gradient-brand-text">Fitness Coachings</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              FITNEXUS verbindet Fitness Coaches und Kunden auf einer Plattform, die Professionalitaet, Sicherheit und Einfachheit vereint.
            </p>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
      </section>

      {/* ═══ VISION / MISSION ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-30" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection>
              <GlassCard className="p-10 h-full" hover={false} neonBorder>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl gradient-cyan mb-6 shadow-[0_0_20px_rgba(0,168,255,0.15)]">
                  <Target className="w-5 h-5 text-[#0B0F1A]" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Unsere Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Eine Welt, in der jeder Mensch Zugang zu professionellem Fitness Coaching hat und jeder Coach die Werkzeuge bekommt, um sein volles Potenzial auszuschoepfen. Wir glauben, dass grossartiges Coaching nicht an veralteter Technologie scheitern sollte.
                </p>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <GlassCard className="p-10 h-full" hover={false} neonBorder>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl gradient-green mb-6 shadow-[0_0_20px_rgba(0,255,148,0.15)]">
                  <Zap className="w-5 h-5 text-[#0B0F1A]" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Unsere Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wir entwickeln die Plattform, die die Fitnessbranche verdient. Eine zentrale Loesung, die Coaches professionalisiert, Kunden schuetzt und die Qualitaet im Fitness Coaching auf ein neues Level hebt. Transparent, sicher und fuer alle zugaenglich.
                </p>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#00A8FF]/[0.03] blur-[160px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="Das Problem"
              subtitle="Fitness Coaching ist eine der am wenigsten digitalisierten Branchen. Das aendern wir."
            />
          </AnimatedSection>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {problems.map((problem) => (
              <StaggerItem key={problem.label}>
                <GlassCard className="p-7 h-full group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-red-500/[0.08] border border-red-500/[0.12] flex items-center justify-center group-hover:bg-red-500/[0.12] transition-all duration-300">
                      <problem.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-heading font-semibold text-foreground mb-1.5">
                        {problem.label}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ OUR SOLUTION ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-20" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00FF94]/[0.04] blur-[160px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="Unsere Loesung"
              subtitle="Eine Plattform fuer alles. FITNEXUS vereint alle Werkzeuge, die Coaches und Kunden brauchen."
            />
          </AnimatedSection>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {solutions.map((solution) => (
              <StaggerItem key={solution.title}>
                <GlassCard className="p-7 h-full text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#00A8FF]/[0.08] border border-[#00A8FF]/[0.12] mb-4 group-hover:shadow-[0_0_20px_rgba(0,168,255,0.15)] transition-all duration-500">
                    <solution.icon className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <h3 className="text-base font-heading font-semibold text-foreground mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00A8FF]/[0.03] blur-[200px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="Unsere Werte"
              subtitle="Was uns antreibt und wie wir Entscheidungen treffen."
            />
          </AnimatedSection>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <GlassCard className="p-8 h-full" glow={value.color}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${
                    value.color === 'cyan'
                      ? 'gradient-cyan shadow-[0_0_20px_rgba(0,168,255,0.15)]'
                      : 'gradient-green shadow-[0_0_20px_rgba(0,255,148,0.15)]'
                  }`}>
                    <value.icon className="w-5 h-5 text-[#0B0F1A]" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-20" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <SectionHeading
              title="Das Team hinter FITNEXUS"
              subtitle="Leidenschaft fuer Fitness trifft auf technologische Exzellenz."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <GlassCard className="p-10 lg:p-14" hover={false} neonBorder>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Wir sind ein Team aus Fitness-Enthusiasten, Entwicklern und Designern, die selbst erlebt haben, wie fragmentiert und unprofessionell der Coaching-Markt oft ist. Diese Erfahrung hat uns motiviert, FITNEXUS zu gruenden.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Unser Ziel: Eine Plattform bauen, die wir selbst gerne nutzen wuerden. Als Kunden, die den perfekten Coach suchen. Und als Coaches, die endlich ein professionelles Werkzeug an der Hand haben.
              </p>
              <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF94]" />
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  Wir stellen ein. Interesse? <Link href="/contact" className="text-[#00D4FF] hover:underline underline-offset-4">Melde dich bei uns.</Link>
                </span>
              </div>
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
            Werde Teil von <span className="gradient-brand-text">FITNEXUS</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Egal ob als Kunde oder Coach. Die Zukunft des Fitness Coachings beginnt hier.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <GradientButton variant="cyan" size="lg">
                Kostenlos registrieren <ArrowRight className="w-4 h-4" />
              </GradientButton>
            </Link>
            <Link href="/how-it-works">
              <GradientButton variant="cyan" outline size="lg">
                So funktioniert&apos;s
              </GradientButton>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
