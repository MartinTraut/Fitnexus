'use client'

import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Calendar, Clock, MapPin, Plus, ChevronLeft, ChevronRight, Video, User } from 'lucide-react'

const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const currentWeek = [
  { day: 'Mo', date: 17, hasEvent: true },
  { day: 'Di', date: 18, hasEvent: false },
  { day: 'Mi', date: 19, hasEvent: true },
  { day: 'Do', date: 20, hasEvent: false, isToday: true },
  { day: 'Fr', date: 21, hasEvent: true },
  { day: 'Sa', date: 22, hasEvent: false },
  { day: 'So', date: 23, hasEvent: false },
]

const appointments = [
  { time: '10:00', duration: '60 min', title: 'Krafttraining – Push Day', trainer: 'Max Mustermann', type: 'Vor Ort', location: 'FitGym Berlin, Mitte', color: '#00A8FF', icon: MapPin, day: 'Mo, 17. Feb' },
  { time: '18:00', duration: '45 min', title: 'Cardio & Core', trainer: 'Max Mustermann', type: 'Online', location: 'Video-Call', color: '#00FF94', icon: Video, day: 'Mi, 19. Feb' },
  { time: '09:00', duration: '60 min', title: 'Full Body Workout', trainer: 'Max Mustermann', type: 'Vor Ort', location: 'FitGym Berlin, Mitte', color: '#00D4FF', icon: MapPin, day: 'Fr, 21. Feb' },
]

const upcomingWeeks = [
  { week: 'KW 9', sessions: 3, focus: 'Hypertrophie Block 2' },
  { week: 'KW 10', sessions: 3, focus: 'Hypertrophie Block 2' },
  { week: 'KW 11', sessions: 4, focus: 'Intensivwoche' },
  { week: 'KW 12', sessions: 2, focus: 'Deload-Woche' },
]

export default function CalendarPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Kalender</h1>
          <p className="text-muted-foreground mt-1">Deine Termine & Planung</p>
        </div>
        <GradientButton variant="cyan" size="sm"><Plus className="w-4 h-4" /> Termin</GradientButton>
      </div>

      {/* Week Navigation */}
      <GlassCard className="p-5" hover={false}>
        <div className="flex items-center justify-between mb-5">
          <button className="w-8 h-8 rounded-xl bg-[#0B0F1A]/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-heading font-semibold text-foreground">17. – 23. Februar 2026</h3>
          <button className="w-8 h-8 rounded-xl bg-[#0B0F1A]/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {currentWeek.map((d) => (
            <button
              key={d.date}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-200 ${
                d.isToday
                  ? 'bg-[#00A8FF]/15 border border-[#00A8FF]/30'
                  : 'hover:bg-[#1A2332]/50'
              }`}
            >
              <span className="text-[10px] text-muted-foreground uppercase font-medium">{d.day}</span>
              <span className={`text-lg font-bold ${d.isToday ? 'text-[#00D4FF]' : 'text-foreground'}`}>{d.date}</span>
              {d.hasEvent && (
                <div className={`w-1.5 h-1.5 rounded-full ${d.isToday ? 'bg-[#00D4FF]' : 'bg-[#00FF94]'}`} />
              )}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Appointments */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Anstehende Termine</h2>
        <div className="space-y-4">
          {appointments.map((apt, i) => (
            <GlassCard key={i} className="p-5 group cursor-pointer" hover>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0" style={{ backgroundColor: `${apt.color}12` }}>
                  <span className="text-xs font-bold" style={{ color: apt.color }}>{apt.time}</span>
                  <span className="text-[8px] text-muted-foreground">{apt.duration}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-medium text-muted-foreground">{apt.day}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-medium" style={{ backgroundColor: `${apt.color}12`, color: apt.color }}>
                      {apt.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-[#00D4FF] transition-colors">{apt.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="w-3 h-3" /> {apt.trainer}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <apt.icon className="w-3 h-3" /> {apt.location}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Upcoming Weeks Overview */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Kommende Wochen</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {upcomingWeeks.map((w) => (
            <GlassCard key={w.week} className="p-4 text-center">
              <p className="text-xs font-bold text-[#00D4FF]">{w.week}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{w.sessions}x</p>
              <p className="text-[10px] text-muted-foreground mt-1">{w.focus}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}
