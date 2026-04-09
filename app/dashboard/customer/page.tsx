'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import Link from 'next/link'
import {
  Calendar, Users, MessageCircle, TrendingUp,
  ArrowRight, Clock, CheckCircle2, AlertCircle,
  Search, XCircle, FileText,
} from 'lucide-react'
import {
  initializeStore,
  getBookingsForCustomer,
  getContractsForCustomer,
  getProgressMetrics,
  getThreadsForUser,
  getUnreadCount,
} from '@/lib/store'
import { getTrainerById } from '@/lib/mock-data'
import type { Booking, Contract, ProgressMetric } from '@/types'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Guten Morgen'
  if (hour < 18) return 'Guten Tag'
  return 'Guten Abend'
}

const statusConfig = {
  confirmed: { label: 'Bestätigt', className: 'bg-[#00A8FF]/15 text-[#00D4FF] border border-[#00A8FF]/30', icon: CheckCircle2 },
  pending: { label: 'Ausstehend', className: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30', icon: AlertCircle },
  completed: { label: 'Abgeschlossen', className: 'bg-[#00FF94]/15 text-[#00FF94] border border-[#00FF94]/30', icon: CheckCircle2 },
  cancelled: { label: 'Storniert', className: 'bg-red-500/15 text-red-400 border border-red-500/30', icon: XCircle },
}

export default function CustomerDashboardPage() {
  const greeting = getGreeting()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [progress, setProgress] = useState<ProgressMetric[]>([])
  const [unreadTotal, setUnreadTotal] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    initializeStore()
    const b = getBookingsForCustomer('c_demo')
    const c = getContractsForCustomer('c_demo')
    const p = getProgressMetrics('c_demo')
    setBookings(b)
    setContracts(c)
    setProgress(p)

    // Calculate total unread messages
    const threads = getThreadsForUser('c_demo')
    let total = 0
    threads.forEach((t) => {
      total += getUnreadCount(t.id, 'c_demo')
    })
    setUnreadTotal(total)
    setMounted(true)
  }, [])

  // Compute progress percentage from body fat if available
  const progressPercent = progress.length >= 2
    ? Math.round(
        ((progress[0].body_fat_percent! - progress[progress.length - 1].body_fat_percent!) /
          progress[0].body_fat_percent!) *
          100
      )
    : 0

  const latestWeight = progress.length > 0 ? progress[progress.length - 1].weight_kg : null

  const activeContracts = contracts.filter((c) => c.status === 'active')

  const stats = [
    {
      label: 'Buchungen',
      value: mounted ? `${bookings.length}` : '...',
      sub: `${bookings.filter((b) => b.status === 'pending').length} ausstehend`,
      icon: Calendar,
      color: 'cyan' as const,
      iconColor: 'text-[#00D4FF]',
      bgColor: 'bg-[#00A8FF]/10',
    },
    {
      label: 'Aktive Verträge',
      value: mounted ? `${activeContracts.length}` : '...',
      sub: activeContracts.length > 0
        ? getTrainerById(activeContracts[0].trainer_id)?.display_name ?? 'Coach'
        : 'Kein Vertrag',
      icon: Users,
      color: 'green' as const,
      iconColor: 'text-[#00FF94]',
      bgColor: 'bg-[#00FF94]/10',
    },
    {
      label: 'Nachrichten',
      value: mounted ? `${unreadTotal}` : '...',
      sub: 'ungelesen',
      icon: MessageCircle,
      color: 'cyan' as const,
      iconColor: 'text-[#00D4FF]',
      bgColor: 'bg-[#00A8FF]/10',
    },
    {
      label: 'Mein Fortschritt',
      value: mounted
        ? latestWeight
          ? `${latestWeight} kg`
          : '--'
        : '...',
      sub: progressPercent > 0
        ? `${progressPercent}% Körperfett reduziert`
        : 'Noch keine Daten',
      icon: TrendingUp,
      color: 'green' as const,
      iconColor: 'text-[#00FF94]',
      bgColor: 'bg-[#00FF94]/10',
    },
  ]

  const recentBookings = bookings.slice(0, 3)

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
          {greeting}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Hier ist dein aktueller Überblick.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="p-4 sm:p-5" hover>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
                <p className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </div>
              <div className={`${stat.bgColor} p-2.5 rounded-xl`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/trainers">
          <GradientButton variant="brand" size="lg" className="w-full sm:w-auto">
            <Search className="w-4 h-4" />
            Coach finden
            <ArrowRight className="w-4 h-4" />
          </GradientButton>
        </Link>
        <Link href="/dashboard/customer/messages">
          <GradientButton variant="cyan" size="lg" outline className="w-full sm:w-auto">
            <MessageCircle className="w-4 h-4" />
            Nachrichten
            {unreadTotal > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-[#00A8FF] text-[10px] font-bold text-white flex items-center justify-center">
                {unreadTotal}
              </span>
            )}
          </GradientButton>
        </Link>
      </div>

      {/* Recent Bookings */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-heading font-semibold text-foreground">
            Aktuelle Buchungen
          </h2>
          <Link
            href="/dashboard/customer/bookings"
            className="text-sm text-[#00D4FF] hover:text-[#00A8FF] transition-colors flex items-center gap-1"
          >
            Alle anzeigen
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentBookings.length === 0 && mounted && (
            <GlassCard className="p-6 text-center" hover={false}>
              <p className="text-sm text-muted-foreground">
                Noch keine Buchungen. Finde deinen Coach und starte durch.
              </p>
            </GlassCard>
          )}
          {recentBookings.map((booking) => {
            const trainer = getTrainerById(booking.trainer_id)
            const status = statusConfig[booking.status]
            const StatusIcon = status.icon
            const date = booking.scheduled_at
              ? new Date(booking.scheduled_at).toLocaleDateString('de-DE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : 'Termin offen'
            return (
              <GlassCard key={booking.id} className="p-4 sm:p-5" hover>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#00A8FF]/10 p-2.5 rounded-xl mt-0.5">
                      <Clock className="w-4 h-4 text-[#00D4FF]" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {trainer?.display_name ?? 'Unbekannter Trainer'}
                      </p>
                      {booking.notes && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {booking.notes.slice(0, 60)}{booking.notes.length > 60 ? '...' : ''}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.className} w-fit`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </section>

      {/* Active Contracts */}
      {activeContracts.length > 0 && (
        <section>
          <h2 className="text-lg sm:text-xl font-heading font-semibold text-foreground mb-4">
            Aktive Verträge
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeContracts.map((contract) => {
              const trainer = getTrainerById(contract.trainer_id)
              const sessProgress = contract.sessions_total
                ? Math.round((contract.sessions_used / contract.sessions_total) * 100)
                : 0
              return (
                <GlassCard key={contract.id} className="p-5" hover>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00FF94]/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#00FF94]" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {trainer?.display_name ?? 'Coach'}
                          </p>
                          <p className="text-xs text-muted-foreground">{contract.monthly_rate}€/Paket</p>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#00FF94]/10 text-[#00FF94] font-medium">
                        Aktiv
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground">Sessions</span>
                        <span className="text-xs font-medium text-[#00FF94]">
                          {contract.sessions_used}/{contract.sessions_total}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#1A2332] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#00CC76] to-[#00FF94] transition-all duration-500"
                          style={{ width: `${Math.min(sessProgress, 100)}%` }}
                        />
                      </div>
                    </div>
                    <Link href={`/dashboard/customer/workspace/${contract.trainer_id}`}>
                      <GradientButton variant="cyan" size="sm" outline className="w-full mt-1">
                        Workspace öffnen <ArrowRight className="w-4 h-4" />
                      </GradientButton>
                    </Link>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </section>
      )}

      {/* Workspace Placeholder when no contracts */}
      {activeContracts.length === 0 && mounted && (
        <section>
          <h2 className="text-lg sm:text-xl font-heading font-semibold text-foreground mb-4">
            Dein Workspace
          </h2>
          <GlassCard className="p-6 sm:p-8 text-center" hover={false}>
            <div className="bg-[#00A8FF]/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-7 h-7 text-[#00D4FF]" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">
              Workspace wird eingerichtet
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Sobald du einen Coach buchst, erscheint hier dein gemeinsamer Workspace mit Trainingsplänen,
              Ernährung, Fortschritt und Dateien.
            </p>
          </GlassCard>
        </section>
      )}
    </div>
  )
}
