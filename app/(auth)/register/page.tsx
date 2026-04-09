'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { signUp } from '@/lib/auth'
import { initializeStore } from '@/lib/store'
import type { UserRole } from '@/types'
import { Search, Zap, Sparkles, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<'customer' | 'trainer' | null>(null)

  const handleQuickRegister = (role: UserRole) => {
    setLoading(role as 'customer' | 'trainer')
    const email = role === 'customer' ? 'demo@kunde.de' : 'demo@coach.de'
    signUp(email, 'demo', role)
    initializeStore()
    setTimeout(() => {
      router.push(role === 'trainer' ? '/dashboard/trainer' : '/dashboard/customer')
    }, 400)
  }

  return (
    <GlassCard className="p-8" hover={false} neonBorder>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">Willkommen bei FITNEXUS</h1>
        <p className="text-sm text-muted-foreground mt-2">Wähle deine Rolle und starte sofort</p>
      </div>

      {/* Demo Badge */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20">
          <Sparkles className="w-3 h-3" />
          Demo-Modus — Sofort loslegen
        </span>
      </div>

      <div className="space-y-4">
        {/* Customer Button */}
        <button
          onClick={() => handleQuickRegister('customer')}
          disabled={loading !== null}
          className="w-full group"
        >
          <GlassCard
            className={`p-6 flex items-center gap-4 text-left transition-all duration-300 ${
              loading === 'customer' ? 'border-[#00A8FF]/50 shadow-[0_0_30px_rgba(0,168,255,0.2)]' : 'group-hover:border-[#00A8FF]/30'
            }`}
            glow="cyan"
          >
            <div className="w-14 h-14 rounded-2xl gradient-cyan flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(0,168,255,0.3)] transition-all duration-300">
              <Search className="w-6 h-6 text-[#0B0F1A]" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-foreground text-lg">Ich suche einen Coach</h3>
              <p className="text-sm text-muted-foreground mt-0.5">Finde den perfekten Trainer für deine Ziele</p>
            </div>
            <ArrowRight className={`w-5 h-5 text-[#00D4FF] transition-all duration-300 ${
              loading === 'customer' ? 'animate-pulse' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
            }`} />
          </GlassCard>
        </button>

        {/* Trainer Button */}
        <button
          onClick={() => handleQuickRegister('trainer')}
          disabled={loading !== null}
          className="w-full group"
        >
          <GlassCard
            className={`p-6 flex items-center gap-4 text-left transition-all duration-300 ${
              loading === 'trainer' ? 'border-[#00FF94]/50 shadow-[0_0_30px_rgba(0,255,148,0.2)]' : 'group-hover:border-[#00FF94]/30'
            }`}
            glow="green"
          >
            <div className="w-14 h-14 rounded-2xl gradient-green flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all duration-300">
              <Zap className="w-6 h-6 text-[#0B0F1A]" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-foreground text-lg">Ich bin ein Coach</h3>
              <p className="text-sm text-muted-foreground mt-0.5">Erstelle dein Profil und gewinne Kunden</p>
            </div>
            <ArrowRight className={`w-5 h-5 text-[#00FF94] transition-all duration-300 ${
              loading === 'trainer' ? 'animate-pulse' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
            }`} />
          </GlassCard>
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground/60 mt-6 leading-relaxed">
        Demo-Zugang — keine echte Registrierung nötig.
        <br />
        Alle Daten werden lokal im Browser gespeichert.
      </p>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[rgba(0,168,255,0.08)]" />
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Bereits registriert?{' '}
        <Link href="/login" className="text-[#00D4FF] hover:text-[#00A8FF] font-medium transition-colors">
          Anmelden
        </Link>
      </p>
    </GlassCard>
  )
}
