'use client'

import { useState, useCallback } from 'react'
import type { NutritionPlan, NutritionMeal, NutritionFood } from '@/types'
import { saveNutritionPlan } from '@/lib/store'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import {
  Plus, X, Save, UtensilsCrossed, CheckCircle2, Clock,
} from 'lucide-react'

function uid(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

function createEmptyFood(): NutritionFood {
  return { name: '', amount: '', calories: 0, protein: 0, carbs: 0, fat: 0 }
}

function createEmptyMeal(): NutritionMeal {
  return { id: `meal_${uid()}`, name: '', time: '12:00', foods: [createEmptyFood()] }
}

interface PlanEditorProps {
  trainerId: string
  customerId: string
  existingPlan?: NutritionPlan
  onSave?: (plan: NutritionPlan) => void
}

export function NutritionPlanEditor({ trainerId, customerId, existingPlan, onSave }: PlanEditorProps) {
  const [title, setTitle] = useState(existingPlan?.title ?? '')
  const [calories, setCalories] = useState(existingPlan?.calories_target ?? 2000)
  const [protein, setProtein] = useState(existingPlan?.protein_g ?? 150)
  const [carbs, setCarbs] = useState(existingPlan?.carbs_g ?? 250)
  const [fat, setFat] = useState(existingPlan?.fat_g ?? 70)
  const [meals, setMeals] = useState<NutritionMeal[]>(existingPlan?.meals ?? [createEmptyMeal()])
  const [notes, setNotes] = useState(existingPlan?.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const addMeal = useCallback(() => {
    setMeals((prev) => [...prev, createEmptyMeal()])
  }, [])

  const removeMeal = useCallback((mealId: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== mealId))
  }, [])

  const updateMeal = useCallback((mealId: string, field: keyof NutritionMeal, value: string) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === mealId ? { ...m, [field]: value } : m))
    )
  }, [])

  const addFood = useCallback((mealId: string) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === mealId ? { ...m, foods: [...m.foods, createEmptyFood()] } : m
      )
    )
  }, [])

  const removeFood = useCallback((mealId: string, foodIndex: number) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === mealId ? { ...m, foods: m.foods.filter((_, i) => i !== foodIndex) } : m
      )
    )
  }, [])

  const updateFood = useCallback((mealId: string, foodIndex: number, field: keyof NutritionFood, value: string | number) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === mealId
          ? {
              ...m,
              foods: m.foods.map((f, i) =>
                i === foodIndex ? { ...f, [field]: value } : f
              ),
            }
          : m
      )
    )
  }, [])

  async function handleSave() {
    if (!title.trim()) return
    setSaving(true)

    const plan: NutritionPlan = {
      id: existingPlan?.id ?? `np_${Date.now()}`,
      trainer_id: trainerId,
      customer_id: customerId,
      title: title.trim(),
      calories_target: calories,
      protein_g: protein,
      carbs_g: carbs,
      fat_g: fat,
      meals,
      notes: notes.trim() || null,
      created_at: existingPlan?.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    saveNutritionPlan(plan)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    onSave?.(plan)
  }

  return (
    <div className="space-y-4">
      {/* Title */}
      <GlassCard className="p-5" hover={false}>
        <div className="space-y-2">
          <Label htmlFor="np-title" className="text-xs text-muted-foreground">Plantitel</Label>
          <Input
            id="np-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z.B. Aufbau-Ernährungsplan"
            className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40"
          />
        </div>
      </GlassCard>

      {/* Macro Targets */}
      <GlassCard className="p-5" hover={false}>
        <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Makro-Ziele (Tagesziele)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label className="text-[10px] text-muted-foreground/60">Kalorien (kcal)</Label>
            <Input
              type="number"
              min={0}
              value={calories}
              onChange={(e) => setCalories(parseInt(e.target.value) || 0)}
              className="bg-[#1A2332]/60 border-white/[0.06] focus:border-orange-400/40 h-9 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] text-muted-foreground/60">Protein (g)</Label>
            <Input
              type="number"
              min={0}
              value={protein}
              onChange={(e) => setProtein(parseInt(e.target.value) || 0)}
              className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00D4FF]/40 h-9 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] text-muted-foreground/60">Kohlenhydrate (g)</Label>
            <Input
              type="number"
              min={0}
              value={carbs}
              onChange={(e) => setCarbs(parseInt(e.target.value) || 0)}
              className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-9 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] text-muted-foreground/60">Fett (g)</Label>
            <Input
              type="number"
              min={0}
              value={fat}
              onChange={(e) => setFat(parseInt(e.target.value) || 0)}
              className="bg-[#1A2332]/60 border-white/[0.06] focus:border-amber-400/40 h-9 text-sm"
            />
          </div>
        </div>
      </GlassCard>

      {/* Meals */}
      {meals.map((meal, mealIdx) => (
        <GlassCard key={meal.id} className="overflow-hidden" hover={false}>
          {/* Meal Header */}
          <div className="p-4 border-b border-white/[0.04] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00FF94]/10 flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed className="w-4 h-4 text-[#00FF94]" />
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <Input
                value={meal.name}
                onChange={(e) => updateMeal(meal.id, 'name', e.target.value)}
                placeholder="Mahlzeitname (z.B. Frühstück)"
                className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-9 text-sm"
              />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={meal.time}
                  onChange={(e) => updateMeal(meal.id, 'time', e.target.value)}
                  className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-9 text-sm w-28"
                />
              </div>
            </div>
            {meals.length > 1 && (
              <button
                onClick={() => removeMeal(meal.id)}
                className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                title="Mahlzeit entfernen"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Food Items Header */}
          <div className="hidden sm:grid grid-cols-[1.5fr_1fr_0.7fr_0.7fr_0.7fr_0.7fr_auto] gap-2 px-4 py-2 bg-[#0B0F1A]/50 border-b border-white/[0.04]">
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Lebensmittel</span>
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Menge</span>
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">kcal</span>
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Protein</span>
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Carbs</span>
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Fett</span>
            <span className="w-8" />
          </div>

          {/* Food Rows */}
          <div className="divide-y divide-white/[0.04]">
            {meal.foods.map((food, foodIdx) => (
              <div key={foodIdx} className="p-3 px-4">
                {/* Desktop */}
                <div className="hidden sm:grid grid-cols-[1.5fr_1fr_0.7fr_0.7fr_0.7fr_0.7fr_auto] gap-2 items-center">
                  <Input
                    value={food.name}
                    onChange={(e) => updateFood(meal.id, foodIdx, 'name', e.target.value)}
                    placeholder="Name"
                    className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-8 text-xs"
                  />
                  <Input
                    value={food.amount}
                    onChange={(e) => updateFood(meal.id, foodIdx, 'amount', e.target.value)}
                    placeholder="100g"
                    className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-8 text-xs"
                  />
                  <Input
                    type="number"
                    min={0}
                    value={food.calories || ''}
                    onChange={(e) => updateFood(meal.id, foodIdx, 'calories', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="bg-[#1A2332]/60 border-white/[0.06] focus:border-orange-400/40 h-8 text-xs"
                  />
                  <Input
                    type="number"
                    min={0}
                    value={food.protein || ''}
                    onChange={(e) => updateFood(meal.id, foodIdx, 'protein', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00D4FF]/40 h-8 text-xs"
                  />
                  <Input
                    type="number"
                    min={0}
                    value={food.carbs || ''}
                    onChange={(e) => updateFood(meal.id, foodIdx, 'carbs', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-8 text-xs"
                  />
                  <Input
                    type="number"
                    min={0}
                    value={food.fat || ''}
                    onChange={(e) => updateFood(meal.id, foodIdx, 'fat', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="bg-[#1A2332]/60 border-white/[0.06] focus:border-amber-400/40 h-8 text-xs"
                  />
                  <button
                    onClick={() => removeFood(meal.id, foodIdx)}
                    className="p-1 rounded text-muted-foreground/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Mobile */}
                <div className="sm:hidden space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={food.name}
                      onChange={(e) => updateFood(meal.id, foodIdx, 'name', e.target.value)}
                      placeholder="Lebensmittel"
                      className="bg-[#1A2332]/60 border-white/[0.06] h-8 text-xs flex-1"
                    />
                    <Input
                      value={food.amount}
                      onChange={(e) => updateFood(meal.id, foodIdx, 'amount', e.target.value)}
                      placeholder="Menge"
                      className="bg-[#1A2332]/60 border-white/[0.06] h-8 text-xs w-24"
                    />
                    <button
                      onClick={() => removeFood(meal.id, foodIdx)}
                      className="p-1 text-muted-foreground/30 hover:text-red-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <Label className="text-[9px] text-muted-foreground/50">kcal</Label>
                      <Input
                        type="number"
                        min={0}
                        value={food.calories || ''}
                        onChange={(e) => updateFood(meal.id, foodIdx, 'calories', parseInt(e.target.value) || 0)}
                        className="bg-[#1A2332]/60 border-white/[0.06] h-7 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-[9px] text-[#00D4FF]/60">Protein</Label>
                      <Input
                        type="number"
                        min={0}
                        value={food.protein || ''}
                        onChange={(e) => updateFood(meal.id, foodIdx, 'protein', parseInt(e.target.value) || 0)}
                        className="bg-[#1A2332]/60 border-white/[0.06] h-7 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-[9px] text-[#00FF94]/60">Carbs</Label>
                      <Input
                        type="number"
                        min={0}
                        value={food.carbs || ''}
                        onChange={(e) => updateFood(meal.id, foodIdx, 'carbs', parseInt(e.target.value) || 0)}
                        className="bg-[#1A2332]/60 border-white/[0.06] h-7 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-[9px] text-amber-400/60">Fett</Label>
                      <Input
                        type="number"
                        min={0}
                        value={food.fat || ''}
                        onChange={(e) => updateFood(meal.id, foodIdx, 'fat', parseInt(e.target.value) || 0)}
                        className="bg-[#1A2332]/60 border-white/[0.06] h-7 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Food */}
          <div className="p-3 px-4 border-t border-white/[0.04]">
            <button
              onClick={() => addFood(meal.id)}
              className="flex items-center gap-1.5 text-xs text-[#00FF94]/70 hover:text-[#00FF94] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Lebensmittel hinzufügen
            </button>
          </div>
        </GlassCard>
      ))}

      {/* Add Meal */}
      <GradientButton variant="green" size="sm" outline onClick={addMeal} className="w-full justify-center">
        <Plus className="w-4 h-4" /> Mahlzeit hinzufügen
      </GradientButton>

      {/* Notes */}
      <GlassCard className="p-5" hover={false}>
        <Label htmlFor="np-notes" className="text-xs text-muted-foreground mb-2 block">Notizen</Label>
        <Textarea
          id="np-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Allgemeine Hinweise zur Ernährung..."
          rows={3}
          className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 resize-none"
        />
      </GlassCard>

      {/* Save */}
      <div className="flex justify-end">
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
