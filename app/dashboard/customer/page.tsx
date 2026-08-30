'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import {
  Calendar, Users, MessageCircle, TrendingUp,
  ArrowRight, Search, FileText, CalendarClock,
} from 'lucide-react'
import {
  DashboardShell, PageHeader, StatCard, Panel, EmptyState, Row, Pill,
} from '@/components/dashboard/ui'
import {
  getBookingsForCustomer, getContractsForCustomer,
  getProgressMetrics, getThreadsForUser, getUnreadCount,
} from '@/lib/store'
import { useStoreData } from '@/components/dashboard/use-store'
import { getTrainerById } from '@/lib/mock-data'
import type { Booking, Contract, ProgressMetric } from '@/types'

const CUSTOMER_ID = 'c_demo'

const STATUS = {
  confirmed: { label: 'Bestätigt', tone: 'neutral' as const },
  pending: { label: 'Ausstehend', tone: 'pending' as const },
  completed: { label: 'Abgeschlossen', tone: 'positive' as const },
  cancelled: { label: 'Storniert', tone: 'danger' as const },
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 11) return 'Guten Morgen'
  if (hour < 18) return 'Guten Tag'
  return 'Guten Abend'
}

export default function CustomerDashboardPage() {
  const read = useCallback(() => ({
    bookings: getBookingsForCustomer(CUSTOMER_ID),
    contracts: getContractsForCustomer(CUSTOMER_ID),
    progress: getProgressMetrics(CUSTOMER_ID),
    unreadTotal: getThreadsForUser(CUSTOMER_ID).reduce(
      (sum, t) => sum + getUnreadCount(t.id, CUSTOMER_ID),
      0,
    ),
  }), [])

  const { data, ready: mounted } = useStoreData(read)

  const bookings: Booking[] = data?.bookings ?? []
  const contracts: Contract[] = data?.contracts ?? []
  const progress: ProgressMetric[] = data?.progress ?? []
  const unreadTotal = data?.unreadTotal ?? 0

  const first = progress[0]
  const latest = progress[progress.length - 1]
  const fatDelta =
    progress.length >= 2 && first?.body_fat_percent && latest?.body_fat_percent
      ? +(latest.body_fat_percent - first.body_fat_percent).toFixed(1)
      : null
  const weightDelta =
    progress.length >= 2 && first?.weight_kg && latest?.weight_kg
      ? +(latest.weight_kg - first.weight_kg).toFixed(1)
      : null

  const activeContracts = contracts.filter((c) => c.status === 'active')
  const pendingBookings = bookings.filter((b) => b.status === 'pending')
  const upcoming = bookings
    .filter((b) => b.status !== 'cancelled')
    .sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime())
    .slice(0, 4)

  const n = (v: string) => (mounted ? v : '–')
  const de = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

  return (
    <DashboardShell>
      <PageHeader
        title={getGreeting()}
        subtitle={new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
        actions={
          <>
            <Link
              href="/trainers"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#00D4FF] px-4 py-2.5 text-sm font-semibold text-[#04121F] transition-shadow hover:shadow-[0_10px_30px_-10px_rgba(0,168,255,0.7)]"
            >
              <Search className="h-4 w-4" aria-hidden /> Coach finden
            </Link>
            <Link
              href="/dashboard/customer/messages"
              className="flex items-center gap-2 rounded-xl border border-[rgba(0,168,255,0.2)] px-4 py-2.5 text-sm font-semibold text-soft transition-colors hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Chat
              {mounted && unreadTotal > 0 && (
                <span className="nums rounded-full bg-[#00A8FF] px-1.5 text-[11px] font-bold text-[#04121F]">
                  {unreadTotal}
                </span>
              )}
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Termine"
          value={n(String(bookings.length))}
          hint={
            mounted
              ? pendingBookings.length > 0
                ? `${pendingBookings.length} noch unbestätigt`
                : 'Alle bestätigt'
              : undefined
          }
          icon={Calendar}
          accent="cyan"
          href="/dashboard/customer/bookings"
        />
        <StatCard
          label="Coaching"
          value={n(String(activeContracts.length))}
          hint={
            mounted && activeContracts.length > 0
              ? (getTrainerById(activeContracts[0].trainer_id)?.display_name ?? 'Coach')
              : 'Noch kein Vertrag'
          }
          icon={Users}
          accent="green"
          href="/dashboard/customer/workspace"
        />
        <StatCard
          label="Gewicht"
          value={n(latest?.weight_kg ? `${de(latest.weight_kg)} kg` : '–')}
          hint={
            mounted && weightDelta !== null
              ? `${weightDelta > 0 ? '+' : '−'}${de(Math.abs(weightDelta))} kg seit Start`
              : 'Noch keine Messung'
          }
          icon={TrendingUp}
          accent="green"
          href="/dashboard/customer/workspace"
        />
        <StatCard
          label="Körperfett"
          value={n(latest?.body_fat_percent ? `${de(latest.body_fat_percent)} %` : '–')}
          hint={
            mounted && fatDelta !== null
              ? `${fatDelta > 0 ? '+' : '−'}${de(Math.abs(fatDelta))} Prozentpunkte`
              : 'Noch keine Messung'
          }
          icon={TrendingUp}
          accent="violet"
          href="/dashboard/customer/workspace"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Panel title="Deine Termine" action={{ href: '/dashboard/customer/bookings', label: 'Alle' }}>
            {mounted && upcoming.length === 0 ? (
              <EmptyState
                icon={CalendarClock}
                title="Noch keine Termine"
                hint="Buche ein kostenloses Kennenlern-Gespräch — unverbindlich und anonym."
                action={{ href: '/trainers', label: 'Coach finden' }}
              />
            ) : (
              <div className="space-y-2.5">
                {upcoming.map((b) => {
                  const trainer = getTrainerById(b.trainer_id)
                  const d = new Date(b.scheduled_at)
                  const s = STATUS[b.status]
                  return (
                    <Row key={b.id}>
                      <span className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-[rgba(0,168,255,0.09)] ring-1 ring-inset ring-[rgba(0,168,255,0.18)]">
                        <span className="nums text-sm font-bold leading-none text-[#00D4FF]">
                          {d.getDate()}
                        </span>
                        <span className="mt-0.5 text-[10px] uppercase tracking-wide text-faint">
                          {d.toLocaleDateString('de-DE', { month: 'short' })}
                        </span>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {trainer?.display_name ?? 'Coach'}
                        </p>
                        <p className="truncate text-xs text-faint">
                          {b.notes ?? 'Kein Betreff'}
                        </p>
                      </div>
                      <Pill tone={s.tone}>{s.label}</Pill>
                    </Row>
                  )
                })}
              </div>
            )}
          </Panel>
        </div>

        <div className="lg:col-span-2">
          <Panel title="Mein Coaching" action={{ href: '/dashboard/customer/workspace', label: 'Workspace' }}>
            {mounted && activeContracts.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="Kein laufendes Coaching"
                hint="Nach dem Kennenlern-Gespräch schließt ihr den Vertrag digital ab."
                action={{ href: '/trainers', label: 'Coaches ansehen' }}
              />
            ) : (
              <div className="space-y-4">
                {activeContracts.map((contract) => {
                  const trainer = getTrainerById(contract.trainer_id)
                  const used = contract.sessions_used
                  const total = contract.sessions_total ?? 0
                  const pct = total > 0 ? Math.round((used / total) * 100) : 0
                  return (
                    <div key={contract.id} className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {trainer?.display_name ?? 'Coach'}
                          </p>
                          <p className="nums text-xs text-faint">
                            {contract.monthly_rate.toLocaleString('de-DE')} € pro Paket
                          </p>
                        </div>
                        <Pill tone="positive">Aktiv</Pill>
                      </div>

                      <div>
                        <div className="mb-1.5 flex items-baseline justify-between text-xs">
                          <span className="text-faint">Sessions</span>
                          <span className="nums font-semibold text-foreground">
                            {used} / {total}
                          </span>
                        </div>
                        <div
                          className="h-1.5 overflow-hidden rounded-full bg-[#1A2332]"
                          role="progressbar"
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label="Genutzte Sessions"
                        >
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#00A8FF] to-[#00FF94]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      <Link
                        href="/dashboard/customer/workspace"
                        className="group flex items-center justify-center gap-2 rounded-xl border border-[rgba(0,168,255,0.2)] bg-[rgba(0,168,255,0.05)] py-2.5 text-sm font-semibold text-[#00D4FF] transition-colors hover:bg-[rgba(0,168,255,0.12)]"
                      >
                        Workspace öffnen
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </Panel>
        </div>
      </div>
    </DashboardShell>
  )
}
