'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Mail, Lock, User, Eye, EyeOff, Search, Award } from 'lucide-react'
import { createMockUser, setMockUser } from '@/lib/mock-auth'

type Role = 'customer' | 'trainer'

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!role) return
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    const user = createMockUser(name, email, role)
    setMockUser(user)

    setTimeout(() => {
      router.push('/dashboard')
    }, 600)
  }

  const handleGoogleSignup = () => {
    if (!role) return
    const user = createMockUser('Max Mustermann', 'max@gmail.com', role)
    setMockUser(user)
    router.push('/dashboard')
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Dein Coach. Deine Ziele. Dein Nexus.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Wähle, wie du Fitnexus nutzen möchtest:
        </p>
      </div>

      {/* Role Selection - Prototype Style */}
      <div className="space-y-3">
        <GradientButton
          variant="cyan"
          outline={role !== 'customer'}
          size="xl"
          className={cn(
            'w-full justify-start px-6',
            role === 'customer' && 'shadow-[0_0_25px_rgba(0,168,255,0.2)]'
          )}
          onClick={() => setRole('customer')}
        >
          <Search className="w-5 h-5" />
          <span className="flex-1 text-left">Ich suche einen Coach</span>
        </GradientButton>
        {role === 'customer' && (
          <p className="text-center text-xs text-muted-foreground">Kunde</p>
        )}

        <GradientButton
          variant="green"
          outline={role !== 'trainer'}
          size="xl"
          className={cn(
            'w-full justify-start px-6',
            role === 'trainer' && 'shadow-[0_0_25px_rgba(0,255,148,0.2)]'
          )}
          onClick={() => setRole('trainer')}
        >
          <Award className="w-5 h-5" />
          <span className="flex-1 text-left">Ich bin ein Coach</span>
        </GradientButton>
        {role === 'trainer' && (
          <p className="text-center text-xs text-muted-foreground">Coach</p>
        )}
      </div>

      {role && (
        <GlassCard className="p-6" hover={false}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-muted-foreground">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <Input id="name" name="name" type="text" placeholder="Dein Name" required className="pl-10 bg-[#0B0F1A]/50 border-[rgba(0,168,255,0.1)] focus:border-[#00A8FF]/40 rounded-xl transition-all duration-300 placeholder:text-muted-foreground/40" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">E-Mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <Input id="email" name="email" type="email" placeholder="deine@email.de" required className="pl-10 bg-[#0B0F1A]/50 border-[rgba(0,168,255,0.1)] focus:border-[#00A8FF]/40 rounded-xl transition-all duration-300 placeholder:text-muted-foreground/40" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-muted-foreground">Passwort</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <Input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Mindestens 8 Zeichen" required minLength={8} className="pl-10 pr-10 bg-[#0B0F1A]/50 border-[rgba(0,168,255,0.1)] focus:border-[#00A8FF]/40 rounded-xl transition-all duration-300 placeholder:text-muted-foreground/40" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <GradientButton type="submit" variant={role === 'trainer' ? 'green' : 'cyan'} size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Konto wird erstellt...' : 'Kostenlos registrieren'}
            </GradientButton>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[rgba(0,168,255,0.06)]" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-3 bg-[#0D1320] text-muted-foreground/60">oder</span></div>
          </div>

          <button onClick={handleGoogleSignup} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[rgba(0,168,255,0.1)] bg-[#0B0F1A]/30 text-foreground font-medium text-sm hover:border-[rgba(0,168,255,0.25)] hover:bg-[#0B0F1A]/60 transition-all duration-300">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Mit Google registrieren
          </button>

          <p className="mt-4 text-xs text-center text-muted-foreground/60">
            Mit der Registrierung akzeptierst du unsere{' '}
            <Link href="/agb" className="text-[#00D4FF]/70 hover:text-[#00D4FF] transition-colors">AGB</Link>{' '}und{' '}
            <Link href="/datenschutz" className="text-[#00D4FF]/70 hover:text-[#00D4FF] transition-colors">Datenschutzrichtlinie</Link>.
          </p>
        </GlassCard>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Bereits registriert?{' '}
        <Link href="/auth/login" className="text-[#00D4FF] hover:text-[#00A8FF] font-medium transition-colors duration-300">Anmelden</Link>
      </p>
    </div>
  )
}
