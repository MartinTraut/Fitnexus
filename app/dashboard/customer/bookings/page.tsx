'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { initializeStore, getBookingsForCustomer } from '@/lib/store'
import { getTrainerById } from '@/lib/mock-data'
import Link from 'next/link'
import type { Booking } from '@/types'
import {
  Calendar, Clock, CheckCircle2, AlertCircle,
  XCircle, FileText, Video, ArrowRight,
} from 'lucide-react'

const statusConfig = {
  pending: {
    label: 'Ausstehend',
    className: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
    icon: AlertCircle,
  },
  confirmed: {
    label: 'Bestätigt',
    className: 'bg-[#00A8FF]/15 text-[#00D4FF] border border-[#00A8FF]/30',
    icon: CheckCircle2,
  },
  completed: {
    label: 'Abgeschlossen',
    className: 'bg-[#00FF94]/15 text-[#00FF94] border border-[#00FF94]/30',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Storniert',
    className: 'bg-red-500/15 text-red-400 border border-red-500/30',
    icon: XCircle,
  },
}

function formatDateTime(iso: string): { date: string; time: string } {
  if (!iso) return { date: 'Termin offen', time: '' }
  const d = new Date(iso)
  const date = d.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const time = d.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return { date, time }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    initializeStore()
    setBookings(getBookingsForCustomer('c_demo'))
    setMounted(true)
  }, [])

  if (!mounted) return null

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
          <Link href="/trainers">
            <GradientButton variant="brand" size="lg">
              Coach finden <ArrowRight className="w-4 h-4" />
            </GradientButton>
          </Link>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
          Meine Buchungen
        </h1>
        <p className="mt-1 text-muted-foreground">
          {bookings.length} {bookings.length === 1 ? 'Buchung' : 'Buchungen'} insgesamt
        </p>
      </div>

      {/* Booking Cards */}
      <div className="space-y-4">
        {bookings.map((booking) => {
          const trainer = getTrainerById(booking.trainer_id)
          const { date, time } = formatDateTime(booking.scheduled_at)
          const status = statusConfig[booking.status]
          const StatusIcon = status.icon

          return (
            <GlassCard key={booking.id} className="p-5 sm:p-6" hover>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left: Trainer + Details */}
                <div className="flex gap-4">
                  {/* Trainer Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A8FF]/20 to-[#00FF94]/20 border border-[#00A8FF]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-heading font-bold text-[#00D4FF]">
                      {trainer
                        ? `${trainer.first_name[0]}${trainer.last_name[0]}`
                        : '??'}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-medium text-foreground">
                      {trainer?.display_name ?? 'Unbekannter Trainer'}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {date}
                      </span>
                      {time && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {time} &middot; {booking.duration_minutes} Min.
                        </span>
                      )}
                    </div>
                    {booking.notes && (
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <FileText className="w-3 h-3" />
                        {booking.notes}
                      </p>
                    )}
                    {booking.meeting_url && (
                      <a
                        href={booking.meeting_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#00D4FF] hover:text-[#00A8FF] transition-colors"
                      >
                        <Video className="w-3 h-3" />
                        Online-Meeting beitreten
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Status Badge + Workspace Link */}
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.className} w-fit flex-shrink-0`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                  {(booking.status === 'confirmed' || booking.status === 'completed') && trainer && (
                    <Link href={`/dashboard/customer/workspace/${trainer.id}`}>
                      <span className="text-xs text-[#00D4FF] hover:text-[#00A8FF] transition-colors flex items-center gap-1 cursor-pointer">
                        Workspace
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
