import { GlassCard } from '@/components/glass-card'
import { UtensilsCrossed, Flame, Droplets, Wheat, Beef } from 'lucide-react'

export default function NutritionPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Ernährungsplan</h1>
        <p className="text-muted-foreground mt-1">Dein aktueller Plan</p>
      </div>

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
  )
}
