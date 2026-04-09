'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import Link from 'next/link'
import {
  initializeStore,
  getContractsForTrainer,
} from '@/lib/store'
import type { Contract } from '@/types'
import {
  Users, Package, ArrowRight,
  Clock, CheckCircle2, AlertCircle, XCircle,
} from 'lucide-react'

const contractStatusConfig: Record<string, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  active: {
    label: 'Aktiv',
    className: 'bg-[#00FF94]/10 text-[#00FF94]',
    icon: CheckCircle2,
  },
  draft: {
    label: 'Entwurf',
    className: 'bg-yellow-500/10 text-yellow-400',
    icon: AlertCircle,
  },
  paused: {
    label: 'Pausiert',
    className: 'bg-[#00A8FF]/10 text-[#00D4FF]',
    icon: Clock,
  },
  completed: {
    label: 'Abgeschlossen',
    className: 'bg-[#00FF94]/10 text-[#00FF94]',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Gekündigt',
    className: 'bg-red-500/10 text-red-400',
    icon: XCircle,
  },
}

export default function TrainerClientsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    initializeStore()
    setContracts(getContractsForTrainer('tr_1'))
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Kunden</h1>
          <p className="text-muted-foreground mt-1">
            {contracts.filter((c) => c.status === 'active').length} aktive Kunden
          </p>
        </div>
      </div>

      {contracts.length === 0 ? (
        <GlassCard className="p-12 text-center" hover={false}>
          <div className="bg-[#00FF94]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-[#00FF94]" />
          </div>
          <h2 className="font-heading font-semibold text-foreground text-lg mb-2">
            Noch keine Kunden
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Sobald du Leads annimmst und Verträge erstellst, erscheinen deine Kunden hier.
          </p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contracts.map((contract) => {
            const clientName = `Client#${contract.customer_id.slice(-4).toUpperCase()}`
            const progress = contract.sessions_total
              ? Math.round((contract.sessions_used / contract.sessions_total) * 100)
              : 0
            const isComplete = progress >= 100
            const statusCfg = contractStatusConfig[contract.status] ?? contractStatusConfig.active
            const StatusIcon = statusCfg.icon
            const startDate = new Date(contract.start_date).toLocaleDateString('de-DE', {
              month: 'short',
              year: 'numeric',
            })

            return (
              <GlassCard key={contract.id} className="p-5" hover={false}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00FF94]/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#00FF94]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{clientName}</h3>
                        <p className="text-[10px] text-muted-foreground">Seit {startDate}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${statusCfg.className}`}>
                      <StatusIcon className="w-3 h-3" /> {statusCfg.label}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Paket:</span>
                      <span className="text-foreground font-medium">{contract.monthly_rate}€</span>
                    </div>
                  </div>

                  {/* Session Progress */}
                  {contract.sessions_total > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground">Sessions</span>
                        <span className={`text-xs font-medium ${isComplete ? 'text-[#FFD700]' : 'text-[#00FF94]'}`}>
                          {contract.sessions_used}/{contract.sessions_total}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#1A2332] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isComplete
                              ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]'
                              : 'bg-gradient-to-r from-[#00CC76] to-[#00FF94]'
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action */}
                  <Link href={`/dashboard/trainer/workspace/${contract.customer_id}`}>
                    <GradientButton variant="green" size="sm" outline className="w-full mt-1">
                      Workspace öffnen <ArrowRight className="w-4 h-4" />
                    </GradientButton>
                  </Link>
                </div>
              </GlassCard>
            )
          })}
        </div>
      )}
    </div>
  )
}
