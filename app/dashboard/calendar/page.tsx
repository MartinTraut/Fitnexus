import { GlassCard } from '@/components/glass-card'
import { Calendar } from 'lucide-react'

export default function CalendarPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Kalender</h1>
        <p className="text-muted-foreground mt-1">Deine Termine im Überblick</p>
      </div>
      <GlassCard className="p-8" hover={false}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-[#00A8FF]/10 flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-[#00D4FF]" />
          </div>
          <h3 className="font-heading font-semibold text-foreground text-lg">Kalender-Integration</h3>
          <p className="text-sm text-muted-foreground mt-2 text-center max-w-md">
            Hier wird dein Terminkalender angezeigt, sobald du einen Vertrag mit einem Trainer abgeschlossen hast.
          </p>
        </div>
      </GlassCard>
    </div>
  )
}
