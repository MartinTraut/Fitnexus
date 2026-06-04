'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import type { ActualSet, WorkoutLog } from '@/types'
import { getWorkoutLogs } from '@/lib/store'
import { GlassCard } from '@/components/glass-card'
import { cn } from '@/lib/utils'
import { Activity, ArrowDown, CheckCircle2, ChevronDown, ClipboardList, Dumbbell, Flame, TrendingUp, Trophy } from 'lucide-react'

interface CoachWorkoutLogProps {
  customerId: string
}

interface Session {
  log: WorkoutLog
  topWeight: number
  topReps: number
  volume: number
  totalReps: number
  est1rm: number
}

interface ExerciseGroup {
  name: string
  sessions: Session[]        // chronological (oldest → newest)
  latest: Session
  pr: number                 // best weight ever
  prReps: number
  startTop: number
  gainPct: number
  prescribed: string | null
  hitTarget: boolean
}

function topSet(sets: ActualSet[]): ActualSet {
  return sets.reduce((best, s) => (s.weight > best.weight ? s : best), sets[0])
}

function buildSession(log: WorkoutLog): Session {
  const ts = topSet(log.actual_sets)
  const volume = log.actual_sets.reduce((sum, s) => sum + s.weight * s.reps, 0)
  const totalReps = log.actual_sets.reduce((sum, s) => sum + s.reps, 0)
  const est1rm = Math.round(ts.weight * (1 + ts.reps / 30))
  return { log, topWeight: ts.weight, topReps: ts.reps, volume, totalReps, est1rm }
}

/** Numeric prescribed weight, or null for bodyweight / unspecified. */
function parseWeight(w: string | null): number | null {
  if (!w) return null
  const n = parseFloat(w.replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

/** Prescribed rep range, e.g. "8-10" → {min:8,max:10}; "10" → {min:10,max:10}. */
function parseReps(r: string): { min: number; max: number } {
  const nums = r.match(/\d+/g)?.map(Number) ?? []
  if (nums.length === 0) return { min: 0, max: 0 }
  return { min: nums[0], max: nums[nums.length - 1] }
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
}

function fmtFull(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { label: string; top: number; volume: number } }> }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-[#0D1320] border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
      <p className="text-[10px] text-muted-foreground mb-1 font-medium">{d.label}</p>
      <p className="text-xs text-[#00D4FF] font-semibold">{d.top} kg Top</p>
      <p className="text-[10px] text-muted-foreground">Volumen: {d.volume.toLocaleString('de-DE')} kg</p>
    </div>
  )
}

function StatTile({ icon: Icon, label, value, sub, accent }: {
  icon: typeof Trophy; label: string; value: string; sub?: string; accent: string
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

function ExerciseDetail({ group }: { group: ExerciseGroup }) {
  const chartData = group.sessions.map((s) => ({
    label: fmtDate(s.log.date),
    top: s.topWeight,
    volume: s.volume,
  }))
  const gradId = `wl-grad-${group.name.replace(/[^a-z0-9]/gi, '')}`

  return (
    <div className="px-4 pb-4 pt-1 space-y-4 bg-[#0B0F1A]/40">
      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <StatTile
          icon={Trophy} label="Bestleistung" accent="#FFD700"
          value={`${group.pr} kg`} sub={`× ${group.prReps} Wdh.`}
        />
        <StatTile
          icon={Activity} label="Est. 1RM" accent="#00D4FF"
          value={`${group.latest.est1rm} kg`} sub="aktuelle Schätzung"
        />
        <StatTile
          icon={Flame} label="Volumen" accent="#FF8C00"
          value={`${group.latest.volume.toLocaleString('de-DE')} kg`} sub="letzte Session"
        />
        <StatTile
          icon={TrendingUp} label="Steigerung" accent="#00FF94"
          value={group.gainPct >= 0 ? `+${group.gainPct}%` : `${group.gainPct}%`}
          sub={`seit ${fmtDate(group.sessions[0].log.date)}`}
        />
      </div>

      {/* Progression chart */}
      {chartData.length > 1 && (
        <div className="rounded-xl border border-white/[0.05] bg-[#0D1320]/60 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground">Last-Progression</span>
            <span className="text-[10px] text-muted-foreground">Top-Gewicht pro Einheit</span>
          </div>
          <div className="h-[140px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 6, right: 12, bottom: 0, left: 8 }}>
                <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={40} domain={['dataMin - 5', 'dataMax + 5']} tickFormatter={(v) => `${v}`} />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#00D4FF', strokeOpacity: 0.2 }} />
                <Area
                  type="monotone" dataKey="top" stroke="#00D4FF" strokeWidth={2}
                  fill={`url(#${gradId})`} dot={{ r: 2.5, fill: '#00D4FF' }} activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Per-session breakdown (newest first) */}
      <div className="space-y-2">
        {[...group.sessions].reverse().map((s) => {
          const log = s.log
          const isPr = s.topWeight === group.pr
          const pWeight = parseWeight(log.prescribed_weight)
          const range = parseReps(log.prescribed_reps)
          const setsDone = log.actual_sets.filter((x) => x.completed).length
          return (
            <div key={log.id} className="rounded-xl border border-white/[0.05] bg-[#1A2332]/40 overflow-hidden">
              <div className="px-3 py-2 flex items-center gap-2 border-b border-white/[0.04]">
                <Dumbbell className="w-3.5 h-3.5 text-[#00D4FF]/70 flex-shrink-0" />
                <span className="text-xs font-semibold text-foreground">{fmtFull(log.date)}</span>
                {isPr && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FFD700]/15 text-[#FFD700] text-[9px] font-bold">
                    <Trophy className="w-2.5 h-2.5" /> PR
                  </span>
                )}
                <span className="ml-auto text-[10px] text-muted-foreground">
                  {s.volume.toLocaleString('de-DE')} kg Vol.
                </span>
              </div>

              {/* Vorgabe (Coach) vs. Ausgeführt (Kunde) */}
              <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
                <div className="bg-[#0D1320]/50 px-3 py-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <ClipboardList className="w-3 h-3 text-[#FFD700]" />
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">Vorgabe · Coach</span>
                  </div>
                  <p className="text-sm font-bold text-foreground leading-none">
                    {log.prescribed_weight ?? '—'} <span className="text-muted-foreground font-medium">× {log.prescribed_reps}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">{log.prescribed_sets} Sätze geplant</p>
                </div>
                <div className="bg-[#0D1320]/50 px-3 py-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3 h-3 text-[#00FF94]" />
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">Ausgeführt · Kunde</span>
                  </div>
                  <p className="text-sm font-bold text-[#00D4FF] leading-none">
                    {s.topWeight} kg <span className="font-medium">× {s.topReps}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">{setsDone}/{log.prescribed_sets} Sätze · {s.totalReps} Wdh. gesamt</p>
                </div>
              </div>

              {/* Set-by-set: Ist vs. Ziel */}
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[9px] uppercase tracking-wider text-muted-foreground/60 border-t border-white/[0.04]">
                    <th className="text-left font-medium px-3 py-1.5 w-10">Satz</th>
                    <th className="text-left font-medium px-2 py-1.5">Gewicht</th>
                    <th className="text-left font-medium px-2 py-1.5">Wdh.</th>
                    <th className="text-left font-medium px-2 py-1.5">Volumen</th>
                    <th className="text-right font-medium px-3 py-1.5">Ziel</th>
                  </tr>
                </thead>
                <tbody>
                  {log.actual_sets.map((set) => {
                    const isTop = set.weight === s.topWeight
                    const weightOk = pWeight == null || set.weight >= pWeight
                    const repsOk = range.min === 0 || set.reps >= range.min
                    const hit = weightOk && repsOk
                    return (
                      <tr key={set.set_number} className="border-t border-white/[0.03]">
                        <td className="px-3 py-1.5 text-muted-foreground">#{set.set_number}</td>
                        <td className="px-2 py-1.5">
                          <span className={cn('font-semibold', isTop ? 'text-[#00D4FF]' : 'text-foreground/90')}>{set.weight} kg</span>
                        </td>
                        <td className="px-2 py-1.5">
                          <span className={cn(repsOk ? 'text-foreground/80' : 'text-[#FFD700]')}>{set.reps}</span>
                        </td>
                        <td className="px-2 py-1.5 text-muted-foreground tabular-nums">{(set.weight * set.reps).toLocaleString('de-DE')} kg</td>
                        <td className="px-3 py-1.5 text-right">
                          {hit ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#00FF94]">
                              <CheckCircle2 className="w-3 h-3" /> erreicht
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#FFD700]" title={`Vorgabe: ${log.prescribed_weight ?? 'Wdh.'} × ${log.prescribed_reps}`}>
                              <ArrowDown className="w-3 h-3" /> {!weightOk && pWeight != null ? `${pWeight} kg` : `${range.min} Wdh.`}
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {log.notes && (
                <p className="px-3 py-2 border-t border-white/[0.04] text-[11px] text-muted-foreground italic">„{log.notes}"</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function CoachWorkoutLog({ customerId }: CoachWorkoutLogProps) {
  const groups = useMemo<ExerciseGroup[]>(() => {
    const logs = getWorkoutLogs(customerId)
    const byName = logs.reduce((acc, log) => {
      ;(acc[log.exercise_name] ??= []).push(log)
      return acc
    }, {} as Record<string, WorkoutLog[]>)

    return Object.entries(byName).map(([name, exLogs]) => {
      const sessions = [...exLogs]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(buildSession)
      const latest = sessions[sessions.length - 1]
      const prSession = sessions.reduce((best, s) => (s.topWeight > best.topWeight ? s : best), sessions[0])
      const startTop = sessions[0].topWeight
      const gainPct = startTop > 0 ? Math.round(((latest.topWeight - startTop) / startTop) * 100) : 0
      const prescribed = latest.log.prescribed_weight
      const prescribedNum = prescribed ? parseFloat(prescribed) : 0
      const hitTarget = prescribedNum > 0 && latest.topWeight >= prescribedNum
      return {
        name, sessions, latest,
        pr: prSession.topWeight, prReps: prSession.topReps,
        startTop, gainPct, prescribed, hitTarget,
      }
    })
  }, [customerId])

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())

  if (groups.length === 0) return null

  const toggle = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <GlassCard className="overflow-hidden" hover={false}>
      <div className="p-4 border-b border-white/[0.04]">
        <h3 className="text-sm font-heading font-semibold text-foreground">Kunden-Tracking — Übungshistorie</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Übung antippen für Verlauf, Sätze &amp; Bestleistungen</p>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {groups.map((g) => {
          const isOpen = expanded.has(g.name)
          return (
            <div key={g.name}>
              {/* Exercise summary row — clickable */}
              <button
                onClick={() => toggle(g.name)}
                aria-expanded={isOpen}
                className={cn(
                  'w-full px-4 py-3 flex items-center gap-4 text-left transition-colors',
                  isOpen ? 'bg-[#00D4FF]/[0.04]' : 'hover:bg-white/[0.015]'
                )}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{g.name}</p>
                  <p className="text-xs text-muted-foreground">{g.sessions.length} Einträge · Letzter: {fmtDate(g.latest.log.date)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-[#00D4FF]">{g.latest.topWeight} kg × {g.latest.topReps}</p>
                  <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded', g.hitTarget ? 'bg-[#00FF94]/15 text-[#00FF94]' : 'bg-[#FFD700]/15 text-[#FFD700]')}>
                    {g.prescribed ? (g.hitTarget ? 'Ziel erreicht' : `Vorgabe: ${g.prescribed}`) : 'Kein Ziel'}
                  </span>
                </div>
                <ChevronDown className={cn('w-4 h-4 text-muted-foreground/50 flex-shrink-0 transition-transform duration-300', isOpen && 'rotate-180')} />
              </button>

              {/* Expanded detail */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <ExerciseDetail group={g} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
