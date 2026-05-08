'use client'

import { useState } from 'react'
import { Search, MapPin, Monitor, Navigation, Repeat, Lock, Sparkles } from 'lucide-react'
import { TrainerCard } from '@/components/trainer-card'
import { AnimatedSection, StaggerGroup, StaggerItem } from '@/components/motion'
import { LoginRequiredModal } from '@/components/login-required-modal'
import { mockTrainers } from '@/lib/mock-data'
import { TRAINER_CATEGORIES, GERMAN_CITIES } from '@/types'

const COACHING_MODES = ['Online', 'Vor Ort', 'Hybrid'] as const
const SORT_OPTIONS = [
  { value: 'default', label: 'Relevanz' },
  { value: 'rating', label: 'Beste Bewertung' },
  { value: 'price_asc', label: 'Preis aufsteigend' },
  { value: 'price_desc', label: 'Preis absteigend' },
  { value: 'newest', label: 'Neueste' },
] as const

// Visual preview list — first batch, sorted by rating so the showcase feels strong.
const previewResults = [...mockTrainers]
  .sort((a, b) => b.rating_average - a.rating_average)
  .slice(0, 12)

export default function TrainersPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const openLogin = () => setIsLoginOpen(true)

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="fixed inset-0 bg-radial-top pointer-events-none" />

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.01em] leading-[1.05]">
                <span className="text-foreground">Finde deinen </span>
                <span className="gradient-brand-text">Coach</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground/80 max-w-xl mx-auto leading-relaxed">
                Durchsuche verifizierte Trainer in deiner Nähe. Filtern, vergleichen, Kennenlernen buchen.
              </p>
            </div>
          </AnimatedSection>

          {/* Preview Notice */}
          <AnimatedSection delay={0.05}>
            <button
              type="button"
              onClick={openLogin}
              className="group w-full mb-6 flex items-center gap-4 rounded-2xl bg-[#00A8FF]/[0.06] border border-[#00A8FF]/20 hover:border-[#00A8FF]/40 hover:bg-[#00A8FF]/[0.10] transition-all duration-300 px-5 py-4 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00A8FF]/[0.12] border border-[#00A8FF]/25 flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-[#00D4FF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Vorschau — so sieht die Coach-Suche aus
                </p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  Suche, Filter und Erstgespräche sind nach kostenloser Registrierung in unter 60 Sekunden freigeschaltet.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#00D4FF] group-hover:translate-x-0.5 transition-transform">
                <Sparkles className="w-3.5 h-3.5" /> Jetzt registrieren
              </span>
            </button>
          </AnimatedSection>

          {/* Locked Search + Filters */}
          <AnimatedSection delay={0.1}>
            <div className="mb-8 space-y-3">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40" />
                <input
                  type="text"
                  placeholder="Name, Kategorie oder Stadt suchen..."
                  value=""
                  readOnly
                  onClick={openLogin}
                  onFocus={(e) => { e.currentTarget.blur(); openLogin() }}
                  className="w-full pl-14 pr-14 py-4 rounded-2xl bg-[#0D1320]/70 border border-[rgba(0,168,255,0.1)] text-foreground placeholder:text-muted-foreground/35 cursor-pointer caret-transparent focus:outline-none hover:border-[#00A8FF]/25 transition-all duration-300 text-base"
                  aria-label="Suche (Login erforderlich)"
                />
                <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00A8FF]/50" />
              </div>

              <div className="rounded-2xl bg-[#0D1320]/50 border border-[rgba(0,168,255,0.06)] p-4 space-y-2.5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  <LockedSelect onClick={openLogin} placeholder="Stadt" options={GERMAN_CITIES.slice(0, 6)} />
                  <LockedSelect onClick={openLogin} placeholder="Kategorie" options={TRAINER_CATEGORIES.slice(0, 6)} />
                  <div className="flex items-center gap-1.5">
                    <LockedInput onClick={openLogin} placeholder="Min €" />
                    <span className="text-muted-foreground/20 text-sm">–</span>
                    <LockedInput onClick={openLogin} placeholder="Max €" />
                  </div>
                  <LockedSelect onClick={openLogin} placeholder="Geschlecht" options={['Männlich', 'Weiblich']} />
                  <LockedSelect onClick={openLogin} placeholder="Relevanz" options={SORT_OPTIONS.map(o => o.label)} />
                </div>

                <div className="flex items-center gap-2.5">
                  {COACHING_MODES.map((m) => {
                    const Icon = m === 'Online' ? Monitor : m === 'Vor Ort' ? Navigation : Repeat
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={openLogin}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium bg-[#1A2332]/40 text-muted-foreground/40 border border-transparent hover:text-[#00D4FF] hover:bg-[#00A8FF]/[0.08] hover:border-[#00A8FF]/20 transition-all duration-200"
                      >
                        <Icon className="w-4 h-4" /> {m}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Results */}
          <AnimatedSection delay={0.2}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                <span className="text-[#00D4FF] font-semibold">{previewResults.length}+</span>{' '}
                Trainer in der Vorschau
              </p>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/40">
                <MapPin className="w-3 h-3" /> Auswahl aus ganz Deutschland
              </span>
            </div>
          </AnimatedSection>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {previewResults.map((trainer) => (
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
                  certificateCount={trainer.certificates?.length}
                  preview
                  onPreview={openLogin}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <LoginRequiredModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Coach-Suche freischalten"
        description="In dieser Vorschau zeigen wir dir, wie die Plattform aussieht. Sobald du registriert bist, kannst du Coaches filtern, Profile öffnen und kostenlose Erstgespräche anfragen."
      />
    </div>
  )
}

function LockedSelect({
  onClick, placeholder, options,
}: { onClick: () => void; placeholder: string; options: readonly string[] }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="appearance-none px-4 py-3 rounded-xl bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-sm text-muted-foreground/50 hover:text-[#00D4FF] hover:border-[#00A8FF]/25 focus:outline-none transition-all cursor-pointer w-full text-left flex items-center justify-between gap-2"
      aria-label={`${placeholder} (Login erforderlich)`}
      title={`${placeholder} — ${options.slice(0, 3).join(', ')}…`}
    >
      <span className="truncate">{placeholder}</span>
      <Lock className="w-3 h-3 text-[#00A8FF]/40 flex-shrink-0" />
    </button>
  )
}

function LockedInput({ onClick, placeholder }: { onClick: () => void; placeholder: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full px-4 py-3 rounded-xl bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-sm text-muted-foreground/35 hover:text-[#00D4FF] hover:border-[#00A8FF]/25 focus:outline-none transition-all cursor-pointer text-left"
      aria-label={`${placeholder} (Login erforderlich)`}
    >
      {placeholder}
    </button>
  )
}
