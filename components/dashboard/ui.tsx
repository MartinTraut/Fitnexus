import Link from 'next/link'
import type { ComponentType, ReactNode } from 'react'
import { ChevronRight, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Bausteine der eingeloggten Ansichten.
 *
 * Vorher hatte jede Seite ihre eigene Kachel, ihre eigene Kopfzeile und ihren
 * eigenen Leerzustand — die Kunden- und die Coach-Seite sahen dadurch aus wie
 * zwei verschiedene Produkte. Hier steht jede dieser Formen genau einmal.
 */

type Accent = 'cyan' | 'green' | 'amber' | 'violet'

const ACCENT: Record<Accent, { fg: string; bg: string; ring: string }> = {
  cyan: { fg: '#00D4FF', bg: 'rgba(0,168,255,0.10)', ring: 'rgba(0,168,255,0.22)' },
  green: { fg: '#00FF94', bg: 'rgba(0,255,148,0.10)', ring: 'rgba(0,255,148,0.22)' },
  amber: { fg: '#FFC94A', bg: 'rgba(255,201,74,0.10)', ring: 'rgba(255,201,74,0.22)' },
  violet: { fg: '#A78BFA', bg: 'rgba(167,139,250,0.10)', ring: 'rgba(167,139,250,0.22)' },
}

/** Begrenzt die Zeilenlänge — ohne Deckel laufen Listen über 1400px auseinander. */
export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-6 md:px-8 md:py-10">
      <div className="space-y-8">{children}</div>
    </div>
  )
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="t-h3 font-heading font-bold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-faint">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-shrink-0 flex-wrap items-center gap-2.5">{actions}</div>}
    </header>
  )
}

/**
 * Kennzahl. Der Wert trägt, das Etikett ordnet ein, der Zusatz gibt Kontext.
 * Ohne Zusatz ist eine nackte Zahl wie "0" oder "5" nicht interpretierbar.
 */
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = 'cyan',
  href,
}: {
  label: string
  value: string
  hint?: string
  icon: ComponentType<{ className?: string }>
  accent?: Accent
  href?: string
}) {
  const a = ACCENT[accent]

  // Reihenfolge bewusst: Symbolzeile mit fester Hoehe, dann der Wert.
  // Solange das Etikett ueber dem Wert stand, verschob eine zweizeilige
  // Beschriftung den Wert nach unten und die Kacheln standen versetzt.
  const body = (
    <div
      className={cn(
        'surface flex h-full flex-col rounded-2xl p-5',
        href && 'surface-hover group-hover:-translate-y-0.5',
      )}
    >
      <div className="mb-4 flex h-8 items-center justify-end">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: a.bg, boxShadow: `inset 0 0 0 1px ${a.ring}` }}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="nums font-heading text-[clamp(1.625rem,1.4vw+1.15rem,2.25rem)] font-bold leading-none text-foreground">
        {value}
      </p>
      <p className="mt-2.5 t-eyebrow leading-[1.15] tracking-[0.12em] text-soft">{label}</p>
      <p className="mt-1.5 text-xs leading-snug text-faint">{hint ?? '\u00A0'}</p>
    </div>
  )

  const styled = (
    <div style={{ color: a.fg }} className="h-full">
      {body}
    </div>
  )

  return href ? (
    <Link href={href} className="group block h-full">
      {styled}
    </Link>
  ) : (
    styled
  )
}

/** Karte mit Kopfzeile und optionalem Verweis auf die Vollansicht. */
export function Panel({
  title,
  action,
  children,
  className,
}: {
  title: string
  action?: { href: string; label: string }
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('surface overflow-hidden rounded-2xl', className)}>
      <div className="flex items-center justify-between gap-4 border-b border-[rgba(0,168,255,0.08)] px-5 py-4">
        <h2 className="font-heading text-sm font-semibold tracking-[0.01em] text-foreground">{title}</h2>
        {action && (
          <Link
            href={action.href}
            className="flex items-center gap-1 rounded-lg text-xs font-medium text-soft transition-colors hover:text-[#00D4FF]"
          >
            {action.label}
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        )}
      </div>
      <div className="p-5">{children}</div>
    </section>
  )
}

/** Leerzustand mit Ausweg — eine graue Zeile allein lässt Nutzer stehen. */
export function EmptyState({
  icon: Icon,
  title,
  hint,
  action,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  hint?: string
  action?: { href: string; label: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(0,168,255,0.07)] text-[#00A8FF]/70 ring-1 ring-inset ring-[rgba(0,168,255,0.14)]">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <p className="text-sm font-medium text-foreground">{title}</p>
      {hint && <p className="mt-1.5 max-w-xs text-xs text-faint">{hint}</p>}
      {action && (
        <Link
          href={action.href}
          className="mt-5 rounded-xl border border-[rgba(0,168,255,0.25)] bg-[rgba(0,168,255,0.07)] px-4 py-2 text-xs font-semibold text-[#00D4FF] transition-colors hover:bg-[rgba(0,168,255,0.14)]"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}

/** Zeile einer Liste — überall gleiche Höhe, gleiche Abstände. */
export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3.5 rounded-xl border border-transparent bg-[#0B0F1A]/60 px-3.5 py-3',
        'transition-colors duration-200 hover:border-[rgba(0,168,255,0.14)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * Kürzel-Kachel. Bei anonymen Kunden gibt es keine Initialen — dort steht
 * ein Schloss statt zweier zufälliger Ziffern aus der Alias-Nummer.
 */
export function Initials({
  text,
  accent = 'cyan',
  anonymous = false,
}: {
  text?: string
  accent?: Accent
  anonymous?: boolean
}) {
  const a = ACCENT[accent]
  return (
    <span
      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold"
      style={{ background: a.bg, color: a.fg, boxShadow: `inset 0 0 0 1px ${a.ring}` }}
      aria-hidden
    >
      {anonymous || !text ? <Lock className="h-4 w-4 opacity-70" /> : text}
    </span>
  )
}

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'positive' | 'pending' | 'danger'
}) {
  const tones = {
    neutral: 'bg-[rgba(148,163,184,0.12)] text-soft',
    positive: 'bg-[rgba(0,255,148,0.12)] text-[#00FF94]',
    pending: 'bg-[rgba(255,201,74,0.12)] text-[#FFC94A]',
    danger: 'bg-[rgba(255,71,87,0.12)] text-[#FF7B86]',
  }
  return (
    <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', tones[tone])}>
      {children}
    </span>
  )
}
