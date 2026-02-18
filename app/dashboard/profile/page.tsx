'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Mail, MapPin, Edit3 } from 'lucide-react'
import { getMockUser, type MockUser } from '@/lib/mock-auth'

export default function ProfilePage() {
  const [user, setUser] = useState<MockUser | null>(null)

  useEffect(() => {
    setUser(getMockUser())
  }, [])

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Profil</h1>
        <GradientButton variant="cyan" size="sm"><Edit3 className="w-4 h-4" /> Bearbeiten</GradientButton>
      </div>

      <GlassCard className="p-6" hover={false}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full gradient-brand flex items-center justify-center text-3xl font-bold text-white">
            {user?.name?.[0] ?? 'C'}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-heading font-bold text-foreground">{user?.displayName ?? 'Client#4829'}</h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5 justify-center md:justify-start"><Mail className="w-3.5 h-3.5" /> {user?.email ?? 'max@example.de'}</p>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5 justify-center md:justify-start"><MapPin className="w-3.5 h-3.5" /> Berlin, Deutschland</p>
          </div>
        </div>
      </GlassCard>

      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Fitness-Ziele</h2>
        <div className="flex flex-wrap gap-2">
          {['Muskelaufbau', 'Ausdauer', 'Flexibilität'].map((g) => (
            <span key={g} className="px-4 py-2 rounded-xl text-sm font-medium bg-[#00A8FF]/10 text-[#00D4FF] border border-[#00A8FF]/20">{g}</span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Kontoeinstellungen</h2>
        <GlassCard className="divide-y divide-[rgba(0,168,255,0.08)]" hover={false}>
          {[
            { label: 'Anonymität', desc: 'Dein Name ist für Trainer verborgen', active: true },
            { label: 'Benachrichtigungen', desc: 'Push & E-Mail Benachrichtigungen', active: true },
            { label: 'Dunkles Design', desc: 'Immer im Dark Mode', active: true },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${s.active ? 'bg-[#00A8FF]' : 'bg-[#1A2332]'}`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${s.active ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  )
}
