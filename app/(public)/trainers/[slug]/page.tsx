'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getTrainerBySlug, getReviewsForTrainer } from '@/lib/mock-data'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { StarRating } from '@/components/star-rating'
import { Badge } from '@/components/ui/badge'
import { AnimatedSection, StaggerGroup, StaggerItem } from '@/components/motion'
import { BookingModal } from '@/components/booking/booking-modal'
import { initializeStore } from '@/lib/store'
import {
  Shield, MapPin, Clock, Users, Calendar, Globe, Monitor, Navigation, Repeat,
  ArrowLeft, MessageCircle, Package, Sparkles, ChevronRight, Zap,
} from 'lucide-react'

// ─── Review dimension labels ─────────────────────────────
const REVIEW_DIMENSIONS = [
  { key: 'punctuality', label: 'Pünktlichkeit', icon: Clock },
  { key: 'motivation', label: 'Motivation', icon: Zap },
  { key: 'sympathy', label: 'Sympathie', icon: MessageCircle },
  { key: 'knowledge', label: 'Fachwissen', icon: Sparkles },
  { key: 'reliability', label: 'Zuverlässigkeit', icon: Shield },
  { key: 'cleanliness', label: 'Sauberkeit', icon: Package },
] as const

export default function TrainerProfilePage() {
  const params = useParams()
  const slug = params.slug as string
  const trainer = getTrainerBySlug(slug)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  // Initialize store for booking functionality
  if (typeof window !== 'undefined') {
    initializeStore()
  }

  if (!trainer) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="fixed inset-0 bg-radial-top pointer-events-none" />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <GlassCard hover={false} className="p-12">
            <div className="w-16 h-16 rounded-2xl bg-[#00A8FF]/[0.06] border border-[#00A8FF]/10 flex items-center justify-center mx-auto mb-5">
              <Users className="w-7 h-7 text-[#00A8FF]/40" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-3">
              Trainer nicht gefunden
            </h1>
            <p className="text-muted-foreground/70 mb-6">
              Das Profil existiert nicht oder wurde deaktiviert.
            </p>
            <Link href="/trainers">
              <GradientButton variant="cyan" outline>
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Suche
              </GradientButton>
            </Link>
          </GlassCard>
        </div>
      </div>
    )
  }

  const reviews = getReviewsForTrainer(trainer.id)

  // Calculate average review dimensions
  const avgDimensions = reviews.length > 0 ? {
    punctuality: reviews.reduce((s, r) => s + r.punctuality, 0) / reviews.length,
    motivation: reviews.reduce((s, r) => s + r.motivation, 0) / reviews.length,
    sympathy: reviews.reduce((s, r) => s + r.sympathy, 0) / reviews.length,
    knowledge: reviews.reduce((s, r) => s + r.knowledge, 0) / reviews.length,
    reliability: reviews.reduce((s, r) => s + (r.punctuality + r.motivation) / 2, 0) / reviews.length,
    cleanliness: reviews.reduce((s, r) => s + r.cleanliness, 0) / reviews.length,
  } : null

  const modeIcons: Record<string, typeof Monitor> = {
    'Online': Monitor,
    'Vor Ort': Navigation,
    'Hybrid': Repeat,
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-radial-top pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Back Link */}
        <AnimatedSection>
          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-[#00D4FF] transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Suche
          </Link>
        </AnimatedSection>

        {/* ─── Hero Section ─────────────────────────────── */}
        <AnimatedSection>
          <GlassCard hover={false} glow="cyan" className="p-6 sm:p-8 lg:p-10 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-[rgba(0,168,255,0.15)] shadow-[0_0_40px_rgba(0,168,255,0.08)]">
                    {trainer.profile_image_url ? (
                      <Image
                        src={trainer.profile_image_url}
                        alt={trainer.display_name}
                        width={176}
                        height={176}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#00A8FF]/20 to-[#00FF94]/10" />
                    )}
                  </div>
                  {trainer.is_verified && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[#0D1320] border-2 border-[#00A8FF]/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,168,255,0.2)]">
                      <Shield className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                      {trainer.display_name}
                    </h1>

                    <div className="flex items-center justify-center lg:justify-start gap-3 mt-2">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{trainer.city}</span>
                      </div>
                      {trainer.is_verified && (
                        <Badge className="bg-[#00A8FF]/10 text-[#00D4FF] border border-[#00A8FF]/20 text-[11px]">
                          <Shield className="w-3 h-3 mr-1" />
                          Verifiziert
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-3 mt-3">
                      <StarRating rating={trainer.rating_average} size="md" />
                      <span className="text-sm text-muted-foreground/60">
                        ({trainer.rating_count} Bewertungen)
                      </span>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
                      {trainer.categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className="bg-[#00A8FF]/[0.06] text-[#00D4FF]/80 border border-[#00A8FF]/15 text-xs px-3 py-1"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    {/* Coaching Modes */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-3">
                      {trainer.coaching_modes.map((m) => {
                        const Icon = modeIcons[m] || Monitor
                        return (
                          <span
                            key={m}
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 bg-[#1A2332]/40 rounded-lg px-2.5 py-1"
                          >
                            <Icon className="w-3 h-3" />
                            {m}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex flex-col items-center lg:items-end gap-3 flex-shrink-0">
                    <div className="text-center lg:text-right">
                      <p className="text-3xl font-bold gradient-cyan-text">ab {trainer.hourly_rate}€</p>
                      <p className="text-sm text-muted-foreground/50">/Std.</p>
                    </div>
                    <GradientButton variant="green" size="lg" className="min-w-[180px]" onClick={() => setIsBookingOpen(true)}>
                      <MessageCircle className="w-4 h-4" />
                      Kennenlernen
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── Main Content (Left 2/3) ──────────────── */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <AnimatedSection>
              <GlassCard hover={false} className="p-6 sm:p-8">
                <h2 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#00A8FF] to-[#00D4FF]" />
                  Über mich
                </h2>
                <p className="text-muted-foreground/80 leading-relaxed">
                  {trainer.bio}
                </p>
              </GlassCard>
            </AnimatedSection>

            {/* Specialties */}
            <AnimatedSection delay={0.05}>
              <GlassCard hover={false} className="p-6 sm:p-8">
                <h2 className="font-heading text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#00FF94] to-[#39FF14]" />
                  Spezialisierungen
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {trainer.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00FF94]/[0.05] border border-[#00FF94]/15 text-[#00FF94]/80 text-sm font-medium"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {spec}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* Packages */}
            <AnimatedSection delay={0.1}>
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#00A8FF] to-[#00FF94]" />
                  Pakete
                </h2>
                <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trainer.packages.map((pkg, i) => (
                    <StaggerItem key={pkg.id}>
                      <GlassCard
                        hover
                        neonBorder={i === 0}
                        className="p-5 h-full flex flex-col"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="font-heading font-bold text-foreground">{pkg.name}</h3>
                          <span className="text-lg font-bold gradient-cyan-text flex-shrink-0">{pkg.price}€</span>
                        </div>
                        <p className="text-sm text-muted-foreground/70 leading-relaxed mb-4 flex-1">
                          {pkg.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground/50 pt-3 border-t border-[rgba(0,168,255,0.06)]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {pkg.duration_weeks} Wochen
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {pkg.sessions} Sessions
                          </span>
                        </div>
                      </GlassCard>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </AnimatedSection>

            {/* Review Dimensions Radar */}
            {avgDimensions && (
              <AnimatedSection delay={0.15}>
                <GlassCard hover={false} className="p-6 sm:p-8">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#00D4FF] to-[#00FF94]" />
                    Bewertungsprofil
                  </h2>
                  <div className="space-y-4">
                    {REVIEW_DIMENSIONS.map(({ key, label, icon: DimIcon }) => {
                      const value = avgDimensions[key as keyof typeof avgDimensions]
                      const percentage = (value / 5) * 100
                      return (
                        <div key={key} className="flex items-center gap-3">
                          <DimIcon className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground/70 w-28 flex-shrink-0">{label}</span>
                          <div className="flex-1 h-2 rounded-full bg-[#1A2332]/60 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#00A8FF] to-[#00FF94] transition-all duration-700 ease-out"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-[#00D4FF] w-8 text-right flex-shrink-0">
                            {value.toFixed(1)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </GlassCard>
              </AnimatedSection>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <AnimatedSection delay={0.2}>
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                    <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#00A8FF] to-[#00D4FF]" />
                    Bewertungen
                    <span className="text-sm font-normal text-muted-foreground/50 ml-2">
                      ({reviews.length})
                    </span>
                  </h2>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <GlassCard key={review.id} hover={false} className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <p className="text-sm font-medium text-foreground/80">
                              {review.customer_display_name}
                            </p>
                            <p className="text-xs text-muted-foreground/40 mt-0.5">
                              {new Date(review.created_at).toLocaleDateString('de-DE', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <StarRating rating={review.rating_total} size="sm" showValue={false} />
                        </div>
                        {review.text && (
                          <p className="text-sm text-muted-foreground/70 leading-relaxed">
                            {review.text}
                          </p>
                        )}
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>

          {/* ─── Sidebar (Right 1/3) ──────────────────── */}
          <div className="space-y-6">
            {/* Stats Panel */}
            <AnimatedSection delay={0.1}>
              <GlassCard hover={false} glow="cyan" className="p-6 sticky top-28">
                <h3 className="font-heading text-sm font-semibold text-muted-foreground/50 uppercase tracking-wider mb-5">
                  Auf einen Blick
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#00A8FF]/[0.08] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-[#00D4FF]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground/50">Antwortzeit</p>
                      <p className="text-sm font-semibold text-foreground">~{trainer.response_time_hours} Std.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#00FF94]/[0.08] flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-[#00FF94]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground/50">Betreute Kunden</p>
                      <p className="text-sm font-semibold text-foreground">{trainer.total_clients}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#00A8FF]/[0.08] flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-[#00D4FF]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground/50">Dabei seit</p>
                      <p className="text-sm font-semibold text-foreground">
                        {new Date(trainer.member_since + '-01').toLocaleDateString('de-DE', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#00FF94]/[0.08] flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-[#00FF94]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground/50">Freie Plätze</p>
                      <p className="text-sm font-semibold text-foreground">
                        {trainer.free_spots > 0 ? (
                          <span className="text-[#00FF94]">{trainer.free_spots} verfügbar</span>
                        ) : (
                          <span className="text-muted-foreground/50">Ausgebucht</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#00A8FF]/[0.08] flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4 text-[#00D4FF]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground/50">Sprachen</p>
                      <p className="text-sm font-semibold text-foreground">
                        {trainer.languages.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="mt-6 pt-5 border-t border-[rgba(0,168,255,0.08)]">
                  <div className="space-y-2.5">
                    {trainer.is_verified && (
                      <div className="flex items-center gap-2 text-xs text-[#00D4FF]/70">
                        <Shield className="w-3.5 h-3.5" />
                        <span>Identität verifiziert</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Antwortet innerhalb von {trainer.response_time_hours} Std.</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Mitglied seit {trainer.member_since}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>

        {/* ─── Bottom CTA ─────────────────────────────── */}
        <AnimatedSection delay={0.25}>
          <div className="mt-16">
            <GlassCard hover={false} neonBorder className="p-8 sm:p-12 text-center">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Starte jetzt mit{' '}
                <span className="gradient-brand-text">{trainer.first_name}</span>
              </h2>
              <p className="text-muted-foreground/70 max-w-lg mx-auto mb-6">
                Buche ein kostenloses Kennenlerngespräch und finde heraus, ob {trainer.first_name} der richtige Coach für dich ist.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <GradientButton variant="brand" size="lg" onClick={() => setIsBookingOpen(true)}>
                  <MessageCircle className="w-5 h-5" />
                  Kostenlos kennenlernen
                </GradientButton>
                <GradientButton variant="cyan" outline size="lg">
                  <ChevronRight className="w-4 h-4" />
                  Pakete ansehen
                </GradientButton>
              </div>
            </GlassCard>
          </div>
        </AnimatedSection>
      </div>

      {/* Booking Modal */}
      {trainer && (
        <BookingModal
          trainerId={trainer.id}
          trainerName={trainer.display_name}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  )
}
