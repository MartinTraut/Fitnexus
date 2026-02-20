'use client'

import { GlassCard } from '@/components/glass-card'
import { LineChart } from '@/components/charts/line-chart'
import { RadialProgress } from '@/components/charts/radial-progress'
import { UtensilsCrossed, Flame, Droplets, Wheat, Beef } from 'lucide-react'

const calorieHistory = [
  {
    name: 'Kalorien',
    color: '#FF6B35',
    data: [
      { label: 'Mo', value: 2380 },
      { label: 'Di', value: 2450 },
      { label: 'Mi', value: 2200 },
      { label: 'Do', value: 2520 },
      { label: 'Fr', value: 2350 },
      { label: 'Sa', value: 2600 },
      { label: 'So', value: 2180 },
    ],
  },
  {
    name: 'Ziel',
    color: 'rgba(0, 168, 255, 0.3)',
    data: [
      { label: 'Mo', value: 2400 },
      { label: 'Di', value: 2400 },
      { label: 'Mi', value: 2400 },
      { label: 'Do', value: 2400 },
      { label: 'Fr', value: 2400 },
      { label: 'Sa', value: 2400 },
      { label: 'So', value: 2400 },
    ],
  },
]

const proteinHistory = [
  {
    name: 'Protein (g)',
    color: '#00D4FF',
    data: [
      { label: 'Mo', value: 172 },
      { label: 'Di', value: 185 },
      { label: 'Mi', value: 160 },
      { label: 'Do', value: 190 },
      { label: 'Fr', value: 175 },
      { label: 'Sa', value: 195 },
      { label: 'So', value: 155 },
    ],
  },
]

export default function NutritionPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Ernährungsplan</h1>
        <p className="text-muted-foreground mt-1">Dein aktueller Plan & Tracking</p>
      </div>

      {/* Macro Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Kalorien', value: '2.400', unit: 'kcal', icon: Flame, color: '#FF6B35' },
          { label: 'Protein', value: '180', unit: 'g', icon: Beef, color: '#00D4FF' },
          { label: 'Carbs', value: '260', unit: 'g', icon: Wheat, color: '#00FF94' },
          { label: 'Fett', value: '80', unit: 'g', icon: Droplets, color: '#FFD700' },
        ].map((m) => (
          <GlassCard key={m.label} className="p-3 text-center">
            <m.icon className="w-5 h-5 mx-auto mb-2" style={{ color: m.color }} />
            <p className="text-lg font-bold text-foreground">{m.value}</p>
            <p className="text-[10px] text-muted-foreground">{m.unit} {m.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Radial Progress for Today */}
      <GlassCard className="p-5 md:p-6" hover={false}>
        <h3 className="font-heading font-semibold text-foreground mb-5">Heutiger Fortschritt</h3>
        <div className="flex items-center justify-around">
          <RadialProgress value={2180} max={2400} label="Kalorien" unit="kcal" color="#FF6B35" />
          <RadialProgress value={155} max={180} label="Protein" unit="g" color="#00D4FF" />
          <RadialProgress value={210} max={260} label="Carbs" unit="g" color="#00FF94" />
          <RadialProgress value={65} max={80} label="Fett" unit="g" color="#FFD700" />
        </div>
      </GlassCard>

      {/* Calorie History Chart */}
      <GlassCard className="p-5 md:p-6" hover={false}>
        <div className="flex items-center justify-between mb-1">
          <div>
            <h3 className="font-heading font-semibold text-foreground">Kalorien diese Woche</h3>
            <p className="text-xs text-muted-foreground mt-1">Tatsächlich vs. Ziel (2.400 kcal)</p>
          </div>
          <span className="text-xs font-medium text-[#00FF94]">Ø 2.383 kcal</span>
        </div>
        <LineChart series={calorieHistory} height={220} yUnit="" showArea />
      </GlassCard>

      {/* Protein History Chart */}
      <GlassCard className="p-5 md:p-6" hover={false}>
        <div className="flex items-center justify-between mb-1">
          <div>
            <h3 className="font-heading font-semibold text-foreground">Protein-Tracking</h3>
            <p className="text-xs text-muted-foreground mt-1">Tägliche Proteinzufuhr in Gramm</p>
          </div>
          <span className="text-xs font-medium text-[#00D4FF]">Ziel: 180g</span>
        </div>
        <LineChart series={proteinHistory} height={200} yUnit="g" showArea />
      </GlassCard>

      {/* Meal Plan */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Mahlzeiten heute</h2>
        <div className="space-y-4">
          {[
            { name: 'Frühstück', time: '07:00', foods: ['Haferflocken mit Beeren (350 kcal)', 'Proteinshake (180 kcal)', 'Banane (100 kcal)'], cal: 630 },
            { name: 'Mittagessen', time: '12:00', foods: ['Hähnchenbrust 200g (330 kcal)', 'Reis 150g (195 kcal)', 'Gemüse Mix (80 kcal)'], cal: 605 },
            { name: 'Snack', time: '15:30', foods: ['Griechischer Joghurt (150 kcal)', 'Mandeln 30g (180 kcal)'], cal: 330 },
            { name: 'Abendessen', time: '19:00', foods: ['Lachs 200g (400 kcal)', 'Süßkartoffel (180 kcal)', 'Salat (55 kcal)'], cal: 635 },
            { name: 'Pre-Sleep', time: '21:30', foods: ['Casein Shake (200 kcal)'], cal: 200 },
          ].map((meal) => (
            <GlassCard key={meal.name} className="p-5" hover={false}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00FF94]/10 flex items-center justify-center">
                    <UtensilsCrossed className="w-5 h-5 text-[#00FF94]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{meal.name}</h3>
                    <p className="text-xs text-muted-foreground">{meal.time} Uhr</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#00D4FF]">{meal.cal} kcal</span>
              </div>
              <ul className="space-y-1.5 pl-[52px]">
                {meal.foods.map((food, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#00FF94]/50" />{food}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}
