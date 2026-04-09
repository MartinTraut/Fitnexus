'use client'

import { useState } from 'react'
import { createReview } from '@/lib/store'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { Star, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewFormProps {
  trainerId: string
  trainerName: string
  onSubmit?: () => void
}

interface RatingDimension {
  key: string
  label: string
  value: number
}

function InteractiveStars({
  value,
  onChange,
  size = 'md',
}: {
  value: number
  onChange: (v: number) => void
  size?: 'sm' | 'md'
}) {
  const [hovered, setHovered] = useState(0)
  const starSize = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'

  return (
    <div className="flex items-center gap-0.5" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onClick={() => onChange(star)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <Star
            className={cn(
              starSize,
              'transition-colors duration-150',
              (hovered || value) >= star
                ? 'fill-[#00FF94] text-[#00FF94] drop-shadow-[0_0_4px_rgba(0,255,148,0.5)]'
                : 'fill-transparent text-white/15 hover:text-white/25'
            )}
          />
        </button>
      ))}
    </div>
  )
}

export function ReviewForm({ trainerId, trainerName, onSubmit }: ReviewFormProps) {
  const [dimensions, setDimensions] = useState<RatingDimension[]>([
    { key: 'punctuality', label: 'Pünktlichkeit', value: 0 },
    { key: 'motivation', label: 'Motivation', value: 0 },
    { key: 'sympathy', label: 'Sympathie', value: 0 },
    { key: 'knowledge', label: 'Fachwissen', value: 0 },
    { key: 'cleanliness', label: 'Zuverlässigkeit', value: 0 },
    { key: 'professionalism', label: 'Professionalität', value: 0 },
  ])
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateDimension = (key: string, value: number) => {
    setDimensions(prev =>
      prev.map(d => (d.key === key ? { ...d, value } : d))
    )
  }

  const filledDimensions = dimensions.filter(d => d.value > 0)
  const averageRating = filledDimensions.length > 0
    ? Math.round((filledDimensions.reduce((sum, d) => sum + d.value, 0) / filledDimensions.length) * 10) / 10
    : 0
  const allRated = dimensions.every(d => d.value > 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!allRated) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 600))

    // Map professionalism to cleanliness for the store (store only has 5 dimensions)
    const dimMap = Object.fromEntries(dimensions.map(d => [d.key, d.value]))

    createReview({
      trainer_id: trainerId,
      customer_id: 'c_demo',
      punctuality: dimMap.punctuality,
      motivation: dimMap.motivation,
      knowledge: dimMap.knowledge,
      sympathy: dimMap.sympathy,
      cleanliness: Math.round((dimMap.cleanliness + dimMap.professionalism) / 2),
      text: text.trim() || null,
    })

    setIsSubmitting(false)
    setIsSuccess(true)
    onSubmit?.()
  }

  if (isSuccess) {
    return (
      <GlassCard hover={false} className="p-8">
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#00FF94]/20" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#00FF94]/10 ring-2 ring-[#00FF94]/30">
              <CheckCircle2 className="h-8 w-8 text-[#00FF94]" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-white">Bewertung abgegeben</h3>
            <p className="mt-1.5 text-sm text-white/50">
              Vielen Dank für dein Feedback zu {trainerName}.
            </p>
          </div>
        </div>
      </GlassCard>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <GlassCard hover={false} className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-white">
            {trainerName} bewerten
          </h3>
          <p className="mt-1 text-sm text-white/40">
            Teile deine Erfahrung in 6 Kategorien
          </p>
        </div>

        {/* Overall Rating Display */}
        {filledDimensions.length > 0 && (
          <div className="flex items-center justify-center gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00FF94]">{averageRating.toFixed(1)}</div>
              <div className="text-xs text-white/40 mt-0.5">Gesamt</div>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={cn(
                    'h-5 w-5',
                    averageRating >= star
                      ? 'fill-[#00FF94] text-[#00FF94] drop-shadow-[0_0_3px_rgba(0,255,148,0.4)]'
                      : averageRating >= star - 0.5
                      ? 'fill-[#00FF94]/50 text-[#00FF94]/50'
                      : 'fill-transparent text-white/15'
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {/* Rating Dimensions */}
        <div className="space-y-4">
          {dimensions.map(dim => (
            <div key={dim.key} className="flex items-center justify-between gap-4">
              <Label className="text-sm text-white/70 min-w-[120px]">
                {dim.label}
              </Label>
              <InteractiveStars
                value={dim.value}
                onChange={v => updateDimension(dim.key, v)}
                size="sm"
              />
            </div>
          ))}
        </div>

        {/* Text Review */}
        <div className="space-y-2">
          <Label className="text-white/70 text-sm">
            Deine Erfahrung (optional)
          </Label>
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Beschreibe deine Erfahrung mit dem Training..."
            className="min-h-[100px] border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus-visible:border-[#00A8FF]/50 focus-visible:ring-[#00A8FF]/20"
          />
        </div>

        {/* Anonymous Notice */}
        <div className="flex items-start gap-3 rounded-xl bg-[#00A8FF]/[0.04] border border-[#00A8FF]/10 p-3">
          <ShieldCheck className="h-4 w-4 text-[#00A8FF] mt-0.5 shrink-0" />
          <p className="text-xs text-white/50 leading-relaxed">
            Deine Bewertung wird anonym veröffentlicht. Dein Name ist für den Trainer nicht sichtbar.
          </p>
        </div>

        {/* Submit */}
        <GradientButton
          type="submit"
          variant="green"
          className="w-full"
          disabled={!allRated || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Wird gesendet...
            </>
          ) : (
            <>
              <Star className="h-4 w-4" />
              Bewertung abgeben
            </>
          )}
        </GradientButton>
      </GlassCard>
    </form>
  )
}
