import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { TrendingUp, Camera, Scale, Ruler, Plus } from 'lucide-react'

export default function ProgressPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Fortschritt</h1>
          <p className="text-muted-foreground mt-1">Tracke deine Entwicklung</p>
        </div>
        <GradientButton variant="cyan" size="sm"><Plus className="w-4 h-4" /> Neuer Eintrag</GradientButton>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Gewicht', value: '82.5 kg', icon: Scale, trend: '-1.2 kg', color: '#00D4FF' },
          { label: 'Körperfett', value: '18.3%', icon: Ruler, trend: '-0.8%', color: '#00FF94' },
          { label: 'Muskelmasse', value: '35.2 kg', icon: TrendingUp, trend: '+0.5 kg', color: '#39FF14' },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <s.icon className="w-5 h-5 mx-auto mb-2" style={{ color: s.color }} />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xs mt-1 font-medium" style={{ color: s.color }}>{s.trend}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6" hover={false}>
        <h3 className="font-heading font-semibold text-foreground mb-4">Gewichtsverlauf</h3>
        <div className="h-48 flex items-center justify-center border border-dashed border-[rgba(0,168,255,0.15)] rounded-xl">
          <p className="text-sm text-muted-foreground">Chart wird nach Supabase-Integration angezeigt</p>
        </div>
      </GlassCard>

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
