'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  Settings, LogOut, LayoutDashboard, Search, Calendar, MessageCircle,
  TrendingUp, User, Inbox, Users, FileText, CreditCard, UserCircle,
  type LucideIcon,
} from 'lucide-react'
import { signOut } from '@/lib/auth'

/**
 * Navigation der eingeloggten Ansichten — eine Komponente fuer beide Rollen.
 *
 * Vorher gab es vier fast identische Dateien, die sich in Details
 * auseinanderentwickelt hatten (Aktivzustand, Trennlinien, Signet).
 * Die Rolle bestimmt jetzt nur noch die Akzentfarbe und die Eintraege.
 */

export type NavItem = { href: string; icon: LucideIcon; label: string; exact?: boolean }

type Accent = { fg: string; soft: string; ring: string; glow: string }

export const ACCENTS: Record<'customer' | 'trainer', Accent> = {
  customer: {
    fg: '#00D4FF',
    soft: 'rgba(0,168,255,0.10)',
    ring: 'rgba(0,168,255,0.14)',
    glow: 'rgba(0,168,255,0.45)',
  },
  trainer: {
    fg: '#00FF94',
    soft: 'rgba(0,255,148,0.10)',
    ring: 'rgba(0,255,148,0.14)',
    glow: 'rgba(0,255,148,0.45)',
  },
}

function useIsActive() {
  const pathname = usePathname()
  return (item: NavItem) =>
    item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + '/')
}

export function DashboardSidebar({
  role,
  items,
  settingsHref,
}: {
  role: 'customer' | 'trainer'
  items: NavItem[]
  settingsHref: string
}) {
  const isActive = useIsActive()
  const router = useRouter()
  const a = ACCENTS[role]

  const handleLogout = () => {
    signOut()
    router.push('/')
  }

  const link = (item: NavItem) => {
    const active = isActive(item)
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium',
          'transition-colors duration-200',
          active ? 'text-foreground' : 'text-soft hover:bg-white/[0.03] hover:text-foreground',
        )}
        style={active ? { background: a.soft, color: a.fg } : undefined}
      >
        {/* Aktivmarke links: die Position ist auch ohne Farbe erkennbar */}
        {active && (
          <span
            aria-hidden
            className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full"
            style={{ background: a.fg }}
          />
        )}
        <item.icon className="h-[18px] w-[18px] flex-shrink-0" aria-hidden />
        {item.label}
      </Link>
    )
  }

  return (
    <aside className="z-40 hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div
        className="flex flex-1 flex-col border-r bg-[#0A0E18]"
        style={{ borderColor: a.ring }}
      >
        <div className="flex h-20 items-center gap-2.5 px-6">
          <Link href="/" className="flex items-center gap-2.5 rounded-lg" aria-label="FITNEXUS — zur Startseite">
            <Image src="/logo-icon.png" alt="" width={64} height={64} className="h-8 w-8 object-contain" />
            <span className="font-heading text-lg font-bold tracking-[0.04em] gradient-brand-text">
              FITNEXUS
            </span>
          </Link>
        </div>

        <p className="px-6 pb-3 t-eyebrow text-faint">
          {role === 'trainer' ? 'Coach' : 'Mein Bereich'}
        </p>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3" aria-label="Bereichsnavigation">
          {items.map(link)}
        </nav>

        <div className="space-y-1 border-t px-3 py-4" style={{ borderColor: a.ring }}>
          {link({ href: settingsHref, icon: Settings, label: 'Einstellungen' })}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-soft transition-colors duration-200 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden /> Abmelden
          </button>
        </div>
      </div>
    </aside>
  )
}

export function DashboardMobileNav({
  role,
  items,
}: {
  role: 'customer' | 'trainer'
  items: NavItem[]
}) {
  const isActive = useIsActive()
  const a = ACCENTS[role]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      aria-label="Bereichsnavigation"
    >
      <div className="border-t bg-[#0A0E18]/95 backdrop-blur-2xl" style={{ borderColor: a.ring }}>
        {/* min-w-0 + Kürzung: fünf Beschriftungen sprengten auf 390px die Zeile */}
        <div className="flex items-stretch justify-around gap-0.5 px-1 py-2">
          {items.map((item) => {
            const active = isActive(item)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5',
                  'transition-colors duration-200',
                  active ? '' : 'text-faint',
                )}
                style={active ? { color: a.fg } : undefined}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute -top-2 h-1 w-7 rounded-full"
                    style={{ background: a.fg, boxShadow: `0 0 10px ${a.glow}` }}
                  />
                )}
                <item.icon className="h-5 w-5" strokeWidth={active ? 2.3 : 1.7} aria-hidden />
                <span className="w-full truncate text-center text-[10px] font-medium leading-tight">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom)] bg-[#0A0E18]" />
    </nav>
  )
}


// ─── Eintraege ────────────────────────────────────────────
// Bewusst hier und nicht im Layout: Icons sind Funktionen, und Funktionen
// kann eine Server-Komponente nicht an eine Client-Komponente uebergeben.

const CUSTOMER_ITEMS: NavItem[] = [
  { href: '/dashboard/customer', icon: LayoutDashboard, label: 'Übersicht', exact: true },
  { href: '/dashboard/customer/search', icon: Search, label: 'Suche' },
  { href: '/dashboard/customer/bookings', icon: Calendar, label: 'Termine' },
  { href: '/dashboard/customer/messages', icon: MessageCircle, label: 'Chat' },
  { href: '/dashboard/customer/workspace', icon: TrendingUp, label: 'Fortschritt' },
  { href: '/dashboard/customer/profile', icon: User, label: 'Profil' },
]

const TRAINER_ITEMS: NavItem[] = [
  { href: '/dashboard/trainer', icon: LayoutDashboard, label: 'Übersicht', exact: true },
  { href: '/dashboard/trainer/leads', icon: Inbox, label: 'Anfragen' },
  { href: '/dashboard/trainer/clients', icon: Users, label: 'Kunden' },
  { href: '/dashboard/trainer/contracts', icon: FileText, label: 'Verträge' },
  { href: '/dashboard/trainer/messages', icon: MessageCircle, label: 'Chat' },
  { href: '/dashboard/trainer/billing', icon: CreditCard, label: 'Abrechnung' },
  { href: '/dashboard/trainer/profile', icon: UserCircle, label: 'Profil' },
]

/** Auf 390px passen fuenf Ziele nebeneinander, nicht sechs oder sieben. */
const CUSTOMER_MOBILE = CUSTOMER_ITEMS.filter((i) => i.href !== '/dashboard/customer/search')
const TRAINER_MOBILE = [TRAINER_ITEMS[0], TRAINER_ITEMS[1], TRAINER_ITEMS[2], TRAINER_ITEMS[4], TRAINER_ITEMS[6]]

export function CustomerNav() {
  return (
    <>
      <DashboardSidebar role="customer" items={CUSTOMER_ITEMS} settingsHref="/dashboard/customer/profile" />
      <DashboardMobileNav role="customer" items={CUSTOMER_MOBILE} />
    </>
  )
}

export function TrainerNav() {
  return (
    <>
      <DashboardSidebar role="trainer" items={TRAINER_ITEMS} settingsHref="/dashboard/trainer/settings" />
      <DashboardMobileNav role="trainer" items={TRAINER_MOBILE} />
    </>
  )
}
