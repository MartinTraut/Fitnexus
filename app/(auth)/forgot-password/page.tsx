'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, ArrowLeft, Check } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <GlassCard className="p-8 text-center" hover={false} neonBorder>
        <div className="w-16 h-16 rounded-full gradient-cyan flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-[#0B0F1A]" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">E-Mail gesendet</h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          Wir haben dir einen Link zum Zurücksetzen deines Passworts an <strong className="text-foreground">{email}</strong> gesendet.
        </p>
        <Link href="/login">
          <GradientButton variant="cyan" outline size="md">
            <ArrowLeft className="w-4 h-4" /> Zurück zum Login
          </GradientButton>
        </Link>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-8" hover={false} neonBorder>
      <Link href="/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Zurück zum Login
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">Passwort vergessen?</h1>
        <p className="text-sm text-muted-foreground mt-2">Gib deine E-Mail ein und wir senden dir einen Reset-Link.</p>
      </div>

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

        <GradientButton type="submit" variant="cyan" size="lg" className="w-full">
          Link senden
        </GradientButton>
      </form>
    </GlassCard>
  )
}
