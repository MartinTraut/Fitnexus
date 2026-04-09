'use client'

import { useState, useMemo } from 'react'
import type { WorkoutPlan } from '@/types'
import { GlassCard } from '@/components/glass-card'
import { cn } from '@/lib/utils'
import {
  ChevronDown, ChevronRight, Check, Dumbbell,
  Clock, Hash, Weight, StickyNote,
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

export function PlanViewer({ plan, editable = false, onUpdate }: PlanViewerProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [actualWeights, setActualWeights] = useState<Record<string, string>>({})
  const [collapsedDays, setCollapsedDays] = useState<Set<number>>(new Set())

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
                <div className="hidden md:grid grid-cols-[2fr_0.7fr_0.7fr_0.7fr_0.8fr_1.2fr] gap-3 px-4 py-2.5 bg-[#0B0F1A]/50 border-b border-white/[0.04]">
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Übung</span>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Sätze</span>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Wdh.</span>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Gewicht</span>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Pause</span>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Notizen</span>
                </div>

                {exercises.map((ex, idx) => {
                  const isDone = completedExercises.has(ex.id)
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
                      <div className="hidden md:grid grid-cols-[2fr_0.7fr_0.7fr_0.7fr_0.8fr_1.2fr] gap-3 px-4 py-3 items-center">
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
                          <span className={cn(
                            'text-sm font-medium transition-all',
                            isDone ? 'text-muted-foreground line-through' : 'text-foreground'
                          )}>
                            {ex.name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{ex.sets}</span>
                        <span className="text-sm text-muted-foreground">{ex.reps}</span>
                        <div>
                          {editable ? (
                            <input
                              type="text"
                              value={actualWeights[ex.id] ?? ex.weight ?? ''}
                              onChange={(e) => setWeight(ex.id, e.target.value)}
                              placeholder={ex.weight ?? '–'}
                              className="w-full bg-[#1A2332]/60 border border-white/[0.06] rounded-lg px-2 py-1 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#00D4FF]/40 transition-colors"
                            />
                          ) : (
                            <span className="text-sm text-muted-foreground">{ex.weight || '–'}</span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{ex.rest_seconds}s</span>
                        <span className="text-xs text-muted-foreground/70 truncate">{ex.notes || '–'}</span>
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
                          <span className="flex items-center gap-1">
                            <Hash className="w-3 h-3" /> {ex.sets} × {ex.reps}
                          </span>
                          {ex.weight && (
                            <span className="flex items-center gap-1">
                              <Weight className="w-3 h-3" /> {ex.weight}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {ex.rest_seconds}s
                          </span>
                        </div>
                        {editable && (
                          <div className="ml-9">
                            <input
                              type="text"
                              value={actualWeights[ex.id] ?? ''}
                              onChange={(e) => setWeight(ex.id, e.target.value)}
                              placeholder="Tatsächliches Gewicht eingeben..."
                              className="w-full bg-[#1A2332]/60 border border-white/[0.06] rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-[#00D4FF]/40 transition-colors"
                            />
                          </div>
                        )}
                        {ex.notes && (
                          <p className="text-xs text-muted-foreground/70 ml-9">{ex.notes}</p>
                        )}
                      </div>
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
