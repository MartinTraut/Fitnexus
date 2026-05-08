'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Lock, LogIn, Sparkles, X, ArrowRight } from 'lucide-react'
import { GradientButton } from '@/components/gradient-button'

interface LoginRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export function LoginRequiredModal({
  isOpen,
  onClose,
  title = 'Vorschau-Modus',
  description = 'Diese Funktion ist Teil der Plattform für eingeloggte Mitglieder. Registriere dich kostenlos in unter 60 Sekunden, um Coaches zu suchen, zu filtern und Erstgespräche anzufragen.',
}: LoginRequiredModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-required-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Schließen"
        onClick={onClose}
        className="absolute inset-0 bg-[#060910]/80 backdrop-blur-md animate-in fade-in duration-200"
      />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#0D1320]/95 border border-[rgba(0,168,255,0.15)] shadow-[0_0_60px_rgba(0,168,255,0.18)] p-7 sm:p-9 animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          aria-label="Schließen"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground/50 hover:text-foreground hover:bg-[#1A2332]/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-[#00A8FF]/[0.08] border border-[#00A8FF]/20 flex items-center justify-center mb-5">
          <Lock className="w-6 h-6 text-[#00D4FF]" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF94]/[0.08] border border-[#00FF94]/20 text-xs text-[#00FF94] font-medium mb-4">
          <Sparkles className="w-3 h-3" />
          Kostenlos registrieren
        </div>

        <h2
          id="login-required-title"
          className="text-2xl font-heading font-bold text-foreground mb-3 leading-tight"
        >
          {title}
        </h2>
        <p className="text-sm text-muted-foreground/80 leading-relaxed mb-7">
          {description}
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/register" className="block">
            <GradientButton variant="cyan" size="lg" glow className="w-full">
              <Sparkles className="w-4 h-4" />
              Jetzt kostenlos registrieren
              <ArrowRight className="w-4 h-4" />
            </GradientButton>
          </Link>
          <Link href="/login" className="block">
            <GradientButton variant="cyan" outline size="md" className="w-full">
              <LogIn className="w-4 h-4" />
              Ich habe schon ein Konto
            </GradientButton>
          </Link>
        </div>

        <p className="text-[11px] text-muted-foreground/40 text-center mt-5">
          Keine Kreditkarte erforderlich. Suche, Filter und Erstgespräche bleiben kostenlos.
        </p>
      </div>
    </div>
  )
}
