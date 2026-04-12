'use client'

import { useState, useMemo, useCallback } from 'react'
import type { NutritionPlan, MealLog, LoggedMeal, LoggedFood } from '@/types'
import { getMealLog, saveMealLog } from '@/lib/store'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Plus, X, Save, Check, ChevronLeft, ChevronRight,
  UtensilsCrossed, Flame, Beef, Wheat, Droplets,
  Trash2,
} from 'lucide-react'

interface MealTrackerProps {
  customerId: string
  nutritionPlan?: NutritionPlan | null
}

function uid() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function dateToStr(d: Date): string {
  return d.toISOString().split('T')[0]
}

function formatDate(d: Date): string {
  const today = new Date()
  const todayStr = dateToStr(today)
  const dateStr = dateToStr(d)
  if (dateStr === todayStr) return 'Heute'
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (dateStr === dateToStr(yesterday)) return 'Gestern'
  return d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' })
}

const MEAL_PRESETS = ['Frühstück', 'Mittagessen', 'Abendessen', 'Snack']

function createEmptyFood(): LoggedFood {
  return { name: '', amount: '', calories: 0, protein: 0, carbs: 0, fat: 0 }
}

function createEmptyMeal(name: string): LoggedMeal {
  return { id: uid(), name, time: '', foods: [createEmptyFood()] }
}

export function MealTracker({ customerId, nutritionPlan }: MealTrackerProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [saved, setSaved] = useState(false)

  const dateStr = dateToStr(currentDate)

  const [meals, setMeals] = useState<LoggedMeal[]>(() => {
    const existing = getMealLog(customerId, dateStr)
    return existing?.meals ?? []
  })
  const [waterMl, setWaterMl] = useState(() => {
    const existing = getMealLog(customerId, dateStr)
    return existing?.water_ml ?? 0
  })

  const loadDate = useCallback((date: Date) => {
    setCurrentDate(date)
    const ds = dateToStr(date)
    const existing = getMealLog(customerId, ds)
    setMeals(existing?.meals ?? [])
    setWaterMl(existing?.water_ml ?? 0)
    setSaved(false)
  }, [customerId])

  function prevDay() {
    const d = new Date(currentDate)
    d.setDate(d.getDate() - 1)
    loadDate(d)
  }
  function nextDay() {
    const d = new Date(currentDate)
    d.setDate(d.getDate() + 1)
    if (d <= new Date()) loadDate(d)
  }

  function addMeal(name: string) {
    setMeals(prev => [...prev, createEmptyMeal(name)])
  }
  function removeMeal(id: string) {
    setMeals(prev => prev.filter(m => m.id !== id))
  }
  function updateFood(mealId: string, foodIdx: number, field: keyof LoggedFood, value: string | number) {
    setMeals(prev => prev.map(m => {
      if (m.id !== mealId) return m
      const foods = [...m.foods]
      foods[foodIdx] = { ...foods[foodIdx], [field]: value }
      return { ...m, foods }
    }))
  }
  function addFood(mealId: string) {
    setMeals(prev => prev.map(m => {
      if (m.id !== mealId) return m
      return { ...m, foods: [...m.foods, createEmptyFood()] }
    }))
  }
  function removeFood(mealId: string, foodIdx: number) {
    setMeals(prev => prev.map(m => {
      if (m.id !== mealId) return m
      return { ...m, foods: m.foods.filter((_, i) => i !== foodIdx) }
    }))
  }

  // Totals
  const totals = useMemo(() => {
    let cal = 0, pro = 0, carb = 0, fat = 0
    for (const meal of meals) {
      for (const food of meal.foods) {
        cal += food.calories || 0
        pro += food.protein || 0
        carb += food.carbs || 0
        fat += food.fat || 0
      }
    }
    return { calories: cal, protein: pro, carbs: carb, fat }
  }, [meals])

  function handleSave() {
    const existing = getMealLog(customerId, dateStr)
    const log: MealLog = {
      id: existing?.id ?? `ml_${uid()}`,
      customer_id: customerId,
      date: dateStr,
      meals,
      water_ml: waterMl,
      notes: null,
      created_at: existing?.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    saveMealLog(log)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const targets = nutritionPlan ? {
    calories: nutritionPlan.calories_target,
    protein: nutritionPlan.protein_g,
    carbs: nutritionPlan.carbs_g,
    fat: nutritionPlan.fat_g,
  } : null

  const macros = [
    { label: 'Kalorien', value: totals.calories, target: targets?.calories, unit: 'kcal', color: '#FF8C00', icon: Flame },
    { label: 'Protein', value: totals.protein, target: targets?.protein, unit: 'g', color: '#00D4FF', icon: Beef },
    { label: 'Carbs', value: totals.carbs, target: targets?.carbs, unit: 'g', color: '#00FF94', icon: Wheat },
    { label: 'Fett', value: totals.fat, target: targets?.fat, unit: 'g', color: '#FFD700', icon: Droplets },
  ]

  return (
    <div className="space-y-4">
      {/* Date Picker + Macros Overview */}
      <GlassCard className="p-5" hover={false}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevDay} className="p-2 rounded-lg hover:bg-[#1A2332] transition-colors">
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="text-center">
            <p className="text-lg font-heading font-bold text-foreground">{formatDate(currentDate)}</p>
            <p className="text-xs text-muted-foreground">{currentDate.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
          </div>
          <button onClick={nextDay} disabled={dateToStr(currentDate) === dateToStr(new Date())} className="p-2 rounded-lg hover:bg-[#1A2332] transition-colors disabled:opacity-30">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Macro Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {macros.map((m) => {
            const pct = m.target ? Math.min((m.value / m.target) * 100, 100) : 0
            return (
              <div key={m.label} className="p-3 rounded-xl bg-[#0B0F1A]/60 border border-white/[0.04]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <m.icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</span>
                </div>
                <p className="text-lg font-bold" style={{ color: m.color }}>
                  {Math.round(m.value)}
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    {m.target ? `/ ${m.target} ${m.unit}` : m.unit}
                  </span>
                </p>
                {m.target && (
                  <div className="mt-1.5 h-1.5 rounded-full bg-[#1A2332] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: m.color }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Water Tracker */}
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-[#0B0F1A]/60 border border-white/[0.04]">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#00A8FF]" />
            <span className="text-sm text-foreground font-medium">Wasser</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setWaterMl(Math.max(0, waterMl - 250))} className="w-7 h-7 rounded-lg bg-[#1A2332] text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors text-sm">−</button>
            <span className="text-sm font-bold text-[#00A8FF] w-16 text-center">{(waterMl / 1000).toFixed(1)} L</span>
            <button onClick={() => setWaterMl(waterMl + 250)} className="w-7 h-7 rounded-lg bg-[#00A8FF]/10 text-[#00D4FF] hover:bg-[#00A8FF]/20 flex items-center justify-center transition-colors text-sm">+</button>
          </div>
        </div>
      </GlassCard>

      {/* Meals */}
      {meals.map((meal) => (
        <GlassCard key={meal.id} className="overflow-hidden" hover={false}>
          <div className="flex items-center justify-between p-4 border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-[#00FF94]" />
              <span className="text-sm font-heading font-semibold text-foreground">{meal.name}</span>
              <span className="text-xs text-muted-foreground/50">
                {Math.round(meal.foods.reduce((s, f) => s + (f.calories || 0), 0))} kcal
              </span>
            </div>
            <button onClick={() => removeMeal(meal.id)} className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-red-400 hover:bg-red-400/10 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 space-y-2">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-[2fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr_auto] gap-2 px-1 text-[10px] text-muted-foreground/50 uppercase tracking-wider">
              <span>Lebensmittel</span>
              <span>Menge</span>
              <span>Kalorien</span>
              <span>Protein</span>
              <span>Carbs</span>
              <span>Fett</span>
              <span className="w-8" />
            </div>

            {meal.foods.map((food, fi) => (
              <div key={fi} className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr_auto] gap-2 items-center">
                <Input
                  value={food.name}
                  onChange={(e) => updateFood(meal.id, fi, 'name', e.target.value)}
                  placeholder="z.B. Hähnchenbrust"
                  className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-9 text-sm col-span-2 sm:col-span-1"
                />
                <Input
                  value={food.amount}
                  onChange={(e) => updateFood(meal.id, fi, 'amount', e.target.value)}
                  placeholder="200g"
                  className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-9 text-sm"
                />
                <Input
                  type="number"
                  value={food.calories || ''}
                  onChange={(e) => updateFood(meal.id, fi, 'calories', parseFloat(e.target.value) || 0)}
                  placeholder="kcal"
                  className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#FF8C00]/40 h-9 text-sm"
                />
                <Input
                  type="number"
                  value={food.protein || ''}
                  onChange={(e) => updateFood(meal.id, fi, 'protein', parseFloat(e.target.value) || 0)}
                  placeholder="g"
                  className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00D4FF]/40 h-9 text-sm"
                />
                <Input
                  type="number"
                  value={food.carbs || ''}
                  onChange={(e) => updateFood(meal.id, fi, 'carbs', parseFloat(e.target.value) || 0)}
                  placeholder="g"
                  className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#00FF94]/40 h-9 text-sm"
                />
                <Input
                  type="number"
                  value={food.fat || ''}
                  onChange={(e) => updateFood(meal.id, fi, 'fat', parseFloat(e.target.value) || 0)}
                  placeholder="g"
                  className="bg-[#1A2332]/60 border-white/[0.06] focus:border-[#FFD700]/40 h-9 text-sm"
                />
                <button onClick={() => removeFood(meal.id, fi)} className="p-1.5 rounded-lg text-muted-foreground/30 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <button onClick={() => addFood(meal.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#00FF94]/60 hover:text-[#00FF94] hover:bg-[#00FF94]/5 transition-all">
              <Plus className="w-3 h-3" /> Lebensmittel hinzufügen
            </button>
          </div>
        </GlassCard>
      ))}

      {/* Add Meal Buttons */}
      <div className="flex flex-wrap gap-2">
        {MEAL_PRESETS.map((name) => (
          <button
            key={name}
            onClick={() => addMeal(name)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0D1320]/50 border border-[rgba(0,168,255,0.06)] text-sm text-muted-foreground hover:text-foreground hover:border-[#00FF94]/20 hover:bg-[#00FF94]/[0.03] transition-all"
          >
            <Plus className="w-4 h-4" /> {name}
          </button>
        ))}
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <GradientButton
          variant="green"
          size="md"
          onClick={handleSave}
          disabled={meals.length === 0}
        >
          {saved ? (
            <><Check className="w-4 h-4" /> Gespeichert</>
          ) : (
            <><Save className="w-4 h-4" /> Tag speichern</>
          )}
        </GradientButton>
      </div>
    </div>
  )
}
