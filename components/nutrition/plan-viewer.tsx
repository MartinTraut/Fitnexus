'use client'

import type { NutritionPlan } from '@/types'
import { GlassCard } from '@/components/glass-card'
import { cn } from '@/lib/utils'
import { UtensilsCrossed, Flame, Beef, Wheat, Droplets, Clock, StickyNote } from 'lucide-react'

interface NutritionPlanViewerProps {
  plan: NutritionPlan
}

function MacroCard({
  label,
  value,
  unit,
  color,
  total,
}: {
  label: string
  value: number
  unit: string
  color: string
  total?: number
}) {
  const percent = total ? Math.min((value / total) * 100, 100) : 100
  const colorMap: Record<string, { bg: string; bar: string; text: string }> = {
    calories: { bg: 'bg-orange-500/10', bar: 'bg-gradient-to-r from-orange-500 to-orange-400', text: 'text-orange-400' },
    protein: { bg: 'bg-cyan-500/10', bar: 'bg-gradient-to-r from-[#00A8FF] to-[#00D4FF]', text: 'text-[#00D4FF]' },
    carbs: { bg: 'bg-emerald-500/10', bar: 'bg-gradient-to-r from-emerald-500 to-[#00FF94]', text: 'text-[#00FF94]' },
    fat: { bg: 'bg-amber-500/10', bar: 'bg-gradient-to-r from-amber-500 to-amber-400', text: 'text-amber-400' },
  }
  const c = colorMap[color] ?? colorMap.calories

  return (
    <GlassCard className="p-4" hover={false}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <span className={cn('text-lg font-heading font-bold', c.text)}>
          {value}<span className="text-xs font-normal text-muted-foreground ml-0.5">{unit}</span>
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-[#1A2332] overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-700', c.bar)} style={{ width: `${percent}%` }} />
      </div>
    </GlassCard>
  )
}

export function NutritionPlanViewer({ plan }: NutritionPlanViewerProps) {
  // Calculate actual totals from meals
  const actualTotals = plan.meals.reduce(
    (acc, meal) => {
      meal.foods.forEach((f) => {
        acc.calories += f.calories
        acc.protein += f.protein
        acc.carbs += f.carbs
        acc.fat += f.fat
      })
      return acc
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <GlassCard className="p-5" hover={false}>
        <div className="flex items-center gap-2 mb-1">
          <UtensilsCrossed className="w-5 h-5 text-[#00FF94]" />
          <h2 className="text-lg font-heading font-bold text-foreground">{plan.title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">Tagesbedarf und Makronährstoff-Verteilung</p>
      </GlassCard>

      {/* Macro Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MacroCard label="Kalorien" value={plan.calories_target} unit="kcal" color="calories" total={plan.calories_target} />
        <MacroCard label="Protein" value={plan.protein_g} unit="g" color="protein" total={plan.protein_g} />
        <MacroCard label="Kohlenhydrate" value={plan.carbs_g} unit="g" color="carbs" total={plan.carbs_g} />
        <MacroCard label="Fett" value={plan.fat_g} unit="g" color="fat" total={plan.fat_g} />
      </div>

      {/* Meals */}
      {plan.meals.map((meal) => {
        const mealTotals = meal.foods.reduce(
          (acc, f) => ({
            calories: acc.calories + f.calories,
            protein: acc.protein + f.protein,
            carbs: acc.carbs + f.carbs,
            fat: acc.fat + f.fat,
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        )

        return (
          <GlassCard key={meal.id} className="overflow-hidden" hover={false}>
            {/* Meal Header */}
            <div className="p-4 border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#00FF94]/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4 text-[#00FF94]" />
                </div>
                <div>
                  <h3 className="text-sm font-heading font-semibold text-foreground">{meal.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {meal.time} Uhr
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-orange-400">{mealTotals.calories} kcal</p>
                <p className="text-[10px] text-muted-foreground">
                  P {mealTotals.protein}g · K {mealTotals.carbs}g · F {mealTotals.fat}g
                </p>
              </div>
            </div>

            {/* Foods */}
            <div className="divide-y divide-white/[0.04]">
              {meal.foods.map((food, idx) => (
                <div key={idx} className="px-4 py-3 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                  <div>
                    <p className="text-sm text-foreground">{food.name}</p>
                    <p className="text-xs text-muted-foreground">{food.amount}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="hidden sm:inline">{food.calories} kcal</span>
                    <span className="text-[#00D4FF]">{food.protein}g P</span>
                    <span className="text-[#00FF94]">{food.carbs}g K</span>
                    <span className="text-amber-400">{food.fat}g F</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )
      })}

      {/* Notes */}
      {plan.notes && (
        <GlassCard className="p-4" hover={false}>
          <div className="flex items-start gap-2">
            <StickyNote className="w-4 h-4 text-[#00FF94] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Trainer-Notizen</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{plan.notes}</p>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  )
}
