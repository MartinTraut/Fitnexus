'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Users, Inbox, Star, Euro, MessageCircle, CalendarClock,
  CheckCircle2, XCircle, Activity, ArrowRight,
} from 'lucide-react'
import {
  DashboardShell, PageHeader, StatCard, Panel, EmptyState, Row, Initials, Pill,
} from '@/components/dashboard/ui'
import { getCurrentUser, type AuthUser } from '@/lib/auth'
import {
  getContractsForTrainer, getBookingsForTrainer,
  getReviewsForTrainer, getThreadsForUser, getMessages,
  updateBookingStatus, getCustomerLabel,
} from '@/lib/store'
import { useStoreData } from '@/components/dashboard/use-store'
import type { Booking, Contract } from '@/types'

const TRAINER_ID = 'tr_1'

type Activity = { icon: typeof Star; text: string; date: string; accent: string }

export default function TrainerDashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    // Der angemeldete Nutzer steht ausserhalb des Stores und aendert sich
    // waehrend der Sitzung nicht — einmal nach dem Mounten lesen genuegt.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(getCurrentUser())
  }, [])

  const read = useCallback(() => {
    const contracts = getContractsForTrainer(TRAINER_ID)
    const bookings = getBookingsForTrainer(TRAINER_ID)
    const reviews = getReviewsForTrainer(TRAINER_ID)
    const threads = getThreadsForUser(TRAINER_ID)

    const de = (iso: string) =>
      new Date(iso).toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })

    const feed: Activity[] = []
    reviews.slice(0, 1).forEach((r) => {
      feed.push({
        icon: Star,
        text: `${r.rating_total}-Sterne-Bewertung erhalten`,
        date: de(r.created_at),
        accent: '#FFC94A',
      })
    })
    bookings.filter((x) => x.status === 'pending').slice(0, 1).forEach((x) => {
      feed.push({
        icon: Inbox,
        text: `Neue Anfrage von ${getCustomerLabel(x.customer_id, TRAINER_ID).name}`,
        date: de(x.created_at),
        accent: '#00FF94',
      })
    })
    threads.slice(0, 1).forEach((t) => {
      const msgs = getMessages(t.id)
      if (!msgs.length) return
      feed.push({
        icon: MessageCircle,
        text: `Nachricht von ${getCustomerLabel(t.customer_id, TRAINER_ID).name}`,
        date: de(msgs[msgs.length - 1].created_at),
        accent: '#00D4FF',
      })
    })
    bookings.filter((x) => x.status === 'completed').slice(0, 2).forEach((x) => {
      feed.push({
        icon: CheckCircle2,
        text: `Session mit ${getCustomerLabel(x.customer_id, TRAINER_ID).name} abgeschlossen`,
        date: de(x.updated_at),
        accent: '#00FF94',
      })
    })

    return {
      contracts,
      bookings,
      reviewCount: reviews.length,
      avgRating:
        reviews.length > 0
          ? Math.round((reviews.reduce((s, r) => s + r.rating_total, 0) / reviews.length) * 10) / 10
          : 0,
      unreadThreads: threads.filter((t) =>
        getMessages(t.id).some((m) => !m.is_read && m.sender_id !== TRAINER_ID),
      ).length,
      activity: feed.slice(0, 5),
    }
  }, [])

  const { data, ready: mounted } = useStoreData(read)

  const contracts: Contract[] = data?.contracts ?? []
  const bookings: Booking[] = data?.bookings ?? []
  const reviewCount = data?.reviewCount ?? 0
  const avgRating = data?.avgRating ?? 0
  const unreadThreads = data?.unreadThreads ?? 0
  const activity = data?.activity ?? []

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 11) return 'Guten Morgen'
    if (h < 18) return 'Guten Tag'
    return 'Guten Abend'
  }

  const activeClients = contracts.filter((c) => c.status === 'active').length
  const pendingLeads = bookings.filter((b) => b.status === 'pending')
  const monthlyRevenue = contracts
    .filter((c) => c.status === 'active')
    .reduce((s, c) => s + c.monthly_rate, 0)

  const upcoming = bookings
    .filter((b) => b.status === 'confirmed' && new Date(b.scheduled_at) >= new Date())
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime())
    .slice(0, 5)

  // Vor dem Laden aus dem Speicher steht ein Strich, keine 0 — eine 0 waere
  // eine Aussage ("du hast keine Kunden"), die zu dem Zeitpunkt niemand kennt.
  const n = (v: string) => (mounted ? v : '–')

  const today = new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <DashboardShell>
      <PageHeader
        title={`${greeting()}${user ? `, ${user.display_name}` : ''}`}
        subtitle={today}
        actions={
          <>
            <Link
              href="/dashboard/trainer/leads"
              className="flex items-center gap-2 rounded-xl border border-[#00FF94]/25 bg-[#00FF94]/[0.07] px-4 py-2.5 text-sm font-semibold text-[#00FF94] transition-colors hover:bg-[#00FF94]/[0.14]"
            >
              <Inbox className="h-4 w-4" aria-hidden />
              Anfragen
              {mounted && pendingLeads.length > 0 && (
                <span className="nums rounded-full bg-[#00FF94] px-1.5 text-[11px] font-bold text-[#04121F]">
                  {pendingLeads.length}
                </span>
              )}
            </Link>
            <Link
              href="/dashboard/trainer/profile"
              className="rounded-xl border border-[rgba(0,168,255,0.16)] px-4 py-2.5 text-sm font-semibold text-soft transition-colors hover:text-foreground"
            >
              Profil ansehen
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Aktive Kunden"
          value={n(String(activeClients))}
          hint={mounted ? `${contracts.length} Verträge gesamt` : undefined}
          icon={Users}
          accent="green"
          href="/dashboard/trainer/clients"
        />
        <StatCard
          label="Offene Anfragen"
          value={n(String(pendingLeads.length))}
          hint={mounted && pendingLeads.length > 0 ? 'Warten auf deine Antwort' : 'Alles beantwortet'}
          icon={Inbox}
          accent="cyan"
          href="/dashboard/trainer/leads"
        />
        <StatCard
          label="Monatsumsatz"
          value={n(`${monthlyRevenue.toLocaleString('de-DE')} €`)}
          hint="Aus laufenden Verträgen"
          icon={Euro}
          accent="green"
          href="/dashboard/trainer/billing"
        />
        <StatCard
          label="Bewertung"
          value={n(reviewCount > 0 ? avgRating.toFixed(1).replace('.', ',') : '–')}
          hint={mounted ? `${reviewCount} Bewertungen` : undefined}
          icon={Star}
          accent="amber"
          href="/dashboard/trainer/profile"
        />
      </div>

      {/* Anfragen brauchen mehr Raum als der Verlauf — 3:2 statt 1:1.
          Gleich breite Spalten hatten beide halb leer gelassen. */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <Panel
            title="Offene Anfragen"
            action={pendingLeads.length > 0 ? { href: '/dashboard/trainer/leads', label: 'Alle' } : undefined}
          >
            {mounted && pendingLeads.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="Keine offenen Anfragen"
                hint="Neue Anfragen erscheinen hier, sobald jemand ein Erstgespräch bucht."
                action={{ href: '/dashboard/trainer/profile', label: 'Profil schärfen' }}
              />
            ) : (
              <div className="space-y-2.5">
                {pendingLeads.slice(0, 4).map((lead) => {
                  const c = getCustomerLabel(lead.customer_id, TRAINER_ID)
                  return (
                    <Row key={lead.id}>
                      <Initials text={c.initials} accent="cyan" anonymous={c.isAlias} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">{c.name}</p>
                        <p className="truncate text-xs text-faint">{lead.notes ?? 'Keine Nachricht'}</p>
                      </div>
                      <div className="flex flex-shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateBookingStatus(lead.id, 'confirmed')}
                          aria-label={`Anfrage von ${c.name} annehmen`}
                          className="rounded-lg bg-[#00FF94]/10 p-2 text-[#00FF94] transition-colors hover:bg-[#00FF94]/20"
                        >
                          <CheckCircle2 className="h-4 w-4" aria-hidden />
                        </button>
                        <button
                          type="button"
                          onClick={() => updateBookingStatus(lead.id, 'cancelled')}
                          aria-label={`Anfrage von ${c.name} ablehnen`}
                          className="rounded-lg bg-red-500/10 p-2 text-red-300 transition-colors hover:bg-red-500/20"
                        >
                          <XCircle className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    </Row>
                  )
                })}
              </div>
            )}
          </Panel>

          <Panel title="Nächste Termine" action={{ href: '/dashboard/trainer/clients', label: 'Kunden' }}>
            {mounted && upcoming.length === 0 ? (
              <EmptyState
                icon={CalendarClock}
                title="Keine anstehenden Termine"
                hint="Bestätigte Sessions erscheinen hier automatisch."
              />
            ) : (
              <div className="space-y-2.5">
                {upcoming.map((session) => {
                  const d = new Date(session.scheduled_at)
                  const c = getCustomerLabel(session.customer_id, TRAINER_ID)
                  return (
                    <Row key={session.id}>
                      <span className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-[rgba(0,168,255,0.09)] ring-1 ring-inset ring-[rgba(0,168,255,0.18)]">
                        <span className="t-eyebrow text-[#00D4FF]">
                          {d.toLocaleDateString('de-DE', { weekday: 'short' })}
                        </span>
                        <span className="nums text-[11px] font-semibold text-soft">
                          {d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">{c.name}</p>
                        <p className="truncate text-xs text-faint">
                          <span className="nums">{session.duration_minutes}</span> Min ·{' '}
                          {session.notes ?? 'Kein Betreff'}
                        </p>
                      </div>
                      <Pill tone="positive">Bestätigt</Pill>
                    </Row>
                  )
                })}
              </div>
            )}
          </Panel>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Panel title="Letzte Aktivität">
            {mounted && activity.length === 0 ? (
              <EmptyState icon={Activity} title="Noch nichts passiert" hint="Hier sammelt sich, was in deinem Coaching geschieht." />
            ) : (
              <ol className="space-y-4">
                {activity.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="relative flex flex-col items-center">
                      <span
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                        style={{ background: `${a.accent}1A`, color: a.accent }}
                      >
                        <a.icon className="h-4 w-4" aria-hidden />
                      </span>
                      {/* Verbindungslinie macht aus vier Kacheln einen Verlauf */}
                      {i < activity.length - 1 && (
                        <span aria-hidden className="mt-1 w-px flex-1 bg-[rgba(0,168,255,0.12)]" />
                      )}
                    </span>
                    <div className="min-w-0 pb-1">
                      <p className="text-sm leading-snug text-foreground">{a.text}</p>
                      <p className="mt-0.5 nums text-[11px] text-faint">{a.date}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </Panel>

          <Panel title="Nachrichten" action={{ href: '/dashboard/trainer/messages', label: 'Öffnen' }}>
            <Link
              href="/dashboard/trainer/messages"
              className="group flex items-center gap-3.5 rounded-xl px-1 py-1"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(0,168,255,0.10)] text-[#00D4FF] ring-1 ring-inset ring-[rgba(0,168,255,0.22)]">
                <MessageCircle className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {mounted
                    ? unreadThreads > 0
                      ? `${unreadThreads} ungelesene Unterhaltung${unreadThreads === 1 ? '' : 'en'}`
                      : 'Alles gelesen'
                    : '—'}
                </p>
                <p className="text-xs text-faint">Antwortzeit wirkt auf dein Ranking</p>
              </div>
              <ArrowRight
                className="h-4 w-4 flex-shrink-0 text-faint transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Panel>
        </div>
      </div>
    </DashboardShell>
  )
}
