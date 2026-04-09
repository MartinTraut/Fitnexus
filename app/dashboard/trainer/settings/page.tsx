'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Mail, Lock, Bell, Smartphone, Inbox,
  ToggleRight, Users, AlertTriangle, Trash2,
} from 'lucide-react'

export default function TrainerSettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    leads: true,
  })
  const [isAvailable, setIsAvailable] = useState(true)

  const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <div
      onClick={onToggle}
      className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${active ? 'bg-[#00FF94]' : 'bg-[#1A2332]'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${active ? 'translate-x-5' : 'translate-x-1'}`} />
    </div>
  )

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Einstellungen</h1>
        <p className="text-muted-foreground mt-1">Konto, Benachrichtigungen und Verfügbarkeit verwalten</p>
      </div>

      {/* Account */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Konto</h2>
        <GlassCard className="p-6 space-y-5" hover={false}>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> E-Mail-Adresse
            </Label>
            <Input
              defaultValue="max@trainer.de"
              className="bg-[#0B0F1A]/50 border-[rgba(0,255,148,0.15)] focus:border-[#00FF94]/40"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Passwort
            </Label>
            <div className="flex items-center gap-3">
              <Input
                type="password"
                defaultValue="••••••••"
                disabled
                className="bg-[#0B0F1A]/50 border-[rgba(0,255,148,0.15)] flex-1"
              />
              <GradientButton variant="green" size="sm" outline>
                Ändern
              </GradientButton>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Benachrichtigungen</h2>
        <GlassCard className="divide-y divide-[rgba(0,255,148,0.08)]" hover={false}>
          {[
            {
              key: 'email' as const,
              icon: Bell,
              label: 'E-Mail-Benachrichtigungen',
              desc: 'Zusammenfassungen und wichtige Updates per E-Mail',
            },
            {
              key: 'push' as const,
              icon: Smartphone,
              label: 'Push-Benachrichtigungen',
              desc: 'Sofortige Benachrichtigungen im Browser',
            },
            {
              key: 'leads' as const,
              icon: Inbox,
              label: 'Lead-Benachrichtigungen',
              desc: 'Sofort benachrichtigt werden bei neuen Anfragen',
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#00FF94]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-[#00FF94]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <Toggle
                active={notifications[item.key]}
                onToggle={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
              />
            </div>
          ))}
        </GlassCard>
      </div>

      {/* Availability */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Verfügbarkeit</h2>
        <GlassCard className="p-6 space-y-5" hover={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isAvailable ? 'bg-[#00FF94]/10' : 'bg-red-500/10'}`}>
                <ToggleRight className={`w-4 h-4 ${isAvailable ? 'text-[#00FF94]' : 'text-red-400'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {isAvailable ? 'Verfügbar' : 'Nicht verfügbar'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isAvailable
                    ? 'Du wirst in der Trainersuche angezeigt'
                    : 'Du bist in der Trainersuche ausgeblendet'}
                </p>
              </div>
            </div>
            <Toggle active={isAvailable} onToggle={() => setIsAvailable(!isAvailable)} />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Maximale Kundenanzahl
            </Label>
            <Input
              type="number"
              defaultValue="25"
              className="bg-[#0B0F1A]/50 border-[rgba(0,255,148,0.15)] focus:border-[#00FF94]/40 max-w-[200px]"
            />
            <p className="text-xs text-muted-foreground">Aktuell: 12 aktive Kunden</p>
          </div>
        </GlassCard>
      </div>

      {/* Danger Zone */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-red-400 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Gefahrenzone
        </h2>
        <GlassCard className="p-6 border border-red-500/20" hover={false}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Konto löschen</p>
              <p className="text-xs text-muted-foreground mt-1">
                Dein Konto und alle Daten werden unwiderruflich gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-200 whitespace-nowrap">
              <Trash2 className="w-4 h-4" /> Konto löschen
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
