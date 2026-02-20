'use client'

import { GlassCard } from '@/components/glass-card'
import { LineChart } from '@/components/charts/line-chart'
import { BarChart } from '@/components/charts/bar-chart'
import { Dumbbell, ChevronRight, Clock, TrendingUp, Flame } from 'lucide-react'

const volumeData = [
  {
    name: 'Trainingsvolumen (Tonnen)',
    color: '#00A8FF',
    data: [
      { label: 'W1', value: 12.4 },
      { label: 'W2', value: 13.1 },
      { label: 'W3', value: 14.2 },
      { label: 'W4', value: 13.8 },
      { label: 'W5', value: 15.5 },
      { label: 'W6', value: 16.1 },
      { label: 'W7', value: 15.8 },
      { label: 'W8', value: 17.3 },
    ],
  },
]

const muscleGroupData = [
  { label: 'Brust', value: 18, color: '#00A8FF' },
  { label: 'Rücken', value: 22, color: '#00D4FF' },
  { label: 'Beine', value: 24, color: '#00FF94' },
  { label: 'Schulter', value: 12, color: '#39FF14' },
  { label: 'Arme', value: 14, color: '#00A8FF' },
  { label: 'Core', value: 10, color: '#00D4FF' },
]

export default function WorkoutsPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Trainingspläne</h1>
        <p className="text-muted-foreground mt-1">Deine aktiven Pläne und Statistiken</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Workouts gesamt', value: '48', icon: Dumbbell, color: '#00A8FF' },
          { label: 'Streak', value: '12 Tage', icon: Flame, color: '#FF6B35' },
          { label: 'Volumen-Trend', value: '+12%', icon: TrendingUp, color: '#00FF94' },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4">
            <s.icon className="w-5 h-5 mb-2" style={{ color: s.color }} />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Trainingsvolumen Chart */}
      <GlassCard className="p-5 md:p-6" hover={false}>
        <div className="flex items-center justify-between mb-1">
          <div>
            <h3 className="font-heading font-semibold text-foreground">Trainingsvolumen</h3>
            <p className="text-xs text-muted-foreground mt-1">Gesamtes Volumen pro Woche in Tonnen</p>
          </div>
          <span className="text-xs font-medium text-[#00FF94]">+39% in 8 Wochen</span>
        </div>
        <LineChart series={volumeData} height={220} yUnit="t" showArea />
      </GlassCard>

      {/* Muskelgruppen-Verteilung */}
      <GlassCard className="p-5 md:p-6" hover={false}>
        <h3 className="font-heading font-semibold text-foreground mb-1">Sets pro Muskelgruppe</h3>
        <p className="text-xs text-muted-foreground mb-3">Verteilung diese Woche</p>
        <BarChart data={muscleGroupData} height={180} yUnit="" />
      </GlassCard>

      {/* Aktueller Plan */}
      <GlassCard className="p-6 neon-border" hover={false}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-medium text-[#00D4FF] tracking-brand-wide uppercase">Aktueller Plan</span>
            <h3 className="text-xl font-heading font-bold text-foreground mt-1">Hypertrophie – Woche 4/8</h3>
            <p className="text-sm text-muted-foreground mt-1">von Max Mustermann</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#00A8FF]/10 flex items-center justify-center">
            <Dumbbell className="w-7 h-7 text-[#00D4FF]" />
          </div>
        </div>

        <div className="space-y-2 mt-6">
          {[
            { day: 'Montag', name: 'Push – Brust, Schulter, Trizeps', duration: '60 min', done: true },
            { day: 'Dienstag', name: 'Pull – Rücken, Bizeps', duration: '55 min', done: true },
            { day: 'Mittwoch', name: 'Ruhetag', duration: '', done: true },
            { day: 'Donnerstag', name: 'Legs – Beine, Waden', duration: '65 min', done: false },
            { day: 'Freitag', name: 'Upper Body – Oberkörper', duration: '50 min', done: false },
            { day: 'Samstag', name: 'Cardio & Core', duration: '40 min', done: false },
          ].map((w, i) => (
            <div key={i} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${w.done ? 'bg-[#00FF94]/5' : 'bg-[#0B0F1A]/50 hover:bg-[#1A2332]/50'}`}>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${w.done ? 'bg-[#00FF94]' : 'bg-muted-foreground/30'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${w.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{w.day}: {w.name}</p>
              </div>
              {w.duration && <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{w.duration}</div>}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
