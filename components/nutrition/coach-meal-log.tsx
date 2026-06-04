'use client'

import { useMemo, useState } from 'react'
import { Bar, BarChart, Cell, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { MealLog, NutritionPlan } from '@/types'
import { getMealLogHistory } from '@/lib/store'
import { getClientSnapshot } from '@/lib/coach-analytics'
import { GlassCard } from '@/components/glass-card'
import { cn } from '@/lib/utils'
import {
  CalendarRange, CheckCircle2, ChevronDown, Clock, Droplets, Flame,
  RotateCcw, StickyNote, Target, TrendingUp, UtensilsCrossed, Zap,
} from 'lucide-react'

interface CoachMealLogProps {
  customerId: string
  nutritionPlan: NutritionPlan | null
  days?: number
}

interface DayTotals { cal: number; pro: number; carb: number; fat: number }

const DEFAULT_VISIBLE = 5

function totalsFor(log: MealLog): DayTotals {
  let cal = 0, pro = 0, carb = 0, fat = 0
  for (const meal of log.meals) for (const f of meal.foods) { cal += f.calories; pro += f.protein; carb += f.carbs; fat += f.fat }
  return { cal, pro, carb, fat }
}

function formatLoggedAt(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
    + ' · ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

function StatTile({ icon: Icon, label, value, sub, accent }: {
  icon: typeof Target; label: string; value: string; sub?: string; accent: string
}) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-[#0D1320]/60 p-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-base font-bold text-foreground leading-none">{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
    </div>
  )
}

/** Soll/Ist for one macro: shows ist/soll, % and a colored bar. */
function MacroCompare({ label, ist, soll, unit, accent }: {
  label: string; ist: number; soll: number | null; unit: string; accent: string
}) {
  const pct = soll && soll > 0 ? Math.round((ist / soll) * 100) : 0
  const onTarget = pct >= 90 && pct <= 110
  return (
    <div className="rounded-lg border border-white/[0.05] bg-[#0D1320]/50 px-2.5 py-2">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        {soll != null && (
          <span className={cn('text-[10px] font-bold', onTarget ? 'text-[#00FF94]' : 'text-[#FFD700]')}>{pct}%</span>
        )}
      </div>
      <p className="text-xs font-semibold text-foreground tabular-nums">
        {Math.round(ist)}<span className="text-muted-foreground/50 font-normal"> / {soll != null ? Math.round(soll) : '–'} {unit}</span>
      </p>
      <div className="mt-1.5 h-1.5 rounded-full bg-[#1A2332] overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: onTarget ? '#00FF94' : accent }} />
      </div>
    </div>
  )
}

export function CoachMealLog({ customerId, nutritionPlan, days = 120 }: CoachMealLogProps) {
  const allLogs = useMemo(() => getMealLogHistory(customerId, days), [customerId, days])
  const snap = useMemo(() => getClientSnapshot(customerId), [customerId])
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const [filterOpen, setFilterOpen] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const filtered = useMemo(() => {
    if (!filterOpen) return allLogs
    return allLogs.filter((log) => {
      const d = log.date.slice(0, 10)
      if (from && d < from) return false
      if (to && d > to) return false
      return true
    })
  }, [allLogs, filterOpen, from, to])

  const visible = filterOpen ? filtered : filtered.slice(0, DEFAULT_VISIBLE)
  const hiddenCount = filterOpen ? 0 : Math.max(0, allLogs.length - DEFAULT_VISIBLE)

  if (allLogs.length === 0) return null

  const target = nutritionPlan?.calories_target ?? null
  const n = snap.nutrition

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }
  const resetFilter = () => { setFrom(''); setTo('') }
  const inputCls = 'bg-[#0B0F1A] border border-white/[0.08] focus:border-[#00FF94]/40 rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none transition-colors [color-scheme:dark]'

  return (
    <GlassCard className="overflow-hidden" hover={false}>
      {/* Header */}
      <div className="p-4 border-b border-white/[0.04] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-heading font-semibold text-foreground">Kunden-Ernährungslog</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Soll/Ist je Tag — zum Aufklappen tippen</p>
        </div>
        <button
          onClick={() => setFilterOpen((v) => !v)}
          aria-pressed={filterOpen}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0',
            filterOpen ? 'bg-[#00FF94]/10 text-[#00FF94] shadow-[0_0_10px_rgba(0,255,148,0.1)]' : 'text-muted-foreground hover:text-foreground bg-[#1A2332] hover:bg-[#1A2332]/70'
          )}
        >
          <CalendarRange className="w-3.5 h-3.5" />
          {filterOpen ? 'Filter aktiv' : 'Nach Datum filtern'}
        </button>
      </div>

      {/* Adherence stats */}
      <div className="p-4 border-b border-white/[0.04] grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <StatTile icon={Target} label="Ø Kalorienziel" accent="#FF8C00" value={target ? `${n.avgCalPct7}%` : '—'} sub="letzte 7 Logs" />
        <StatTile icon={CheckCircle2} label="Im Zielkorridor" accent="#00FF94" value={target ? `${n.onTargetRate7}%` : '—'} sub="90–110 % der Tage" />
        <StatTile icon={Zap} label="Tracking-Streak" accent="#00D4FF" value={`${n.streak} T`} sub={`${n.loggedDays7}/7 Tage erfasst`} />
        <StatTile icon={Flame} label="Ø Protein" accent="#FFD700" value={`${n.avgMacros7.pro} g`} sub={`C ${n.avgMacros7.carb} · F ${n.avgMacros7.fat}`} />
      </div>

      {/* Calorie adherence chart */}
      {target && n.trend.length > 0 && (
        <div className="p-4 border-b border-white/[0.04]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-[#00FF94]" /> Kalorien-Adhärenz</span>
            <span className="text-[10px] text-muted-foreground">Ziel {target} kcal · letzte {n.trend.length} Logs</span>
          </div>
          <div className="h-[140px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={n.trend} margin={{ top: 6, right: 12, bottom: 0, left: 8 }}>
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
                  {n.trend.map((d, i) => <Cell key={i} fill={d.onTarget ? '#00FF94' : '#FF8C00'} fillOpacity={0.85} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Calendar filter panel */}
      {filterOpen && (
        <div className="px-4 py-3 border-b border-white/[0.04] bg-[#0B0F1A]/40 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Von</span>
            <input type="date" value={from} max={to || undefined} onChange={(e) => setFrom(e.target.value)} className={inputCls} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Bis</span>
            <input type="date" value={to} min={from || undefined} onChange={(e) => setTo(e.target.value)} className={inputCls} />
          </label>
          {(from || to) && (
            <button onClick={resetFilter} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-[#1A2332] transition-colors">
              <RotateCcw className="w-3 h-3" /> Zurücksetzen
            </button>
          )}
          <span className="ml-auto text-[11px] text-muted-foreground self-center">
            {filtered.length} {filtered.length === 1 ? 'Eintrag' : 'Einträge'}
          </span>
        </div>
      )}

      {/* Log rows */}
      {visible.length === 0 ? (
        <p className="px-4 py-8 text-center text-xs text-muted-foreground/60">Keine Einträge im gewählten Zeitraum.</p>
      ) : (
        <div className="divide-y divide-white/[0.04]">
          {visible.map((log) => {
            const t = totalsFor(log)
            const pct = target ? Math.round((t.cal / target) * 100) : 0
            const onTarget = target ? pct >= 90 && pct <= 110 : false
            const isOpen = expanded.has(log.id)
            return (
              <div key={log.id}>
                {/* Day summary row */}
                <button
                  onClick={() => toggle(log.id)}
                  aria-expanded={isOpen}
                  className={cn('w-full px-4 py-3 flex items-center gap-4 text-left transition-colors', isOpen ? 'bg-[#FF8C00]/[0.04]' : 'hover:bg-white/[0.015]')}
                >
                  <div className="w-12 text-center flex-shrink-0">
                    <p className="text-xs font-bold text-foreground">{new Date(log.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}</p>
                    <p className="text-[9px] text-muted-foreground">{log.meals.length} Mahlz.</p>
                  </div>
                  <div className="flex-1 grid grid-cols-4 gap-2 text-center text-xs">
                    <div><span className="text-[#FF8C00] font-semibold">{Math.round(t.cal)}</span><span className="text-muted-foreground/40 ml-0.5">kcal</span></div>
                    <div><span className="text-[#00D4FF] font-semibold">{Math.round(t.pro)}</span><span className="text-muted-foreground/40 ml-0.5">P</span></div>
                    <div><span className="text-[#00FF94] font-semibold">{Math.round(t.carb)}</span><span className="text-muted-foreground/40 ml-0.5">C</span></div>
                    <div><span className="text-[#FFD700] font-semibold">{Math.round(t.fat)}</span><span className="text-muted-foreground/40 ml-0.5">F</span></div>
                  </div>
                  {target && (
                    <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded flex-shrink-0', onTarget ? 'bg-[#00FF94]/15 text-[#00FF94]' : 'bg-[#FFD700]/15 text-[#FFD700]')}>{pct}%</span>
                  )}
                  <ChevronDown className={cn('w-4 h-4 text-muted-foreground/50 flex-shrink-0 transition-transform', isOpen && 'rotate-180')} />
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 space-y-3 bg-[#0B0F1A]/40">
                    {/* Soll/Ist (Plan-Erfüllung) */}
                    {nutritionPlan && (
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Target className="w-3 h-3 text-[#FFD700]" /> Soll / Ist · Coach-Vorgabe
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <MacroCompare label="Kalorien" ist={t.cal} soll={nutritionPlan.calories_target} unit="kcal" accent="#FF8C00" />
                          <MacroCompare label="Protein" ist={t.pro} soll={nutritionPlan.protein_g} unit="g" accent="#00D4FF" />
                          <MacroCompare label="Kohlenh." ist={t.carb} soll={nutritionPlan.carbs_g} unit="g" accent="#00FF94" />
                          <MacroCompare label="Fett" ist={t.fat} soll={nutritionPlan.fat_g} unit="g" accent="#FFD700" />
                        </div>
                      </div>
                    )}

                    {/* Meals */}
                    {log.meals.length === 0 ? (
                      <p className="text-xs text-muted-foreground/60 py-2">Keine Mahlzeiten eingetragen.</p>
                    ) : (
                      <div className="space-y-2">
                        {log.meals.map((meal) => (
                          <div key={meal.id} className="rounded-xl border border-white/[0.05] bg-[#1A2332]/40 overflow-hidden">
                            <div className="px-3 py-2 flex items-center gap-2 border-b border-white/[0.04]">
                              <UtensilsCrossed className="w-3.5 h-3.5 text-[#00FF94]/70 flex-shrink-0" />
                              <span className="text-xs font-semibold text-foreground">{meal.name}</span>
                              {meal.time && (
                                <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="w-3 h-3" /> {meal.time}</span>
                              )}
                            </div>
                            {meal.foods.length === 0 ? (
                              <p className="px-3 py-2 text-[11px] text-muted-foreground/50">Keine Lebensmittel erfasst.</p>
                            ) : (
                              <div className="divide-y divide-white/[0.03]">
                                {meal.foods.map((food, i) => (
                                  <div key={i} className="px-3 py-1.5 flex items-center gap-3 text-xs">
                                    <span className="flex-1 min-w-0 truncate text-foreground/90">{food.name}</span>
                                    {food.amount && <span className="text-[10px] text-muted-foreground/60 flex-shrink-0">{food.amount}</span>}
                                    <span className="text-[#FF8C00] font-medium flex-shrink-0">{Math.round(food.calories)} kcal</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-[11px] text-muted-foreground">
                      {log.water_ml > 0 && (
                        <span className="inline-flex items-center gap-1"><Droplets className="w-3 h-3 text-[#00D4FF]" /> {(log.water_ml / 1000).toFixed(1)} l Wasser</span>
                      )}
                      {log.notes && (
                        <span className="inline-flex items-center gap-1"><StickyNote className="w-3 h-3 text-[#FFD700]" /> {log.notes}</span>
                      )}
                      <span className="ml-auto text-muted-foreground/50">Eingetragen: {formatLoggedAt(log.updated_at || log.created_at)}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Footer hint */}
      {!filterOpen && hiddenCount > 0 && (
        <button
          onClick={() => setFilterOpen(true)}
          className="w-full px-4 py-3 border-t border-white/[0.04] flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground hover:text-[#00FF94] hover:bg-[#00FF94]/[0.04] transition-colors"
        >
          <CalendarRange className="w-3.5 h-3.5" />
          {hiddenCount} weitere {hiddenCount === 1 ? 'Eintrag' : 'Einträge'} — Datumsfilter öffnen
        </button>
      )}
    </GlassCard>
  )
}
