'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, MapPin, Tag, ArrowUpDown, Monitor, Navigation, Repeat, X } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { TrainerCard } from '@/components/trainer-card'
import { AnimatedSection, StaggerGroup, StaggerItem } from '@/components/motion'
import { searchTrainers } from '@/lib/mock-data'
import { TRAINER_CATEGORIES, GERMAN_CITIES } from '@/types'

const COACHING_MODES = ['Online', 'Vor Ort', 'Hybrid'] as const
const SORT_OPTIONS = [
  { value: 'default', label: 'Relevanz' },
  { value: 'rating', label: 'Beste Bewertung' },
  { value: 'price_asc', label: 'Preis aufsteigend' },
  { value: 'price_desc', label: 'Preis absteigend' },
  { value: 'newest', label: 'Neueste' },
] as const

export default function TrainersPage() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [mode, setMode] = useState('')

  const results = useMemo(() => {
    return searchTrainers({
      query: query || undefined,
      city: city || undefined,
      category: category || undefined,
      mode: mode || undefined,
      sortBy: sortBy === 'default' ? undefined : sortBy,
    })
  }, [query, city, category, sortBy, mode])

  const hasActiveFilters = city || category || mode || sortBy !== 'default'

  function clearFilters() {
    setCity('')
    setCategory('')
    setMode('')
    setSortBy('default')
    setQuery('')
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-radial-top pointer-events-none" />

      {/* Hero / Search Header */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
                <span className="text-foreground">Finde deinen </span>
                <span className="gradient-brand-text">Coach</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground/80 max-w-xl mx-auto leading-relaxed">
                Durchsuche verifizierte Trainer in deiner Nähe. Filtern, vergleichen, Kennenlernen buchen.
              </p>
            </div>
          </AnimatedSection>

          {/* Search Bar */}
          <AnimatedSection delay={0.1}>
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                <input
                  type="text"
                  placeholder="Name, Kategorie oder Stadt suchen..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.12)] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-[#00A8FF]/40 focus:shadow-[0_0_20px_rgba(0,168,255,0.1)] transition-all duration-300 text-base"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Filter Bar */}
          <AnimatedSection delay={0.15}>
            <GlassCard hover={false} className="p-4 sm:p-5 mb-8">
              <div className="flex items-center gap-2 mb-3 sm:mb-0 sm:hidden">
                <SlidersHorizontal className="w-4 h-4 text-[#00D4FF]" />
                <span className="text-sm font-medium text-muted-foreground">Filter</span>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3">
                {/* City */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40 pointer-events-none" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-[#0D1320]/60 border border-[rgba(0,168,255,0.1)] text-sm text-foreground focus:outline-none focus:border-[#00A8FF]/30 transition-all duration-300 min-w-[140px] cursor-pointer"
                  >
                    <option value="">Alle Städte</option>
                    {GERMAN_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40 pointer-events-none" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-[#0D1320]/60 border border-[rgba(0,168,255,0.1)] text-sm text-foreground focus:outline-none focus:border-[#00A8FF]/30 transition-all duration-300 min-w-[160px] cursor-pointer"
                  >
                    <option value="">Alle Kategorien</option>
                    {TRAINER_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40 pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-[#0D1320]/60 border border-[rgba(0,168,255,0.1)] text-sm text-foreground focus:outline-none focus:border-[#00A8FF]/30 transition-all duration-300 min-w-[160px] cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Coaching Mode Toggle */}
                <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 rounded-xl bg-[#0D1320]/60 border border-[rgba(0,168,255,0.1)] p-1">
                  {COACHING_MODES.map((m) => {
                    const isActive = mode === m
                    const Icon = m === 'Online' ? Monitor : m === 'Vor Ort' ? Navigation : Repeat
                    return (
                      <button
                        key={m}
                        onClick={() => setMode(isActive ? '' : m)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-[#00A8FF]/15 text-[#00D4FF] border border-[#00A8FF]/25'
                            : 'text-muted-foreground/60 hover:text-muted-foreground border border-transparent'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {m}
                      </button>
                    )
                  })}
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-[#00FF94]/70 hover:text-[#00FF94] transition-colors duration-200"
                  >
                    <X className="w-3 h-3" />
                    Zurücksetzen
                  </button>
                )}
              </div>
            </GlassCard>
          </AnimatedSection>

          {/* Results Count */}
          <AnimatedSection delay={0.2}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                <span className="text-[#00D4FF] font-semibold">{results.length}</span>{' '}
                {results.length === 1 ? 'Trainer' : 'Trainer'} gefunden
              </p>
            </div>
          </AnimatedSection>

          {/* Results Grid */}
          {results.length > 0 ? (
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((trainer) => (
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
          ) : (
            <AnimatedSection>
              <GlassCard hover={false} className="p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#00A8FF]/[0.06] border border-[#00A8FF]/10 flex items-center justify-center mx-auto mb-5">
                  <Search className="w-7 h-7 text-[#00A8FF]/40" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  Keine Trainer gefunden
                </h3>
                <p className="text-muted-foreground/70 max-w-md mx-auto mb-6">
                  Für deine aktuelle Filterauswahl gibt es leider keine Ergebnisse. Versuche, deine Filter anzupassen.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-[#00D4FF] hover:text-[#00A8FF] transition-colors duration-200"
                >
                  Alle Filter zurücksetzen
                </button>
              </GlassCard>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  )
}
