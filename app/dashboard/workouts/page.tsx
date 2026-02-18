import { GlassCard } from '@/components/glass-card'
import { Dumbbell, ChevronRight, Clock } from 'lucide-react'

export default function WorkoutsPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Trainingspläne</h1>
        <p className="text-muted-foreground mt-1">Deine aktiven Pläne</p>
      </div>

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
