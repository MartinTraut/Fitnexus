'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from '@/lib/auth'
import { initializeStore } from '@/lib/store'
import { Mail, Lock, Eye, EyeOff, Search, Zap, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const user = signIn(email, password)
      initializeStore()
      router.push(user.role === 'trainer' ? '/dashboard/trainer' : '/dashboard/customer')
    } catch {
      setError('Anmeldung fehlgeschlagen.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (role: 'customer' | 'trainer') => {
    const demoEmail = role === 'customer' ? 'demo@kunde.de' : 'demo@coach.de'
    signIn(demoEmail, 'demo', role)
    initializeStore()
    router.push(role === 'trainer' ? '/dashboard/trainer' : '/dashboard/customer')
  }

  return (
    <GlassCard className="p-8" hover={false} neonBorder>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">Willkommen zurück</h1>
        <p className="text-sm text-muted-foreground mt-2">Melde dich bei FITNEXUS an</p>
      </div>

      {/* ═══ DEMO QUICK LOGIN ═══ */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#FFD700]" />
          <span className="text-xs font-medium text-[#FFD700]">Demo-Zugang</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleDemoLogin('customer')}
            className="flex items-center justify-center gap-2 h-12 rounded-xl border border-[#00A8FF]/30 bg-[#00A8FF]/[0.06] hover:bg-[#00A8FF]/[0.12] hover:border-[#00A8FF]/50 hover:shadow-[0_0_20px_rgba(0,168,255,0.15)] transition-all duration-300 text-sm font-medium text-[#00D4FF]"
          >
            <Search className="w-4 h-4" />
            Als Kunde
          </button>
          <button
            onClick={() => handleDemoLogin('trainer')}
            className="flex items-center justify-center gap-2 h-12 rounded-xl border border-[#00FF94]/30 bg-[#00FF94]/[0.06] hover:bg-[#00FF94]/[0.12] hover:border-[#00FF94]/50 hover:shadow-[0_0_20px_rgba(0,255,148,0.15)] transition-all duration-300 text-sm font-medium text-[#00FF94]"
          >
            <Zap className="w-4 h-4" />
            Als Coach
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[rgba(0,168,255,0.08)]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[rgba(13,19,32,0.8)] px-3 text-muted-foreground">oder mit E-Mail</span>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-muted-foreground">E-Mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="name@beispiel.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-[#0D1320] border-[rgba(0,168,255,0.12)] focus:border-[#00A8FF]/40 h-12"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm text-muted-foreground">Passwort</Label>
            <Link href="/forgot-password" className="text-xs text-[#00D4FF] hover:text-[#00A8FF] transition-colors">
              Vergessen?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Dein Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-[#0D1320] border-[rgba(0,168,255,0.12)] focus:border-[#00A8FF]/40 h-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <GradientButton type="submit" variant="cyan" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Anmelden...' : 'Anmelden'}
        </GradientButton>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Noch kein Konto?{' '}
        <Link href="/register" className="text-[#00D4FF] hover:text-[#00A8FF] font-medium transition-colors">
          Jetzt registrieren
        </Link>
      </p>
    </GlassCard>
  )
}
