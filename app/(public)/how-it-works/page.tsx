'use client'

import Link from 'next/link'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { SectionHeading } from '@/components/section-heading'
import { AnimatedSection, StaggerGroup, StaggerItem } from '@/components/motion'
import {
  UserPlus, Search, MessageCircle, Rocket, ArrowRight,
  Shield, Lock, Star, FileCheck, TrendingUp, Users,
  BarChart3, Dumbbell, Eye, Clock, CheckCircle2, Heart,
} from 'lucide-react'

const customerSteps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Profil erstellen',
    description: 'Registriere dich kostenlos und erstelle dein persoenliches Profil. Gib deine Ziele, Erfahrung und Praeferenzen an, damit wir den perfekten Coach fuer dich finden koennen.',
    details: [
      'Kostenlose Registrierung in unter 2 Minuten',
      'Keine Kreditkarte erforderlich',
      'Deine Daten bleiben anonym bis zum Vertragsabschluss',
    ],
  },
  {
    number: '02',
    icon: Search,
    title: 'Coach finden',
    description: 'Durchsuche verifizierte Coaches in deiner Naehe. Filtere nach Spezialisierung, Standort, Preis und Bewertungen, um den idealen Coach fuer deine Ziele zu finden.',
    details: [
      'Filter nach Standort, Kategorie und Preis',
      'Echte Bewertungen von verifizierten Kunden',
      'Detaillierte Coach-Profile mit Qualifikationen',
    ],
  },
  {
    number: '03',
    icon: MessageCircle,
    title: 'Kennenlernen',
    description: 'Buche ein unverbindliches Erstgespraech direkt ueber die Plattform. Lerne deinen Coach kennen, besprich deine Ziele und finde heraus, ob die Chemie stimmt.',
    details: [
      'Unverbindliches Erstgespraech inklusive',
      'Sichere Kommunikation ueber die Plattform',
      'Keine Kontaktdaten-Weitergabe vor Vertragsabschluss',
    ],
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Training starten',
    description: 'Nach dem Match schliesst ihr einen transparenten Vertrag ab. Dein Coach erstellt deinen individuellen Plan und ihr startet gemeinsam durch.',
    details: [
      'Digitaler Vertrag mit transparenten Konditionen',
      'Individuelle Trainings- und Ernaehrungsplaene',
      'Fortschrittstracking in Echtzeit',
    ],
  },
]

const coachBenefits = [
  {
    icon: Users,
    title: 'Neue Kunden gewinnen',
    description: 'Erhalte organische Anfragen von motivierten Kunden in deiner Region, ohne selbst Marketing betreiben zu muessen.',
  },
  {
    icon: Dumbbell,
    title: 'Professionelle Tools',
    description: 'Erstelle Trainings- und Ernaehrungsplaene, verwalte Termine und kommuniziere mit Kunden in einer Plattform.',
  },
  {
    icon: BarChart3,
    title: 'Wachstum tracken',
    description: 'Detaillierte Analytics zeigen dir, wie dein Business waechst. Umsatz, Kundenzufriedenheit und mehr auf einen Blick.',
  },
  {
    icon: Star,
    title: 'Reputation aufbauen',
    description: 'Echte, verifizierte Bewertungen staerken dein Profil und schaffen Vertrauen bei neuen Interessenten.',
  },
  {
    icon: FileCheck,
    title: 'Sichere Vertraege',
    description: 'Digitale Vertragsabwicklung mit klarer Preisstruktur. Fair, rechtssicher und automatisiert.',
  },
  {
    icon: TrendingUp,
    title: 'Mehr Fokus aufs Coaching',
    description: 'Weniger Administration, mehr Zeit fuer das, was du liebst: deine Kunden zum Erfolg fuehren.',
  },
]

const trustPoints = [
  {
    icon: Lock,
    title: 'Anonymitaet garantiert',
    description: 'Deine persoenlichen Daten und Kontaktinformationen bleiben geschuetzt. Erst nach einem beidseitigen Match und Vertragsabschluss werden relevante Daten freigegeben.',
  },
  {
    icon: Shield,
    title: 'Sichere Vertraege',
    description: 'Alle Vertraege werden digital und transparent abgewickelt. Klare Konditionen, faire Preise und jederzeitige Einsicht in alle Vereinbarungen.',
  },
  {
    icon: Star,
    title: 'Verifizierte Bewertungen',
    description: 'Nur Kunden mit abgeschlossenem Vertrag koennen Bewertungen abgeben. So stellst du sicher, dass jedes Feedback auf echten Erfahrungen basiert.',
  },
  {
    icon: Eye,
    title: 'Volle Transparenz',
    description: 'Keine versteckten Kosten, keine boesen Ueberraschungen. Alle Preise, Leistungen und Bedingungen sind von Anfang an klar kommuniziert.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F1A]" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 right-[20%] w-[500px] h-[500px] rotate-[-30deg] bg-gradient-to-b from-[#00A8FF]/[0.06] to-transparent blur-[100px] opacity-60" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-sm font-semibold tracking-brand-wide uppercase gradient-cyan-text mb-4">So funktioniert&apos;s</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.08] mb-6">
              <span className="text-foreground">Dein Weg zum</span>{' '}
              <span className="gradient-brand-text">perfekten Coach</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              In vier einfachen Schritten findest du den idealen Fitness Coach und startest dein individuelles Training. Sicher, transparent und unkompliziert.
            </p>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
      </section>

      {/* ═══ 4-STEP PROCESS ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#00A8FF]/[0.03] blur-[160px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="In 4 Schritten zum Erfolg"
              subtitle="Vom kostenlosen Account bis zum ersten Training. Einfacher geht es nicht."
            />
          </AnimatedSection>

          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
            {customerSteps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 0.1}>
                <GlassCard className="p-8 lg:p-10 h-full" hover={false}>
                  <div className="flex items-start gap-6">
                    {/* Step indicator */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center gradient-cyan shadow-[0_0_25px_rgba(0,168,255,0.2)]">
                          <step.icon className="w-7 h-7 text-[#0B0F1A]" />
                        </div>
                        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0B0F1A] border-2 border-[#00D4FF] flex items-center justify-center text-xs font-bold text-[#00D4FF]">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        {step.description}
                      </p>
                      <ul className="space-y-2.5">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#00FF94] mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground/90">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA between sections */}
          <AnimatedSection className="text-center mt-14">
            <Link href="/trainers">
              <GradientButton variant="cyan" size="lg">
                <Search className="w-4 h-4" />
                Jetzt Coach finden
              </GradientButton>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FOR COACHES ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-30" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00FF94]/[0.04] blur-[160px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-sm font-semibold tracking-brand-wide uppercase gradient-green-text mb-3 text-center">Fuer Coaches</p>
            <SectionHeading
              title="Dein Business, professionell aufgestellt"
              subtitle="FITNEXUS gibt dir die Werkzeuge, um dich auf das Wesentliche zu konzentrieren: grossartiges Coaching."
            />
          </AnimatedSection>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coachBenefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <GlassCard className="p-8 h-full group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#00FF94]/[0.08] border border-[#00FF94]/[0.12] mb-5 group-hover:shadow-[0_0_20px_rgba(0,255,148,0.15)] transition-all duration-500">
                    <benefit.icon className="w-5 h-5 text-[#00FF94]" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <AnimatedSection className="text-center mt-14">
            <Link href="/for-coaches">
              <GradientButton variant="green" size="lg">
                Mehr ueber FITNEXUS fuer Coaches <ArrowRight className="w-4 h-4" />
              </GradientButton>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ TRUST ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00A8FF]/[0.03] blur-[200px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="Sicherheit & Vertrauen"
              subtitle="Datenschutz und Transparenz sind keine Features. Sie sind unser Fundament."
            />
          </AnimatedSection>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {trustPoints.map((point) => (
              <StaggerItem key={point.title}>
                <GlassCard className="p-8 h-full" hover={false} neonBorder>
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,168,255,0.15)]">
                      <point.icon className="w-5 h-5 text-[#0B0F1A]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                        {point.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00A8FF]/[0.04] to-transparent" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00A8FF]/[0.05] blur-[150px]" aria-hidden="true" />

        <AnimatedSection className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
            Bereit fuer <span className="gradient-brand-text">dein naechstes Level?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Starte jetzt kostenlos und finde den Coach, der zu dir passt. Oder werde selbst Teil der FITNEXUS Community als Coach.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/trainers">
              <GradientButton variant="cyan" size="lg">
                Coach finden <ArrowRight className="w-4 h-4" />
              </GradientButton>
            </Link>
            <Link href="/register">
              <GradientButton variant="green" size="lg">
                Als Coach starten <ArrowRight className="w-4 h-4" />
              </GradientButton>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
