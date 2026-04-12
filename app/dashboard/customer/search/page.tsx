'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Monitor, Navigation, Repeat, X } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { TrainerCard } from '@/components/trainer-card'
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

export default function CustomerSearchPage() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [mode, setMode] = useState('')
  const [gender, setGender] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')

  const filteredTrainers = useMemo(() => {
    let results = searchTrainers({
      query: query || undefined,
      city: city || undefined,
      category: category || undefined,
      minPrice: priceMin ? parseFloat(priceMin) : undefined,
      maxPrice: priceMax ? parseFloat(priceMax) : undefined,
      mode: mode || undefined,
      sortBy: sortBy === 'default' ? undefined : sortBy,
    })
    // Gender filter not available on TrainerProfile yet — skip for now
    return results
  }, [query, city, category, sortBy, mode, gender, priceMin, priceMax])

  const hasActiveFilters = !!(city || category || gender || mode || priceMin || priceMax || sortBy !== 'default')

  function clearFilters() {
    setCity('')
    setCategory('')
    setGender('')
    setMode('')
    setPriceMin('')
    setPriceMax('')
    setSortBy('default')
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
          Coach finden
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Durchsuche verifizierte Trainer. Filtern, vergleichen, Kennenlernen buchen.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name, Kategorie oder Stadt suchen..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#0D1320] border border-[rgba(0,168,255,0.1)] text-foreground text-sm focus:outline-none focus:border-[#00A8FF]/40 transition-colors placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl bg-[#0D1320]/50 border border-[rgba(0,168,255,0.06)] p-4 space-y-2.5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          <select value={city} onChange={(e) => setCity(e.target.value)}
            className="appearance-none px-4 py-3 rounded-xl bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-sm text-foreground focus:outline-none focus:border-[#00A8FF]/30 transition-all cursor-pointer w-full">
            <option value="">Stadt</option>
            {GERMAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="appearance-none px-4 py-3 rounded-xl bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-sm text-foreground focus:outline-none focus:border-[#00A8FF]/30 transition-all cursor-pointer w-full">
            <option value="">Kategorie</option>
            {TRAINER_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <div className="flex items-center gap-1.5">
            <input type="number" placeholder="Min €" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-[#00A8FF]/30 transition-all" />
            <span className="text-muted-foreground/20 text-sm">–</span>
            <input type="number" placeholder="Max €" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-[#00A8FF]/30 transition-all" />
          </div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}
            className="appearance-none px-4 py-3 rounded-xl bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-sm text-foreground focus:outline-none focus:border-[#00A8FF]/30 transition-all cursor-pointer w-full">
            <option value="">Geschlecht</option>
            <option value="männlich">Männlich</option>
            <option value="weiblich">Weiblich</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none px-4 py-3 rounded-xl bg-[#1A2332]/60 border border-[rgba(0,168,255,0.08)] text-sm text-foreground focus:outline-none focus:border-[#00A8FF]/30 transition-all cursor-pointer w-full">
            {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2.5">
          {COACHING_MODES.map((m) => {
            const isActive = mode === m
            const Icon = m === 'Online' ? Monitor : m === 'Vor Ort' ? Navigation : Repeat
            return (
              <button key={m} onClick={() => setMode(isActive ? '' : m)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#00A8FF]/15 text-[#00D4FF] border border-[#00A8FF]/30'
                    : 'bg-[#1A2332]/40 text-muted-foreground/40 border border-transparent hover:text-muted-foreground/70 hover:bg-[#1A2332]/60'
                }`}>
                <Icon className="w-4 h-4" /> {m}
              </button>
            )
          })}
          {hasActiveFilters && (
            <button onClick={clearFilters}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all ml-auto">
              <X className="w-4 h-4" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <p className="text-sm text-muted-foreground">
        <span className="text-[#00D4FF] font-semibold">{filteredTrainers.length}</span> Trainer gefunden
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrainers.map((t) => (
          <TrainerCard
            key={t.id}
            id={t.slug}
            name={t.display_name}
            image={t.profile_image_url}
            city={t.city}
            categories={t.categories}
            hourlyRate={t.hourly_rate}
            rating={t.rating_average}
            ratingCount={t.rating_count}
            isVerified={t.is_verified}
            certificateCount={t.certificates?.length}
          />
        ))}
      </div>

      {filteredTrainers.length === 0 && (
        <GlassCard className="p-10 text-center" hover={false}>
          <Search className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Keine Coaches gefunden.</p>
          <p className="text-xs text-muted-foreground/50 mt-1">Versuche andere Filter oder eine andere Stadt.</p>
        </GlassCard>
      )}
    </div>
  )
}
