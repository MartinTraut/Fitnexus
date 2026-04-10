'use client'

import { useEffect, useState, useCallback } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { OfferModal } from '@/components/contract/offer-modal'
import { initializeStore, getContractsForTrainer, updateContractStatus } from '@/lib/store'
import type { Contract } from '@/types'
import {
  FileText, Plus, CheckCircle2, Clock, XCircle, PauseCircle,
  Users, Euro, Calendar, ChevronRight,
} from 'lucide-react'
import Link from 'next/link'

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof Clock }> = {
  draft: { label: 'Entwurf', color: 'text-[#FFD700]', bg: 'bg-[#FFD700]/10', icon: Clock },
  active: { label: 'Aktiv', color: 'text-[#00FF94]', bg: 'bg-[#00FF94]/10', icon: CheckCircle2 },
  paused: { label: 'Pausiert', color: 'text-[#00D4FF]', bg: 'bg-[#00A8FF]/10', icon: PauseCircle },
  completed: { label: 'Abgeschlossen', color: 'text-muted-foreground', bg: 'bg-[#1A2332]', icon: CheckCircle2 },
  cancelled: { label: 'Storniert', color: 'text-red-400', bg: 'bg-red-500/10', icon: XCircle },
}

export default function TrainerContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [offerOpen, setOfferOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const loadData = useCallback(() => {
    initializeStore()
    setContracts(getContractsForTrainer('tr_1'))
    setMounted(true)
  }, [])

  useEffect(() => { loadData() }, [loadData])

  const filtered = filter === 'all' ? contracts : contracts.filter(c => c.status === filter)
  const activeCount = contracts.filter(c => c.status === 'active').length
  const totalRevenue = contracts.filter(c => c.status === 'active').reduce((s, c) => s + c.monthly_rate, 0)

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Verträge</h1>
          <p className="text-muted-foreground mt-1">Verwalte deine Coaching-Verträge und Angebote</p>
        </div>
        <GradientButton variant="green" size="sm" onClick={() => setOfferOpen(true)}>
          <Plus className="w-4 h-4" /> Neues Angebot
        </GradientButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Gesamt', value: mounted ? contracts.length : '...', icon: FileText, color: 'text-[#00D4FF]', bg: 'bg-[#00A8FF]/10' },
          { label: 'Aktiv', value: mounted ? activeCount : '...', icon: CheckCircle2, color: 'text-[#00FF94]', bg: 'bg-[#00FF94]/10' },
          { label: 'Umsatz (aktiv)', value: mounted ? `${totalRevenue.toLocaleString('de-DE')}€` : '...', icon: Euro, color: 'text-[#00FF94]', bg: 'bg-[#00FF94]/10' },
          { label: 'Plattformgebühr', value: '7%', icon: Users, color: 'text-[#FFD700]', bg: 'bg-[#FFD700]/10' },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4" hover={false}>
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-2`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'Alle' },
          { key: 'active', label: 'Aktiv' },
          { key: 'draft', label: 'Entwürfe' },
          { key: 'completed', label: 'Abgeschlossen' },
          { key: 'cancelled', label: 'Storniert' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              filter === t.key
                ? 'bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-[#1A2332] border border-transparent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Contract List */}
      <div className="space-y-3">
        {filtered.length === 0 && mounted && (
          <GlassCard className="p-8 text-center" hover={false}>
            <FileText className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Keine Verträge in dieser Kategorie</p>
          </GlassCard>
        )}

        {filtered.map((contract) => {
          const cfg = statusConfig[contract.status] ?? statusConfig.draft
          const StatusIcon = cfg.icon
          const progress = contract.sessions_total > 0
            ? Math.round((contract.sessions_used / contract.sessions_total) * 100)
            : 0

          return (
            <GlassCard key={contract.id} className="p-5" hover={false}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Left: Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                      <StatusIcon className="w-3 h-3" /> {cfg.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Client#{contract.customer_id.slice(-4).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-foreground">{contract.monthly_rate.toLocaleString('de-DE')}€</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(contract.start_date).toLocaleDateString('de-DE')}
                      {contract.end_date && ` – ${new Date(contract.end_date).toLocaleDateString('de-DE')}`}
                    </span>
                  </div>
                </div>

                {/* Center: Sessions Progress */}
                <div className="w-full md:w-48 flex-shrink-0">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Sessions</span>
                    <span className="font-medium text-foreground">{contract.sessions_used}/{contract.sessions_total}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1A2332] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#00CC76] to-[#00FF94] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {contract.status === 'draft' && (
                    <GradientButton variant="green" size="sm" onClick={() => { updateContractStatus(contract.id, 'active'); loadData() }}>
                      Aktivieren
                    </GradientButton>
                  )}
                  {contract.status === 'active' && (
                    <GradientButton variant="green" size="sm" outline onClick={() => { updateContractStatus(contract.id, 'completed'); loadData() }}>
                      Abschließen
                    </GradientButton>
                  )}
                  <Link href={`/dashboard/trainer/workspace/${contract.customer_id}`}>
                    <GradientButton variant="cyan" size="sm" outline>
                      Workspace <ChevronRight className="w-3 h-3" />
                    </GradientButton>
                  </Link>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Offer Modal */}
      <OfferModal
        trainerId="tr_1"
        customerId="c_demo"
        customerName="Client#DEMO"
        isOpen={offerOpen}
        onClose={() => { setOfferOpen(false); loadData() }}
      />
    </div>
  )
}
