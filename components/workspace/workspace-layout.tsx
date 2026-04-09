'use client'

import { useState, useEffect, useCallback } from 'react'
import type { WorkoutPlan, NutritionPlan, ProgressMetric, Contract } from '@/types'
import {
  initializeStore, getWorkoutPlans, getNutritionPlans,
  getProgressMetrics, getContractsForCustomer, getOrCreateThread,
} from '@/lib/store'
import { GlassCard } from '@/components/glass-card'
import { cn } from '@/lib/utils'
import {
  MessageCircle, Dumbbell, UtensilsCrossed, TrendingUp, Camera,
  CheckCircle2, AlertCircle, Package,
} from 'lucide-react'

// Lazy-ish imports to keep component structure clean
import { ChatWindow } from '@/components/chat/chat-window'
import { PlanViewer } from '@/components/workout/plan-viewer'
import { PlanBuilder } from '@/components/workout/plan-builder'
import { NutritionPlanViewer } from '@/components/nutrition/plan-viewer'
import { NutritionPlanEditor } from '@/components/nutrition/plan-editor'
import { ProgressChart } from '@/components/progress/progress-chart'
import { ProgressForm } from '@/components/progress/progress-form'
import { PhotoGallery } from '@/components/progress/photo-gallery'

interface WorkspaceLayoutProps {
  role: 'customer' | 'trainer'
  partnerId: string
  partnerName: string
  partnerImage?: string
  customerId: string
  trainerId: string
}

const TABS = [
  { key: 'chat', label: 'Chat', icon: MessageCircle },
  { key: 'training', label: 'Trainingsplan', icon: Dumbbell },
  { key: 'nutrition', label: 'Ernährung', icon: UtensilsCrossed },
  { key: 'progress', label: 'Fortschritt', icon: TrendingUp },
  { key: 'photos', label: 'Fotos', icon: Camera },
] as const

type TabKey = typeof TABS[number]['key']

const STATUS_MAP: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  active: { label: 'Aktiv', color: 'text-[#00FF94] bg-[#00FF94]/10 border-[#00FF94]/20', icon: CheckCircle2 },
  paused: { label: 'Pausiert', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', icon: AlertCircle },
  completed: { label: 'Abgeschlossen', color: 'text-muted-foreground bg-[#1A2332] border-white/[0.06]', icon: CheckCircle2 },
  draft: { label: 'Entwurf', color: 'text-[#00D4FF] bg-[#00A8FF]/10 border-[#00A8FF]/20', icon: Package },
  cancelled: { label: 'Gekündigt', color: 'text-red-400 bg-red-400/10 border-red-400/20', icon: AlertCircle },
}

export function WorkspaceLayout({
  role, partnerId, partnerName, partnerImage, customerId, trainerId,
}: WorkspaceLayoutProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('chat')
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([])
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>([])
  const [metrics, setMetrics] = useState<ProgressMetric[]>([])
  const [contract, setContract] = useState<Contract | null>(null)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    initializeStore()
    setWorkoutPlans(getWorkoutPlans(customerId))
    setNutritionPlans(getNutritionPlans(customerId))
    setMetrics(getProgressMetrics(customerId))
    const contracts = getContractsForCustomer(customerId)
    const activeContract = contracts.find((c) => c.trainer_id === trainerId && c.status === 'active')
      ?? contracts.find((c) => c.trainer_id === trainerId)
      ?? null
    setContract(activeContract)
    const thread = getOrCreateThread(trainerId, customerId)
    setThreadId(thread.id)
    setInitialized(true)
  }, [customerId, trainerId])

  const refreshWorkoutPlans = useCallback(() => {
    setWorkoutPlans(getWorkoutPlans(customerId))
  }, [customerId])

  const refreshNutritionPlans = useCallback(() => {
    setNutritionPlans(getNutritionPlans(customerId))
  }, [customerId])

  const handleMetricAdd = useCallback((metric: ProgressMetric) => {
    setMetrics(getProgressMetrics(customerId))
  }, [customerId])

  const currentUserId = role === 'customer' ? customerId : trainerId
  const latestWorkout = workoutPlans[0] ?? null
  const latestNutrition = nutritionPlans[0] ?? null
  const statusInfo = contract ? STATUS_MAP[contract.status] ?? STATUS_MAP.draft : null

  if (!initialized) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-16 rounded-2xl bg-[#1A2332]/50" />
        <div className="h-10 rounded-xl bg-[#1A2332]/50 max-w-md" />
        <div className="h-[400px] rounded-2xl bg-[#1A2332]/50" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Contract Status Bar */}
      <GlassCard className="p-4" hover={false}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {partnerImage ? (
              <img
                src={partnerImage}
                alt={partnerName}
                className="w-10 h-10 rounded-xl object-cover border border-white/[0.06]"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A8FF]/20 to-[#00FF94]/20 border border-[#00A8FF]/20 flex items-center justify-center">
                <span className="text-sm font-heading font-bold text-[#00D4FF]">
                  {partnerName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-sm font-heading font-semibold text-foreground">{partnerName}</h3>
              {contract && (
                <div className="flex items-center gap-2 mt-0.5">
                  {statusInfo && (
                    <span className={cn(
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border',
                      statusInfo.color
                    )}>
                      <statusInfo.icon className="w-2.5 h-2.5" />
                      {statusInfo.label}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {contract && (
            <div className="flex items-center gap-4 text-xs">
              <div className="text-right">
                <p className="text-muted-foreground/60">Sessions</p>
                <p className="font-semibold text-foreground">
                  {contract.sessions_used}
                  <span className="text-muted-foreground font-normal">/{contract.sessions_total}</span>
                </p>
              </div>
              <div className="w-24 h-2 rounded-full bg-[#1A2332] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00CC76] to-[#00FF94] transition-all duration-500"
                  style={{ width: `${Math.min((contract.sessions_used / contract.sessions_total) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Tab Navigation */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200',
              activeTab === tab.key
                ? role === 'trainer'
                  ? 'bg-[#00FF94]/10 text-[#00FF94] shadow-[0_0_10px_rgba(0,255,148,0.1)]'
                  : 'bg-[#00A8FF]/10 text-[#00D4FF] shadow-[0_0_10px_rgba(0,168,255,0.1)]'
                : 'text-muted-foreground hover:text-foreground hover:bg-[#1A2332]'
            )}
          >
            <tab.icon className={cn(
              'w-4 h-4',
              activeTab === tab.key && (role === 'trainer'
                ? 'drop-shadow-[0_0_6px_rgba(0,255,148,0.5)]'
                : 'drop-shadow-[0_0_6px_rgba(0,212,255,0.5)]')
            )} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Chat Tab */}
        {activeTab === 'chat' && threadId && (
          <GlassCard className="h-[500px] sm:h-[560px] overflow-hidden" hover={false}>
            <ChatWindow
              threadId={threadId}
              currentUserId={currentUserId}
              otherUserName={partnerName}
              otherUserImage={partnerImage}
            />
          </GlassCard>
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <>
            {role === 'customer' ? (
              latestWorkout ? (
                <PlanViewer plan={latestWorkout} editable />
              ) : (
                <GlassCard className="p-10 text-center" hover={false}>
                  <Dumbbell className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Dein Trainer hat noch keinen Trainingsplan erstellt.</p>
                  <p className="text-xs text-muted-foreground/50 mt-1">Sobald ein Plan vorliegt, siehst du ihn hier.</p>
                </GlassCard>
              )
            ) : (
              <PlanBuilder
                trainerId={trainerId}
                customerId={customerId}
                existingPlan={latestWorkout ?? undefined}
                onSave={() => refreshWorkoutPlans()}
              />
            )}
          </>
        )}

        {/* Nutrition Tab */}
        {activeTab === 'nutrition' && (
          <>
            {role === 'customer' ? (
              latestNutrition ? (
                <NutritionPlanViewer plan={latestNutrition} />
              ) : (
                <GlassCard className="p-10 text-center" hover={false}>
                  <UtensilsCrossed className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Dein Trainer hat noch keinen Ernährungsplan erstellt.</p>
                  <p className="text-xs text-muted-foreground/50 mt-1">Sobald ein Plan vorliegt, siehst du ihn hier.</p>
                </GlassCard>
              )
            ) : (
              <NutritionPlanEditor
                trainerId={trainerId}
                customerId={customerId}
                existingPlan={latestNutrition ?? undefined}
                onSave={() => refreshNutritionPlans()}
              />
            )}
          </>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-4">
            {role === 'customer' && (
              <ProgressForm customerId={customerId} onAdd={handleMetricAdd} />
            )}
            <ProgressChart metrics={metrics} />

            {/* Metrics Table */}
            {metrics.length > 0 && (
              <GlassCard className="overflow-hidden" hover={false}>
                <div className="p-4 border-b border-white/[0.04]">
                  <h3 className="text-sm font-heading font-semibold text-foreground">Messverlauf</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.04] bg-[#0B0F1A]/50">
                        <th className="text-left px-4 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Datum</th>
                        <th className="text-left px-4 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Gewicht</th>
                        <th className="text-left px-4 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Körperfett</th>
                        <th className="text-left px-4 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Muskelmasse</th>
                        <th className="text-left px-4 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Notizen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...metrics].reverse().map((m, idx) => (
                        <tr
                          key={m.id}
                          className={cn(
                            'border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors',
                            idx === 0 && 'bg-[#00A8FF]/[0.02]'
                          )}
                        >
                          <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">
                            {new Date(m.recorded_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}
                          </td>
                          <td className="px-4 py-2.5 text-foreground font-medium">
                            {m.weight_kg ? `${m.weight_kg} kg` : '–'}
                          </td>
                          <td className="px-4 py-2.5 text-foreground">
                            {m.body_fat_percent ? `${m.body_fat_percent}%` : '–'}
                          </td>
                          <td className="px-4 py-2.5 text-foreground">
                            {m.muscle_mass_kg ? `${m.muscle_mass_kg} kg` : '–'}
                          </td>
                          <td className="px-4 py-2.5 text-muted-foreground/70 truncate max-w-[200px]">
                            {m.notes || '–'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            )}
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <PhotoGallery customerId={customerId} canUpload={role === 'customer'} />
        )}
      </div>
    </div>
  )
}
