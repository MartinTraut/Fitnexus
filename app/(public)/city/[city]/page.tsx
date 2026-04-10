import { Metadata } from 'next'
import Link from 'next/link'
import { mockTrainers } from '@/lib/mock-data'
import { TrainerCard } from '@/components/trainer-card'
import { SectionHeading } from '@/components/section-heading'
import { GlassCard } from '@/components/glass-card'
import { Badge } from '@/components/ui/badge'
import { MapPin, ArrowRight, Search } from 'lucide-react'

// ─── City slug to display name mapping ───────────────────
const CITY_MAP: Record<string, string> = {
  berlin: 'Berlin',
  hamburg: 'Hamburg',
  muenchen: 'München',
  koeln: 'Köln',
  frankfurt: 'Frankfurt',
  stuttgart: 'Stuttgart',
  duesseldorf: 'Düsseldorf',
  leipzig: 'Leipzig',
  dortmund: 'Dortmund',
  essen: 'Essen',
  bremen: 'Bremen',
  dresden: 'Dresden',
  hannover: 'Hannover',
  nuernberg: 'Nürnberg',
  duisburg: 'Duisburg',
  bochum: 'Bochum',
  wuppertal: 'Wuppertal',
  bielefeld: 'Bielefeld',
  bonn: 'Bonn',
  muenster: 'Münster',
  mannheim: 'Mannheim',
  karlsruhe: 'Karlsruhe',
  augsburg: 'Augsburg',
  wiesbaden: 'Wiesbaden',
  freiburg: 'Freiburg',
}

// ─── SEO city descriptions ───────────────────────────────
const CITY_DESCRIPTIONS: Record<string, string> = {
  berlin: 'Berlin ist Deutschlands Fitness-Hauptstadt. Ob Krafttraining in Kreuzberg, Yoga am Spreeufer oder CrossFit in Prenzlauer Berg — hier findest du Coaches für jeden Anspruch.',
  hamburg: 'Hamburg bietet eine lebendige Fitness-Szene. Von Outdoor-Training an der Alster bis zu Personal Training in der HafenCity — entdecke Coaches, die zu deinem Lifestyle passen.',
  muenchen: 'München steht für Qualität — auch beim Training. Finde zertifizierte Coaches für Yoga, Personal Training und Ernährungsberatung in der bayerischen Landeshauptstadt.',
  koeln: 'Köln bewegt sich. Die Rheinmetropole bietet ein breites Spektrum an Fitness-Coaches: von HIIT und Online Coaching bis zu ganzheitlicher Ernährungsberatung.',
  frankfurt: 'Frankfurt am Main verbindet Leistung und Lifestyle. Hier trainieren ambitionierte Berufstätige mit erfahrenen Coaches — effizient, flexibel und professionell.',
  stuttgart: 'Stuttgart setzt auf Beweglichkeit und Rehabilitation. Finde spezialisierte Coaches für Mobility, Pilates und therapeutisches Training im Stuttgarter Raum.',
  leipzig: 'Leipzig wächst — und die Fitness-Community mit. Entdecke Coaches für Calisthenics, Outdoor Training und Bodyweight Skills in der sächsischen Trendstadt.',
}

function getCityName(slug: string): string {
  return CITY_MAP[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)
}

function getCityDescription(slug: string): string {
  return CITY_DESCRIPTIONS[slug] || `Finde qualifizierte Personal Trainer und Fitness Coaches in ${getCityName(slug)}. Vergleiche Bewertungen, Preise und Spezialisierungen — und buche dein erstes Kennenlerngespräch.`
}

function getTrainersForCity(slug: string) {
  const cityName = getCityName(slug)
  return mockTrainers.filter(
    (t) => t.city.toLowerCase() === cityName.toLowerCase()
  )
}

// ─── Metadata ────────────────────────────────────────────
type PageProps = { params: Promise<{ city: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const cityName = getCityName(city)
  return {
    title: `Personal Trainer in ${cityName} | FITNEXUS`,
    description: `Finde die besten Personal Trainer und Fitness Coaches in ${cityName}. Verifizierte Profile, echte Bewertungen, kostenlose Kennenlerngespräche.`,
    openGraph: {
      title: `Personal Trainer in ${cityName} | FITNEXUS`,
      description: `Finde die besten Personal Trainer und Fitness Coaches in ${cityName}.`,
    },
  }
}

// ─── Page ────────────────────────────────────────────────
export default async function CityPage({ params }: PageProps) {
  const { city } = await params
  const cityName = getCityName(city)
  const trainers = getTrainersForCity(city)
  const description = getCityDescription(city)

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Background */}
      <div className="fixed inset-0 bg-radial-top pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A8FF]/[0.06] border border-[#00A8FF]/15 text-[#00D4FF] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            {cityName}
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            <span className="text-foreground">Personal Trainer in </span>
            <span className="gradient-brand-text">{cityName}</span>
          </h1>

          <p className="mt-5 text-lg text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Trainers Grid */}
        {trainers.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              <span className="text-[#00D4FF] font-semibold">{trainers.length}</span>{' '}
              {trainers.length === 1 ? 'Coach' : 'Coaches'} in {cityName}
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
                  isVerified={trainer.is_verified} certificateCount={trainer.certificates?.length}
                />
              ))}
            </div>
          </>
        ) : (
          <GlassCard hover={false} className="p-12 text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-[#00A8FF]/[0.06] border border-[#00A8FF]/10 flex items-center justify-center mx-auto mb-5">
              <Search className="w-7 h-7 text-[#00A8FF]/40" />
            </div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">
              Noch keine Trainer in {cityName}
            </h2>
            <p className="text-muted-foreground/70 max-w-md mx-auto">
              Aktuell sind in {cityName} noch keine Coaches registriert. Schau dir alle verfügbaren Trainer an oder komm bald wieder vorbei.
            </p>
          </GlassCard>
        )}

        {/* CTA to full search */}
        <div className="text-center">
          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#00A8FF]/[0.06] border border-[#00A8FF]/15 text-[#00D4FF] font-medium text-sm hover:bg-[#00A8FF]/[0.12] hover:border-[#00A8FF]/30 transition-all duration-300"
          >
            Alle Trainer durchsuchen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
