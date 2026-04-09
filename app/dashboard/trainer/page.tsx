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

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            {greeting()}{user ? `, ${user.display_name}` : ''}!
          </h1>
          <p className="text-muted-foreground mt-1">Dein Trainer-Dashboard im Überblick</p>
        </div>
        <Link href="/dashboard/trainer/leads">
          <GradientButton variant="green" size="sm">
            <Inbox className="w-4 h-4" /> Leads ansehen
          </GradientButton>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Aktive Kunden', value: mounted ? `${activeClients}` : '...', icon: Users, color: 'text-[#00FF94]', bg: 'bg-[#00FF94]/10' },
          { label: 'Neue Leads', value: mounted ? `${pendingLeads}` : '...', icon: Inbox, color: 'text-[#00D4FF]', bg: 'bg-[#00A8FF]/10' },
          { label: 'Bewertung', value: mounted ? (reviewCount > 0 ? `${avgRating}/5` : '--') : '...', icon: Star, color: 'text-[#FFD700]', bg: 'bg-[#FFD700]/10' },
          { label: 'Umsatz (Monat)', value: mounted ? `${monthlyRevenue.toLocaleString('de-DE')}€` : '...', icon: Euro, color: 'text-[#00FF94]', bg: 'bg-[#00FF94]/10' },
        ].map((stat) => (
          <GlassCard key={stat.label} className="p-4">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Schnellzugriff</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { href: '/dashboard/trainer/profile', icon: Edit3, label: 'Profil bearbeiten', desc: 'Dein öffentliches Trainerprofil anpassen', color: '#00FF94' },
            { href: '/dashboard/trainer/leads', icon: Eye, label: 'Leads ansehen', desc: 'Neue Anfragen prüfen und beantworten', color: '#00D4FF' },
          ].map((action) => (
            <Link key={action.href} href={action.href}>
              <GlassCard className="p-5 flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${action.color}15` }}>
                  <action.icon className="w-6 h-6" style={{ color: action.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground group-hover:text-[#00FF94] transition-colors">{action.label}</p>
                  <p className="text-sm text-muted-foreground">{action.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-[#00FF94] transition-colors" />
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Neue Leads</h2>
          <GlassCard className="p-5" hover={false}>
            <div className="space-y-4">
              {pendingBookings.length === 0 && mounted && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Keine offenen Anfragen
                </p>
              )}
              {pendingBookings.map((lead) => (
                <div key={lead.id} className="p-3 rounded-xl bg-[#0B0F1A]/50 space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#00FF94]/10 flex items-center justify-center flex-shrink-0">
                      <UserPlus className="w-4 h-4 text-[#00FF94]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm text-foreground">
                          Client#{lead.customer_id.slice(-4).toUpperCase()}
                        </p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#FFD700]/10 text-[#FFD700]">
                          Offen
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {lead.notes ?? 'Keine Nachricht'}
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                        {new Date(lead.created_at).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-14">
                    <button
                      onClick={() => handleAccept(lead.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00FF94]/10 text-[#00FF94] text-xs font-medium hover:bg-[#00FF94]/20 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3" /> Annehmen
                    </button>
                    <button
                      onClick={() => handleDecline(lead.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
                    >
                      <XCircle className="w-3 h-3" /> Ablehnen
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/trainer/leads" className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-[rgba(0,255,148,0.08)] text-sm text-[#00FF94] hover:text-[#00CC76] transition-colors">
              Alle Leads <ChevronRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Letzte Aktivitäten</h2>
          <GlassCard className="p-5" hover={false}>
            <div className="space-y-4">
              {recentActivity.length === 0 && mounted && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Noch keine Aktivitäten
                </p>
              )}
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#0B0F1A]/50">
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
    </div>
  )
}
