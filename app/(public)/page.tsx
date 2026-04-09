'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { SectionHeading } from '@/components/section-heading'
import { StarRating } from '@/components/star-rating'
import { FAQAccordion } from '@/components/faq-accordion'
import { TrainerCard } from '@/components/trainer-card'
import { AnimatedSection, StaggerGroup, StaggerItem, motion } from '@/components/motion'
import { mockTrainers, platformStats, pricingPlans, faqItems, testimonials } from '@/lib/mock-data'
import {
  Layers, Shield, Lock, UserPlus, Search, MessageCircle, Rocket,
  Dumbbell, Users, ClipboardList, Apple, TrendingUp, Star, Check,
  ArrowRight, MapPin, Zap, BarChart3, Clock, Eye,
} from 'lucide-react'

const usps = [
  {
    icon: Layers,
    title: 'Alles an einem Ort',
    description: 'Trainingspläne, Ernährung, Buchungen und Kommunikation – zentral in einer Plattform.',
  },
  {
    icon: Lock,
    title: 'Anonymität garantiert',
    description: 'Deine Daten bleiben geschützt. Erst nach Vertragsabschluss werden Kontaktdaten freigegeben.',
  },
  {
    icon: Shield,
    title: 'Sichere Verträge',
    description: 'Digitale Verträge mit transparenter Preisstruktur. Fair, rechtssicher und jederzeit einsehbar.',
  },
]

const steps = [
  { number: '01', icon: UserPlus, title: 'Registrieren', description: 'Erstelle dein kostenloses Profil in unter 2 Minuten.' },
  { number: '02', icon: Search, title: 'Coach finden', description: 'Filtere nach Standort, Spezialisierung und Bewertung.' },
  { number: '03', icon: MessageCircle, title: 'Kennenlernen', description: 'Buche ein unverbindliches Erstgespräch mit deinem Coach.' },
  { number: '04', icon: Rocket, title: 'Loslegen', description: 'Starte dein Training und tracke deinen Fortschritt.' },
]

const trainerFeatures = [
  { icon: Users, label: 'Leads erhalten' },
  { icon: ClipboardList, label: 'Kundenverwaltung' },
  { icon: Dumbbell, label: 'Trainingspläne' },
  { icon: Apple, label: 'Ernährungspläne' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Star, label: 'Bewertungen' },
]

// Show top 3 trainers as preview
const previewTrainers = mockTrainers.slice(0, 3)

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F1A]" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Ambient glows */}
        <div className="absolute top-0 right-[20%] w-[500px] h-[500px] rotate-[-30deg] bg-gradient-to-b from-[#00A8FF]/[0.07] to-transparent blur-[100px] opacity-60" aria-hidden="true" />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rotate-[15deg] bg-gradient-to-t from-[#00FF94]/[0.05] to-transparent blur-[100px] opacity-50" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00A8FF]/[0.02] blur-[200px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <div className="animate-float">
              <Image src="/logo.png" alt="FITNEXUS" width={120} height={120} className="drop-shadow-[0_0_30px_rgba(0,168,255,0.3)]" priority />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF94]" />
            </span>
            <span className="text-xs text-muted-foreground font-medium tracking-brand">
              Jetzt in der Beta verfügbar
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.08] mb-6"
          >
            <span className="text-foreground">Dein Coach.</span>
            <br />
            <span className="text-foreground">Deine Ziele.</span>
            <br />
            <span className="gradient-brand-text">Dein Nexus.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Die All-in-One Plattform für Fitness Coaching.
            <br className="hidden sm:block" />
            Finde, buche und trainiere – alles in einem System.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 max-w-md mx-auto sm:max-w-none"
          >
            <Link href="/trainers" className="w-full sm:w-auto">
              <GradientButton variant="cyan" size="xl" className="w-full sm:w-auto">
                <Search className="w-5 h-5" />
                Coach finden
              </GradientButton>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <GradientButton variant="green" size="xl" className="w-full sm:w-auto">
                <Zap className="w-5 h-5" />
                Als Coach starten
              </GradientButton>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {[
              { value: platformStats.trainers, label: 'Verifizierte Trainer', icon: Dumbbell },
              { value: platformStats.activeUsers, label: 'Aktive Nutzer', icon: Users },
              { value: platformStats.cities, label: 'Städte', icon: MapPin },
            ].map((stat) => (
              <GlassCard key={stat.label} className="flex items-center justify-center gap-3 py-4 px-5">
                <stat.icon className="w-5 h-5 text-[#00D4FF]" />
                <div className="text-left">
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
      </section>

      {/* ═══ USP ═══ */}
      <section id="usp" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-40" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              title="Warum FITNEXUS?"
              subtitle="Eine Plattform, die Trainer und Kunden verbindet – sicher, effizient und modern."
            />
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {usps.map((usp) => (
              <StaggerItem key={usp.title}>
                <GlassCard className="text-center p-8 group h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-cyan mb-6 group-hover:shadow-[0_0_25px_rgba(0,168,255,0.3)] transition-all duration-500">
                    <usp.icon className="w-6 h-6 text-[#0B0F1A]" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">{usp.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{usp.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#00A8FF]/[0.03] blur-[160px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading title="In 4 Schritten zum Erfolg" subtitle="Vom Account bis zum ersten Training – einfacher geht es nicht." />
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-[#00A8FF]/20 via-[#00D4FF]/10 to-[#00FF94]/20" aria-hidden="true" />
            {steps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="relative flex flex-col items-center text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center glass-card neon-border group-hover:shadow-[0_0_30px_rgba(0,168,255,0.15)] transition-all duration-500">
                      <step.icon className="w-8 h-8 text-[#00D4FF]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full gradient-cyan flex items-center justify-center text-xs font-bold text-[#0B0F1A]">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ FEATURED COACHES ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-20" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading title="Top Coaches entdecken" subtitle="Verifizierte Trainer mit nachgewiesener Expertise und echten Bewertungen." />
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {previewTrainers.map((trainer) => (
              <StaggerItem key={trainer.id}>
                <TrainerCard
                  id={trainer.slug}
                  name={trainer.display_name}
                  image={trainer.profile_image_url}
                  city={trainer.city}
                  categories={trainer.categories}
                  hourlyRate={trainer.hourly_rate}
                  rating={trainer.rating_average}
                  ratingCount={trainer.rating_count}
                  isVerified={trainer.is_verified}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <AnimatedSection className="text-center">
            <Link href="/trainers">
              <GradientButton variant="cyan" outline size="lg">
                Alle Coaches ansehen <ArrowRight className="w-4 h-4" />
              </GradientButton>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FOR TRAINERS ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00FF94]/[0.03] blur-[160px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection variants={{
              hidden: { opacity: 0, x: -32 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}>
              <p className="text-sm font-semibold tracking-brand-wide uppercase gradient-green-text mb-3">Für Coaches</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
                Dein Business.<br />
                <span className="gradient-green-text">Unsere Plattform.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Konzentrier dich auf das Coaching. Kundenverwaltung, Trainingspläne, Kommunikation und Abrechnung – das übernehmen wir.
              </p>
              <ul className="space-y-3 mb-8">
                {['Neue Kunden durch organische Sichtbarkeit', 'Professionelles Trainer-Profil', 'Bewertungen die Vertrauen schaffen', 'Alles in einer Plattform statt 5 Tools'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-[#00FF94] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/for-coaches">
                <GradientButton variant="green" size="lg">
                  Mehr erfahren <ArrowRight className="w-4 h-4" />
                </GradientButton>
              </Link>
            </AnimatedSection>

            <AnimatedSection variants={{
              hidden: { opacity: 0, x: 32 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}>
              <GlassCard className="p-8 lg:p-10" hover={false} neonBorder>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-6">Deine Tools auf einen Blick</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trainerFeatures.map((f) => (
                    <div key={f.label} className="flex items-center gap-3 p-3 rounded-xl bg-[#00FF94]/[0.03] border border-[#00FF94]/[0.08] hover:border-[#00FF94]/20 hover:bg-[#00FF94]/[0.06] transition-all duration-300">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#00FF94]/[0.08]">
                        <f.icon className="w-5 h-5 text-[#00FF94]" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{f.label}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-center opacity-20" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading title="Was unsere Community sagt" subtitle="Echte Stimmen von Trainern und Kunden auf FITNEXUS." />
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <GlassCard className="flex flex-col p-8 h-full">
                  <StarRating rating={t.rating} className="mb-4" />
                  <blockquote className="flex-1 text-sm text-muted-foreground leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</blockquote>
                  <div className="border-t border-[rgba(0,168,255,0.06)] pt-4 flex items-center gap-3">
                    <Image src={t.image} alt={t.name} width={40} height={40} className="rounded-full object-cover ring-2 ring-[rgba(0,168,255,0.15)]" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00A8FF]/[0.02] blur-[200px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading title="Transparente Preise" subtitle="Starte kostenlos als Kunde oder wähle den passenden Plan als Coach." />
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {pricingPlans.map((plan) => (
              <StaggerItem key={plan.name}>
                <GlassCard
                  className={`flex flex-col p-8 h-full ${plan.highlighted ? 'relative lg:scale-105' : ''}`}
                  hover={false}
                  neonBorder={plan.highlighted}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-brand text-[#0B0F1A] text-xs font-bold px-4 py-1 rounded-full shadow-[0_0_15px_rgba(0,168,255,0.3)]">
                      Beliebt
                    </span>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-heading font-bold text-foreground">{plan.price}</span>
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
                    <GradientButton variant={plan.ctaVariant} outline={!plan.highlighted} size="md" className="w-full">
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

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading title="Häufig gestellte Fragen" subtitle="Hier findest du Antworten auf die wichtigsten Fragen." />
          </AnimatedSection>
          <AnimatedSection>
            <FAQAccordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00A8FF]/[0.04] to-transparent" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00A8FF]/[0.05] blur-[150px]" aria-hidden="true" />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="" width={80} height={80} className="drop-shadow-[0_0_20px_rgba(0,168,255,0.25)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
            Bereit <span className="gradient-brand-text">loszulegen?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Egal ob Kunde oder Coach – dein nächstes Level beginnt hier.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <GradientButton variant="cyan" size="lg">Als Kunde starten <ArrowRight className="w-4 h-4" /></GradientButton>
            </Link>
            <Link href="/register">
              <GradientButton variant="green" size="lg">Als Coach starten <ArrowRight className="w-4 h-4" /></GradientButton>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
