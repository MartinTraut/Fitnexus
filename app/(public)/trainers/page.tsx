'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, MapPin, Tag, ArrowUpDown, Monitor, Navigation, Repeat, X, Euro, UserCircle } from 'lucide-react'
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
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [gender, setGender] = useState('')

  const results = useMemo(() => {
    let filtered = searchTrainers({
      query: query || undefined,
      city: city || undefined,
      category: category || undefined,
      mode: mode || undefined,
      minPrice: priceMin ? parseInt(priceMin) : undefined,
      maxPrice: priceMax ? parseInt(priceMax) : undefined,
      sortBy: sortBy === 'default' ? undefined : sortBy,
    })
    // Gender filter (based on first name heuristic from mock data)
    if (gender === 'weiblich') {
      filtered = filtered.filter(t => ['Sarah', 'Anna', 'Lena', 'Nina'].includes(t.first_name))
    } else if (gender === 'männlich') {
      filtered = filtered.filter(t => ['Max', 'Leon', 'David', 'Tom'].includes(t.first_name))
    }
    return filtered
  }, [query, city, category, sortBy, mode, priceMin, priceMax, gender])

  const hasActiveFilters = city || category || mode || sortBy !== 'default' || priceMin || priceMax || gender

  function clearFilters() {
    setCity('')
    setCategory('')
    setMode('')
    setSortBy('default')
    setQuery('')
    setPriceMin('')
    setPriceMax('')
    setGender('')
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

          {/* Search + Filters — Unified Block */}
          <AnimatedSection delay={0.1}>
            <div className="mb-8 space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40" />
                <input
                  type="text"
                  placeholder="Name, Kategorie oder Stadt suchen..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 rounded-2xl bg-[#0D1320]/70 border border-[rgba(0,168,255,0.1)] text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-[#00A8FF]/35 focus:shadow-[0_0_20px_rgba(0,168,255,0.08)] transition-all duration-300 text-base"
                />
              </div>

              {/* Filter Row */}
              <div className="rounded-2xl bg-[#0D1320]/50 border border-[rgba(0,168,255,0.06)] p-3">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
                  {/* City */}
                  <select value={city} onChange={(e) => setCity(e.target.value)}
                    className="appearance-none px-3 py-2 rounded-lg bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-xs text-foreground focus:outline-none focus:border-[#00A8FF]/25 transition-all min-w-[110px] cursor-pointer flex-shrink-0">
                    <option value="">Stadt</option>
                    {GERMAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>

                  {/* Category */}
                  <select value={category} onChange={(e) => setCategory(e.target.value)}
                    className="appearance-none px-3 py-2 rounded-lg bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-xs text-foreground focus:outline-none focus:border-[#00A8FF]/25 transition-all min-w-[120px] cursor-pointer flex-shrink-0">
                    <option value="">Kategorie</option>
                    {TRAINER_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>

                  {/* Price Min */}
                  <input type="number" placeholder="Min €" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
                    className="w-[80px] px-3 py-2 rounded-lg bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-[#00A8FF]/25 transition-all flex-shrink-0"
                  />
                  <span className="text-muted-foreground/20 text-[10px] flex-shrink-0">–</span>
                  {/* Price Max */}
                  <input type="number" placeholder="Max €" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
                    className="w-[80px] px-3 py-2 rounded-lg bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-[#00A8FF]/25 transition-all flex-shrink-0"
                  />

                  {/* Gender */}
                  <select value={gender} onChange={(e) => setGender(e.target.value)}
                    className="appearance-none px-3 py-2 rounded-lg bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-xs text-foreground focus:outline-none focus:border-[#00A8FF]/25 transition-all min-w-[100px] cursor-pointer flex-shrink-0">
                    <option value="">Geschlecht</option>
                    <option value="männlich">Männlich</option>
                    <option value="weiblich">Weiblich</option>
                  </select>

                  {/* Sort */}
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-3 py-2 rounded-lg bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-xs text-foreground focus:outline-none focus:border-[#00A8FF]/25 transition-all min-w-[110px] cursor-pointer flex-shrink-0">
                    {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>

                  {/* Coaching Mode Chips */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {COACHING_MODES.map((m) => {
                      const isActive = mode === m
                      const Icon = m === 'Online' ? Monitor : m === 'Vor Ort' ? Navigation : Repeat
                      return (
                        <button key={m} onClick={() => setMode(isActive ? '' : m)}
                          className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-[11px] font-medium transition-all duration-200 flex-shrink-0 ${
                            isActive
                              ? 'bg-[#00A8FF]/15 text-[#00D4FF] border border-[#00A8FF]/25'
                              : 'bg-[#1A2332]/40 text-muted-foreground/50 border border-transparent hover:text-muted-foreground hover:bg-[#1A2332]/60'
                          }`}>
                          <Icon className="w-3 h-3" /> {m}
                        </button>
                      )
                    })}
                  </div>

                  {/* Clear */}
                  {hasActiveFilters && (
                    <button onClick={clearFilters}
                      className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-[11px] font-medium text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0">
                      <X className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
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
                    isVerified={trainer.is_verified} certificateCount={trainer.certificates?.length}
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
