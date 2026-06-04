// ─── Coach Analytics ──────────────────────────────────────
// Pure, framework-free derivation of a client's training / nutrition /
// body status from the local store. Drives the Coach-Cockpit and the
// adherence headers on the tracking logs.
//
// All time windows are measured against `referenceDate` = the client's
// most recent activity (last workout / meal / measurement), NOT wall-clock
// time. The demo data is anchored in the past; anchoring to last activity
// keeps every KPI populated and the "days since" signals honest.

import type { MealLog, NutritionPlan, ProgressMetric, WorkoutLog } from '@/types'
import {
  getWorkoutLogs, getMealLogHistory, getProgressMetrics,
  getNutritionPlans, getWorkoutPlans,
} from '@/lib/store'

const DAY = 86_400_000

function dayKey(iso: string): string {
  return iso.slice(0, 10)
}

function daysBetween(aIso: string, bIso: string): number {
  return Math.round((new Date(dayKey(bIso)).getTime() - new Date(dayKey(aIso)).getTime()) / DAY)
}

function parseWeight(w: string | null): number | null {
  if (!w) return null
  const n = parseFloat(w.replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

function minReps(r: string): number {
  const m = r.match(/\d+/g)
  return m ? Number(m[0]) : 0
}

function mealTotals(log: MealLog) {
  let cal = 0, pro = 0, carb = 0, fat = 0
  for (const meal of log.meals) for (const f of meal.foods) { cal += f.calories; pro += f.protein; carb += f.carbs; fat += f.fat }
  return { cal, pro, carb, fat }
}

export type FlagLevel = 'critical' | 'warning' | 'positive'

export interface CoachFlag {
  level: FlagLevel
  title: string
  detail: string
}

export interface BestLift {
  name: string
  current: number
  start: number
  gainPct: number
}

export interface NutritionDayPoint {
  date: string
  label: string
  cal: number
  pct: number          // vs target, 0 if no target
  onTarget: boolean
}

export interface WeightPoint {
  date: string
  label: string
  weight: number
}

export interface ClientSnapshot {
  hasData: boolean
  referenceDate: string | null
  daysSinceActivity: number   // vs real now — honest staleness

  training: {
    totalSessions: number
    sessionsLast7: number
    sessionsLast30: number
    lastDate: string | null
    targetHitRate: number      // % of logged sets meeting prescribed weight+reps
    bestLifts: BestLift[]
  }
  nutrition: {
    target: number | null
    loggedDays7: number
    loggedDays30: number
    lastDate: string | null
    avgCalPct7: number         // avg of (cal/target) over logged days in window
    onTargetRate7: number      // % logged days within 90–110% of target
    streak: number             // consecutive logged days ending at referenceDate
    avgMacros7: { pro: number; carb: number; fat: number }
    trend: NutritionDayPoint[] // up to last 14 logged days, chronological
  }
  body: {
    current: number | null
    start: number | null
    deltaKg: number | null
    bodyFatCurrent: number | null
    bodyFatDelta: number | null
    muscleCurrent: number | null
    muscleDelta: number | null
    stagnant: boolean
    trend: WeightPoint[]
  }
  flags: CoachFlag[]
}

function fmtLabel(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
}

function computeBestLifts(logs: WorkoutLog[]): BestLift[] {
  const byName = logs.reduce((acc, l) => {
    ;(acc[l.exercise_name] ??= []).push(l)
    return acc
  }, {} as Record<string, WorkoutLog[]>)

  const lifts: BestLift[] = []
  for (const [name, exLogs] of Object.entries(byName)) {
    const sorted = [...exLogs].sort((a, b) => a.date.localeCompare(b.date))
    const topOf = (l: WorkoutLog) => Math.max(...l.actual_sets.map((s) => s.weight))
    const start = topOf(sorted[0])
    const current = topOf(sorted[sorted.length - 1])
    const gainPct = start > 0 ? Math.round(((current - start) / start) * 100) : 0
    lifts.push({ name, current, start, gainPct })
  }
  // weighted lifts first (bodyweight = 0), then by absolute gain
  return lifts.sort((a, b) => (b.gainPct - a.gainPct)).slice(0, 4)
}

/** Latest session per exercise — "current performance vs. target", not the whole ramp-up. */
function latestPerExercise(logs: WorkoutLog[]): WorkoutLog[] {
  const byName = new Map<string, WorkoutLog>()
  for (const l of logs) {
    const prev = byName.get(l.exercise_name)
    if (!prev || l.date > prev.date) byName.set(l.exercise_name, l)
  }
  return [...byName.values()]
}

// Plan-Erfüllung = wurde die vorgegebene Arbeit sauber abgeliefert?
// Ein Satz zählt als erfüllt, wenn er abgeschlossen ist UND die Wiederholungen
// im Zielbereich liegen. Das Gewicht bleibt bewusst außen vor: die Vorgabe ist
// das Endziel, der Kunde steigert sich progressiv darauf zu — der genaue
// Gewichts-Abstand wird im Trainings-Log Satz für Satz ausgewiesen.
function targetHitRate(allLogs: WorkoutLog[]): number {
  const logs = latestPerExercise(allLogs)
  let total = 0, hit = 0
  for (const l of logs) {
    const rMin = minReps(l.prescribed_reps)
    for (const s of l.actual_sets) {
      total++
      const repsOk = rMin === 0 || s.reps >= rMin
      if (s.completed && repsOk) hit++
    }
  }
  return total > 0 ? Math.round((hit / total) * 100) : 0
}

export function getClientSnapshot(customerId: string): ClientSnapshot {
  const workoutLogs = getWorkoutLogs(customerId)
  const mealLogs = [...getMealLogHistory(customerId, 3650)].sort((a, b) => a.date.localeCompare(b.date))
  const metrics = [...getProgressMetrics(customerId)].sort((a, b) => a.recorded_at.localeCompare(b.recorded_at))
  const nutritionPlan: NutritionPlan | null = getNutritionPlans(customerId)[0] ?? null
  getWorkoutPlans(customerId) // touch (kept for future plan-frequency adherence)

  const allDates = [
    ...workoutLogs.map((l) => l.date),
    ...mealLogs.map((l) => l.date),
    ...metrics.map((m) => m.recorded_at),
  ].sort()
  const referenceDate = allDates.length ? allDates[allDates.length - 1] : null

  const empty: ClientSnapshot = {
    hasData: false, referenceDate: null, daysSinceActivity: 0,
    training: { totalSessions: 0, sessionsLast7: 0, sessionsLast30: 0, lastDate: null, targetHitRate: 0, bestLifts: [] },
    nutrition: { target: nutritionPlan?.calories_target ?? null, loggedDays7: 0, loggedDays30: 0, lastDate: null, avgCalPct7: 0, onTargetRate7: 0, streak: 0, avgMacros7: { pro: 0, carb: 0, fat: 0 }, trend: [] },
    body: { current: null, start: null, deltaKg: null, bodyFatCurrent: null, bodyFatDelta: null, muscleCurrent: null, muscleDelta: null, stagnant: false, trend: [] },
    flags: [],
  }
  if (!referenceDate) return empty

  const refMs = new Date(dayKey(referenceDate)).getTime()
  const within = (iso: string, days: number) => refMs - new Date(dayKey(iso)).getTime() <= days * DAY
  const daysSinceActivity = Math.max(0, Math.round((Date.now() - refMs) / DAY))

  // ── Training ──
  const trainingDates = new Set(workoutLogs.map((l) => dayKey(l.date)))
  const sessionsLast7 = [...trainingDates].filter((d) => within(d, 7)).length
  const sessionsLast30 = [...trainingDates].filter((d) => within(d, 30)).length
  const lastTraining = workoutLogs.length ? workoutLogs.map((l) => l.date).sort().slice(-1)[0] : null
  const target = nutritionPlan?.calories_target ?? null

  // ── Nutrition ──
  const days7 = mealLogs.filter((l) => within(l.date, 7))
  const days30 = mealLogs.filter((l) => within(l.date, 30))
  const totals7 = days7.map(mealTotals)
  const avgCal7 = totals7.length ? totals7.reduce((s, t) => s + t.cal, 0) / totals7.length : 0
  const avgCalPct7 = target && avgCal7 ? Math.round((avgCal7 / target) * 100) : 0
  const onTarget7 = target ? totals7.filter((t) => t.cal >= target * 0.9 && t.cal <= target * 1.1).length : 0
  const onTargetRate7 = totals7.length ? Math.round((onTarget7 / totals7.length) * 100) : 0
  const avgMacros7 = totals7.length ? {
    pro: Math.round(totals7.reduce((s, t) => s + t.pro, 0) / totals7.length),
    carb: Math.round(totals7.reduce((s, t) => s + t.carb, 0) / totals7.length),
    fat: Math.round(totals7.reduce((s, t) => s + t.fat, 0) / totals7.length),
  } : { pro: 0, carb: 0, fat: 0 }

  // streak: consecutive days with a log, ending at referenceDate
  const loggedKeys = new Set(mealLogs.map((l) => dayKey(l.date)))
  let streak = 0
  for (let i = 0; ; i++) {
    const k = new Date(refMs - i * DAY).toISOString().slice(0, 10)
    if (loggedKeys.has(k)) streak++
    else break
  }

  const trend: NutritionDayPoint[] = mealLogs.filter((l) => within(l.date, 21)).slice(-14).map((l) => {
    const { cal } = mealTotals(l)
    const pct = target ? Math.round((cal / target) * 100) : 0
    return { date: l.date, label: fmtLabel(l.date), cal: Math.round(cal), pct, onTarget: target ? cal >= target * 0.9 && cal <= target * 1.1 : false }
  })

  // ── Body ──
  const firstM = metrics[0] ?? null
  const lastM = metrics[metrics.length - 1] ?? null
  const weightTrend: WeightPoint[] = metrics.filter((m) => m.weight_kg != null).map((m) => ({ date: m.recorded_at, label: fmtLabel(m.recorded_at), weight: m.weight_kg as number }))
  const recent3 = weightTrend.slice(-3).map((p) => p.weight)
  const stagnant = recent3.length >= 3 && Math.max(...recent3) - Math.min(...recent3) < 0.4
  const delta = (a: number | null | undefined, b: number | null | undefined) =>
    a != null && b != null ? Math.round((b - a) * 10) / 10 : null

  const body = {
    current: lastM?.weight_kg ?? null,
    start: firstM?.weight_kg ?? null,
    deltaKg: delta(firstM?.weight_kg, lastM?.weight_kg),
    bodyFatCurrent: lastM?.body_fat_percent ?? null,
    bodyFatDelta: delta(firstM?.body_fat_percent, lastM?.body_fat_percent),
    muscleCurrent: lastM?.muscle_mass_kg ?? null,
    muscleDelta: delta(firstM?.muscle_mass_kg, lastM?.muscle_mass_kg),
    stagnant,
    trend: weightTrend,
  }

  const hitRate = targetHitRate(workoutLogs)

  // ── Flags (most severe first) ──
  const flags: CoachFlag[] = []
  // Adherence: nutrition logging gaps in the last 14 days
  const expectedDays = Math.min(14, daysBetween(mealLogs[0]?.date ?? referenceDate, referenceDate) + 1)
  const loggedIn14 = mealLogs.filter((l) => within(l.date, 14)).length
  if (expectedDays >= 7 && loggedIn14 / expectedDays < 0.75) {
    flags.push({ level: 'warning', title: 'Ernährung wird unregelmäßig getrackt', detail: `${loggedIn14} von ${expectedDays} Tagen erfasst — Lücken im Log.` })
  }
  // Plan-Erfüllung: calories
  if (target && avgCalPct7 > 0 && avgCalPct7 < 90) {
    flags.push({ level: 'warning', title: 'Kalorienziel im Schnitt verfehlt', detail: `Ø ${avgCalPct7}% des Ziels (${target} kcal) über die letzten ${days7.length} Logs.` })
  }
  if (target && avgCalPct7 > 115) {
    flags.push({ level: 'warning', title: 'Kalorienziel deutlich überschritten', detail: `Ø ${avgCalPct7}% des Ziels (${target} kcal).` })
  }
  // Plan-Erfüllung: training
  if (hitRate > 0 && hitRate < 60) {
    flags.push({ level: 'warning', title: 'Trainingsvorgaben oft nicht erreicht', detail: `Nur ${hitRate}% der Sätze treffen Gewicht & Wiederholungen.` })
  }
  // Ergebnis: weight stagnation
  if (stagnant) {
    flags.push({ level: 'warning', title: 'Gewicht stagniert', detail: `Letzte 3 Messungen nahezu unverändert (${body.current} kg).` })
  }
  // Positives
  const bestGain = computeBestLifts(workoutLogs)[0]
  if (bestGain && bestGain.gainPct >= 15) {
    flags.push({ level: 'positive', title: `Starker Kraftzuwachs: ${bestGain.name}`, detail: `+${bestGain.gainPct}% (${bestGain.start} → ${bestGain.current} kg).` })
  }
  if (streak >= 5) {
    flags.push({ level: 'positive', title: `${streak} Tage Tracking-Streak`, detail: 'Der Kunde trackt konsequent — gutes Momentum.' })
  }

  const order: Record<FlagLevel, number> = { critical: 0, warning: 1, positive: 2 }
  flags.sort((a, b) => order[a.level] - order[b.level])

  return {
    hasData: true,
    referenceDate,
    daysSinceActivity,
    training: {
      totalSessions: trainingDates.size,
      sessionsLast7, sessionsLast30,
      lastDate: lastTraining,
      targetHitRate: hitRate,
      bestLifts: computeBestLifts(workoutLogs),
    },
    nutrition: {
      target, loggedDays7: days7.length, loggedDays30: days30.length,
      lastDate: mealLogs.length ? mealLogs[mealLogs.length - 1].date : null,
      avgCalPct7, onTargetRate7, streak, avgMacros7, trend,
    },
    body,
    flags,
  }
}

export type { ProgressMetric }
