'use client'

import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { LineChart } from '@/components/charts/line-chart'
import { TrendingUp, Camera, Scale, Ruler, Plus, Target } from 'lucide-react'

const weightHistory = [
  {
    name: 'Gewicht',
    color: '#00D4FF',
    data: [
      { label: 'Jan', value: 86.0 },
      { label: 'Feb', value: 85.2 },
      { label: 'Mär', value: 84.8 },
      { label: 'Apr', value: 84.2 },
      { label: 'Mai', value: 83.8 },
      { label: 'Jun', value: 83.5 },
      { label: 'Jul', value: 83.1 },
      { label: 'Aug', value: 82.8 },
      { label: 'Sep', value: 82.5 },
    ],
  },
]

const bodyFatHistory = [
  {
    name: 'Körperfett',
    color: '#FF6B35',
    data: [
      { label: 'Jan', value: 22.1 },
      { label: 'Feb', value: 21.5 },
      { label: 'Mär', value: 21.0 },
      { label: 'Apr', value: 20.3 },
      { label: 'Mai', value: 19.8 },
      { label: 'Jun', value: 19.4 },
      { label: 'Jul', value: 19.0 },
      { label: 'Aug', value: 18.6 },
      { label: 'Sep', value: 18.3 },
    ],
  },
]

const muscleHistory = [
  {
    name: 'Muskelmasse',
    color: '#00FF94',
    data: [
      { label: 'Jan', value: 32.8 },
      { label: 'Feb', value: 33.1 },
      { label: 'Mär', value: 33.4 },
      { label: 'Apr', value: 33.8 },
      { label: 'Mai', value: 34.1 },
      { label: 'Jun', value: 34.4 },
      { label: 'Jul', value: 34.7 },
      { label: 'Aug', value: 34.9 },
      { label: 'Sep', value: 35.2 },
    ],
  },
]

const allMetrics = [
  ...weightHistory,
  ...muscleHistory,
]

export default function ProgressPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Fortschritt</h1>
          <p className="text-muted-foreground mt-1">Tracke deine Entwicklung über die Zeit</p>
        </div>
        <GradientButton variant="cyan" size="sm"><Plus className="w-4 h-4" /> Neuer Eintrag</GradientButton>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Gewicht', value: '82.5 kg', icon: Scale, trend: '-3.5 kg', trendDesc: 'seit Start', color: '#00D4FF' },
          { label: 'Körperfett', value: '18.3%', icon: Ruler, trend: '-3.8%', trendDesc: 'seit Start', color: '#FF6B35' },
          { label: 'Muskelmasse', value: '35.2 kg', icon: TrendingUp, trend: '+2.4 kg', trendDesc: 'seit Start', color: '#00FF94' },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <s.icon className="w-5 h-5 mx-auto mb-2" style={{ color: s.color }} />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xs mt-1.5 font-semibold" style={{ color: s.color }}>{s.trend}</p>
            <p className="text-[10px] text-muted-foreground/60">{s.trendDesc}</p>
          </GlassCard>
        ))}
      </div>

      {/* Combined Overview Chart */}
      <GlassCard className="p-5 md:p-6" hover={false}>
        <div className="flex items-center justify-between mb-1">
          <div>
            <h3 className="font-heading font-semibold text-foreground">Gesamtübersicht</h3>
            <p className="text-xs text-muted-foreground mt-1">Gewicht & Muskelmasse über 9 Monate</p>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00FF94]/10">
            <Target className="w-3.5 h-3.5 text-[#00FF94]" />
            <span className="text-xs font-medium text-[#00FF94]">Auf Kurs</span>
          </div>
        </div>
        <LineChart series={allMetrics} height={260} yUnit="kg" showArea showDots />
      </GlassCard>

      {/* Individual Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-5 md:p-6" hover={false}>
          <h3 className="font-heading font-semibold text-foreground mb-1">Gewichtsverlauf</h3>
          <p className="text-xs text-muted-foreground mb-2">86.0 → 82.5 kg</p>
          <LineChart series={weightHistory} height={200} yUnit="kg" showArea />
        </GlassCard>

        <GlassCard className="p-5 md:p-6" hover={false}>
          <h3 className="font-heading font-semibold text-foreground mb-1">Körperfett</h3>
          <p className="text-xs text-muted-foreground mb-2">22.1% → 18.3%</p>
          <LineChart series={bodyFatHistory} height={200} yUnit="%" showArea />
        </GlassCard>
      </div>

      {/* Muscle Mass Chart */}
      <GlassCard className="p-5 md:p-6" hover={false}>
        <h3 className="font-heading font-semibold text-foreground mb-1">Muskelmasse</h3>
        <p className="text-xs text-muted-foreground mb-2">Kontinuierlicher Aufbau: 32.8 → 35.2 kg</p>
        <LineChart series={muscleHistory} height={200} yUnit="kg" showArea />
      </GlassCard>

      {/* Progress Photos */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Fortschrittsfotos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="aspect-[3/4] rounded-2xl border-2 border-dashed border-[rgba(0,168,255,0.2)] flex flex-col items-center justify-center gap-2 hover:border-[#00A8FF] hover:bg-[#00A8FF]/5 transition-all duration-200">
            <Camera className="w-8 h-8 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Foto hinzufügen</span>
          </button>
        </div>
      </div>
    </div>
  )
}
