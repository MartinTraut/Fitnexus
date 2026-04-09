'use client'

import { useState, useEffect } from 'react'
import { getReviewsForTrainer } from '@/lib/store'
import { GlassCard } from '@/components/glass-card'
import { StarRating } from '@/components/star-rating'
import type { Review } from '@/types'
import { Star, MessageSquareQuote, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewListProps {
  trainerId: string
}

interface ReviewWithName extends Review {
  customer_display_name?: string
}

interface DimensionStats {
  label: string
  key: string
  average: number
}

function DimensionBar({ label, value, max = 5 }: { label: string; value: number; max?: number }) {
  const percent = (value / max) * 100

  return (
    <div className="flex items-center gap-3">
      <span className="min-w-[100px] text-xs text-white/50">{label}</span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00A8FF] to-[#00FF94] transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="min-w-[28px] text-right text-xs font-semibold text-white/70">
        {value.toFixed(1)}
      </span>
    </div>
  )
}

function formatReviewDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffDays === 0) return 'Heute'
  if (diffDays === 1) return 'Gestern'
  if (diffDays < 7) return `vor ${diffDays} Tagen`
  if (diffDays < 30) return `vor ${Math.floor(diffDays / 7)} Wochen`
  if (diffDays < 365) return `vor ${Math.floor(diffDays / 30)} Monaten`
  return date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
}

export function ReviewList({ trainerId }: ReviewListProps) {
  const [reviews, setReviews] = useState<ReviewWithName[]>([])

  useEffect(() => {
    const data = getReviewsForTrainer(trainerId)
    setReviews(data)
  }, [trainerId])

  if (reviews.length === 0) {
    return (
      <GlassCard hover={false} className="p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04]">
            <MessageSquareQuote className="h-6 w-6 text-white/20" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-white/50">Noch keine Bewertungen</p>
            <p className="mt-1 text-xs text-white/30">
              Sei der Erste, der eine Bewertung schreibt.
            </p>
          </div>
        </div>
      </GlassCard>
    )
  }

  // Calculate stats
  const totalRating = reviews.reduce((sum, r) => sum + r.rating_total, 0) / reviews.length
  const dimensionStats: DimensionStats[] = [
    { label: 'Pünktlichkeit', key: 'punctuality', average: reviews.reduce((s, r) => s + r.punctuality, 0) / reviews.length },
    { label: 'Motivation', key: 'motivation', average: reviews.reduce((s, r) => s + r.motivation, 0) / reviews.length },
    { label: 'Fachwissen', key: 'knowledge', average: reviews.reduce((s, r) => s + r.knowledge, 0) / reviews.length },
    { label: 'Sympathie', key: 'sympathy', average: reviews.reduce((s, r) => s + r.sympathy, 0) / reviews.length },
    { label: 'Zuverlässigkeit', key: 'cleanliness', average: reviews.reduce((s, r) => s + r.cleanliness, 0) / reviews.length },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <GlassCard hover={false} className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Overall Score */}
          <div className="flex flex-col items-center justify-center sm:min-w-[140px]">
            <div className="text-4xl font-bold text-[#00FF94]">
              {totalRating.toFixed(1)}
            </div>
            <StarRating rating={totalRating} size="md" showValue={false} className="mt-1.5" />
            <p className="mt-1.5 text-xs text-white/40">
              {reviews.length} {reviews.length === 1 ? 'Bewertung' : 'Bewertungen'}
            </p>
          </div>

          {/* Dimension Bars */}
          <div className="flex-1 space-y-2.5">
            {dimensionStats.map(stat => (
              <DimensionBar
                key={stat.key}
                label={stat.label}
                value={stat.average}
              />
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Individual Reviews */}
      <div className="space-y-3">
        {reviews.filter(r => r.is_visible).map(review => (
          <GlassCard key={review.id} hover={false} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Anonymous Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#00A8FF]/10 to-[#00FF94]/10">
                  <span className="text-xs font-bold text-[#00A8FF]">
                    {(review.customer_display_name || 'A').charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-white/70">
                    {review.customer_display_name || 'Anonym'}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRating rating={review.rating_total} size="sm" showValue={false} />
                    <span className="text-[11px] text-white/30">
                      {formatReviewDate(review.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-8 items-center justify-center rounded-lg bg-[#00FF94]/[0.08] px-2.5">
                <span className="text-sm font-bold text-[#00FF94]">
                  {review.rating_total.toFixed(1)}
                </span>
              </div>
            </div>

            {review.text && (
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {review.text}
              </p>
            )}

            {/* Mini dimension badges */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                { label: 'Pünktlichkeit', value: review.punctuality },
                { label: 'Motivation', value: review.motivation },
                { label: 'Fachwissen', value: review.knowledge },
                { label: 'Sympathie', value: review.sympathy },
              ].map(dim => (
                <span
                  key={dim.label}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium',
                    dim.value >= 4
                      ? 'bg-[#00FF94]/[0.08] text-[#00FF94]/70'
                      : dim.value >= 3
                      ? 'bg-[#00A8FF]/[0.08] text-[#00A8FF]/70'
                      : 'bg-white/[0.04] text-white/40'
                  )}
                >
                  {dim.label} {dim.value}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
