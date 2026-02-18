'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { TrainerCard } from '@/components/trainer-card'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { TRAINER_CATEGORIES } from '@/types'
import { Search, SlidersHorizontal, MapPin, X } from 'lucide-react'

const mockTrainers = [
  { id: '1', name: 'Max Mustermann', image: 'https://randomuser.me/api/portraits/men/32.jpg', city: 'Berlin', categories: ['Personal Training', 'Krafttraining', 'HIIT'], hourlyRate: 75, rating: 4.8, ratingCount: 124, isVerified: true },
  { id: '2', name: 'Anna Schmidt', image: 'https://randomuser.me/api/portraits/women/44.jpg', city: 'München', categories: ['Yoga', 'Pilates', 'Mobility'], hourlyRate: 65, rating: 4.9, ratingCount: 89, isVerified: true },
  { id: '3', name: 'Tom Weber', image: 'https://randomuser.me/api/portraits/men/75.jpg', city: 'Hamburg', categories: ['CrossFit', 'Ausdauer', 'Outdoor Training'], hourlyRate: 80, rating: 4.7, ratingCount: 67, isVerified: false },
  { id: '4', name: 'Lisa Fischer', image: 'https://randomuser.me/api/portraits/women/68.jpg', city: 'Köln', categories: ['Ernährungsberatung', 'Online Coaching'], hourlyRate: 55, rating: 4.6, ratingCount: 45, isVerified: true },
  { id: '5', name: 'Chris Bauer', image: 'https://randomuser.me/api/portraits/men/22.jpg', city: 'Frankfurt', categories: ['Bodybuilding', 'Krafttraining', 'Ernährungsberatung'], hourlyRate: 90, rating: 4.9, ratingCount: 203, isVerified: true },
  { id: '6', name: 'Sarah Klein', image: 'https://randomuser.me/api/portraits/women/29.jpg', city: 'Berlin', categories: ['Boxen', 'Kampfsport', 'HIIT'], hourlyRate: 70, rating: 4.5, ratingCount: 38, isVerified: false },
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filteredTrainers = mockTrainers.filter((t) => {
    if (query && !t.name.toLowerCase().includes(query.toLowerCase()) && !t.categories.some(c => c.toLowerCase().includes(query.toLowerCase()))) return false
    if (selectedCity && t.city !== selectedCity) return false
    if (selectedCategories.length > 0 && !selectedCategories.some(c => t.categories.includes(c))) return false
    return true
  })

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }

  const cities = ['Berlin', 'München', 'Hamburg', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf']

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold gradient-brand-text">Coaches finden</h1>
            <p className="text-muted-foreground mt-3">Finde den perfekten Coach für deine Ziele</p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00D4FF]/50" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Suche Sportart, Name, Ort..."
                className="pl-12 h-12 bg-[#0D1320]/80 border-[rgba(0,168,255,0.12)] focus:border-[#00A8FF]/40 text-base placeholder:text-muted-foreground/40 rounded-2xl transition-all duration-300"
              />
            </div>
            <GradientButton
              variant="cyan"
              outline={!showFilters}
              size="md"
              onClick={() => setShowFilters(!showFilters)}
              className="px-5 rounded-2xl"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </GradientButton>
          </div>

          {/* Filters */}
          {showFilters && (
            <GlassCard className="p-5 mb-6" hover={false}>
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Stadt</h3>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <button key={city} onClick={() => setSelectedCity(selectedCity === city ? '' : city)} className={cn('px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300', selectedCity === city ? 'bg-[#00A8FF]/15 text-[#00D4FF] border border-[#00A8FF]/30' : 'bg-[#1A2332]/50 text-muted-foreground border border-transparent hover:border-[rgba(0,168,255,0.15)]')}>
                      <MapPin className="w-3 h-3 inline mr-1" />{city}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Kategorien</h3>
                <div className="flex flex-wrap gap-2">
                  {TRAINER_CATEGORIES.map((cat) => (
                    <button key={cat} onClick={() => toggleCategory(cat)} className={cn('px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300', selectedCategories.includes(cat) ? 'bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/30' : 'bg-[#1A2332]/50 text-muted-foreground border border-transparent hover:border-[rgba(0,168,255,0.15)]')}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {(selectedCity || selectedCategories.length > 0) && (
                <div className="mt-4 pt-4 border-t border-[rgba(0,168,255,0.06)] flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">Aktive Filter:</span>
                  {selectedCity && <Badge className="bg-[#00A8FF]/10 text-[#00D4FF] border-none gap-1 cursor-pointer" onClick={() => setSelectedCity('')}>{selectedCity} <X className="w-3 h-3" /></Badge>}
                  {selectedCategories.map((cat) => <Badge key={cat} className="bg-[#00FF94]/10 text-[#00FF94] border-none gap-1 cursor-pointer" onClick={() => toggleCategory(cat)}>{cat} <X className="w-3 h-3" /></Badge>)}
                </div>
              )}
            </GlassCard>
          )}

          {/* Results count */}
          <p className="text-sm text-[#00D4FF]/70 mb-6 font-medium">{filteredTrainers.length} Coaches gefunden</p>

          {/* Trainer List */}
          <div className="space-y-4">
            {filteredTrainers.map((trainer) => <TrainerCard key={trainer.id} {...trainer} />)}
          </div>

          {filteredTrainers.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-[#00A8FF]/[0.06] flex items-center justify-center mx-auto mb-5">
                <Search className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground">Keine Coaches gefunden</h3>
              <p className="text-sm text-muted-foreground mt-2">Versuche andere Suchbegriffe oder Filter</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
