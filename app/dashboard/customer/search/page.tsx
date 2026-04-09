'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { searchTrainers } from '@/lib/mock-data'
import Link from 'next/link'
import {
  Search, MapPin, Star, ArrowRight, Filter,
  CheckCircle2,
} from 'lucide-react'

export default function CustomerSearchPage() {
  const [query, setQuery] = useState('')
  const results = searchTrainers({ query: query || undefined })

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
          Coach finden
        </h1>
        <p className="mt-1 text-muted-foreground">
          Durchsuche alle verfügbaren Coaches oder nutze die erweiterte Suche.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name, Kategorie, Stadt..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#0D1320] border border-[rgba(0,168,255,0.1)] text-foreground text-sm focus:outline-none focus:border-[#00A8FF]/40 transition-colors placeholder:text-muted-foreground"
        />
      </div>

      {/* Public Search Link */}
      <GlassCard className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" hover>
        <div className="flex items-center gap-3">
          <div className="bg-[#00A8FF]/10 p-2.5 rounded-xl">
            <Filter className="w-5 h-5 text-[#00D4FF]" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">Erweiterte Suche nutzen</p>
            <p className="text-xs text-muted-foreground">
              Filter nach Stadt, Preis, Bewertung, Coaching-Modus und mehr
            </p>
          </div>
        </div>
        <Link href="/trainers">
          <GradientButton variant="cyan" size="sm" outline>
            Zur Suche
            <ArrowRight className="w-3.5 h-3.5" />
          </GradientButton>
        </Link>
      </GlassCard>

      {/* Quick Results */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-3">
          {query ? `Ergebnisse (${results.length})` : `Alle Coaches (${results.length})`}
        </h2>
        <div className="space-y-3">
          {results.map((trainer) => (
            <Link key={trainer.id} href={`/trainers/${trainer.slug}`}>
              <GlassCard className="p-4 flex items-center gap-4" hover>
                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A8FF]/20 to-[#00FF94]/20 border border-[#00A8FF]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {trainer.profile_image_url ? (
                    <img
                      src={trainer.profile_image_url}
                      alt={trainer.display_name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-sm font-heading font-bold text-[#00D4FF]">
                      {trainer.first_name[0]}{trainer.last_name[0]}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground text-sm truncate">
                      {trainer.display_name}
                    </p>
                    {trainer.is_verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00A8FF] flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {trainer.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      {trainer.rating_average}
                    </span>
                    <span>{trainer.hourly_rate}€/h</span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
