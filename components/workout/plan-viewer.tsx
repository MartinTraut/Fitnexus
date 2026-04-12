'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import type { WorkoutPlan, WorkoutLog } from '@/types'
import { GlassCard } from '@/components/glass-card'
import { cn } from '@/lib/utils'
import { addWorkoutLog, getExerciseHistory } from '@/lib/store'
import {
  ChevronDown, ChevronRight, Check, Dumbbell,
  Clock, Hash, Weight, StickyNote, Play,
  Save, TrendingUp, BarChart3,
} from 'lucide-react'

const DAY_LABELS: Record<number, string> = {
  1: 'Montag',
  2: 'Dienstag',
  3: 'Mittwoch',
  4: 'Donnerstag',
  5: 'Freitag',
  6: 'Samstag',
  7: 'Sonntag',
}

interface PlanViewerProps {
  plan: WorkoutPlan
  editable?: boolean
  onUpdate?: (plan: WorkoutPlan) => void
}

interface SetLog {
  reps: string
  weight: string
}

function ExerciseMiniChart({ logs }: { logs: WorkoutLog[] }) {
  if (logs.length < 2) return null
  const last = logs.slice(-8)
  const maxWeights = last.map(l => {
    const weights = l.actual_sets.filter(s => s.completed).map(s => s.weight)
    return weights.length > 0 ? Math.max(...weights) : 0
  }).filter(w => w > 0)
  if (maxWeights.length < 2) return null

  const min = Math.min(...maxWeights) * 0.9
  const max = Math.max(...maxWeights) * 1.1
  const range = max - min || 1
  const w = 120
  const h = 40
  const points = maxWeights.map((v, i) => ({
    x: (i / (maxWeights.length - 1)) * w,
    y: h - ((v - min) / range) * h,
  }))
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`
  const latest = maxWeights[maxWeights.length - 1]
  const first = maxWeights[0]
  const diff = latest - first
  const diffStr = diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)

  return (
    <div className="flex items-center gap-2">
      <svg viewBox={`-2 -2 ${w + 4} ${h + 4}`} className="w-[120px] h-[40px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`exFill${latest}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={diff >= 0 ? '#00FF94' : '#FF6B6B'} stopOpacity="0.15" />
            <stop offset="100%" stopColor={diff >= 0 ? '#00FF94' : '#FF6B6B'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#exFill${latest})`} />
        <path d={line} fill="none" stroke={diff >= 0 ? '#00FF94' : '#FF6B6B'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="2.5" fill={diff >= 0 ? '#00FF94' : '#FF6B6B'} />
      </svg>
      <span className={cn('text-[10px] font-bold', diff >= 0 ? 'text-[#00FF94]' : 'text-red-400')}>
        {diffStr} kg
      </span>
    </div>
  )
}

function ExerciseProgressChart({ logs, exerciseName, prescribedWeight, prescribedReps, prescribedSets }: {
  logs: WorkoutLog[]
  exerciseName: string
  prescribedWeight: string | null
  prescribedReps: string
  prescribedSets: number
}) {
  const [visible, setVisible] = useState<Record<string, boolean>>({
    weight: true,
    reps: true,
    sets: false,
    volume: false,
    goalWeight: true,
    goalReps: true,
  })

  if (logs.length === 0) {
    return (
      <p className="text-xs text-muted-foreground/50 py-4 text-center">
        Noch keine gespeicherten Einträge. Tracke deine Sätze und speichere sie.
      </p>
    )
  }

  const toggle = (key: string) => setVisible(prev => ({ ...prev, [key]: !prev[key] }))

  const last = logs.slice(-12)
  const dataPoints = last.map(l => {
    const completedSets = l.actual_sets.filter(s => s.completed)
    const maxW = completedSets.length > 0 ? Math.max(...completedSets.map(s => s.weight)) : 0
    const maxR = completedSets.length > 0 ? Math.max(...completedSets.map(s => s.reps)) : 0
    const totalVol = completedSets.reduce((sum, s) => sum + s.weight * s.reps, 0)
    const date = new Date(l.date)
    return {
      dateStr: `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`,
      weight: maxW,
      reps: maxR,
      volume: totalVol,
      sets: completedSets.length,
    }
  })

  const goalW = prescribedWeight ? parseFloat(prescribedWeight) : null
  const goalR = prescribedReps ? parseInt(prescribedReps) : null

  // Chart dimensions
  const padL = 44
  const padR = 16
  const padT = 24
  const padB = 32
  const chartW = 580
  const chartH = 240
  const innerW = chartW - padL - padR
  const innerH = chartH - padT - padB

  // Metrics config
  type MetricKey = 'weight' | 'reps' | 'sets' | 'volume'
  const metrics: { key: MetricKey; label: string; unit: string; color: string; values: number[]; goalValue: number | null; goalKey: string }[] = [
    { key: 'weight', label: 'Gewicht', unit: 'kg', color: '#00FF94', values: dataPoints.map(d => d.weight), goalValue: goalW, goalKey: 'goalWeight' },
    { key: 'reps', label: 'Wdh.', unit: '', color: '#00D4FF', values: dataPoints.map(d => d.reps), goalValue: goalR, goalKey: 'goalReps' },
    { key: 'sets', label: 'Sätze', unit: '', color: '#FFD700', values: dataPoints.map(d => d.sets), goalValue: prescribedSets, goalKey: '' },
    { key: 'volume', label: 'Volumen', unit: 'kg', color: '#FF6BFF', values: dataPoints.map(d => d.volume), goalValue: null, goalKey: '' },
  ]

  const activeMetrics = metrics.filter(m => visible[m.key])

  // Calculate unified scale: normalize all active metrics to 0-1
  function getScale(values: number[], goalValue: number | null) {
    const all = [...values, ...(goalValue ? [goalValue] : [])]
    const min = Math.min(...all) * 0.85
    const max = Math.max(...all) * 1.1
    return { min, max, range: max - min || 1 }
  }

  function getPoints(values: number[], scale: { min: number; max: number; range: number }) {
    return dataPoints.map((_, i) => ({
      x: padL + (dataPoints.length > 1 ? (i / (dataPoints.length - 1)) * innerW : innerW / 2),
      y: padT + innerH - ((values[i] - scale.min) / scale.range) * innerH,
    }))
  }

  function makeLine(points: { x: number; y: number }[]) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  }

  // Stats summary
  const weightValues = dataPoints.map(d => d.weight)
  const wDiff = weightValues[weightValues.length - 1] - weightValues[0]

  // Toggle buttons
  const toggles: { key: string; label: string; color: string; dot?: boolean }[] = [
    { key: 'weight', label: 'Gewicht', color: '#00FF94' },
    { key: 'reps', label: 'Wiederholungen', color: '#00D4FF' },
    { key: 'sets', label: 'Sätze', color: '#FFD700' },
    { key: 'volume', label: 'Volumen', color: '#FF6BFF' },
    ...(goalW ? [{ key: 'goalWeight', label: `Vorgabe ${goalW}kg`, color: '#FFD700', dot: true }] : []),
    ...(goalR ? [{ key: 'goalReps', label: `Vorgabe ${goalR} Wdh`, color: '#FF8C00', dot: true }] : []),
  ]

  return (
    <div className="space-y-3">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Gewicht', value: `${Math.max(...weightValues)} kg`, sub: `Trend: ${wDiff > 0 ? '+' : ''}${wDiff.toFixed(1)} kg`, color: '#00FF94' },
          { label: 'Wdh.', value: `${Math.max(...dataPoints.map(d => d.reps))}`, sub: `Vorgabe: ${prescribedReps}`, color: '#00D4FF' },
          { label: 'Sätze', value: `${Math.max(...dataPoints.map(d => d.sets))}`, sub: `Vorgabe: ${prescribedSets}`, color: '#FFD700' },
          { label: 'Sessions', value: `${dataPoints.length}`, sub: 'getrackt', color: '#FF6BFF' },
        ].map(stat => (
          <div key={stat.label} className="p-2.5 rounded-xl bg-[#1A2332]/40 border border-white/[0.03]">
            <p className="text-base font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            <p className="text-[9px] text-muted-foreground/50 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Toggle buttons */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {toggles.map(t => (
          <button
            key={t.key}
            onClick={() => toggle(t.key)}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all border',
              visible[t.key]
                ? 'border-white/10 bg-white/[0.04]'
                : 'border-transparent bg-transparent text-muted-foreground/30 hover:text-muted-foreground/50'
            )}
          >
            {t.dot ? (
              <span className="w-3 h-[2px] rounded-full" style={{
                backgroundColor: visible[t.key] ? t.color : 'rgba(255,255,255,0.15)',
                ...(t.dot ? { backgroundImage: `repeating-linear-gradient(90deg, ${t.color}, ${t.color} 3px, transparent 3px, transparent 6px)` } : {}),
              }} />
            ) : (
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: visible[t.key] ? t.color : 'rgba(255,255,255,0.15)' }} />
            )}
            <span style={{ color: visible[t.key] ? t.color : undefined }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Combined SVG Chart */}
      <div className="rounded-xl bg-[#0B0F1A]/60 border border-white/[0.04] p-3">
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {Array.from({ length: 5 }, (_, i) => {
            const y = padT + (innerH / 4) * i
            return (
              <line key={i} x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            )
          })}

          {/* Date labels */}
          {dataPoints.map((d, i) => {
            const x = padL + (dataPoints.length > 1 ? (i / (dataPoints.length - 1)) * innerW : innerW / 2)
            if (dataPoints.length > 8 && i % 2 !== 0 && i !== dataPoints.length - 1) return null
            return (
              <text key={i} x={x} y={chartH - 6} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8">
                {d.dateStr}
              </text>
            )
          })}

          {/* Goal lines */}
          {visible.goalWeight && goalW && (() => {
            const scale = getScale(dataPoints.map(d => d.weight), goalW)
            const y = padT + innerH - ((goalW - scale.min) / scale.range) * innerH
            return (
              <g>
                <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#FFD700" strokeWidth="1" strokeDasharray="6 3" opacity="0.35" />
                <text x={chartW - padR + 2} y={y + 3} fill="#FFD700" fontSize="7" opacity="0.5">{goalW}kg</text>
              </g>
            )
          })()}

          {visible.goalReps && goalR && (() => {
            const scale = getScale(dataPoints.map(d => d.reps), goalR)
            const y = padT + innerH - ((goalR - scale.min) / scale.range) * innerH
            return (
              <g>
                <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#FF8C00" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                <text x={chartW - padR + 2} y={y + 3} fill="#FF8C00" fontSize="7" opacity="0.5">{goalR}wdh</text>
              </g>
            )
          })()}

          {/* Metric lines */}
          {activeMetrics.map(metric => {
            const scale = getScale(metric.values, metric.goalValue)
            const points = getPoints(metric.values, scale)
            const line = makeLine(points)
            const area = `${line} L${points[points.length - 1].x.toFixed(1)},${padT + innerH} L${points[0].x.toFixed(1)},${padT + innerH} Z`
            const uid = `area_${metric.key}`
            return (
              <g key={metric.key}>
                <defs>
                  <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={metric.color} stopOpacity="0.12" />
                    <stop offset="100%" stopColor={metric.color} stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                <path d={area} fill={`url(#${uid})`} />
                <path d={line} fill="none" stroke={metric.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                {points.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="3.5" fill="#0B0F1A" stroke={metric.color} strokeWidth="1.5" />
                    <text x={p.x} y={p.y - 8} textAnchor="middle" fill={metric.color} fontSize="7" fontWeight="600" opacity="0.8">
                      {metric.values[i]}{metric.unit ? ` ${metric.unit}` : ''}
                    </text>
                  </g>
                ))}
              </g>
            )
          })}

          {/* Y-axis labels for first active metric */}
          {activeMetrics.length > 0 && (() => {
            const m = activeMetrics[0]
            const scale = getScale(m.values, m.goalValue)
            return Array.from({ length: 5 }, (_, i) => {
              const val = scale.min + (scale.range / 4) * i
              const y = padT + innerH - ((val - scale.min) / scale.range) * innerH
              return (
                <text key={i} x={padL - 6} y={y + 3} textAnchor="end" fill={m.color} fontSize="8" opacity="0.4">
                  {Math.round(val)}
                </text>
              )
            })
          })()}
        </svg>
      </div>

      {/* Session log table */}
      <div className="rounded-xl bg-[#0B0F1A]/40 border border-white/[0.03] overflow-hidden">
        <div className="grid grid-cols-5 gap-2 px-3 py-2 bg-[#0B0F1A]/60 border-b border-white/[0.04]">
          <span className="text-[10px] font-medium text-muted-foreground/50">Datum</span>
          <span className="text-[10px] font-medium text-muted-foreground/50">Sätze</span>
          <span className="text-[10px] font-medium text-muted-foreground/50">Wdh.</span>
          <span className="text-[10px] font-medium text-muted-foreground/50">Gewicht</span>
          <span className="text-[10px] font-medium text-muted-foreground/50 text-right">Status</span>
        </div>
        {dataPoints.map((d, i) => {
          const meetsWeight = goalW ? d.weight >= goalW : true
          const meetsReps = goalR ? d.reps >= goalR : true
          const meetsAll = meetsWeight && meetsReps
          return (
            <div key={i} className="grid grid-cols-5 gap-2 px-3 py-1.5 border-b border-white/[0.02] last:border-0">
              <span className="text-[11px] text-muted-foreground/60">{d.dateStr}</span>
              <span className="text-[11px] text-foreground">{d.sets}</span>
              <span className="text-[11px] text-[#00D4FF]">{d.reps}</span>
              <span className="text-[11px] text-[#00FF94] font-medium">{d.weight} kg</span>
              <span className={cn(
                'text-[10px] font-medium text-right',
                meetsAll ? 'text-[#00FF94]' : 'text-[#FFD700]'
              )}>
                {meetsAll ? 'Ziel erreicht' : 'Unter Vorgabe'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function PlanViewer({ plan, editable = false, onUpdate }: PlanViewerProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [actualWeights, setActualWeights] = useState<Record<string, string>>({})
  const [setLogs, setSetLogs] = useState<Record<string, SetLog[]>>({})
  const [expandedTracking, setExpandedTracking] = useState<string | null>(null)
  const [expandedChart, setExpandedChart] = useState<string | null>(null)
  const [collapsedDays, setCollapsedDays] = useState<Set<number>>(new Set())
  const [savedExercises, setSavedExercises] = useState<Set<string>>(new Set())
  const [exerciseHistoryCache, setExerciseHistoryCache] = useState<Record<string, WorkoutLog[]>>({})

  const customerId = plan.customer_id

  const loadHistory = useCallback((exerciseName: string) => {
    const history = getExerciseHistory(customerId, exerciseName)
    setExerciseHistoryCache(prev => ({ ...prev, [exerciseName]: history }))
    return history
  }, [customerId])

  // Pre-load history for all exercises on mount
  useEffect(() => {
    if (editable) {
      const names = new Set(plan.exercises.map(ex => ex.name))
      names.forEach(name => loadHistory(name))
    }
  }, [editable, plan.exercises, loadHistory])

  function saveExerciseLog(exerciseId: string, exerciseName: string, sets: number, reps: string, weight: string | null) {
    const logs = setLogs[exerciseId] ?? []
    const actualSets = logs.map((log, i) => ({
      set_number: i + 1,
      reps: parseInt(log.reps) || 0,
      weight: parseFloat(log.weight) || 0,
      completed: !!(log.reps || log.weight),
    })).filter(s => s.completed)

    if (actualSets.length === 0) return

    addWorkoutLog({
      customer_id: customerId,
      plan_id: plan.id,
      exercise_id: exerciseId,
      exercise_name: exerciseName,
      date: new Date().toISOString(),
      prescribed_sets: sets,
      prescribed_reps: reps,
      prescribed_weight: weight,
      actual_sets: actualSets,
      notes: null,
    })

    setSavedExercises(prev => new Set(prev).add(exerciseId))
    loadHistory(exerciseName)
    setTimeout(() => setSavedExercises(prev => { const n = new Set(prev); n.delete(exerciseId); return n }), 2500)
  }

  const exercisesByDay = useMemo(() => {
    const grouped: Record<number, typeof plan.exercises> = {}
    for (const ex of plan.exercises) {
      if (!grouped[ex.day]) grouped[ex.day] = []
      grouped[ex.day].push(ex)
    }
    // Sort exercises within each day
    for (const day in grouped) {
      grouped[day].sort((a, b) => a.order - b.order)
    }
    return grouped
  }, [plan.exercises])

  const days = useMemo(() => Object.keys(exercisesByDay).map(Number).sort(), [exercisesByDay])

  function toggleDay(day: number) {
    setCollapsedDays((prev) => {
      const next = new Set(prev)
      next.has(day) ? next.delete(day) : next.add(day)
      return next
    })
  }

  function toggleExercise(id: string) {
    setCompletedExercises((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function setWeight(id: string, value: string) {
    setActualWeights((prev) => ({ ...prev, [id]: value }))
  }

  const totalExercises = plan.exercises.length
  const completedCount = completedExercises.size
  const progressPercent = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0

  return (
    <div className="space-y-4">
      {/* Plan Header */}
      <GlassCard className="p-5" hover={false}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Dumbbell className="w-5 h-5 text-[#00D4FF]" />
              <h2 className="text-lg font-heading font-bold text-foreground">{plan.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">Woche {plan.week_number}</p>
          </div>
          {editable && (
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-heading font-bold text-[#00FF94]">{progressPercent}%</p>
              <p className="text-[11px] text-muted-foreground">{completedCount}/{totalExercises} erledigt</p>
            </div>
          )}
        </div>
        {editable && (
          <div className="mt-3 w-full h-2 rounded-full bg-[#1A2332] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00CC76] to-[#00FF94] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
        {plan.notes && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-[#00A8FF]/[0.04] border border-[#00A8FF]/10">
            <StickyNote className="w-4 h-4 text-[#00D4FF] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">{plan.notes}</p>
          </div>
        )}
      </GlassCard>

      {/* Day Sections */}
      {days.map((day) => {
        const exercises = exercisesByDay[day]
        const isCollapsed = collapsedDays.has(day)
        const dayCompleted = exercises.every((ex) => completedExercises.has(ex.id))
        const dayCompletedCount = exercises.filter((ex) => completedExercises.has(ex.id)).length

        return (
          <GlassCard key={day} className="overflow-hidden" hover={false}>
            {/* Day Header */}
            <button
              onClick={() => toggleDay(day)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                {isCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#00D4FF]" />
                )}
                <h3 className="text-base font-heading font-semibold text-foreground">
                  {DAY_LABELS[day] || `Tag ${day}`}
                </h3>
                <span className="text-xs text-muted-foreground">{exercises.length} Übungen</span>
              </div>
              {editable && (
                <span className={cn(
                  'text-xs font-medium px-2 py-1 rounded-lg',
                  dayCompleted
                    ? 'bg-[#00FF94]/15 text-[#00FF94]'
                    : 'bg-[#1A2332] text-muted-foreground'
                )}>
                  {dayCompletedCount}/{exercises.length}
                </span>
              )}
            </button>

            {/* Exercises */}
            {!isCollapsed && (
              <div className="border-t border-white/[0.04]">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-[2.5fr_0.6fr_0.8fr_0.8fr_0.6fr_1fr] gap-3 px-4 py-2.5 bg-[#0B0F1A]/50 border-b border-white/[0.04]">
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Übung</span>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Sätze × Wdh</span>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Gewicht</span>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Pause</span>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Video</span>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider text-right">{editable ? 'Tracking' : 'Notizen'}</span>
                </div>

                {exercises.map((ex, idx) => {
                  const isDone = completedExercises.has(ex.id)
                  const hasHistory = (exerciseHistoryCache[ex.name]?.length ?? 0) >= 2
                  const isTracking = expandedTracking === ex.id
                  return (
                    <div
                      key={ex.id}
                      className={cn(
                        'group transition-colors',
                        idx < exercises.length - 1 && 'border-b border-white/[0.04]',
                        isDone && 'bg-[#00FF94]/[0.03]'
                      )}
                    >
                      {/* Desktop Row */}
                      <div className="hidden md:grid grid-cols-[2.5fr_0.6fr_0.8fr_0.8fr_0.6fr_1fr] gap-3 px-4 py-3 items-center">
                        <div className="flex items-center gap-3">
                          {editable && (
                            <button
                              onClick={() => toggleExercise(ex.id)}
                              className={cn(
                                'w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all duration-200',
                                isDone
                                  ? 'bg-[#00FF94] border-[#00FF94] text-[#0B0F1A]'
                                  : 'border-[#1A2332] hover:border-[#00D4FF]/50'
                              )}
                            >
                              {isDone && <Check className="w-3.5 h-3.5" />}
                            </button>
                          )}
                          <div className="min-w-0">
                            <span className={cn(
                              'text-sm font-medium transition-all block',
                              isDone ? 'text-muted-foreground line-through' : 'text-foreground'
                            )}>
                              {ex.name}
                            </span>
                            {ex.notes && (
                              <span className="text-[10px] text-muted-foreground/50 block truncate">{ex.notes}</span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{ex.sets} × {ex.reps}</span>
                        <span className="text-sm text-foreground font-medium">{ex.weight || '–'}</span>
                        <span className="text-sm text-muted-foreground">{ex.rest_seconds}s</span>
                        <div>
                          {ex.video_url ? (
                            <a
                              href={ex.video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#00A8FF]/[0.06] text-[11px] font-medium text-[#00D4FF] hover:bg-[#00A8FF]/12 transition-all"
                            >
                              <Play className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-xs text-muted-foreground/20">–</span>
                          )}
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          {editable ? (
                            <button
                              onClick={() => {
                                loadHistory(ex.name)
                                setExpandedTracking(isTracking ? null : ex.id)
                              }}
                              className={cn(
                                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all',
                                isTracking
                                  ? 'bg-[#00FF94]/15 text-[#00FF94] border border-[#00FF94]/30'
                                  : 'bg-[#1A2332]/60 text-muted-foreground hover:text-[#00FF94] hover:bg-[#00FF94]/[0.06] border border-white/[0.04]'
                              )}
                            >
                              <BarChart3 className="w-3 h-3" />
                              {isTracking ? 'Schließen' : 'Tracken'}
                            </button>
                          ) : (
                            <span className="text-xs text-muted-foreground/50 truncate">{ex.notes || '–'}</span>
                          )}
                        </div>
                      </div>

                      {/* Mobile Card */}
                      <div className="md:hidden p-4 space-y-2">
                        <div className="flex items-center gap-3">
                          {editable && (
                            <button
                              onClick={() => toggleExercise(ex.id)}
                              className={cn(
                                'w-6 h-6 rounded-lg border flex-shrink-0 flex items-center justify-center transition-all duration-200',
                                isDone
                                  ? 'bg-[#00FF94] border-[#00FF94] text-[#0B0F1A]'
                                  : 'border-[#1A2332] hover:border-[#00D4FF]/50'
                              )}
                            >
                              {isDone && <Check className="w-4 h-4" />}
                            </button>
                          )}
                          <span className={cn(
                            'text-sm font-semibold flex-1',
                            isDone ? 'text-muted-foreground line-through' : 'text-foreground'
                          )}>
                            {ex.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 ml-9 text-xs text-muted-foreground">
                          <span>{ex.sets} × {ex.reps}</span>
                          {ex.weight && <span className="text-foreground font-medium">{ex.weight}</span>}
                          <span>{ex.rest_seconds}s Pause</span>
                        </div>
                        <div className="ml-9 mt-1 flex items-center gap-2 flex-wrap">
                          {ex.video_url && (
                            <a
                              href={ex.video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00A8FF]/[0.06] text-xs font-medium text-[#00D4FF] hover:bg-[#00A8FF]/12 transition-all"
                            >
                              <Play className="w-3 h-3" /> Video
                            </a>
                          )}
                          {editable && (
                            <button
                              onClick={() => {
                                loadHistory(ex.name)
                                setExpandedTracking(isTracking ? null : ex.id)
                              }}
                              className={cn(
                                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                                isTracking
                                  ? 'bg-[#00FF94]/15 text-[#00FF94]'
                                  : 'bg-[#1A2332]/60 text-muted-foreground hover:text-[#00FF94]'
                              )}
                            >
                              <BarChart3 className="w-3 h-3" /> Tracken
                            </button>
                          )}
                        </div>
                        {ex.notes && (
                          <p className="text-xs text-muted-foreground/50 ml-9 mt-1">{ex.notes}</p>
                        )}
                      </div>

                      {/* ═══ EXPANDED: SET TRACKING + CHART ═══ */}
                      {editable && expandedTracking === ex.id && (
                        <div className="px-4 pb-4 md:px-4 space-y-3">
                          {/* Satz-Tracking Eingabe */}
                          <div className="ml-0 md:ml-8 p-4 rounded-xl bg-[#00FF94]/[0.02] border border-[#00FF94]/10">
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-xs font-medium text-[#00FF94]">
                                Heutiges Training — {ex.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                Vorgabe: {ex.sets} × {ex.reps} @ {ex.weight ?? '–'}
                              </p>
                            </div>
                            <div className="space-y-2">
                              {Array.from({ length: ex.sets }).map((_, setIdx) => {
                                const logs = setLogs[ex.id] ?? []
                                const log = logs[setIdx] ?? { reps: '', weight: '' }
                                return (
                                  <div key={setIdx} className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground w-14 flex-shrink-0">
                                      Satz {setIdx + 1}
                                    </span>
                                    <div className="flex items-center gap-2 flex-1">
                                      <input
                                        type="text"
                                        value={log.reps}
                                        onChange={(e) => {
                                          const newLogs = [...(setLogs[ex.id] ?? Array.from({ length: ex.sets }, () => ({ reps: '', weight: '' })))]
                                          newLogs[setIdx] = { ...newLogs[setIdx], reps: e.target.value }
                                          setSetLogs(prev => ({ ...prev, [ex.id]: newLogs }))
                                        }}
                                        placeholder={ex.reps}
                                        className="w-20 bg-[#1A2332]/60 border border-white/[0.06] rounded-lg px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-[#00FF94]/40"
                                      />
                                      <span className="text-[10px] text-muted-foreground">Wdh.</span>
                                      <input
                                        type="text"
                                        value={log.weight}
                                        onChange={(e) => {
                                          const newLogs = [...(setLogs[ex.id] ?? Array.from({ length: ex.sets }, () => ({ reps: '', weight: '' })))]
                                          newLogs[setIdx] = { ...newLogs[setIdx], weight: e.target.value }
                                          setSetLogs(prev => ({ ...prev, [ex.id]: newLogs }))
                                        }}
                                        placeholder={ex.weight ?? '–'}
                                        className="w-20 bg-[#1A2332]/60 border border-white/[0.06] rounded-lg px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-[#00FF94]/40"
                                      />
                                      <span className="text-[10px] text-muted-foreground">kg</span>
                                    </div>
                                    {log.reps && (
                                      <span className={cn(
                                        'text-[10px] font-medium px-1.5 py-0.5 rounded',
                                        parseInt(log.reps) >= parseInt(ex.reps)
                                          ? 'bg-[#00FF94]/15 text-[#00FF94]'
                                          : 'bg-[#FFD700]/15 text-[#FFD700]'
                                      )}>
                                        {parseInt(log.reps) >= parseInt(ex.reps) ? 'Erreicht' : 'Unter Vorgabe'}
                                      </span>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            <div className="flex items-center justify-end mt-3 pt-3 border-t border-[#00FF94]/10">
                              <button
                                onClick={() => saveExerciseLog(ex.id, ex.name, ex.sets, ex.reps, ex.weight)}
                                disabled={savedExercises.has(ex.id)}
                                className={cn(
                                  'flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all',
                                  savedExercises.has(ex.id)
                                    ? 'bg-[#00FF94]/15 text-[#00FF94]'
                                    : 'bg-[#00FF94] text-[#0B0F1A] hover:bg-[#00FF94]/90'
                                )}
                              >
                                {savedExercises.has(ex.id) ? (
                                  <><Check className="w-3.5 h-3.5" /> Gespeichert</>
                                ) : (
                                  <><Save className="w-3.5 h-3.5" /> Training speichern</>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Exercise History Chart — always visible when history exists */}
                          <div className="ml-0 md:ml-8 p-4 rounded-xl bg-[#0D1320]/60 border border-[rgba(0,168,255,0.08)]">
                            <div className="flex items-center gap-2 mb-4">
                              <TrendingUp className="w-4 h-4 text-[#00D4FF]" />
                              <p className="text-sm font-semibold text-foreground">Trainingsverlauf — {ex.name}</p>
                            </div>
                            <ExerciseProgressChart
                              logs={exerciseHistoryCache[ex.name] ?? []}
                              exerciseName={ex.name}
                              prescribedWeight={ex.weight}
                              prescribedReps={ex.reps}
                              prescribedSets={ex.sets}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </GlassCard>
        )
      })}

      {days.length === 0 && (
        <GlassCard className="p-8 text-center" hover={false}>
          <Dumbbell className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Noch keine Übungen im Trainingsplan.</p>
        </GlassCard>
      )}
    </div>
  )
}
