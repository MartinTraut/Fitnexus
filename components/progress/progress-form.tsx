'use client'

import { useState } from 'react'
import type { ProgressMetric } from '@/types'
import { addProgressMetric } from '@/lib/store'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp, Plus, CheckCircle2, Scale, Percent, Dumbbell } from 'lucide-react'

interface ProgressFormProps {
  customerId: string
  onAdd?: (metric: ProgressMetric) => void
}

export function ProgressForm({ customerId, onAdd }: ProgressFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState('')
  const [muscle, setMuscle] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const hasAtLeastOne = weight.trim() || bodyFat.trim() || muscle.trim()

  function reset() {
    setWeight('')
    setBodyFat('')
    setMuscle('')
    setNotes('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!hasAtLeastOne) return
    setSaving(true)

    const metric = addProgressMetric({
      customer_id: customerId,
      weight_kg: weight ? parseFloat(weight) : null,
      body_fat_percent: bodyFat ? parseFloat(bodyFat) : null,
      muscle_mass_kg: muscle ? parseFloat(muscle) : null,
      notes: notes.trim() || null,
    })

    setSaving(false)
    setSuccess(true)
    onAdd?.(metric)
    reset()
    setTimeout(() => setSuccess(false), 2500)
  }

  return (
    <GlassCard className="overflow-hidden" hover={false}>
      {/* Toggle Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00A8FF]/10 flex items-center justify-center">
            <Plus className="w-4 h-4 text-[#00D4FF]" />
          </div>
          <span className="text-sm font-medium text-foreground">Neuen Fortschritt eintragen</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {/* Form */}
      {isOpen && (
        <form onSubmit={handleSubmit} className="p-4 pt-0 space-y-4 border-t border-white/[0.04]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Scale className="w-3 h-3" /> Gewicht (kg)
              </Label>
              <Input
                type="number"
                step="0.1"
                min={0}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="z.B. 82.5"
                className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00A8FF]/40"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Percent className="w-3 h-3" /> Körperfett (%)
              </Label>
              <Input
                type="number"
                step="0.1"
                min={0}
                max={100}
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                placeholder="z.B. 15.5"
                className="bg-[#1A2332]/60 border-white/[0.06] focus:border-red-400/40"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Dumbbell className="w-3 h-3" /> Muskelmasse (kg)
              </Label>
              <Input
                type="number"
                step="0.1"
                min={0}
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
                placeholder="z.B. 39.0"
                className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Notizen (optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Wie fühlst du dich? Besonderheiten?"
              rows={2}
              className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00A8FF]/40 resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground/50">Mindestens ein Messwert erforderlich</p>
            <GradientButton
              type="submit"
              variant="cyan"
              size="sm"
              disabled={!hasAtLeastOne || saving}
            >
              {success ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Gespeichert
                </>
              ) : saving ? (
                'Speichert...'
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Eintragen
                </>
              )}
            </GradientButton>
          </div>
        </form>
      )}
    </GlassCard>
  )
}
