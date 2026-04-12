'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { initializeStore, getBookingsForCustomer } from '@/lib/store'
import { getTrainerById } from '@/lib/mock-data'
import Link from 'next/link'
import Image from 'next/image'
import type { Booking } from '@/types'
import { cn } from '@/lib/utils'
import {
  Calendar, Clock, CheckCircle2, AlertCircle,
  XCircle, Video, ArrowRight, MapPin, Star,
  Dumbbell, Search,
} from 'lucide-react'

type StatusKey = Booking['status']

const statusConfig: Record<StatusKey, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  pending: {
    label: 'Ausstehend',
    className: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',
    icon: AlertCircle,
  },
  confirmed: {
    label: 'Bestätigt',
    className: 'bg-[#00A8FF]/15 text-[#00D4FF] border border-[#00A8FF]/20',
    icon: CheckCircle2,
  },
  completed: {
    label: 'Abgeschlossen',
    className: 'bg-[#00FF94]/15 text-[#00FF94] border border-[#00FF94]/20',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Storniert',
    className: 'bg-red-500/15 text-red-400 border border-red-500/20',
    icon: XCircle,
  },
}

const tabs: { key: 'all' | StatusKey; label: string }[] = [
  { key: 'all', label: 'Alle' },
  { key: 'confirmed', label: 'Anstehend' },
  { key: 'completed', label: 'Abgeschlossen' },
  { key: 'pending', label: 'Anfragen' },
  { key: 'cancelled', label: 'Storniert' },
]

function formatDate(iso: string): string {
  if (!iso) return 'Termin offen'
  return new Date(iso).toLocaleDateString('de-DE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function isUpcoming(iso: string): boolean {
  return new Date(iso) >= new Date()
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | StatusKey>('all')

  useEffect(() => {
    initializeStore()
    const b = getBookingsForCustomer('c_demo')
    // Sort: upcoming first (by date), then past (newest first)
    b.sort((a, b) => {
      const aUp = isUpcoming(a.scheduled_at)
      const bUp = isUpcoming(b.scheduled_at)
      if (aUp && !bUp) return -1
      if (!aUp && bUp) return 1
      if (aUp && bUp) return new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
      return new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime()
    })
    setBookings(b)
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filtered = activeTab === 'all' ? bookings : bookings.filter(b => b.status === activeTab)
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length
  const completedCount = bookings.filter(b => b.status === 'completed').length
  const pendingCount = bookings.filter(b => b.status === 'pending').length

  if (bookings.length === 0) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-8">
          Meine Buchungen
        </h1>
        <GlassCard className="p-8 sm:p-12 text-center" hover={false}>
          <div className="bg-[#00A8FF]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-[#00D4FF]" />
          </div>
          <h2 className="font-heading font-semibold text-foreground text-lg mb-2">
            Noch keine Buchungen
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
            Finde deinen perfekten Coach und buche ein Erstgespräch, um loszulegen.
          </p>
          <Link href="/dashboard/customer/search">
            <GradientButton variant="brand" size="lg">
              Coach finden <ArrowRight className="w-4 h-4" />
            </GradientButton>
          </Link>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
            Meine Buchungen
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {confirmedCount} anstehend · {completedCount} abgeschlossen · {pendingCount} offen
          </p>
        </div>
        <Link href="/dashboard/customer/search">
          <GradientButton variant="brand" size="sm">
            <Search className="w-3.5 h-3.5" /> Coach finden
          </GradientButton>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0D1320]/60 border border-white/[0.04] w-fit">
        {tabs.map(tab => {
          const count = tab.key === 'all' ? bookings.length :
            bookings.filter(b => b.status === tab.key).length
          if (tab.key !== 'all' && count === 0) return null
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-medium transition-all',
                activeTab === tab.key
                  ? 'bg-[#1A2332] text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground/70'
              )}
            >
              {tab.label}
              <span className={cn(
                'ml-1.5 px-1.5 py-0.5 rounded-md text-[10px]',
                activeTab === tab.key ? 'bg-[#00A8FF]/15 text-[#00D4FF]' : 'bg-white/[0.04] text-muted-foreground/50'
              )}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Booking Cards */}
      <div className="space-y-3">
        {filtered.map((booking) => {
          const trainer = getTrainerById(booking.trainer_id)
          const status = statusConfig[booking.status]
          const StatusIcon = status.icon
          const upcoming = isUpcoming(booking.scheduled_at)
          const categories = trainer?.categories ?? []

          return (
            <GlassCard
              key={booking.id}
              className={cn(
                'p-0 overflow-hidden transition-all',
                upcoming && booking.status === 'confirmed' && 'ring-1 ring-[#00A8FF]/20'
              )}
              hover
            >
              <div className="flex">
                {/* Left: Date badge */}
                <div className={cn(
                  'w-20 sm:w-24 flex flex-col items-center justify-center flex-shrink-0 border-r border-white/[0.04]',
                  booking.status === 'completed' ? 'bg-[#00FF94]/[0.03]' :
                  booking.status === 'confirmed' ? 'bg-[#00A8FF]/[0.03]' :
                  booking.status === 'pending' ? 'bg-yellow-500/[0.03]' :
                  'bg-red-500/[0.03]'
                )}>
                  <span className="text-[10px] font-medium text-muted-foreground uppercase">
                    {new Date(booking.scheduled_at).toLocaleDateString('de-DE', { weekday: 'short' })}
                  </span>
                  <span className="text-2xl font-heading font-bold text-foreground">
                    {new Date(booking.scheduled_at).getDate()}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(booking.scheduled_at).toLocaleDateString('de-DE', { month: 'short' })}
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground/70 mt-1">
                    {formatTime(booking.scheduled_at)}
                  </span>
                </div>

                {/* Right: Content */}
                <div className="flex-1 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    {/* Trainer info */}
                    <div className="flex gap-3 min-w-0">
                      {/* Avatar */}
                      <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-white/[0.06]">
                        {trainer?.profile_image_url ? (
                          <Image
                            src={trainer.profile_image_url}
                            alt={trainer.display_name}
                            width={44}
                            height={44}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#00A8FF]/20 to-[#00FF94]/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-[#00D4FF]">
                              {trainer ? `${trainer.first_name[0]}${trainer.last_name[0]}` : '??'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-foreground truncate">
                            {trainer?.display_name ?? 'Unbekannter Trainer'}
                          </h3>
                          {trainer?.is_verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00D4FF] flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          {trainer && (
                            <>
                              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <MapPin className="w-3 h-3" /> {trainer.city}
                              </span>
                              <span className="text-muted-foreground/20">·</span>
                              <span className="flex items-center gap-1 text-[11px] text-[#FFD700]">
                                <Star className="w-3 h-3 fill-current" /> {trainer.rating_average}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <span className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium flex-shrink-0',
                      status.className
                    )}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>

                  {/* Categories + Details */}
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    {categories.slice(0, 3).map(cat => (
                      <span key={cat} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1A2332]/60 text-[10px] font-medium text-muted-foreground border border-white/[0.04]">
                        <Dumbbell className="w-2.5 h-2.5" /> {cat}
                      </span>
                    ))}
                    <span className="text-muted-foreground/20">·</span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {booking.duration_minutes} Min.
                    </span>
                  </div>

                  {/* Notes + Actions */}
                  <div className="mt-2.5 flex items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground/70 truncate">
                      {booking.notes ?? 'Kein Betreff'}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {booking.meeting_url && (
                        <a
                          href={booking.meeting_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00A8FF]/[0.06] text-[11px] font-medium text-[#00D4FF] hover:bg-[#00A8FF]/12 transition-all"
                        >
                          <Video className="w-3 h-3" /> Meeting
                        </a>
                      )}
                      {(booking.status === 'confirmed' || booking.status === 'completed') && trainer && (
                        <Link href={`/dashboard/customer/workspace/${trainer.id}`}>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00FF94]/[0.06] text-[11px] font-medium text-[#00FF94] hover:bg-[#00FF94]/12 transition-all cursor-pointer">
                            Workspace <ArrowRight className="w-3 h-3" />
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          )
        })}

        {filtered.length === 0 && (
          <GlassCard className="p-8 text-center" hover={false}>
            <Calendar className="w-8 h-8 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Keine Buchungen in dieser Kategorie</p>
          </GlassCard>
        )}
      </div>
    </div>
  )
}
