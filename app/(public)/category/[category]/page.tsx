import { Metadata } from 'next'
import Link from 'next/link'
import { mockTrainers } from '@/lib/mock-data'
import { TrainerCard } from '@/components/trainer-card'
import { GlassCard } from '@/components/glass-card'
import { Tag, ArrowRight, Search } from 'lucide-react'

// ─── Category slug to display name mapping ───────────────
const CATEGORY_MAP: Record<string, string> = {
  'personal-training': 'Personal Training',
  'yoga': 'Yoga',
  'pilates': 'Pilates',
  'krafttraining': 'Krafttraining',
  'ausdauer': 'Ausdauer',
  'crossfit': 'CrossFit',
  'boxen': 'Boxen',
  'kampfsport': 'Kampfsport',
  'schwimmen': 'Schwimmen',
  'ernaehrungsberatung': 'Ernährungsberatung',
  'rehabilitation': 'Rehabilitation',
  'mobility': 'Mobility',
  'hiit': 'HIIT',
  'bodybuilding': 'Bodybuilding',
  'calisthenics': 'Calisthenics',
  'outdoor-training': 'Outdoor Training',
  'gruppentraining': 'Gruppentraining',
  'online-coaching': 'Online Coaching',
}

// ─── SEO category descriptions ───────────────────────────
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'personal-training': 'Personal Training ist der direkteste Weg zu deinem Fitnessziel. Ein erfahrener Coach erstellt dir einen individuellen Trainingsplan, korrigiert deine Technik und hält dich motiviert — 1:1 und auf dich zugeschnitten.',
  'yoga': 'Yoga verbindet Körper und Geist. Ob Hatha, Vinyasa oder Yin — unsere zertifizierten Yoga-Lehrer begleiten dich auf deinem Weg zu mehr Flexibilität, innerer Ruhe und körperlichem Wohlbefinden.',
  'pilates': 'Pilates stärkt deine Tiefenmuskulatur, verbessert die Haltung und beugt Rückenschmerzen vor. Finde Pilates-Coaches, die dich mit Präzision und Geduld zu besserer Körperkontrolle führen.',
  'krafttraining': 'Krafttraining bildet die Basis für Muskelaufbau, Fettabbau und langfristige Gesundheit. Unsere Krafttraining-Coaches beherrschen Periodisierung, Technik und individuelle Trainingssteuerung.',
  'crossfit': 'CrossFit kombiniert Gewichtheben, Ausdauer und funktionelle Bewegungen zu hochintensiven Workouts. Finde CrossFit-Coaches mit Level-Zertifizierungen und Wettkampferfahrung.',
  'ernaehrungsberatung': 'Ernährungsberatung ist der Schlüssel zu nachhaltigen Ergebnissen. Unsere Ernährungsberater erstellen dir individuelle Pläne, helfen bei Meal Prep und begleiten dich durch jede Phase deiner Transformation.',
  'hiit': 'HIIT-Training maximiert deinen Kalorienverbrauch in kürzester Zeit. Finde Coaches, die hochintensive Intervalle sicher und effektiv für dein Fitness-Level gestalten.',
  'bodybuilding': 'Bodybuilding erfordert Disziplin, Wissen und einen erfahrenen Coach. Unsere Bodybuilding-Trainer unterstützen dich bei Hypertrophie-Training, Periodisierung und Wettkampfvorbereitung.',
  'calisthenics': 'Calisthenics beweist, was mit dem eigenen Körpergewicht möglich ist. Von Muscle-Ups bis zum Handstand — finde Coaches, die dir fortgeschrittene Bodyweight-Skills beibringen.',
  'rehabilitation': 'Rehabilitation nach Verletzungen erfordert Fachwissen und Feingefühl. Unsere Reha-Coaches helfen dir zurück in Bewegung — sicher, strukturiert und an deinen Heilungsprozess angepasst.',
  'mobility': 'Mobility-Training verbessert deine Beweglichkeit, reduziert Schmerzen und beugt Verletzungen vor. Ideal für Athleten, Büroarbeiter und alle, die beweglicher werden wollen.',
  'online-coaching': 'Online Coaching macht professionelles Training ortsunabhängig. Per Videocall, Trainingsplan-App und regelmäßige Check-ins — flexibel, persönlich und effektiv.',
  'outdoor-training': 'Outdoor Training nutzt die Natur als Fitnessstudio. Parks, Sportplätze und frische Luft — finde Coaches, die dein Training nach draußen bringen.',
  'kampfsport': 'Kampfsport trainiert Körper und Geist. Von Boxen über Muay Thai bis Jiu-Jitsu — unsere Kampfsport-Coaches bringen dir Technik, Ausdauer und Selbstvertrauen bei.',
  'boxen': 'Fitness-Boxen und klassisches Boxtraining verbessern Koordination, Ausdauer und Kraft. Finde Boxcoaches für Anfänger und Fortgeschrittene.',
}

function getCategoryName(slug: string): string {
  return CATEGORY_MAP[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function getCategoryDescription(slug: string): string {
  return CATEGORY_DESCRIPTIONS[slug] || `Finde qualifizierte ${getCategoryName(slug)}-Coaches auf FITNEXUS. Vergleiche Bewertungen, Preise und Erfahrung — und starte mit einem kostenlosen Kennenlerngespräch.`
}

function getTrainersForCategory(slug: string) {
  const categoryName = getCategoryName(slug)
  return mockTrainers.filter((t) =>
    t.categories.some((c) => c.toLowerCase() === categoryName.toLowerCase())
  )
}

// ─── Metadata ────────────────────────────────────────────
type PageProps = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const categoryName = getCategoryName(category)
  return {
    title: `${categoryName} Coaches finden | FITNEXUS`,
    description: `Die besten ${categoryName}-Coaches auf FITNEXUS. Verifizierte Trainer, echte Bewertungen, transparente Preise. Jetzt Kennenlerngespräch buchen.`,
    openGraph: {
      title: `${categoryName} Coaches finden | FITNEXUS`,
      description: `Die besten ${categoryName}-Coaches auf FITNEXUS.`,
    },
  }
}

// ─── Page ────────────────────────────────────────────────
export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const categoryName = getCategoryName(category)
  const trainers = getTrainersForCategory(category)
  const description = getCategoryDescription(category)

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Background */}
      <div className="fixed inset-0 bg-radial-top pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF94]/[0.06] border border-[#00FF94]/15 text-[#00FF94] text-sm font-medium mb-6">
            <Tag className="w-4 h-4" />
            {categoryName}
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            <span className="gradient-brand-text">{categoryName}</span>
            <span className="text-foreground"> Coaches finden</span>
          </h1>

          <p className="mt-5 text-lg text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Trainers Grid */}
        {trainers.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              <span className="text-[#00FF94] font-semibold">{trainers.length}</span>{' '}
              {trainers.length === 1 ? 'Coach' : 'Coaches'} für {categoryName}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
              {trainers.map((trainer) => (
                <TrainerCard
                  key={trainer.id}
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
              ))}
            </div>
          </>
        ) : (
          <GlassCard hover={false} className="p-12 text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-[#00FF94]/[0.06] border border-[#00FF94]/10 flex items-center justify-center mx-auto mb-5">
              <Search className="w-7 h-7 text-[#00FF94]/40" />
            </div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">
              Noch keine {categoryName}-Coaches
            </h2>
            <p className="text-muted-foreground/70 max-w-md mx-auto">
              Aktuell sind noch keine Coaches für {categoryName} registriert. Schau dir alle verfügbaren Trainer an oder komm bald wieder.
            </p>
          </GlassCard>
        )}

        {/* CTA to full search */}
        <div className="text-center">
          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#00FF94]/[0.06] border border-[#00FF94]/15 text-[#00FF94] font-medium text-sm hover:bg-[#00FF94]/[0.12] hover:border-[#00FF94]/30 transition-all duration-300"
          >
            Alle Trainer durchsuchen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
