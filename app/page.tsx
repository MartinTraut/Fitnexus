import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GradientButton } from '@/components/gradient-button'
import { StarRating } from '@/components/star-rating'
import { FAQAccordion } from '@/components/faq-accordion'
import { DashboardScrollPreview } from '@/components/dashboard-scroll-preview'
import { Marquee } from '@/components/marquee'
import { AppShowcase } from '@/components/app-showcase'
import {
  Layers, Shield, FileCheck, UserPlus, Search, MessageCircle, Rocket,
  Dumbbell, Users, ClipboardList, Apple, TrendingUp, Star, Check,
  ArrowRight, MapPin, Zap, Lock, BarChart3, Eye, Fingerprint, ChevronRight,
  Heart, Activity, Target, Flame, Trophy, Clock, AlertTriangle,
  Smartphone, Globe, CreditCard, Headphones, BadgeCheck, Sparkles,
  BrainCircuit, CalendarCheck, HandshakeIcon, ShieldCheck, Wallet, Crown,
  Timer, Gauge, CircleDollarSign, UserCheck, LineChart, MessageSquare,
  Upload, Award, ScanEye, FileWarning, GraduationCap,
} from 'lucide-react'

/* ── Animated Health Ring (Orbix-inspired) ── */
function HealthRing({ value, label, color, size = 64 }: { value: number; label: string; color: string; size?: number }) {
  const r = (size - 8) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="5" />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          className="drop-shadow-[0_0_6px_var(--ring-glow)]"
          style={{ '--ring-glow': `${color}66` } as React.CSSProperties}
        />
        <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central" fontSize={size * 0.22} fontWeight="700" fill="white">
          {value}%
        </text>
      </svg>
      <span className="text-[10px] text-muted-foreground/70 tracking-wide uppercase">{label}</span>
    </div>
  )
}

/* ── Data ── */

const marqueeItems = [
  'Personal Training', 'Yoga', 'Krafttraining', 'CrossFit', 'Boxen',
  'Pilates', 'Functional Training', 'HIIT', 'Calisthenics', 'Mobility',
  'Berlin', 'München', 'Hamburg', 'Köln', 'Frankfurt', 'Stuttgart',
  'Düsseldorf', 'Leipzig',
]

const clientPainPoints = [
  { icon: FileWarning, text: 'Selbsternannte "Coaches" ohne Ausbildung, die nach 2 YouTube-Videos Trainingspläne verkaufen.' },
  { icon: Eye, text: 'Keine Ahnung, ob die Bewertungen echt sind oder die Zertifikate überhaupt existieren.' },
  { icon: CreditCard, text: 'Erst zahlen, dann merken: Der Coach hat null Ahnung und es passt überhaupt nicht.' },
  { icon: MessageCircle, text: 'Trainingspläne per WhatsApp. Ernährung per PDF. Null Struktur, reines Chaos.' },
]

const coachPainPoints = [
  { icon: Clock, text: 'Mehr Zeit mit Excel-Tabellen als mit deinen Kunden verbringen.' },
  { icon: Smartphone, text: 'Kunden über 5 verschiedene Apps gleichzeitig betreuen.' },
  { icon: Globe, text: 'Social Media ohne Ende — aber trotzdem keine planbaren Neukunden.' },
  { icon: AlertTriangle, text: 'Mit Hobby-Coaches in einen Topf geworfen werden, obwohl du echte Lizenzen hast.' },
]

const clientBenefits = [
  {
    icon: GraduationCap,
    title: 'Nur lizenzierte, geprüfte Coaches',
    description: 'Jeder Coach muss echte Trainingslizenzen und Zertifikate hochladen — die werden von uns manuell verifiziert. Keine selbsternannten Experten, nur echte Profis.',
  },
  {
    icon: Fingerprint,
    title: 'Deine Daten, deine Regeln',
    description: 'Deine Kontaktdaten bleiben privat, bis du einen Vertrag unterschreibst. Kein Coach sieht deine Nummer oder Adresse vorher.',
  },
  {
    icon: CircleDollarSign,
    title: 'Komplett kostenlos für dich',
    description: 'Coach suchen, vergleichen, Erstgespräch buchen, Fortschritte tracken — ohne einen Cent zu zahlen. Jetzt und in Zukunft.',
  },
  {
    icon: BrainCircuit,
    title: 'Smartes Matching',
    description: 'Filter nach Stadt, Spezialisierung, Preis, Verfügbarkeit und Bewertungen. Finde den Coach, der wirklich zu dir passt — nicht den lautesten.',
  },
  {
    icon: ShieldCheck,
    title: 'Verträge, die fair sind',
    description: 'Digitale Verträge mit klarer Struktur. Monatlich kündbar. Transparent einsehbar. Kein Kleingedrucktes.',
  },
  {
    icon: Layers,
    title: 'Alles an einem Ort',
    description: 'Trainingspläne, Ernährung, Fortschrittstracking, Kalender, Chat — eine Plattform statt fünf Apps.',
  },
]

const coachBenefits = [
  {
    icon: Award,
    title: 'Deine Lizenzen = dein Vorteil',
    description: 'Lade deine Trainingslizenzen, Zertifikate und Qualifikationen hoch. Wir verifizieren sie — und du hebst dich von der Masse ab. Kunden vertrauen geprüften Coaches.',
  },
  {
    icon: Users,
    title: 'Neue Kunden — ohne Kaltakquise',
    description: 'Kunden finden DICH. Durch dein verifiziertes Profil, echte Bewertungen und unsere Suchfunktion. Du coachst, wir bringen die Leads.',
  },
  {
    icon: ClipboardList,
    title: 'Professionelle Kundenverwaltung',
    description: 'Trainingspläne erstellen, Ernährung planen, Fortschritte tracken, Termine managen — alles in einem System.',
  },
  {
    icon: BarChart3,
    title: 'Daten, die dein Business skalieren',
    description: 'Analytics zu Kundenzufriedenheit, Retention-Rate, Umsatz und Wachstum. Entscheide datenbasiert, nicht aus dem Bauch.',
  },
  {
    icon: CalendarCheck,
    title: '10+ Stunden pro Woche sparen',
    description: 'Automatische Terminbuchung, digitale Verträge, integrierte Kommunikation. Weniger Admin, mehr Coaching.',
  },
  {
    icon: HandshakeIcon,
    title: 'Faire Konditionen, echtes Wachstum',
    description: 'Kein Abo-Lock-in, keine versteckten Kosten. Plattformgebühr gedeckelt. Dein Erfolg ist unser Erfolg.',
  },
]

const howItWorksClient = [
  { number: '01', icon: UserPlus, title: 'Profil erstellen', description: 'Kostenlos. 60 Sekunden. Keine Kreditkarte.' },
  { number: '02', icon: Search, title: 'Coach finden', description: 'Filter, vergleiche, lies echte Bewertungen.' },
  { number: '03', icon: MessageCircle, title: 'Kennenlernen', description: 'Kostenloses Erstgespräch — anonym und unverbindlich.' },
  { number: '04', icon: Rocket, title: 'Trainieren', description: 'Dein individuelles Programm startet. Alles in einer App.' },
]

const howItWorksCoach = [
  { number: '01', icon: UserCheck, title: 'Profil anlegen', description: 'Erstelle dein Coach-Profil mit Spezialisierungen und Erfahrung.' },
  { number: '02', icon: Upload, title: 'Lizenzen hochladen', description: 'Lade deine Trainingslizenzen und Zertifikate hoch — wir verifizieren sie.' },
  { number: '03', icon: BadgeCheck, title: 'Verifiziert werden', description: 'Nach Prüfung erscheint dein Profil mit Verifizierungsbadge in der Suche.' },
  { number: '04', icon: TrendingUp, title: 'Kunden gewinnen & wachsen', description: 'Kunden finden dich, buchen Erstgespräche und du skalierst dein Business.' },
]

const testimonials = [
  {
    rating: 5,
    quote: 'Ich hab über ein Jahr nach dem richtigen Coach gesucht. Überall das gleiche Problem: Fake-Bewertungen, keine Transparenz, komische Verträge. Bei FITNEXUS hab ich innerhalb einer Woche jemanden gefunden, der perfekt zu mir passt. Die Anonymität am Anfang war mir mega wichtig — ich wollte erst mal in Ruhe vergleichen.',
    name: 'Laura M.',
    role: 'Trainiert seit 4 Monaten mit ihrem Coach',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    type: 'client' as const,
  },
  {
    rating: 5,
    quote: 'Seit ich FITNEXUS nutze, spare ich locker 10 Stunden pro Woche an Verwaltung. Vorher: Trainingspläne in Google Docs, Ernährung per WhatsApp, Termine über drei verschiedene Tools. Jetzt ist alles an einem Ort. Und die Neukunden kommen über die Plattform — ohne dass ich Instagram bespielen muss.',
    name: 'Markus B.',
    role: 'Personal Trainer in München · 47 aktive Kunden',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
    type: 'coach' as const,
  },
  {
    rating: 5,
    quote: 'Die Plattform fühlt sich an, als hätte sie jemand gebaut, der wirklich versteht, wie Coaching funktioniert. Nicht overengineered, sondern genau richtig. Einfach durchdacht.',
    name: 'Sophie H.',
    role: 'CrossFit-Athletin, Berlin',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    type: 'client' as const,
  },
  {
    rating: 5,
    quote: 'Endlich eine Plattform, die zwischen echten Coaches und Hobby-Trainern unterscheidet. Die Lizenz-Verifizierung war für mich der Grund, FITNEXUS zu nutzen. Meine Kunden sehen sofort, dass ich qualifiziert bin — und mein Umsatz hat sich in 3 Monaten verdoppelt.',
    name: 'Daniel K.',
    role: 'Lizenzierter Fitness Coach in Hamburg · A-Lizenz, BSA · 32 aktive Kunden',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    type: 'coach' as const,
  },
]

const pricingPlans = [
  {
    name: 'Kunde',
    price: '0',
    period: '',
    description: 'Für alle, die den richtigen Coach suchen',
    features: ['Unbegrenzte Coach-Suche', 'Profil-Ansicht & Vergleich', 'Kostenloses Erstgespräch buchen', 'Bewertungen lesen & schreiben', 'Fortschrittstracking', 'Chat mit deinem Coach'],
    highlighted: false,
    ctaLabel: 'Kostenlos starten',
    ctaVariant: 'cyan' as const,
    badge: null,
  },
  {
    name: 'Starter',
    price: '49',
    period: '/mo',
    description: 'Für Coaches, die durchstarten wollen',
    features: ['Professionelles Trainer-Profil', 'Bis zu 15 aktive Kunden', 'Trainingsplan-Builder', 'Basis-Ernährungspläne', 'Chat & Terminverwaltung', 'Bewertungen sammeln'],
    highlighted: false,
    ctaLabel: 'Starter wählen',
    ctaVariant: 'cyan' as const,
    badge: null,
  },
  {
    name: 'Pro',
    price: '99',
    period: '/mo',
    description: 'Für Coaches mit Ambitionen',
    features: ['Alles aus Starter', 'Unbegrenzte Kunden', 'Erweiterte Trainings- & Ernährungspläne', 'Analytics & Reports', 'Prioritäts-Support', 'Top-Ranking in der Suche'],
    highlighted: true,
    ctaLabel: 'Pro wählen',
    ctaVariant: 'brand' as const,
    badge: 'Beliebteste Wahl',
  },
]

const faqItems = [
  {
    question: 'Kostet FITNEXUS etwas für Kunden?',
    answer: 'Nein. Als Kunde ist FITNEXUS komplett kostenlos. Du kannst Trainer suchen, Profile ansehen, Erstgespräche buchen und deine Fortschritte tracken — ohne versteckte Kosten. Wir verdienen nur, wenn Coaches die Plattform nutzen.',
  },
  {
    question: 'Wie finde ich den richtigen Coach?',
    answer: 'Nutze unsere Filter: Standort, Spezialisierung (z.B. Krafttraining, Yoga, Rehabilitation), Preisspanne und Bewertungen. Dann buchst du ein kostenloses Erstgespräch — ganz unverbindlich und anonym über die Plattform.',
  },
  {
    question: 'Was bedeutet Anonymität bei FITNEXUS?',
    answer: 'Deine persönlichen Kontaktdaten (Telefonnummer, E-Mail, Adresse) werden erst freigegeben, wenn du und dein Coach einen Vertrag abschließen. Vorher kommuniziert ihr ausschließlich über die FITNEXUS-Plattform — sicher und geschützt.',
  },
  {
    question: 'Welche Lizenzen brauche ich als Coach?',
    answer: 'Du benötigst mindestens eine anerkannte Trainerlizenz (z.B. Fitnesstrainer A-/B-Lizenz, Personal Trainer Lizenz, BSA-Akademie, DSHS, IST-Studieninstitut, DFLV oder vergleichbare Zertifikate). Wir akzeptieren auch internationale Lizenzen (NASM, ACE, NSCA etc.). Jedes hochgeladene Dokument wird von unserem Team manuell auf Echtheit und Gültigkeit geprüft. Ohne verifizierte Lizenz wird kein Profil freigeschaltet.',
  },
  {
    question: 'Was bringt mir FITNEXUS als Coach?',
    answer: 'FITNEXUS ersetzt 5+ Tools: Kundenverwaltung, Trainingsplan-Builder, Ernährungsplanung, Terminbuchung, Chat und Analytics. Dazu bekommst du planbaren Kundenzugang durch unsere Suchfunktion. Durch die Pflicht-Verifizierung mit echten Lizenzen hebst du dich automatisch von der Masse ab — Kunden vertrauen verifizierten Coaches deutlich mehr.',
  },
  {
    question: 'Kann ich die Plattform als Coach kostenlos testen?',
    answer: 'Ja. Erstelle dein Trainer-Profil kostenlos, lade deine Lizenzen hoch und lerne die Plattform kennen. Nach der Verifizierung bist du sichtbar in der Suche. Ein Upgrade auf Starter oder Pro ist jederzeit möglich — ohne Mindestlaufzeit, monatlich kündbar.',
  },
  {
    question: 'Welche Zahlungsmethoden gibt es?',
    answer: 'Kreditkarte (Visa, Mastercard), SEPA-Lastschrift und PayPal. Alle Zahlungen werden sicher über Stripe abgewickelt.',
  },
  {
    question: 'Wie schnell finde ich als Coach neue Kunden?',
    answer: 'Das hängt von deinem Profil, deiner Spezialisierung und deinem Standort ab. Die meisten Coaches berichten von ersten Anfragen innerhalb der ersten 1-2 Wochen. Ein vollständiges Profil mit Zertifikaten und Bewertungen beschleunigt den Prozess enorm.',
  },
  {
    question: 'Kann ich jederzeit kündigen?',
    answer: 'Ja, alle Pläne sind monatlich kündbar. Kein Kleingedrucktes, keine Mindestlaufzeit. Du behältst den Zugang bis zum Ende deines Abrechnungszeitraums.',
  },
]

/* ── Page ── */

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ═══════════════════════════════════════════════════════
            HERO — The Opening Statement
        ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
          {/* Layered backgrounds */}
          <div className="absolute inset-0 bg-[#0B0F1A]" />
          <div className="absolute inset-0 bg-radial-top" />
          <div className="absolute inset-0 bg-grid opacity-[0.15]" />

          {/* Ambient orbs — cyan left (clients), green right (coaches) */}
          <div className="absolute top-[-15%] left-[10%] w-[700px] h-[700px] rounded-full bg-[#00A8FF]/[0.06] blur-[180px]" aria-hidden="true" />
          <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#00FF94]/[0.04] blur-[180px]" aria-hidden="true" />
          <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[#7B61FF]/[0.02] blur-[120px]" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
            {/* Floating health metrics — Orbix inspired */}
            <div className="hidden lg:flex absolute top-28 left-0 flex-col gap-3 opacity-40">
              <div className="bento-card px-3 py-2 flex items-center gap-2 text-[10px]">
                <Heart className="w-3.5 h-3.5 text-[#FF4757]" />
                <span className="text-muted-foreground">72 BPM</span>
              </div>
              <div className="bento-card px-3 py-2 flex items-center gap-2 text-[10px]">
                <Flame className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span className="text-muted-foreground">2.450 kcal</span>
              </div>
            </div>
            <div className="hidden lg:flex absolute top-32 right-0 flex-col gap-3 opacity-40">
              <div className="bento-card px-3 py-2 flex items-center gap-2 text-[10px]">
                <Activity className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span className="text-muted-foreground">8.342 Schritte</span>
              </div>
              <div className="bento-card px-3 py-2 flex items-center gap-2 text-[10px]">
                <Trophy className="w-3.5 h-3.5 text-[#FFD700]" />
                <span className="text-muted-foreground">12 Tage Streak</span>
              </div>
            </div>

            {/* Section Label */}
            <div className="flex justify-center mb-8">
              <span className="section-label text-[#00D4FF]">Die Fitness-Plattform für Deutschland</span>
            </div>

            {/* Headline */}
            <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-extrabold leading-[1.05] tracking-tight mb-8">
              <span className="text-foreground">Finde deinen Coach.</span>
              <br />
              <span className="gradient-brand-text text-highlight">Oder werde einer.</span>
            </h1>

            {/* Sub — psychological: addresses both audiences directly */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              FITNEXUS ist die Plattform, auf der{' '}
              <span className="text-[#00D4FF] font-normal">lizenzierte, verifizierte Coaches</span>{' '}
              und{' '}
              <span className="text-[#00FF94] font-normal">Menschen mit echten Zielen</span>{' '}
              zusammenfinden. Jeder Coach mit geprüften Zertifikaten. Kein Fake. Nur Qualität.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 max-w-lg mx-auto sm:max-w-none">
              <Link href="/search" className="w-full sm:w-auto">
                <GradientButton variant="cyan" size="xl" className="w-full sm:w-auto group">
                  Coach finden — kostenlos
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </GradientButton>
              </Link>
              <Link href="/auth/register" className="w-full sm:w-auto">
                <GradientButton variant="green" size="xl" outline className="w-full sm:w-auto group">
                  Als Coach durchstarten
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </GradientButton>
              </Link>
            </div>

            {/* Stats strip — social proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
              {[
                { value: '500+', label: 'Verifizierte Coaches' },
                { value: '10.000+', label: 'Aktive Nutzer' },
                { value: '50+', label: 'Städte in DACH' },
                { value: '4.9', label: 'Durchschnittsbewertung' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-heading font-bold text-foreground stat-number">{stat.value}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
        </section>

        {/* ═══════════════════════ MARQUEE ═══════════════════════ */}
        <Marquee items={marqueeItems} />

        {/* ═══════════════════════════════════════════════════════
            PAIN POINTS — "Du kennst das."
            Psychological trigger: Agitate the problem before presenting the solution
        ═══════════════════════════════════════════════════════ */}
        <section className="relative py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-radial-center opacity-20" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              <span className="section-label">Das Problem</span>
            </div>
            <h2 className="text-center font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              <span className="text-foreground">Du kennst das.</span>
            </h2>
            <p className="text-center text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mb-20">
              Die Fitness-Branche ist voller Reibung — für beide Seiten. Wir haben das geändert.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Client Pain Points */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#00A8FF]/[0.08] border border-[#00A8FF]/[0.12] flex items-center justify-center">
                    <Search className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#00D4FF] tracking-wide uppercase">Wenn du einen Coach suchst</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {clientPainPoints.map((p, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#FF4757]/[0.02] border border-[#FF4757]/[0.06] hover:border-[#FF4757]/[0.12] transition-all duration-300">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#FF4757]/[0.06] flex-shrink-0 mt-0.5">
                        <p.icon className="w-4 h-4 text-[#FF4757]/70" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coach Pain Points */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#00FF94]/[0.08] border border-[#00FF94]/[0.12] flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-[#00FF94]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#00FF94] tracking-wide uppercase">Wenn du Coach bist</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {coachPainPoints.map((p, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#FF4757]/[0.02] border border-[#FF4757]/[0.06] hover:border-[#FF4757]/[0.12] transition-all duration-300">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#FF4757]/[0.06] flex-shrink-0 mt-0.5">
                        <p.icon className="w-4 h-4 text-[#FF4757]/70" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transition statement */}
            <div className="mt-20 text-center">
              <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                Es gibt einen besseren Weg.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="w-12 h-12 rounded-full gradient-brand flex items-center justify-center animate-pulse-glow">
                  <ArrowRight className="w-5 h-5 text-[#0B0F1A] rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ DIVIDER ═══════════════════════ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-gradient" />
        </div>

        {/* ═══════════════════════════════════════════════════════
            COACH VERIFICATION — Trust Centerpiece
            This is the platform's key differentiator
        ═══════════════════════════════════════════════════════ */}
        <section className="relative py-28 lg:py-36 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7B61FF]/[0.03] blur-[200px]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              <span className="section-label text-[#FFD700]">Unser Qualitätsversprechen</span>
            </div>
            <h2 className="text-center font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              <span className="text-foreground">Kein Coach ohne</span>
              <br />
              <span className="gradient-brand-text">echte Lizenz.</span>
            </h2>
            <p className="text-center text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mb-20">
              Bei FITNEXUS kann nicht jeder einfach &ldquo;Coach&rdquo; werden. Wir verlangen echte Trainingslizenzen und Zertifikate — und prüfen jede einzelne manuell. Das schützt Kunden und hebt echte Profis hervor.
            </p>

            {/* Verification Process - visual flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bento-card p-8 text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/[0.06] border border-[#FFD700]/[0.12] flex items-center justify-center mx-auto mb-6 group-hover:border-[#FFD700]/25 group-hover:bg-[#FFD700]/[0.1] transition-all duration-500">
                  <Upload className="w-7 h-7 text-[#FFD700]" />
                </div>
                <span className="text-xs font-mono text-[#FFD700]/60 mb-3 block">Schritt 1</span>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Lizenzen hochladen</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Coach lädt Trainingslizenzen, Zertifikate (z.B. A-/B-Lizenz, BSA, DSHS, IST) und Qualifikationsnachweise direkt in sein Profil hoch.
                </p>
              </div>

              <div className="bento-card p-8 text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#00D4FF]/[0.06] border border-[#00D4FF]/[0.12] flex items-center justify-center mx-auto mb-6 group-hover:border-[#00D4FF]/25 group-hover:bg-[#00D4FF]/[0.1] transition-all duration-500">
                  <ScanEye className="w-7 h-7 text-[#00D4FF]" />
                </div>
                <span className="text-xs font-mono text-[#00D4FF]/60 mb-3 block">Schritt 2</span>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Manuelle Prüfung</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Unser Team prüft jedes Dokument manuell auf Echtheit und Gültigkeit. Keine automatische Freischaltung, kein Durchwinken.
                </p>
              </div>

              <div className="bento-card p-8 text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#00FF94]/[0.06] border border-[#00FF94]/[0.12] flex items-center justify-center mx-auto mb-6 group-hover:border-[#00FF94]/25 group-hover:bg-[#00FF94]/[0.1] transition-all duration-500">
                  <BadgeCheck className="w-7 h-7 text-[#00FF94]" />
                </div>
                <span className="text-xs font-mono text-[#00FF94]/60 mb-3 block">Schritt 3</span>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Verifiziert & sichtbar</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Erst nach erfolgreicher Prüfung erscheint das Profil in der Suche — mit dem FITNEXUS-Verifizierungsbadge. Kunden sehen sofort: Dieser Coach ist echt.
                </p>
              </div>
            </div>

            {/* Trust callout */}
            <div className="bento-card neon-border p-8 md:p-10 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#0B0F1A]" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Warum das wichtig ist
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground/90">Für Kunden:</strong> Du weißt zu 100%, dass dein Coach qualifiziert ist. Keine Sorge vor Hobbytrainern, die nach 2 Instagram-Reels Trainingspläne verkaufen.
                    <br />
                    <strong className="text-foreground/90">Für Coaches:</strong> Deine echten Qualifikationen werden endlich sichtbar und wertgeschätzt. Du wirst nicht mit unqualifizierten Anbietern in einen Topf geworfen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FOR CLIENTS — "Dein Coach wartet schon."
            Cyan accent. Psychological: Safety, trust, zero-risk, social proof
        ═══════════════════════════════════════════════════════ */}
        <section id="fuer-kunden" className="relative py-28 lg:py-36 overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#00A8FF]/[0.04] blur-[200px]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              <span className="section-label text-[#00D4FF]">Für alle, die einen Coach suchen</span>
            </div>
            <h2 className="text-center font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              <span className="text-foreground">Dein perfekter Coach</span>
              <br />
              <span className="gradient-cyan-text">ist nur einen Klick entfernt</span>
            </h2>
            <p className="text-center text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Schluss mit endlosem Suchen. FITNEXUS gibt dir die Werkzeuge, den Coach zu finden, der wirklich zu deinen Zielen, deinem Budget und deinem Lifestyle passt.
            </p>
            <p className="text-center text-base text-[#00D4FF]/70 font-medium mb-16">
              100% kostenlos. Keine versteckten Kosten. Kein Haken.
            </p>

            {/* Health metrics visualization — Orbix inspired */}
            <div className="flex justify-center gap-8 mb-16">
              <HealthRing value={92} label="Match-Rate" color="#00D4FF" size={72} />
              <HealthRing value={97} label="Zufriedenheit" color="#00FF94" size={72} />
              <HealthRing value={89} label="Zielerreichung" color="#7B61FF" size={72} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clientBenefits.map((b) => (
                <div key={b.title} className="bento-card p-7 group">
                  <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#00A8FF]/[0.06] border border-[#00A8FF]/[0.1] group-hover:border-[#00A8FF]/25 group-hover:bg-[#00A8FF]/[0.1] transition-all duration-500 mb-5">
                    <b.icon className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <h3 className="text-base font-heading font-semibold text-foreground mb-2 leading-tight">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 text-center">
              <Link href="/search">
                <GradientButton variant="cyan" size="lg" className="group">
                  Jetzt Coach finden — komplett kostenlos
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </GradientButton>
              </Link>
              <p className="mt-4 text-xs text-muted-foreground/50">Kein Account nötig zum Stöbern. Erstgespräch immer kostenlos.</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ DASHBOARD PREVIEW ═══════════════════════ */}
        <DashboardScrollPreview />

        {/* ═══════════════════════════════════════════════════════
            FOR COACHES — "Dein Business. Professionalisiert."
            Green accent. Psychological: Business growth, time savings, authority
        ═══════════════════════════════════════════════════════ */}
        <section id="fuer-coaches" className="relative py-28 lg:py-36 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00FF94]/[0.04] blur-[200px]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              <span className="section-label text-[#00FF94]">Für Coaches & Personal Trainer</span>
            </div>
            <h2 className="text-center font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              <span className="text-foreground">Weniger Admin.</span>
              <br />
              <span className="gradient-green-text">Mehr Coaching. Mehr Umsatz.</span>
            </h2>
            <p className="text-center text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Du bist Coach geworden, um Menschen zu transformieren — nicht um Excels zu pflegen.
              FITNEXUS gibt dir die Tools und die Reichweite, um professionell zu wachsen.
            </p>
            <p className="text-center text-base text-[#00FF94]/70 font-medium mb-16">
              Bereits 500+ Coaches vertrauen FITNEXUS. Durchschnittlich +40% mehr Kunden in 3 Monaten.
            </p>

            {/* Coach impact metrics — Orbix inspired */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto">
              {[
                { value: '10h+', label: 'Weniger Admin / Woche', icon: Timer, color: '#00FF94' },
                { value: '+40%', label: 'Mehr Kunden', icon: Users, color: '#00D4FF' },
                { value: '4.9★', label: 'Coach-Zufriedenheit', icon: Star, color: '#FFD700' },
                { value: '0€', label: 'Startkosten', icon: Gauge, color: '#7B61FF' },
              ].map((m) => (
                <div key={m.label} className="bento-card p-5 text-center">
                  <m.icon className="w-5 h-5 mx-auto mb-2" style={{ color: m.color }} />
                  <p className="text-2xl font-heading font-bold text-foreground stat-number">{m.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coachBenefits.map((b) => (
                <div key={b.title} className="bento-card p-7 group">
                  <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#00FF94]/[0.06] border border-[#00FF94]/[0.1] group-hover:border-[#00FF94]/25 group-hover:bg-[#00FF94]/[0.1] transition-all duration-500 mb-5">
                    <b.icon className="w-5 h-5 text-[#00FF94]" />
                  </div>
                  <h3 className="text-base font-heading font-semibold text-foreground mb-2 leading-tight">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 text-center">
              <Link href="/auth/register">
                <GradientButton variant="green" size="lg" className="group">
                  Jetzt als Coach starten — kostenlos testen
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </GradientButton>
              </Link>
              <p className="mt-4 text-xs text-muted-foreground/50">Kostenlos dein Profil anlegen. Upgrade jederzeit. Keine Mindestlaufzeit.</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ APP SHOWCASE ═══════════════════════ */}
        <AppShowcase />

        {/* ═══════════════════════════════════════════════════════
            HOW IT WORKS — Dual Track
        ═══════════════════════════════════════════════════════ */}
        <section id="how-it-works" className="relative py-28 lg:py-36 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#00A8FF]/[0.03] blur-[160px]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              <span className="section-label">So funktioniert&apos;s</span>
            </div>
            <h2 className="text-center font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              <span className="text-foreground">Dein Weg zum Ziel.</span>
              <br />
              <span className="gradient-brand-text">In 4 Schritten.</span>
            </h2>
            <p className="text-center text-lg text-muted-foreground/80 max-w-xl mx-auto leading-relaxed mb-20">
              Egal auf welcher Seite du stehst — der Einstieg ist einfach.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
              {/* Client path */}
              <div>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-8 h-8 rounded-lg gradient-cyan flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-[#00D4FF]">Ich suche einen Coach</h3>
                </div>
                <div className="space-y-6">
                  {howItWorksClient.map((step) => (
                    <div key={step.number} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bento-card flex items-center justify-center group-hover:border-[#00A8FF]/20 transition-all duration-300">
                        <span className="text-xs font-bold font-mono text-[#00D4FF]">{step.number}</span>
                      </div>
                      <div>
                        <h4 className="text-base font-heading font-semibold text-foreground mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/search">
                    <GradientButton variant="cyan" size="md" outline className="group">
                      Coach finden
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </GradientButton>
                  </Link>
                </div>
              </div>

              {/* Coach path */}
              <div>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center">
                    <Dumbbell className="w-4 h-4 text-[#0B0F1A]" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-[#00FF94]">Ich bin Coach</h3>
                </div>
                <div className="space-y-6">
                  {howItWorksCoach.map((step) => (
                    <div key={step.number} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bento-card flex items-center justify-center group-hover:border-[#00FF94]/20 transition-all duration-300">
                        <span className="text-xs font-bold font-mono text-[#00FF94]">{step.number}</span>
                      </div>
                      <div>
                        <h4 className="text-base font-heading font-semibold text-foreground mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/auth/register">
                    <GradientButton variant="green" size="md" outline className="group">
                      Als Coach starten
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </GradientButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ DIVIDER ═══════════════════════ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-gradient" />
        </div>

        {/* ═══════════════════════════════════════════════════════
            TESTIMONIALS — Social proof from both sides
        ═══════════════════════════════════════════════════════ */}
        <section id="testimonials" className="relative py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-radial-center opacity-15" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              <span className="section-label">Stimmen</span>
            </div>
            <h2 className="text-center font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              <span className="text-foreground">Echte Menschen.</span>
              <br />
              <span className="gradient-brand-text">Echte Ergebnisse.</span>
            </h2>
            <p className="text-center text-lg text-muted-foreground/80 max-w-xl mx-auto leading-relaxed mb-20">
              Was Kunden und Coaches über FITNEXUS sagen.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bento-card p-7 lg:p-9 relative">
                  {/* Type badge */}
                  <div className="flex items-center justify-between mb-5">
                    <StarRating rating={t.rating} size="sm" showValue={false} />
                    <span className={`text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${
                      t.type === 'coach'
                        ? 'text-[#00FF94] bg-[#00FF94]/[0.05] border-[#00FF94]/[0.12]'
                        : 'text-[#00D4FF] bg-[#00D4FF]/[0.05] border-[#00D4FF]/[0.12]'
                    }`}>
                      {t.type === 'coach' ? 'Coach' : 'Kunde'}
                    </span>
                  </div>
                  <blockquote className="text-sm lg:text-base text-foreground/85 leading-relaxed mb-7 font-light">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <Image src={t.image} alt={t.name} width={40} height={40} className="rounded-full object-cover ring-2 ring-[rgba(0,168,255,0.1)]" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            PRICING — Transparent and dual-audience
        ═══════════════════════════════════════════════════════ */}
        <section id="pricing" className="relative py-28 lg:py-36 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00A8FF]/[0.02] blur-[200px]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              <span className="section-label">Preise</span>
            </div>
            <h2 className="text-center font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              <span className="text-foreground">Transparent. </span>
              <span className="gradient-brand-text">Fair. Ehrlich.</span>
            </h2>
            <p className="text-center text-lg text-muted-foreground/80 max-w-xl mx-auto leading-relaxed mb-16">
              Als Kunde immer kostenlos. Als Coach: wähle den Plan, der zu deinem Business passt.
              <br />
              <span className="text-[#00FF94]/70 text-base">Alle Pläne monatlich kündbar. Keine Mindestlaufzeit.</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bento-card flex flex-col p-8 lg:p-9 relative ${plan.highlighted ? 'border-[#00A8FF]/20 lg:scale-[1.03]' : ''}`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-brand text-[#0B0F1A] text-[10px] font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                      {plan.badge}
                    </span>
                  )}
                  <div className="mb-8">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-heading font-semibold text-foreground">{plan.name}</h3>
                      {plan.name === 'Kunde' && (
                        <span className="text-[9px] font-bold tracking-widest uppercase text-[#00D4FF] bg-[#00D4FF]/[0.08] px-2 py-0.5 rounded-full border border-[#00D4FF]/[0.12]">Immer gratis</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                  </div>
                  <div className="mb-8 flex items-baseline gap-1">
                    {plan.price === '0' ? (
                      <span className="text-4xl font-heading font-bold text-foreground">Kostenlos</span>
                    ) : (
                      <>
                        <span className="text-5xl font-heading font-bold text-foreground stat-number">{plan.price}</span>
                        <span className="text-lg text-muted-foreground font-heading">&euro;</span>
                        <span className="text-sm text-muted-foreground">{plan.period}</span>
                      </>
                    )}
                  </div>
                  <ul className="flex-1 space-y-3 mb-10">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-[#00FF94] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/register">
                    <GradientButton variant={plan.ctaVariant} outline={!plan.highlighted} size="md" className="w-full group">
                      {plan.ctaLabel}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </GradientButton>
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground/50 mt-10">
              Zusätzlich: 7% Plattformgebühr pro abgeschlossenem Vertrag, gedeckelt nach 6 Monaten pro Kunde. Keine versteckten Kosten.
            </p>
          </div>
        </section>

        {/* ═══════════════════════ DIVIDER ═══════════════════════ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-gradient" />
        </div>

        {/* ═══════════════════════════════════════════════════════
            FAQ — Expanded for dual audience
        ═══════════════════════════════════════════════════════ */}
        <section id="faq" className="relative py-28 lg:py-36 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              <span className="section-label">FAQ</span>
            </div>
            <h2 className="text-center font-heading text-3xl md:text-5xl font-bold tracking-tight leading-[1.08] mb-6">
              <span className="text-foreground">Häufige </span>
              <span className="gradient-brand-text">Fragen</span>
            </h2>
            <p className="text-center text-lg text-muted-foreground/80 max-w-xl mx-auto leading-relaxed mb-16">
              Alles was du wissen musst — kurz, ehrlich und ohne Marketing-Sprech.
            </p>
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FINAL CTA — Emotional close with dual paths
        ═══════════════════════════════════════════════════════ */}
        <section className="relative py-28 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00A8FF]/[0.03] to-transparent" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00A8FF]/[0.06] blur-[200px]" aria-hidden="true" />
          <div className="absolute top-[60%] left-[30%] w-[400px] h-[400px] rounded-full bg-[#00FF94]/[0.03] blur-[160px]" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-foreground leading-[1.08] mb-8">
              Dein nächstes Kapitel
              <br />
              <span className="gradient-brand-text">beginnt hier.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed font-light">
              Während du noch überlegst, trainieren andere schon mit ihrem perfekten Coach.
              Oder gewinnen ihre nächsten 10 Kunden.
            </p>
            <p className="text-base text-muted-foreground/60 mb-12 max-w-lg mx-auto">
              Die Frage ist nicht <em className="text-foreground/80 not-italic font-medium">ob</em>, sondern <em className="text-foreground/80 not-italic font-medium">wann</em> du anfängst.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/search">
                <GradientButton variant="cyan" size="xl" className="group">
                  Coach finden — kostenlos
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </GradientButton>
              </Link>
              <Link href="/auth/register">
                <GradientButton variant="green" size="xl" outline className="group">
                  Als Coach durchstarten
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </GradientButton>
              </Link>
            </div>

            {/* Final trust line */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-muted-foreground/40">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#00FF94]/50" />
                Keine Kreditkarte nötig
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#00FF94]/50" />
                Setup in unter 60 Sekunden
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#00FF94]/50" />
                Jederzeit kündbar
              </span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
