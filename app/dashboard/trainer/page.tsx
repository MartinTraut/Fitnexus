'use client'

import { useEffect, useState, useCallback } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import Link from 'next/link'
import {
  Users, Inbox, Star, Euro, ChevronRight,
  Edit3, Eye, Clock, MessageCircle, UserPlus,
  CheckCircle2, XCircle,
} from 'lucide-react'
import { getCurrentUser, type AuthUser } from '@/lib/auth'
import {
  initializeStore,
  getContractsForTrainer,
  getBookingsForTrainer,
  getReviewsForTrainer,
  getThreadsForUser,
  getMessages,
  updateBookingStatus,
} from '@/lib/store'
import type { Booking, Contract } from '@/types'

export default function TrainerDashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [contracts, setContracts] = useState<Contract[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [reviewCount, setReviewCount] = useState(0)
  const [avgRating, setAvgRating] = useState(0)
  const [recentActivity, setRecentActivity] = useState<{ icon: typeof Star; text: string; time: string; color: string; bg: string }[]>([])
  const [mounted, setMounted] = useState(false)

  const loadData = useCallback(() => {
    initializeStore()
    setUser(getCurrentUser())

    const c = getContractsForTrainer('tr_1')
    const b = getBookingsForTrainer('tr_1')
    const reviews = getReviewsForTrainer('tr_1')

    setContracts(c)
    setBookings(b)
    setReviewCount(reviews.length)
    setAvgRating(reviews.length > 0 ? Math.round(reviews.reduce((s, r) => s + r.rating_total, 0) / reviews.length * 10) / 10 : 0)

    // Build activity feed from recent messages and bookings
    const threads = getThreadsForUser('tr_1')
    const activities: { icon: typeof Star; text: string; time: string; color: string; bg: string }[] = []

    // Add recent reviews
    reviews.slice(0, 1).forEach((r) => {
      activities.push({
        icon: Star,
        text: `Neue ${r.rating_total}-Sterne-Bewertung von ${(r as any).customer_display_name ?? 'Kunde'}`,
        time: new Date(r.created_at).toLocaleDateString('de-DE'),
        color: 'text-[#FFD700]',
        bg: 'bg-[#FFD700]/10',
      })
    })

    // Add recent bookings as activity
    b.filter((bk) => bk.status === 'pending').slice(0, 1).forEach((bk) => {
      activities.push({
        icon: Inbox,
        text: `Neue Anfrage von Client#${bk.customer_id.slice(-4).toUpperCase()}`,
        time: new Date(bk.created_at).toLocaleDateString('de-DE'),
        color: 'text-[#00FF94]',
        bg: 'bg-[#00FF94]/10',
      })
    })

    // Add recent thread activity
    threads.slice(0, 1).forEach((t) => {
      const msgs = getMessages(t.id)
      if (msgs.length > 0) {
        const last = msgs[msgs.length - 1]
        activities.push({
          icon: MessageCircle,
          text: `Nachricht von Client#${t.customer_id.slice(-4).toUpperCase()}`,
          time: new Date(last.created_at).toLocaleDateString('de-DE'),
          color: 'text-[#00D4FF]',
          bg: 'bg-[#00A8FF]/10',
        })
      }
    })

    // Add completed sessions
    b.filter((bk) => bk.status === 'completed').slice(0, 1).forEach((bk) => {
      activities.push({
        icon: Clock,
        text: `Session mit Client#${bk.customer_id.slice(-4).toUpperCase()} abgeschlossen`,
        time: new Date(bk.updated_at).toLocaleDateString('de-DE'),
        color: 'text-[#00FF94]',
        bg: 'bg-[#00FF94]/10',
      })
    })

    setRecentActivity(activities.slice(0, 4))
    setMounted(true)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Guten Morgen'
    if (hour < 18) return 'Guten Tag'
    return 'Guten Abend'
  }

  const activeClients = contracts.filter((c) => c.status === 'active').length
  const pendingLeads = bookings.filter((b) => b.status === 'pending').length
  const monthlyRevenue = contracts
    .filter((c) => c.status === 'active')
    .reduce((s, c) => s + c.monthly_rate, 0)

  const pendingBookings = bookings.filter((b) => b.status === 'pending').slice(0, 3)

  const handleAccept = (id: string) => {
    updateBookingStatus(id, 'confirmed')
    loadData()
  }

  const handleDecline = (id: string) => {
    updateBookingStatus(id, 'cancelled')
    loadData()
  }

  // Upcoming sessions
  const upcomingSessions = bookings
    .filter(b => b.status === 'confirmed' && new Date(b.scheduled_at) >= new Date())
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime())
    .slice(0, 4)

  // Unread messages
  const threads = mounted ? getThreadsForUser('tr_1') : []
  const unreadThreads = threads.filter(t => {
    const msgs = getMessages(t.id)
    return msgs.some(m => !m.is_read && m.sender_id !== 'tr_1')
  }).length

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {greeting()}{user ? `, ${user.display_name}` : ''}!
        </h1>
        <p className="text-muted-foreground mt-1">Dein Trainer-Dashboard im Überblick</p>
      </div>

      {/* Stat Cards — compact row */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Kunden', value: mounted ? `${activeClients}` : '–', icon: Users, color: '#00FF94', href: '/dashboard/trainer/clients' },
          { label: 'Leads', value: mounted ? `${pendingLeads}` : '–', icon: Inbox, color: '#00D4FF', href: '/dashboard/trainer/leads' },
          { label: 'Nachrichten', value: mounted ? `${unreadThreads}` : '–', icon: MessageCircle, color: '#00A8FF', href: '/dashboard/trainer/messages' },
          { label: 'Bewertung', value: mounted ? (reviewCount > 0 ? `${avgRating}` : '–') : '–', icon: Star, color: '#FFD700', href: '/dashboard/trainer/profile' },
          { label: 'Umsatz', value: mounted ? `${monthlyRevenue.toLocaleString('de-DE')}€` : '–', icon: Euro, color: '#00FF94', href: '/dashboard/trainer/billing' },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <GlassCard className="p-4 group cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-4 h-4" style={{ color: `${stat.color}60` }} />
              </div>
              <p className="text-2xl font-bold text-foreground group-hover:text-[#00FF94] transition-colors">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</p>
            </GlassCard>
          </Link>
        ))}
      </div>

      {/* Main Content — 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Leads + Termine */}
        <div className="space-y-6">
          {/* Leads */}
          <GlassCard className="overflow-hidden" hover={false}>
            <div className="flex items-center justify-between p-4 border-b border-white/[0.04]">
              <h2 className="text-sm font-heading font-semibold text-foreground">Offene Leads</h2>
              <Link href="/dashboard/trainer/leads" className="text-xs text-[#00FF94] hover:text-[#00CC76] transition-colors flex items-center gap-1">
                Alle <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-4 space-y-3">
              {pendingBookings.length === 0 && mounted && (
                <p className="text-sm text-muted-foreground text-center py-2">Keine offenen Anfragen</p>
              )}
              {pendingBookings.map((lead) => (
                <div key={lead.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#00FF94]/10 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-4 h-4 text-[#00FF94]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">Client#{lead.customer_id.slice(-4).toUpperCase()}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{lead.notes ?? 'Keine Nachricht'}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button onClick={() => handleAccept(lead.id)} className="px-2.5 py-1.5 rounded-lg bg-[#00FF94]/10 text-[#00FF94] text-[11px] font-medium hover:bg-[#00FF94]/20 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDecline(lead.id)} className="px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-[11px] font-medium hover:bg-red-500/20 transition-colors">
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Termine */}
          <GlassCard className="overflow-hidden" hover={false}>
            <div className="p-4 border-b border-white/[0.04]">
              <h2 className="text-sm font-heading font-semibold text-foreground">Nächste Termine</h2>
            </div>
            <div className="p-4 space-y-2.5">
              {upcomingSessions.length === 0 && mounted && (
                <p className="text-sm text-muted-foreground text-center py-2">Keine anstehenden Termine</p>
              )}
              {upcomingSessions.map((session) => {
                const date = new Date(session.scheduled_at)
                return (
                  <div key={session.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B0F1A]/50">
                    <div className="w-10 h-10 rounded-xl bg-[#00A8FF]/10 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-[#00D4FF]">{date.toLocaleDateString('de-DE', { weekday: 'short' })}</span>
                      <span className="text-[9px] text-muted-foreground/40">{date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Client#{session.customer_id.slice(-4).toUpperCase()}</p>
                      <p className="text-[11px] text-muted-foreground">{session.duration_minutes} Min · {session.notes ?? 'Kein Betreff'}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </GlassCard>
        </div>

        {/* Right: Aktivitäten */}
        <GlassCard className="overflow-hidden" hover={false}>
          <div className="p-4 border-b border-white/[0.04]">
            <h2 className="text-sm font-heading font-semibold text-foreground">Letzte Aktivitäten</h2>
          </div>
          <div className="p-4 space-y-3">
            {recentActivity.length === 0 && mounted && (
              <p className="text-sm text-muted-foreground text-center py-4">Noch keine Aktivitäten</p>
            )}
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B0F1A]/50">
                <div className={`w-8 h-8 rounded-lg ${activity.bg} flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.text}</p>
                  <p className="text-[10px] text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
