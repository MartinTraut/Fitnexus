'use client'

import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import {
  CreditCard, CheckCircle2, Users, MessageCircle,
  FileText, Download, Zap, Crown,
} from 'lucide-react'

const invoices = [
  { id: 'INV-2026-003', date: '01.04.2026', amount: '99,00€', status: 'Bezahlt' },
  { id: 'INV-2026-002', date: '01.03.2026', amount: '99,00€', status: 'Bezahlt' },
  { id: 'INV-2026-001', date: '01.02.2026', amount: '99,00€', status: 'Bezahlt' },
]

export default function TrainerBillingPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Billing & Abonnement</h1>
        <p className="text-muted-foreground mt-1">Verwalte dein Abonnement und deine Rechnungen</p>
      </div>

      {/* Current Plan */}
      <GlassCard className="p-6 border border-[#00FF94]/20" hover={false} glow="green">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00FF94]/10 flex items-center justify-center">
              <Crown className="w-7 h-7 text-[#00FF94]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-heading font-bold text-foreground">Pro Plan</h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#00FF94]/10 text-[#00FF94] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Aktiv
                </span>
              </div>
              <p className="text-muted-foreground mt-0.5">99€/Monat · Nächste Abrechnung: 01.05.2026</p>
            </div>
          </div>
          <GradientButton variant="green" size="sm" outline>
            Plan verwalten
          </GradientButton>
        </div>
      </GlassCard>

      {/* Usage Stats */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Nutzung diesen Monat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Aktive Kunden', value: '12/25', icon: Users, color: 'text-[#00FF94]', bg: 'bg-[#00FF94]/10', usage: 48 },
            { label: 'Nachrichten gesendet', value: '156', icon: MessageCircle, color: 'text-[#00D4FF]', bg: 'bg-[#00A8FF]/10', usage: 62 },
            { label: 'Pläne erstellt', value: '8', icon: FileText, color: 'text-[#FFD700]', bg: 'bg-[#FFD700]/10', usage: 32 },
          ].map((stat) => (
            <GlassCard key={stat.label} className="p-5" hover={false}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1A2332] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00CC76] to-[#00FF94] transition-all duration-500"
                  style={{ width: `${stat.usage}%` }}
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Plan Comparison */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Planvergleich</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Starter */}
          <GlassCard className="p-6" hover={false}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00A8FF]/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground">Starter</h3>
                <p className="text-sm text-muted-foreground">29€/Monat</p>
              </div>
            </div>
            <ul className="space-y-2 mb-5">
              {['Bis zu 5 Kunden', 'Basis-Profil', 'Nachrichten', 'Lead-Benachrichtigungen'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <GradientButton variant="cyan" size="sm" outline className="w-full">
              Downgrade
            </GradientButton>
          </GlassCard>

          {/* Pro */}
          <GlassCard className="p-6 border border-[#00FF94]/20 relative" hover={false}>
            <div className="absolute -top-3 right-4 text-xs px-3 py-1 rounded-full bg-[#00FF94] text-[#0B0F1A] font-bold">
              Aktueller Plan
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00FF94]/10 flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#00FF94]" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground">Pro</h3>
                <p className="text-sm text-muted-foreground">99€/Monat</p>
              </div>
            </div>
            <ul className="space-y-2 mb-5">
              {['Bis zu 25 Kunden', 'Premium-Profil mit Badge', 'Unbegrenzte Nachrichten', 'Pläne & Workspace', 'Priorität im Matching', 'Analytics & Reports'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF94] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <GradientButton variant="green" size="sm" className="w-full" disabled>
              Aktueller Plan
            </GradientButton>
          </GlassCard>
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Rechnungsverlauf</h2>
        <GlassCard className="overflow-hidden" hover={false}>
          <div className="hidden md:grid grid-cols-4 gap-4 px-5 py-3 border-b border-[rgba(0,255,148,0.08)] text-xs text-muted-foreground font-medium">
            <span>Rechnung</span>
            <span>Datum</span>
            <span>Betrag</span>
            <span>Status</span>
          </div>
          {invoices.map((invoice) => (
            <div key={invoice.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 px-5 py-4 border-b border-[rgba(0,255,148,0.05)] last:border-0 hover:bg-[#1A2332]/30 transition-colors">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground md:hidden" />
                <span className="text-sm font-medium text-foreground">{invoice.id}</span>
              </div>
              <span className="text-sm text-muted-foreground">{invoice.date}</span>
              <span className="text-sm font-medium text-foreground">{invoice.amount}</span>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#00FF94]/10 text-[#00FF94] font-medium">
                  {invoice.status}
                </span>
                <button className="text-muted-foreground hover:text-[#00FF94] transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </GlassCard>
      </div>

      {/* Payment Method */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Zahlungsmethode</h2>
        <GlassCard className="p-5" hover={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded-lg bg-[#1A2332] flex items-center justify-center border border-[rgba(0,255,148,0.1)]">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Visa •••• 4242</p>
                <p className="text-xs text-muted-foreground">Läuft ab 12/2028</p>
              </div>
            </div>
            <GradientButton variant="green" size="sm" outline>
              Ändern
            </GradientButton>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
