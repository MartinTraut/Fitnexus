'use client'

import { useMemo } from 'react'
import {
  Bar, BarChart, Cell, Line, LineChart, ReferenceArea, ReferenceLine,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { getClientSnapshot, type CoachFlag } from '@/lib/coach-analytics'
import { GlassCard } from '@/components/glass-card'
import { cn } from '@/lib/utils'
import {
  Activity, AlertCircle, AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight,
  CheckCircle2, Dumbbell, Flame, Scale, TrendingUp, UtensilsCrossed,
} from 'lucide-react'

type TabKey = 'chat' | 'training' | 'nutrition' | 'progress' | 'photos'

interface ClientCockpitProps {
  customerId: string
  partnerName: string
  onJump: (tab: TabKey) => void
}

function fmtDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function KpiCard({ icon: Icon, accent, label, value, sub, trend, onClick }: {
  icon: typeof Dumbbell
  accent: string
  label: string
  value: string
  sub: string
  trend?: { dir: 'up' | 'down' | 'flat'; good: boolean }
  onClick: () => void
}) {
  const TrendIcon = trend?.dir === 'up' ? ArrowUpRight : trend?.dir === 'down' ? ArrowDownRight : ArrowRight
  return (
    <button
      onClick={onClick}
      className="group text-left rounded-2xl border border-white/[0.06] bg-[#0D1320]/60 p-4 hover:border-white/[0.12] hover:bg-[#0D1320] transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accent}1a` }}>
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground/70 group-hover:translate-x-0.5 transition-all" />
      </div>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-heading font-bold text-foreground leading-none">{value}</p>
        {trend && (
          <span className={cn('inline-flex items-center text-xs font-medium mb-0.5', trend.good ? 'text-[#00FF94]' : 'text-[#FFD700]')}>
            <TrendIcon className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
      <p className="text-[11px] font-medium text-muted-foreground/80 mt-1">{label}</p>
      <p className="text-[11px] text-muted-foreground/50 mt-0.5">{sub}</p>
    </button>
  )
}

const FLAG_STYLE: Record<CoachFlag['level'], { icon: typeof AlertTriangle; color: string; bg: string; border: string }> = {
  critical: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/[0.07]', border: 'border-red-500/20' },
  warning: { icon: AlertCircle, color: 'text-[#FFD700]', bg: 'bg-[#FFD700]/[0.06]', border: 'border-[#FFD700]/20' },
  positive: { icon: CheckCircle2, color: 'text-[#00FF94]', bg: 'bg-[#00FF94]/[0.06]', border: 'border-[#00FF94]/20' },
}

function ChartShell({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <GlassCard className="p-4" hover={false}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-heading font-semibold text-foreground">{title}</h3>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      <div className="h-[160px] w-full">{children}</div>
    </GlassCard>
  )
}

export function ClientCockpit({ customerId, partnerName, onJump }: ClientCockpitProps) {
  const snap = useMemo(() => getClientSnapshot(customerId), [customerId])

  if (!snap.hasData) {
    return (
      <GlassCard className="p-10 text-center" hover={false}>
        <Activity className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">Noch keine Tracking-Daten für {partnerName}.</p>
        <p className="text-xs text-muted-foreground/50 mt-1">Sobald Training, Ernährung oder Messungen erfasst werden, erscheint hier die Auswertung.</p>
      </GlassCard>
    )
  }

  const { training, nutrition, body } = snap
  const actionFlags = snap.flags.filter((f) => f.level !== 'positive')
  const winFlags = snap.flags.filter((f) => f.level === 'positive')

  const weightDir = body.deltaKg == null ? 'flat' : body.deltaKg < 0 ? 'down' : body.deltaKg > 0 ? 'up' : 'flat'

  return (
    <div className="space-y-5">
      {/* Reference-date banner */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
        <span>Stand: <span className="text-foreground/80 font-medium">{fmtDate(snap.referenceDate)}</span> (letzte Aktivität)</span>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard
          icon={Dumbbell} accent="#00FF94"
          value={`${training.sessionsLast7}`}
          label="Einheiten · letzte 7 Tage"
          sub={`Plan-Erfüllung ${training.targetHitRate}% · ${training.sessionsLast30} in 30 T`}
          onClick={() => onJump('training')}
        />
        <KpiCard
          icon={UtensilsCrossed} accent="#FF8C00"
          value={nutrition.target ? `${nutrition.avgCalPct7}%` : '—'}
          label="Ø Kalorienziel · 7 Tage"
          sub={`${nutrition.loggedDays7}/7 Tage getrackt · Streak ${nutrition.streak}`}
          trend={nutrition.target ? { dir: nutrition.avgCalPct7 >= 90 && nutrition.avgCalPct7 <= 110 ? 'flat' : 'down', good: nutrition.avgCalPct7 >= 90 && nutrition.avgCalPct7 <= 110 } : undefined}
          onClick={() => onJump('nutrition')}
        />
        <KpiCard
          icon={Scale} accent="#00D4FF"
          value={body.current != null ? `${body.current} kg` : '—'}
          label="Gewicht aktuell"
          sub={body.deltaKg != null ? `${body.deltaKg > 0 ? '+' : ''}${body.deltaKg} kg seit Start` : 'Keine Messung'}
          trend={body.deltaKg != null ? { dir: weightDir, good: !body.stagnant } : undefined}
          onClick={() => onJump('progress')}
        />
        <KpiCard
          icon={Flame} accent="#FFD700"
          value={training.bestLifts[0] ? `+${training.bestLifts[0].gainPct}%` : '—'}
          label="Top-Kraftzuwachs"
          sub={training.bestLifts[0] ? training.bestLifts[0].name : 'Noch keine Daten'}
          trend={training.bestLifts[0] ? { dir: 'up', good: true } : undefined}
          onClick={() => onJump('training')}
        />
      </div>

      {/* Handlungsbedarf */}
      <GlassCard className="p-4" hover={false}>
        <h3 className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#FFD700]" /> Handlungsbedarf
        </h3>
        {actionFlags.length === 0 ? (
          <div className="flex items-center gap-2.5 rounded-xl border border-[#00FF94]/20 bg-[#00FF94]/[0.06] px-3 py-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#00FF94] flex-shrink-0" />
            <p className="text-xs text-foreground/90">Alles im grünen Bereich — keine offenen Punkte für {partnerName}.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {actionFlags.map((f, i) => {
              const st = FLAG_STYLE[f.level]
              return (
                <div key={i} className={cn('flex items-start gap-2.5 rounded-xl border px-3 py-2.5', st.bg, st.border)}>
                  <st.icon className={cn('w-4 h-4 flex-shrink-0 mt-0.5', st.color)} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">{f.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{f.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {winFlags.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/[0.04] space-y-2">
            {winFlags.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5 px-1">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#00FF94]" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground/90">{f.title}</p>
                  <p className="text-[11px] text-muted-foreground/70">{f.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Trends */}
      <div className="grid md:grid-cols-2 gap-3">
        <ChartShell title="Gewichtsverlauf" hint={body.deltaKg != null ? `${body.deltaKg > 0 ? '+' : ''}${body.deltaKg} kg seit Start` : undefined}>
          {body.trend.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={body.trend} margin={{ top: 6, right: 12, bottom: 0, left: 8 }}>
                <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={38} domain={['dataMin - 1', 'dataMax + 1']} tickFormatter={(v) => `${v}`} />
                <Tooltip
                  contentStyle={{ background: '#0D1320', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: '#94a3b8' }} formatter={(value) => [`${value} kg`, 'Gewicht']}
                />
                <Line type="monotone" dataKey="weight" stroke="#00D4FF" strokeWidth={2} dot={{ r: 2.5, fill: '#00D4FF' }} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-muted-foreground/40">Zu wenige Messungen</div>
          )}
        </ChartShell>

        <ChartShell title="Kalorien-Adhärenz" hint={nutrition.target ? `Ziel ${nutrition.target} kcal · ${nutrition.onTargetRate7}% im Ziel` : undefined}>
          {nutrition.trend.length > 0 && nutrition.target ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nutrition.trend} margin={{ top: 6, right: 12, bottom: 0, left: 8 }}>
                <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={40} domain={[0, 140]} ticks={[0, 50, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                  contentStyle={{ background: '#0D1320', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: '#94a3b8' }} formatter={(value, _name, item) => [`${value}% · ${item?.payload?.cal} kcal`, 'Ziel']}
                />
                <ReferenceArea y1={90} y2={110} fill="#00FF94" fillOpacity={0.07} />
                <ReferenceLine y={100} stroke="#00FF94" strokeDasharray="3 3" strokeOpacity={0.4} />
                <Bar dataKey="pct" radius={[3, 3, 0, 0]} maxBarSize={22}>
                  {nutrition.trend.map((d, i) => (
                    <Cell key={i} fill={d.onTarget ? '#00FF94' : '#FF8C00'} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-muted-foreground/40">Kein Ernährungsziel / keine Logs</div>
          )}
        </ChartShell>
      </div>

      {/* Kraftzuwachs */}
      {training.bestLifts.length > 0 && (
        <GlassCard className="overflow-hidden" hover={false}>
          <div className="p-4 border-b border-white/[0.04] flex items-center justify-between">
            <h3 className="text-sm font-heading font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00FF94]" /> Kraftzuwachs
            </h3>
            <button onClick={() => onJump('training')} className="text-[11px] font-medium text-[#00D4FF] hover:text-[#00A8FF] inline-flex items-center gap-1">
              Details <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {training.bestLifts.map((l) => (
              <div key={l.name} className="px-4 py-2.5 flex items-center gap-4">
                <span className="flex-1 text-sm text-foreground">{l.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{l.start} → {l.current} kg</span>
                <span className={cn('text-xs font-bold tabular-nums w-14 text-right', l.gainPct > 0 ? 'text-[#00FF94]' : 'text-muted-foreground')}>
                  {l.gainPct > 0 ? '+' : ''}{l.gainPct}%
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  )
}
