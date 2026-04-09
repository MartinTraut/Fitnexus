'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import {
  User, Mail, MapPin, Target, Shield, Bell,
  Moon, X, Plus,
} from 'lucide-react'

const defaultGoals = ['Muskelaufbau', 'Ausdauer', 'Flexibilität']

export default function CustomerProfilePage() {
  const [goals, setGoals] = useState<string[]>(defaultGoals)
  const [newGoal, setNewGoal] = useState('')
  const [notifications, setNotifications] = useState(true)

  const addGoal = () => {
    const trimmed = newGoal.trim()
    if (trimmed && !goals.includes(trimmed)) {
      setGoals([...goals, trimmed])
      setNewGoal('')
    }
  }

  const removeGoal = (goal: string) => {
    setGoals(goals.filter((g) => g !== goal))
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
          Mein Profil
        </h1>
        <p className="mt-1 text-muted-foreground">
          Verwalte deine persönlichen Daten und Einstellungen.
        </p>
      </div>

      {/* Avatar + Name */}
      <GlassCard className="p-6" hover={false}>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00A8FF]/20 to-[#00FF94]/20 border border-[#00A8FF]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-heading font-bold text-[#00D4FF]">CL</span>
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">Client#4821</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
              <Shield className="w-3.5 h-3.5 text-[#00FF94]" />
              Anonymes Profil aktiv
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Personal Info */}
      <GlassCard className="p-6 space-y-5" hover={false}>
        <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
          <User className="w-4 h-4 text-[#00D4FF]" />
          Persönliche Daten
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Anzeigename
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                readOnly
                value="Client#4821"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D1320] border border-[rgba(0,168,255,0.1)] text-foreground text-sm focus:outline-none focus:border-[#00A8FF]/40 cursor-not-allowed opacity-70"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Dein Anzeigename wird automatisch generiert, um deine Anonymität zu schützen.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              E-Mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                readOnly
                value="client@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D1320] border border-[rgba(0,168,255,0.1)] text-foreground text-sm focus:outline-none cursor-not-allowed opacity-70"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Standort
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                defaultValue="Berlin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D1320] border border-[rgba(0,168,255,0.1)] text-foreground text-sm focus:outline-none focus:border-[#00A8FF]/40 transition-colors"
                placeholder="Dein Standort"
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Fitness Goals */}
      <GlassCard className="p-6 space-y-4" hover={false}>
        <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
          <Target className="w-4 h-4 text-[#00FF94]" />
          Fitnessziele
        </h3>

        <div className="flex flex-wrap gap-2">
          {goals.map((goal) => (
            <span
              key={goal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-[#00A8FF]/10 text-[#00D4FF] border border-[#00A8FF]/20"
            >
              {goal}
              <button
                onClick={() => removeGoal(goal)}
                className="hover:text-red-400 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addGoal()}
            placeholder="Neues Ziel hinzufügen..."
            className="flex-1 px-4 py-2 rounded-xl bg-[#0D1320] border border-[rgba(0,168,255,0.1)] text-foreground text-sm focus:outline-none focus:border-[#00A8FF]/40 transition-colors placeholder:text-muted-foreground"
          />
          <button
            onClick={addGoal}
            className="px-3 py-2 rounded-xl bg-[#00A8FF]/10 text-[#00D4FF] hover:bg-[#00A8FF]/20 border border-[#00A8FF]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>

      {/* Settings */}
      <GlassCard className="p-6 space-y-5" hover={false}>
        <h3 className="font-heading font-semibold text-foreground">Einstellungen</h3>

        <div className="space-y-4">
          {/* Anonymity Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#00FF94]/10 p-2 rounded-xl">
                <Shield className="w-4 h-4 text-[#00FF94]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Anonymität</p>
                <p className="text-xs text-muted-foreground">
                  Deine Identität bleibt bis zur Vertragsbindung geschützt
                </p>
              </div>
            </div>
            <span className="text-xs font-medium text-[#00FF94] bg-[#00FF94]/10 px-2.5 py-1 rounded-full border border-[#00FF94]/20">
              Aktiv
            </span>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#00A8FF]/10 p-2 rounded-xl">
                <Bell className="w-4 h-4 text-[#00D4FF]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Benachrichtigungen</p>
                <p className="text-xs text-muted-foreground">E-Mail und Push-Benachrichtigungen</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                notifications ? 'bg-[#00A8FF]' : 'bg-[#1A2332]'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                  notifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#00A8FF]/10 p-2 rounded-xl">
                <Moon className="w-4 h-4 text-[#00D4FF]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Immer aktiv</p>
              </div>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-[#1A2332] px-2.5 py-1 rounded-full">
              Standard
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Save */}
      <div className="flex justify-end">
        <GradientButton variant="cyan" size="lg">
          Änderungen speichern
        </GradientButton>
      </div>
    </div>
  )
}
