import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { SectionHeading } from '@/components/section-heading'
import { StarRating } from '@/components/star-rating'
import { FAQAccordion } from '@/components/faq-accordion'
import { DashboardScrollPreview } from '@/components/dashboard-scroll-preview'
import {
  Layers, Shield, FileCheck, UserPlus, Search, MessageCircle, Rocket,
  Dumbbell, Users, ClipboardList, Apple, TrendingUp, Star, Check,
  ArrowRight, MapPin, Zap, Lock, BarChart3,
} from 'lucide-react'

const stats = [
  { value: '500+', label: 'Verifizierte Trainer', icon: Dumbbell },
  { value: '10.000+', label: 'Aktive Nutzer', icon: Users },
  { value: '50+', label: 'Städte', icon: MapPin },
]

const usps = [
  {
    icon: Layers,
    title: 'Alles an einem Ort',
    description: 'Trainingspläne, Ernährung, Buchungen und Kommunikation – alles zentral in einer Plattform.',
  },
  {
    icon: Lock,
    title: 'Anonymität garantiert',
    description: 'Deine Daten bleiben geschützt. Erst nach Vertragsabschluss werden Details freigegeben.',
  },
  {
    icon: Shield,
    title: 'Sichere Verträge',
    description: 'Digitale Verträge mit rechtssicherer Grundlage. Transparent, fair und jederzeit einsehbar.',
  },
]

const steps = [
  { number: '01', icon: UserPlus, title: 'Registrieren', description: 'Erstelle dein kostenloses Profil in unter 2 Minuten.' },
  { number: '02', icon: Search, title: 'Coach finden', description: 'Filtere nach Standort, Spezialisierung und Bewertungen.' },
  { number: '03', icon: MessageCircle, title: 'Kennenlernen', description: 'Buche ein unverbindliches Erstgespräch mit deinem Wunsch-Coach.' },
  { number: '04', icon: Rocket, title: 'Loslegen', description: 'Starte dein individuelles Training und erreiche deine Ziele.' },
]

const trainerFeatures = [
  { icon: Users, label: 'Leads erhalten' },
  { icon: ClipboardList, label: 'Kundenverwaltung' },
  { icon: Dumbbell, label: 'Trainingspläne' },
  { icon: Apple, label: 'Ernährungspläne' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Star, label: 'Bewertungen' },
]

const testimonials = [
  {
    rating: 5,
    quote: 'Seit ich über FITNEXUS meinen Coach gefunden habe, trainiere ich strukturierter als je zuvor. Die Plattform macht es unglaublich einfach.',
    name: 'Laura M.',
    role: 'Kundin seit 2025',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    rating: 5,
    quote: 'Als Personal Trainer spare ich mir dank FITNEXUS 10 Stunden pro Woche an Verwaltungsaufwand. Alles an einem Ort.',
    name: 'Markus B.',
    role: 'Personal Trainer, München',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    rating: 5,
    quote: 'Die Anonymität am Anfang war für mich entscheidend. Mega Konzept – endlich eine Plattform, die mitdenkt!',
    name: 'Sophie H.',
    role: 'Kundin seit 2024',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
]

const pricingPlans = [
  {
    name: 'Kunde',
    price: 'Kostenlos',
    period: '',
    description: 'Perfekt für den Einstieg',
    features: ['Coach-Suche & Filter', 'Profil-Ansicht', 'Erstgespräch buchen', 'Bewertungen lesen', 'Basis-Fortschrittstracking'],
    highlighted: false,
    ctaVariant: 'cyan' as const,
  },
  {
    name: 'Starter',
    price: '49€',
    period: '/Monat',
    description: 'Für ambitionierte Trainer',
    features: ['Eigenes Trainer-Profil', 'Bis zu 15 aktive Kunden', 'Trainingsplan-Builder', 'Basis-Ernährungspläne', 'Chat mit Kunden', 'Terminverwaltung'],
    highlighted: false,
    ctaVariant: 'cyan' as const,
  },
  {
    name: 'Pro',
    price: '99€',
    period: '/Monat',
    description: 'Für professionelle Coaches',
    features: ['Alles aus Starter', 'Unbegrenzte Kunden', 'Erweiterte Trainingspläne', 'Detaillierte Ernährungspläne', 'Analytics & Reports', 'Prioritäts-Support', 'Mehr Sichtbarkeit', 'Top-Ranking Boost'],
    highlighted: true,
    ctaVariant: 'brand' as const,
  },
]

const faqItems = [
  { question: 'Ist FITNEXUS wirklich kostenlos für Kunden?', answer: 'Ja, als Kunde kannst du dich kostenlos registrieren, Trainer suchen, Profile ansehen und Erstgespräche buchen. Es fallen keine versteckten Kosten an.' },
  { question: 'Wie finde ich den richtigen Coach für mich?', answer: 'Nutze unsere intelligenten Filter: Standort, Spezialisierung (z.B. Krafttraining, Abnehmen, Rehabilitation), Preisspanne und Bewertungen. Dann buchst du ein kostenloses Erstgespräch.' },
  { question: 'Wie funktioniert die Anonymität?', answer: 'Deine persönlichen Kontaktdaten werden erst freigegeben, wenn du und dein Trainer einen Vertrag abschließen. Vorher kommuniziert ihr ausschließlich über die sichere FITNEXUS-Plattform.' },
  { question: 'Kann ich als Trainer FITNEXUS vorab testen?', answer: 'Ja! Du kannst dein Trainer-Profil kostenlos erstellen und die Plattform kennenlernen. Ein Upgrade auf Starter oder Pro ist jederzeit möglich.' },
  { question: 'Welche Zahlungsmethoden werden akzeptiert?', answer: 'Wir akzeptieren Kreditkarte (Visa, Mastercard), SEPA-Lastschrift und PayPal. Alle Zahlungen werden sicher über Stripe abgewickelt.' },
  { question: 'Kann ich meinen Plan jederzeit kündigen?', answer: 'Ja, alle Pläne sind monatlich kündbar – ohne Mindestlaufzeit. Du behältst den Zugang bis zum Ende des Abrechnungszeitraums.' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[#0B0F1A]" />
          <div className="absolute inset-0 bg-radial-top" />
          <div className="absolute inset-0 bg-grid opacity-30" />

          {/* Ambient light streaks */}
          <div className="absolute top-0 right-[20%] w-[500px] h-[500px] rotate-[-30deg] bg-gradient-to-b from-[#00A8FF]/[0.07] to-transparent blur-[100px] opacity-60" aria-hidden="true" />
          <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rotate-[15deg] bg-gradient-to-t from-[#00FF94]/[0.05] to-transparent blur-[100px] opacity-50" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00A8FF]/[0.02] blur-[200px]" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
            {/* Logo Icon */}
            <div className="flex justify-center mb-8">
              <div className="animate-float">
                <Image src="/logo.png" alt="FITNEXUS" width={120} height={120} className="drop-shadow-[0_0_30px_rgba(0,168,255,0.3)]" priority />
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 shimmer">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF94]" />
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-brand">
                Jetzt in der Beta verfügbar
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.08] mb-6">
              <span className="text-foreground">Dein Coach.</span>
              <br />
              <span className="text-foreground">Deine Ziele.</span>
              <br />
              <span className="gradient-brand-text">Dein Nexus.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
              Die All-in-One Plattform für Fitness Coaching.
              <br className="hidden sm:block" />
              Finde, buche und trainiere – alles in einem System.
            </p>

            {/* CTAs — Prototype Style */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 max-w-md mx-auto sm:max-w-none">
              <Link href="/search" className="w-full sm:w-auto">
                <GradientButton variant="cyan" size="xl" className="w-full sm:w-auto">
                  <Search className="w-5 h-5" />
                  Ich suche einen Coach
                </GradientButton>
              </Link>
              <Link href="/auth/register" className="w-full sm:w-auto">
                <GradientButton variant="green" size="xl" className="w-full sm:w-auto">
                  <Zap className="w-5 h-5" />
                  Ich bin ein Coach
                </GradientButton>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <GlassCard key={stat.label} className="flex items-center justify-center gap-3 py-4 px-5">
                  <stat.icon className="w-5 h-5 text-[#00D4FF]" />
                  <div className="text-left">
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
        </section>

        {/* ═══ DASHBOARD SCROLL PREVIEW ═══ */}
        <DashboardScrollPreview />

        {/* ═══ USP ═══ */}
        <section id="usp" className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-radial-center opacity-40" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Alles was du brauchst" subtitle="Eine Plattform, die Trainer und Kunden verbindet – sicher, effizient und modern." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {usps.map((usp, i) => (
                <GlassCard key={usp.title} className="text-center p-8 group" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-cyan mb-6 group-hover:shadow-[0_0_25px_rgba(0,168,255,0.3)] transition-all duration-500">
                    <usp.icon className="w-6 h-6 text-[#0B0F1A]" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">{usp.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{usp.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#00A8FF]/[0.03] blur-[160px]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="In 4 Schritten zum Erfolg" subtitle="Vom Account bis zum ersten Training – einfacher geht es nicht." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
              <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-[#00A8FF]/20 via-[#00D4FF]/10 to-[#00FF94]/20" aria-hidden="true" />
              {steps.map((step) => (
                <div key={step.number} className="relative flex flex-col items-center text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center glass-card neon-border group-hover:shadow-[0_0_30px_rgba(0,168,255,0.15)] transition-all duration-500">
                      <step.icon className="w-8 h-8 text-[#00D4FF]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full gradient-cyan flex items-center justify-center text-xs font-bold text-[#0B0F1A]">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FOR TRAINERS ═══ */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00FF94]/[0.03] blur-[160px]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-sm font-semibold tracking-brand-wide uppercase gradient-green-text mb-3">Für Coaches</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-4">Für Coaches gebaut</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">Konzentrier dich auf das, was du liebst – das Coaching. Den Rest übernehmen wir.</p>
                <Link href="/auth/register">
                  <GradientButton variant="green" size="lg">Als Coach starten <ArrowRight className="w-4 h-4" /></GradientButton>
                </Link>
              </div>
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
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-radial-center opacity-20" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Was unsere Community sagt" subtitle="Echte Stimmen von Trainern und Kunden, die FITNEXUS nutzen." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <GlassCard key={t.name} className="flex flex-col p-8">
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
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRICING ═══ */}
        <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00A8FF]/[0.02] blur-[200px]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Transparente Preise" subtitle="Starte kostenlos als Kunde oder wähle den passenden Plan als Coach." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {pricingPlans.map((plan) => (
                <GlassCard key={plan.name} className={`flex flex-col p-8 ${plan.highlighted ? 'relative lg:scale-105' : ''}`} hover={false} neonBorder={plan.highlighted}>
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-brand text-[#0B0F1A] text-xs font-bold px-4 py-1 rounded-full shadow-[0_0_15px_rgba(0,168,255,0.3)]">Beliebt</span>
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
                  <Link href="/auth/register">
                    <GradientButton variant={plan.ctaVariant} outline={!plan.highlighted} size="md" className="w-full">
                      {plan.highlighted ? 'Pro wählen' : plan.price === 'Kostenlos' ? 'Jetzt starten' : 'Starter wählen'}
                    </GradientButton>
                  </Link>
                </GlassCard>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground/60 mt-8">
              Zusätzlich: 7% Plattformgebühr pro abgeschlossenem Vertrag, gedeckelt nach 6 Monaten pro Kunde.
            </p>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Häufig gestellte Fragen" subtitle="Hier findest du Antworten auf die wichtigsten Fragen." />
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00A8FF]/[0.04] to-transparent" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00A8FF]/[0.05] blur-[150px]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
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
              <Link href="/auth/register">
                <GradientButton variant="cyan" size="lg">Als Kunde starten <ArrowRight className="w-4 h-4" /></GradientButton>
              </Link>
              <Link href="/auth/register">
                <GradientButton variant="green" size="lg">Als Coach starten <ArrowRight className="w-4 h-4" /></GradientButton>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
