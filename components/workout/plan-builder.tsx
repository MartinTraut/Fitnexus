'use client'

import { useState, useCallback } from 'react'
import type { WorkoutPlan, WorkoutExercise } from '@/types'
import { saveWorkoutPlan } from '@/lib/store'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import {
  Plus, X, GripVertical, Save, Dumbbell, CheckCircle2,
} from 'lucide-react'

const DAY_LABELS: { key: number; short: string; full: string }[] = [
  { key: 1, short: 'Mo', full: 'Montag' },
  { key: 2, short: 'Di', full: 'Dienstag' },
  { key: 3, short: 'Mi', full: 'Mittwoch' },
  { key: 4, short: 'Do', full: 'Donnerstag' },
  { key: 5, short: 'Fr', full: 'Freitag' },
  { key: 6, short: 'Sa', full: 'Samstag' },
  { key: 7, short: 'So', full: 'Sonntag' },
]

function uid(): string {
  return `ex_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

function createEmptyExercise(day: number, order: number): WorkoutExercise {
  return {
    id: uid(),
    name: '',
    sets: 3,
    reps: '10',
    weight: null,
    rest_seconds: 60,
    notes: null,
    order,
    day,
    superset_group: null,
  }
}

interface PlanBuilderProps {
  trainerId: string
  customerId: string
  existingPlan?: WorkoutPlan
  onSave?: (plan: WorkoutPlan) => void
}

export function PlanBuilder({ trainerId, customerId, existingPlan, onSave }: PlanBuilderProps) {
  const [title, setTitle] = useState(existingPlan?.title ?? '')
  const [weekNumber, setWeekNumber] = useState(existingPlan?.week_number ?? 1)
  const [notes, setNotes] = useState(existingPlan?.notes ?? '')
  const [exercises, setExercises] = useState<WorkoutExercise[]>(existingPlan?.exercises ?? [])
  const [activeDay, setActiveDay] = useState(1)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const dayExercises = exercises
    .filter((ex) => ex.day === activeDay)
    .sort((a, b) => a.order - b.order)

  const addExercise = useCallback(() => {
    const maxOrder = exercises
      .filter((ex) => ex.day === activeDay)
      .reduce((max, ex) => Math.max(max, ex.order), 0)
    setExercises((prev) => [...prev, createEmptyExercise(activeDay, maxOrder + 1)])
  }, [activeDay, exercises])

  const removeExercise = useCallback((id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id))
  }, [])

  const updateExercise = useCallback((id: string, field: keyof WorkoutExercise, value: string | number | null) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    )
  }, [])

  async function handleSave() {
    if (!title.trim()) return
    setSaving(true)

    const plan: WorkoutPlan = {
      id: existingPlan?.id ?? `wp_${Date.now()}`,
      trainer_id: trainerId,
      customer_id: customerId,
      title: title.trim(),
      week_number: weekNumber,
      exercises,
      notes: notes.trim() || null,
      created_at: existingPlan?.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    saveWorkoutPlan(plan)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    onSave?.(plan)
  }

  const exerciseCountPerDay = (day: number) => exercises.filter((ex) => ex.day === day).length

  return (
    <div className="space-y-4">
      {/* Title & Meta */}
      <GlassCard className="p-5" hover={false}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
          <div className="space-y-2">
            <Label htmlFor="plan-title" className="text-xs text-muted-foreground">Plantitel</Label>
            <Input
              id="plan-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="z.B. Push/Pull/Legs – Woche 1"
              className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00D4FF]/40"
            />
          </div>
          <div className="space-y-2 w-full md:w-32">
            <Label htmlFor="week-number" className="text-xs text-muted-foreground">Woche</Label>
            <Input
              id="week-number"
              type="number"
              min={1}
              value={weekNumber}
              onChange={(e) => setWeekNumber(parseInt(e.target.value) || 1)}
              className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00D4FF]/40"
            />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="plan-notes" className="text-xs text-muted-foreground">Notizen</Label>
          <Textarea
            id="plan-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Allgemeine Hinweise zum Trainingsplan..."
            rows={2}
            className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00D4FF]/40 resize-none"
          />
        </div>
      </GlassCard>

      {/* Day Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
        {DAY_LABELS.map((day) => {
          const count = exerciseCountPerDay(day.key)
          return (
            <button
              key={day.key}
              onClick={() => setActiveDay(day.key)}
              className={cn(
                'relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200',
                activeDay === day.key
                  ? 'bg-[#00FF94]/10 text-[#00FF94] shadow-[0_0_10px_rgba(0,255,148,0.1)]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[#1A2332]'
              )}
            >
              <span className="hidden sm:inline">{day.full}</span>
              <span className="sm:hidden">{day.short}</span>
              {count > 0 && (
                <span className={cn(
                  'text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full',
                  activeDay === day.key
                    ? 'bg-[#00FF94]/20 text-[#00FF94]'
                    : 'bg-[#1A2332] text-muted-foreground'
                )}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Exercises for Active Day */}
      <GlassCard className="overflow-hidden" hover={false}>
        <div className="p-4 border-b border-white/[0.04] flex items-center justify-between">
          <h3 className="text-sm font-heading font-semibold text-foreground">
            {DAY_LABELS.find((d) => d.key === activeDay)?.full} – Übungen
          </h3>
          <GradientButton variant="green" size="sm" onClick={addExercise}>
            <Plus className="w-4 h-4" /> Übung
          </GradientButton>
        </div>

        {dayExercises.length === 0 ? (
          <div className="p-8 text-center">
            <Dumbbell className="w-8 h-8 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Noch keine Übungen für diesen Tag.</p>
            <GradientButton variant="green" size="sm" outline className="mt-3" onClick={addExercise}>
              <Plus className="w-4 h-4" /> Erste Übung hinzufügen
            </GradientButton>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {dayExercises.map((ex, idx) => (
              <div key={ex.id} className="p-4 group hover:bg-white/[0.01] transition-colors">
                <div className="flex items-start gap-3">
                  {/* Drag Handle (visual) */}
                  <div className="mt-2.5 text-muted-foreground/30 cursor-grab">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                    {/* Name */}
                    <div className="sm:col-span-2 lg:col-span-2">
                      <Label className="text-[10px] text-muted-foreground/60 mb-1 block">Übung</Label>
                      <Input
                        value={ex.name}
                        onChange={(e) => updateExercise(ex.id, 'name', e.target.value)}
                        placeholder="Übungsname"
                        className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-9 text-sm"
                      />
                    </div>
                    {/* Sets */}
                    <div>
                      <Label className="text-[10px] text-muted-foreground/60 mb-1 block">Sätze</Label>
                      <Input
                        type="number"
                        min={1}
                        value={ex.sets}
                        onChange={(e) => updateExercise(ex.id, 'sets', parseInt(e.target.value) || 1)}
                        className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-9 text-sm"
                      />
                    </div>
                    {/* Reps */}
                    <div>
                      <Label className="text-[10px] text-muted-foreground/60 mb-1 block">Wdh.</Label>
                      <Input
                        value={ex.reps}
                        onChange={(e) => updateExercise(ex.id, 'reps', e.target.value)}
                        placeholder="8-10"
                        className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-9 text-sm"
                      />
                    </div>
                    {/* Weight */}
                    <div>
                      <Label className="text-[10px] text-muted-foreground/60 mb-1 block">Gewicht</Label>
                      <Input
                        value={ex.weight ?? ''}
                        onChange={(e) => updateExercise(ex.id, 'weight', e.target.value || null)}
                        placeholder="80kg"
                        className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-9 text-sm"
                      />
                    </div>
                    {/* Rest */}
                    <div>
                      <Label className="text-[10px] text-muted-foreground/60 mb-1 block">Pause (s)</Label>
                      <Input
                        type="number"
                        min={0}
                        step={15}
                        value={ex.rest_seconds}
                        onChange={(e) => updateExercise(ex.id, 'rest_seconds', parseInt(e.target.value) || 0)}
                        className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-9 text-sm"
                      />
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeExercise(ex.id)}
                    className="mt-6 p-1.5 rounded-lg text-muted-foreground/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    title="Übung entfernen"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Notes Row */}
                <div className="ml-7 mt-2">
                  <Input
                    value={ex.notes ?? ''}
                    onChange={(e) => updateExercise(ex.id, 'notes', e.target.value || null)}
                    placeholder="Notiz zur Übung (optional)..."
                    className="bg-transparent border-transparent hover:border-white/[0.06] focus:border-[#00FF94]/40 h-8 text-xs text-muted-foreground placeholder:text-muted-foreground/30"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <GradientButton
          variant="green"
          size="md"
          onClick={handleSave}
          disabled={saving || !title.trim()}
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Gespeichert
            </>
          ) : saving ? (
            'Speichert...'
          ) : (
            <>
              <Save className="w-4 h-4" /> Plan speichern
            </>
          )}
        </GradientButton>
      </div>
    </div>
  )
}
