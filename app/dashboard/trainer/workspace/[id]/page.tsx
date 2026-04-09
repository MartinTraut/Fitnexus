'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Users, CheckCircle2, Package, Calendar, Clock, Target, Dumbbell } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { WorkspaceLayout } from '@/components/workspace/workspace-layout'
import { cn } from '@/lib/utils'

const clientData: Record<string, {
  name: string
  customerId: string
  pkg: string
  sessions: { used: number; total: number }
  since: string
  goals: string[]
  lastSession: string
  nextSession: string
}> = {
  'client-001': { name: 'Client#3847', customerId: 'c_demo', pkg: 'Premium Paket', sessions: { used: 8, total: 12 }, since: 'Januar 2026', goals: ['Muskelaufbau', 'Krafttraining', 'Ernährung'], lastSession: '05.04.2026', nextSession: '09.04.2026, 10:00' },
  'client-002': { name: 'Client#1938', customerId: 'c_demo_2', pkg: 'Starter Paket', sessions: { used: 2, total: 4 }, since: 'März 2026', goals: ['Marathon', 'Ausdauer'], lastSession: '03.04.2026', nextSession: '10.04.2026, 09:00' },
  'client-003': { name: 'Client#5612', customerId: 'c_demo_3', pkg: 'Premium Paket', sessions: { used: 12, total: 12 }, since: 'Dezember 2025', goals: ['Gewichtsverlust', 'Functional Fitness'], lastSession: '04.04.2026', nextSession: 'Nicht geplant' },
}

const overviewTabs = [
  { key: 'workspace', label: 'Workspace' },
  { key: 'overview', label: 'Übersicht' },
] as const

type ViewMode = typeof overviewTabs[number]['key']

export default function TrainerWorkspacePage() {
  const params = useParams()
  const [viewMode, setViewMode] = useState<ViewMode>('workspace')

  const id = params.id as string
  const client = clientData[id] ?? clientData['client-001']
  const progress = Math.round((client.sessions.used / client.sessions.total) * 100)

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Back + Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/trainer/clients">
          <button className="w-10 h-10 rounded-xl bg-[#1A2332] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[#1A2332]/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{client.name}</h1>
          <p className="text-muted-foreground text-sm">Workspace · {client.pkg}</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-[#00FF94]/10 text-[#00FF94] font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Aktiv
        </span>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-1">
        {overviewTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setViewMode(tab.key)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
              viewMode === tab.key
                ? 'bg-[#00FF94]/10 text-[#00FF94]'
                : 'text-muted-foreground hover:text-foreground hover:bg-[#1A2332]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {viewMode === 'workspace' && (
        <WorkspaceLayout
          role="trainer"
          partnerId={id}
          partnerName={client.name}
          customerId={client.customerId}
          trainerId="tr_1"
        />
      )}

      {viewMode === 'overview' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Sessions', value: `${client.sessions.used}/${client.sessions.total}`, icon: Dumbbell, color: 'text-[#00FF94]', bg: 'bg-[#00FF94]/10' },
              { label: 'Letzte Session', value: client.lastSession, icon: Clock, color: 'text-[#00D4FF]', bg: 'bg-[#00A8FF]/10' },
              { label: 'Nächste Session', value: client.nextSession.split(',')[0], icon: Calendar, color: 'text-[#FFD700]', bg: 'bg-[#FFD700]/10' },
              { label: 'Kunde seit', value: client.since, icon: Users, color: 'text-[#00FF94]', bg: 'bg-[#00FF94]/10' },
            ].map((stat) => (
              <GlassCard key={stat.label} className="p-4">
                <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <p className="text-sm font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
              </GlassCard>
            ))}
          </div>

          {/* Session Progress */}
          <GlassCard className="p-5" hover={false}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Session-Fortschritt</h3>
              <span className={`text-sm font-bold ${progress >= 100 ? 'text-[#FFD700]' : 'text-[#00FF94]'}`}>{progress}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#1A2332] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  progress >= 100
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]'
                    : 'bg-gradient-to-r from-[#00CC76] to-[#00FF94]'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {client.sessions.used} von {client.sessions.total} Sessions absolviert
              {progress >= 100 && ' · Paket abgeschlossen'}
            </p>
          </GlassCard>

          {/* Goals */}
          <GlassCard className="p-5" hover={false}>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#00FF94]" /> Fitness-Ziele
            </h3>
            <div className="flex flex-wrap gap-2">
              {client.goals.map((goal) => (
                <span key={goal} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/20">
                  {goal}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
