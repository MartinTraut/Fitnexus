'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Zap, ArrowRight } from 'lucide-react'
import { createMockUser, setMockUser } from '@/lib/mock-auth'

export default function RegisterPage() {
  const router = useRouter()

  const handleDemoLogin = (role: 'customer' | 'trainer') => {
    const name = role === 'customer' ? 'Alex Demo' : 'Sarah Coach'
    const email = role === 'customer' ? 'alex@demo.de' : 'sarah@coach.de'
    const user = createMockUser(name, email, role)
    setMockUser(user)
    router.push('/dashboard')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Konto erstellen
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Oder starte direkt mit dem Demo-Zugang
        </p>
      </div>

      <GlassCard className="p-6" hover={false} neonBorder>
        <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-widest font-medium">Sofort loslegen</p>
        <div className="space-y-3">
          <GradientButton
            onClick={() => handleDemoLogin('customer')}
            variant="cyan"
            size="xl"
            className="w-full"
          >
            <Zap className="w-5 h-5" />
            Ich suche einen Coach
            <ArrowRight className="w-4 h-4 ml-auto" />
          </GradientButton>
          <GradientButton
            onClick={() => handleDemoLogin('trainer')}
            variant="green"
            size="xl"
            className="w-full"
          >
            <Zap className="w-5 h-5" />
            Ich bin ein Coach
            <ArrowRight className="w-4 h-4 ml-auto" />
          </GradientButton>
        </div>
      </GlassCard>

      <p className="text-center text-xs text-muted-foreground/50">
        Kein echtes Konto noetig. Demo-Daten werden lokal gespeichert.
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Bereits registriert?{' '}
        <Link href="/auth/login" className="text-[#00D4FF] hover:text-[#00A8FF] font-medium transition-colors">
          Anmelden
        </Link>
      </p>
    </div>
  )
}
