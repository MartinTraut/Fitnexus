import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { SectionHeading } from '@/components/section-heading'
import { TrainerCard } from '@/components/trainer-card'
import { StarRating } from '@/components/star-rating'
import { Badge } from '@/components/ui/badge'
import { MapPin, Search, ArrowRight, Clock, Users, Shield, Play, Calendar, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

/* ─── SEO Pages Data ─── */
const seoData: Record<string, { title: string; heading: string; description: string; type: 'city' | 'category' }> = {
  berlin: { title: 'Personal Trainer in Berlin finden', heading: 'Personal Trainer in Berlin', description: 'Finde die besten Personal Trainer in Berlin. Vergleiche Bewertungen, Preise und Spezialisierungen. Buche dein kostenloses Erstgespräch auf FITNEXUS.', type: 'city' },
  muenchen: { title: 'Personal Trainer in München finden', heading: 'Personal Trainer in München', description: 'Finde die besten Personal Trainer in München. Vergleiche Bewertungen, Preise und Spezialisierungen.', type: 'city' },
  hamburg: { title: 'Personal Trainer in Hamburg finden', heading: 'Personal Trainer in Hamburg', description: 'Finde die besten Personal Trainer in Hamburg. Vergleiche Bewertungen, Preise und Spezialisierungen.', type: 'city' },
  koeln: { title: 'Personal Trainer in Köln finden', heading: 'Personal Trainer in Köln', description: 'Finde die besten Personal Trainer in Köln. Vergleiche Bewertungen, Preise und Spezialisierungen.', type: 'city' },
  frankfurt: { title: 'Personal Trainer in Frankfurt finden', heading: 'Personal Trainer in Frankfurt', description: 'Finde die besten Personal Trainer in Frankfurt. Vergleiche Bewertungen, Preise und Spezialisierungen.', type: 'city' },
  stuttgart: { title: 'Personal Trainer in Stuttgart finden', heading: 'Personal Trainer in Stuttgart', description: 'Finde die besten Personal Trainer in Stuttgart. Vergleiche Bewertungen, Preise und Spezialisierungen.', type: 'city' },
  'personal-training': { title: 'Personal Training – Coach finden', heading: 'Personal Training Coaches', description: 'Finde zertifizierte Personal Trainer für individuelles 1:1 Training. Erstelle Trainingspläne und tracke deinen Fortschritt auf FITNEXUS.', type: 'category' },
  yoga: { title: 'Yoga Trainer finden', heading: 'Yoga Trainer & Coaches', description: 'Finde erfahrene Yoga Trainer in deiner Nähe. Von Hatha über Vinyasa bis Yin Yoga.', type: 'category' },
  krafttraining: { title: 'Krafttraining Coach finden', heading: 'Krafttraining Coaches', description: 'Finde spezialisierte Coaches für Krafttraining und Muskelaufbau.', type: 'category' },
  ernaehrungsberatung: { title: 'Ernährungsberater finden', heading: 'Ernährungsberatung Coaches', description: 'Finde qualifizierte Ernährungsberater und erstelle deinen individuellen Ernährungsplan.', type: 'category' },
  crossfit: { title: 'CrossFit Coach finden', heading: 'CrossFit Coaches', description: 'Finde erfahrene CrossFit Coaches für funktionelles Training.', type: 'category' },
  boxen: { title: 'Box Trainer finden', heading: 'Box Trainer & Coaches', description: 'Finde Boxtrainer für Fitness Boxing und Kampfsport Training.', type: 'category' },
}

/* ─── Mock Trainer Profile Data ─── */
const mockTrainerProfile = {
  id: '1', name: 'Max Mustermann',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: 'Zertifizierter Personal Trainer mit über 8 Jahren Erfahrung im Bereich Krafttraining und funktionellem Training. Mein Ziel ist es, dir zu helfen, dein volles Potenzial auszuschöpfen – mit einem individuellen, wissenschaftlich fundierten Ansatz.',
  city: 'Berlin', categories: ['Personal Training', 'Krafttraining', 'HIIT', 'Ernährungsberatung'],
  hourlyRate: 75, rating: 4.8, ratingCount: 124, isVerified: true, clientCount: 48, experience: '8+ Jahre',
  packages: [
    { id: '1', name: 'Probetraining', description: 'Kostenloses Kennenlernen', sessions: 1, price: 0 },
    { id: '2', name: 'Starter', description: '4 Sessions pro Monat', sessions: 4, price: 249 },
    { id: '3', name: 'Premium', description: '8 Sessions + Ernährungsplan', sessions: 8, price: 449 },
    { id: '4', name: 'Elite', description: '12 Sessions + Full Coaching', sessions: 12, price: 599 },
  ],
  reviews: [
    { id: '1', name: 'Client#3847', rating: 5, text: 'Max ist der beste Trainer, den ich je hatte. Sehr professionell und motivierend!', date: 'Vor 2 Wochen' },
    { id: '2', name: 'Client#9124', rating: 4.8, text: 'Super Pläne und immer erreichbar. Hat mir geholfen, 10kg abzunehmen.', date: 'Vor 1 Monat' },
    { id: '3', name: 'Client#5561', rating: 4.6, text: 'Sehr kompetent im Bereich Krafttraining. Empfehle ich jedem!', date: 'Vor 2 Monaten' },
  ],
  ratingBreakdown: { punctuality: 4.9, motivation: 4.8, knowledge: 4.9, sympathy: 4.7, cleanliness: 4.6 },
}

const seoMockTrainers = [
  { id: '1', name: 'Max Mustermann', image: 'https://randomuser.me/api/portraits/men/32.jpg', city: 'Berlin', categories: ['Personal Training', 'Krafttraining'], hourlyRate: 75, rating: 4.8, ratingCount: 124, isVerified: true },
  { id: '2', name: 'Anna Schmidt', image: 'https://randomuser.me/api/portraits/women/44.jpg', city: 'München', categories: ['Yoga', 'Pilates'], hourlyRate: 65, rating: 4.9, ratingCount: 89, isVerified: true },
  { id: '3', name: 'Tom Weber', image: 'https://randomuser.me/api/portraits/men/75.jpg', city: 'Hamburg', categories: ['CrossFit', 'Ausdauer'], hourlyRate: 80, rating: 4.7, ratingCount: 67, isVerified: false },
]

/* ─── Helpers ─── */
const seoSlugs = new Set(Object.keys(seoData))

function isSeoSlug(slug: string) {
  return seoSlugs.has(slug)
}

type PageParams = { slug: string }

/* ─── Metadata ─── */
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params

  if (isSeoSlug(slug)) {
    const data = seoData[slug]
    return { title: data.title, description: data.description, openGraph: { title: data.title, description: data.description } }
  }

  // Trainer profile — in production this would fetch from DB
  return {
    title: `${mockTrainerProfile.name} – Personal Trainer`,
    description: mockTrainerProfile.bio.slice(0, 155),
  }
}

export function generateStaticParams() {
  return Object.keys(seoData).map((slug) => ({ slug }))
}

/* ─── Page Component ─── */
export default async function TrainerPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params

  if (isSeoSlug(slug)) {
    return <SEOPage data={seoData[slug]} />
  }

  // Treat as trainer profile ID
  // In production: fetch trainer by ID from Supabase, call notFound() if missing
  return <TrainerProfilePage />
}

/* ─── SEO Landing Page ─── */
function SEOPage({ data }: { data: (typeof seoData)[string] }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-16">
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-radial-top" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              {data.type === 'city' ? <MapPin className="w-4 h-4 text-[#00D4FF]" /> : <Search className="w-4 h-4 text-[#00FF94]" />}
              <span className="text-sm text-muted-foreground">{data.type === 'city' ? 'Standort' : 'Kategorie'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-brand-text mb-6">{data.heading}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{data.description}</p>
            <Link href="/search">
              <GradientButton variant="cyan" size="lg"><Search className="w-5 h-5" /> Alle Trainer ansehen</GradientButton>
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SectionHeading title="Top Trainer" subtitle="Hier sind einige der bestbewerteten Trainer" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seoMockTrainers.map((trainer) => <TrainerCard key={trainer.id} {...trainer} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/search">
              <GradientButton variant="brand" size="md">Mehr Trainer entdecken <ArrowRight className="w-4 h-4" /></GradientButton>
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <GlassCard className="p-8" hover={false}>
            <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
              {data.type === 'city' ? `Fitness Coaching in ${data.heading.replace('Personal Trainer in ', '')}` : `${data.heading} auf FITNEXUS`}
            </h2>
            <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
              <p>FITNEXUS macht es dir einfach, den perfekten Coach zu finden. Vergleiche Profile, lies echte Bewertungen und buche direkt dein kostenloses Kennenlerngespräch.</p>
              <p>Alle Trainer auf unserer Plattform werden verifiziert. Kommunikation, Verträge und Bezahlung laufen sicher über FITNEXUS – damit du dich voll auf dein Training konzentrieren kannst.</p>
              <h3 className="text-foreground font-heading font-semibold text-lg">So funktioniert es</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Erstelle ein kostenloses Konto auf FITNEXUS</li>
                <li>Durchsuche Profile und finde deinen idealen Coach</li>
                <li>Buche ein kostenloses Erstgespräch</li>
                <li>Starte dein Training mit individuellen Plänen</li>
              </ol>
            </div>
          </GlassCard>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ─── Trainer Profile Page ─── */
function TrainerProfilePage() {
  const trainer = mockTrainerProfile
  const ratingLabels: Record<string, string> = { punctuality: 'Pünktlichkeit', motivation: 'Motivation', knowledge: 'Fachwissen', sympathy: 'Sympathie', cleanliness: 'Sauberkeit' }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="relative mb-8">
            <div className="h-32 md:h-48 rounded-2xl bg-gradient-to-br from-[#00A8FF]/20 via-[#0D1320] to-[#00FF94]/10 overflow-hidden">
              <div className="w-full h-full bg-grid opacity-50" />
            </div>
            <div className="flex flex-col md:flex-row items-start gap-6 -mt-12 md:-mt-16 px-4 md:px-8">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-[#0B0F1A] flex-shrink-0">
                <Image src={trainer.image} alt={trainer.name} width={128} height={128} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{trainer.name}</h1>
                  {trainer.isVerified && <Badge className="bg-[#00A8FF]/20 text-[#00D4FF] border-[#00A8FF]/30"><Shield className="w-3 h-3 mr-1" /> Verifiziert</Badge>}
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {trainer.city}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {trainer.experience}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {trainer.clientCount} Kunden</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <StarRating rating={trainer.rating} size="md" />
                  <span className="text-sm text-muted-foreground">({trainer.ratingCount} Bewertungen)</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <GlassCard className="px-5 py-3 text-center" glow="cyan">
                  <p className="text-sm text-muted-foreground">ab</p>
                  <p className="text-2xl font-bold text-[#00D4FF]">{trainer.hourlyRate}€</p>
                  <p className="text-xs text-muted-foreground">pro Stunde</p>
                </GlassCard>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-8">
              <GlassCard className="p-6" hover={false}>
                <h2 className="font-heading font-semibold text-lg text-foreground mb-3">Über mich</h2>
                <p className="text-muted-foreground leading-relaxed">{trainer.bio}</p>
              </GlassCard>

              <div>
                <h2 className="font-heading font-semibold text-lg text-foreground mb-3">Spezialisierungen</h2>
                <div className="flex flex-wrap gap-2">
                  {trainer.categories.map((cat) => <Badge key={cat} className="bg-[#00A8FF]/10 text-[#00D4FF] border border-[#00A8FF]/20 px-3 py-1.5">{cat}</Badge>)}
                </div>
              </div>

              <GlassCard className="p-0 overflow-hidden" hover={false}>
                <div className="aspect-video bg-gradient-to-br from-[#0D1320] to-[#1A2332] flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full gradient-cyan flex items-center justify-center hover:shadow-[0_0_30px_rgba(0,168,255,0.4)] transition-all duration-300">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </button>
                </div>
                <div className="p-4"><p className="text-sm text-muted-foreground">Intro-Video</p></div>
              </GlassCard>

              <GlassCard className="p-6" hover={false}>
                <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Bewertungen im Detail</h2>
                <div className="space-y-3">
                  {Object.entries(trainer.ratingBreakdown).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground w-28">{ratingLabels[key]}</span>
                      <div className="flex-1 h-2 rounded-full bg-[#1A2332] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#00A8FF] to-[#00D4FF]" style={{ width: `${(value / 5) * 100}%` }} />
                      </div>
                      <span className="text-sm font-medium text-foreground w-8">{value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <div>
                <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Bewertungen</h2>
                <div className="space-y-4">
                  {trainer.reviews.map((r) => (
                    <GlassCard key={r.id} className="p-5" hover={false}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1A2332] flex items-center justify-center text-xs font-bold text-muted-foreground">{r.name.slice(0, 2)}</div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{r.name}</p>
                            <p className="text-xs text-muted-foreground">{r.date}</p>
                          </div>
                        </div>
                        <StarRating rating={r.rating} size="sm" showValue={false} />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <GlassCard className="p-6 sticky top-24" hover={false} neonBorder>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Kennenlernen buchen</h3>
                <p className="text-sm text-muted-foreground mb-6">Buche ein kostenloses Erstgespräch und finde heraus, ob es passt.</p>
                <Link href="/auth/register">
                  <GradientButton variant="cyan" size="md" className="w-full mb-3"><Calendar className="w-4 h-4" /> Termin buchen</GradientButton>
                </Link>
                <Link href="/auth/register">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[rgba(0,168,255,0.2)] text-foreground text-sm font-medium hover:border-[#00A8FF] hover:bg-[#00A8FF]/5 transition-all duration-200">
                    <MessageCircle className="w-4 h-4" /> Nachricht senden
                  </button>
                </Link>
              </GlassCard>

              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Pakete</h3>
                <div className="space-y-3">
                  {trainer.packages.map((pkg) => (
                    <GlassCard key={pkg.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-sm text-foreground">{pkg.name}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{pkg.description}</p>
                        </div>
                        <div className="text-right">
                          {pkg.price === 0
                            ? <span className="text-lg font-bold text-[#00FF94]">Gratis</span>
                            : <><span className="text-lg font-bold text-foreground">{pkg.price}€</span><p className="text-[10px] text-muted-foreground">/Monat</p></>
                          }
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
