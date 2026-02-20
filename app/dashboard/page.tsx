'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { LineChart } from '@/components/charts/line-chart'
import { BarChart } from '@/components/charts/bar-chart'
import { RadialProgress } from '@/components/charts/radial-progress'
import Link from 'next/link'
import { Dumbbell, UtensilsCrossed, TrendingUp, Calendar, MessageCircle, Search, ChevronRight, Flame, Target, Trophy } from 'lucide-react'
import { getMockUser, type MockUser } from '@/lib/mock-auth'

const overviewChartData = [
  {
    name: 'Gewicht (kg)',
    color: '#00D4FF',
    data: [
      { label: 'W1', value: 84.2 },
      { label: 'W2', value: 83.8 },
      { label: 'W3', value: 83.5 },
      { label: 'W4', value: 83.1 },
      { label: 'W5', value: 83.3 },
      { label: 'W6', value: 82.8 },
      { label: 'W7', value: 82.6 },
      { label: 'W8', value: 82.5 },
    ],
  },
  {
    name: 'Muskelmasse (kg)',
    color: '#00FF94',
    data: [
      { label: 'W1', value: 34.1 },
      { label: 'W2', value: 34.2 },
      { label: 'W3', value: 34.4 },
      { label: 'W4', value: 34.5 },
      { label: 'W5', value: 34.7 },
      { label: 'W6', value: 34.9 },
      { label: 'W7', value: 35.0 },
      { label: 'W8', value: 35.2 },
    ],
  },
]

const weeklyWorkouts = [
  { label: 'Mo', value: 1, color: '#00A8FF' },
  { label: 'Di', value: 1, color: '#00A8FF' },
  { label: 'Mi', value: 0, color: 'rgba(0,168,255,0.2)' },
  { label: 'Do', value: 1, color: '#00D4FF' },
  { label: 'Fr', value: 1, color: '#00D4FF' },
  { label: 'Sa', value: 1, color: '#00FF94' },
  { label: 'So', value: 0, color: 'rgba(0,168,255,0.2)' },
]

export default function DashboardPage() {
  const [user, setUser] = useState<MockUser | null>(null)

  useEffect(() => {
    setUser(getMockUser())
  }, [])

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Guten Morgen'
    if (hour < 18) return 'Guten Tag'
    return 'Guten Abend'
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{greeting()}{user ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
          <p className="text-muted-foreground mt-1">Hier ist dein Überblick</p>
        </div>
        <Link href="/search">
          <GradientButton variant="cyan" size="sm"><Search className="w-4 h-4" /> Coach finden</GradientButton>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Workouts diese Woche', value: '5', icon: Flame, color: 'text-[#00D4FF]', bg: 'bg-[#00A8FF]/10' },
          { label: 'Nächster Termin', value: 'Mo, 10:00', icon: Calendar, color: 'text-[#00FF94]', bg: 'bg-[#00FF94]/10' },
          { label: 'Aktuelle Streak', value: '12 Tage', icon: Trophy, color: 'text-[#FFD700]', bg: 'bg-[#FFD700]/10' },
          { label: 'Ziel-Fortschritt', value: '68%', icon: Target, color: 'text-[#00D4FF]', bg: 'bg-[#00A8FF]/10' },
        ].map((stat) => (
          <GlassCard key={stat.label} className="p-4">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Main Chart - Overview */}
      <GlassCard className="p-5 md:p-6" hover={false}>
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">Fortschritt der letzten 8 Wochen</h2>
            <p className="text-xs text-muted-foreground mt-1">Gewicht & Muskelmasse im Verlauf</p>
          </div>
          <Link href="/dashboard/progress" className="text-xs text-[#00D4FF] hover:text-[#00A8FF] transition-colors flex items-center gap-1">
            Details <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <LineChart
          series={overviewChartData}
          height={240}
          yUnit="kg"
          showArea
          showDots
        />
      </GlassCard>

      {/* Radial Progress + Weekly Bar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-5 md:p-6" hover={false}>
          <h3 className="text-base font-heading font-semibold text-foreground mb-5">Tagesziele</h3>
          <div className="flex items-center justify-around">
            <RadialProgress value={2180} max={2400} label="Kalorien" unit="kcal" color="#FF6B35" size={90} />
            <RadialProgress value={155} max={180} label="Protein" unit="g" color="#00D4FF" size={90} />
            <RadialProgress value={68} max={100} label="Ziel" unit="%" color="#00FF94" size={90} />
          </div>
        </GlassCard>

        <GlassCard className="p-5 md:p-6" hover={false}>
          <h3 className="text-base font-heading font-semibold text-foreground mb-2">Workouts diese Woche</h3>
          <p className="text-xs text-muted-foreground mb-3">5 von 5 geplanten Sessions</p>
          <BarChart
            data={weeklyWorkouts}
            height={150}
            showValues={false}
          />
        </GlassCard>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Schnellzugriff</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: '/dashboard/workouts', icon: Dumbbell, label: 'Trainingsplan', desc: 'Aktuellen Plan ansehen', color: '#00A8FF' },
            { href: '/dashboard/nutrition', icon: UtensilsCrossed, label: 'Ernährungsplan', desc: 'Mahlzeiten für heute', color: '#00FF94' },
            { href: '/dashboard/progress', icon: TrendingUp, label: 'Progress tracken', desc: 'Neue Messung eintragen', color: '#00D4FF' },
          ].map((action) => (
            <Link key={action.href} href={action.href}>
              <GlassCard className="p-5 flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${action.color}15` }}>
                  <action.icon className="w-6 h-6" style={{ color: action.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground group-hover:text-[#00D4FF] transition-colors">{action.label}</p>
                  <p className="text-sm text-muted-foreground">{action.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-[#00D4FF] transition-colors" />
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Appointments + Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Nächste Termine</h2>
          <GlassCard className="p-5" hover={false}>
            <div className="space-y-4">
              {[
                { day: 'Mo', time: '10:00', trainer: 'Max M.', type: 'Krafttraining' },
                { day: 'Mi', time: '18:00', trainer: 'Max M.', type: 'Cardio & Core' },
                { day: 'Fr', time: '09:00', trainer: 'Max M.', type: 'Full Body' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#0B0F1A]/50">
                  <div className="w-12 h-12 rounded-xl bg-[#00A8FF]/10 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-[#00D4FF] font-medium">{s.day}</span>
                    <span className="text-sm font-bold text-[#00D4FF]">{s.time}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{s.type}</p>
                    <p className="text-xs text-muted-foreground">mit {s.trainer}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Nachrichten</h2>
          <GlassCard className="p-5" hover={false}>
            <div className="space-y-4">
              {[
                { name: 'Max M.', message: 'Super Session heute! Vergiss nicht...', time: 'Vor 2h', unread: true },
                { name: 'Support', message: 'Willkommen bei FITNEXUS!', time: 'Vor 1d', unread: false },
              ].map((msg, i) => (
                <Link key={i} href="/dashboard/chat" className="flex items-center gap-4 p-3 rounded-xl bg-[#0B0F1A]/50 hover:bg-[#1A2332]/50 transition-colors">
                  <div className="w-10 h-10 rounded-full gradient-cyan flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">{msg.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm text-foreground">{msg.name}</p>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                  </div>
                  {msg.unread && <div className="w-2 h-2 rounded-full bg-[#00D4FF] flex-shrink-0" />}
                </Link>
              ))}
            </div>
            <Link href="/dashboard/chat" className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-[rgba(0,168,255,0.08)] text-sm text-[#00D4FF] hover:text-[#00A8FF] transition-colors">
              Alle Nachrichten <ChevronRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
