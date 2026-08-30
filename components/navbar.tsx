'use client'

import { cn } from '@/lib/utils'
import { Menu, X, Search, Zap, LogIn } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

const navCta =
  'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border ' +
  'transition-[background-color,border-color,box-shadow,color] duration-300 ease-[var(--ease-smooth)]'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Escape schliesst das Menue — sonst ist die Seite mit der Tastatur blockiert.
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[var(--ease-smooth)]',
        isScrolled
          ? 'bg-[#0B0F1A]/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-[rgba(0,168,255,0.09)] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-smooth)]',
            isScrolled ? 'h-[68px]' : 'h-20'
          )}
        >
          {/* Wortmarke mit Signet — die Marke bleibt auch ohne Scroll sichtbar */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 rounded-lg"
            aria-label="FITNEXUS — zur Startseite"
          >
            <Image
              src="/logo-icon.png"
              alt=""
              width={72}
              height={72}
              className={cn(
                'object-contain transition-all duration-500 ease-[var(--ease-smooth)] h-auto',
                isScrolled ? 'w-8' : 'w-9'
              )}
              priority
            />
            <span className="font-heading font-bold text-[clamp(1.25rem,0.6vw+1.1rem,1.6rem)] leading-none tracking-[0.04em] gradient-brand-text">
              FITNEXUS
            </span>
          </Link>

          {/* Desktop: zwei Funnel-Einstiege + Login */}
          <nav aria-label="Hauptnavigation" className="hidden md:flex items-center gap-3">
            <Link
              href="/fuer-kunden"
              className={cn(
                navCta,
                'text-[#00D4FF] border-[#00A8FF]/20 bg-[#00A8FF]/[0.05] hover:bg-[#00A8FF]/[0.12] hover:border-[#00A8FF]/40 hover:shadow-[0_0_24px_-4px_rgba(0,168,255,0.35)]'
              )}
            >
              <Search className="w-4 h-4" aria-hidden />
              Ich suche einen Coach
            </Link>
            <Link
              href="/for-coaches"
              className={cn(
                navCta,
                'text-[#00FF94] border-[#00FF94]/20 bg-[#00FF94]/[0.05] hover:bg-[#00FF94]/[0.12] hover:border-[#00FF94]/40 hover:shadow-[0_0_24px_-4px_rgba(0,255,148,0.35)]'
              )}
            >
              <Zap className="w-4 h-4" aria-hidden />
              Ich bin ein Coach
            </Link>

            <div className="w-px h-7 bg-[rgba(0,168,255,0.12)] mx-1" aria-hidden />

            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm font-medium text-soft hover:text-foreground transition-colors duration-300 px-3 py-2 rounded-xl hover:bg-[rgba(0,168,255,0.06)]"
            >
              <LogIn className="w-3.5 h-3.5" aria-hidden />
              Login
            </Link>
          </nav>

          {/* Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="md:hidden p-2.5 text-foreground rounded-xl hover:bg-[rgba(0,168,255,0.06)] active:scale-90 transition-all duration-200"
            aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Lesefortschritt — haarfein, erst sichtbar sobald die Leiste greift */}
      <motion.div
        aria-hidden
        style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
        className={cn(
          'absolute bottom-0 left-0 right-0 h-px origin-left gradient-brand transition-opacity duration-500',
          isScrolled ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Mobile-Menü — beim Schliessen aus der Tabreihenfolge nehmen,
          sonst landet der Fokus in einem unsichtbaren Panel. */}
      <div
        id="mobile-menu"
        inert={!isMobileMenuOpen}
        className={cn(
          'md:hidden overflow-hidden transition-all duration-500 ease-[var(--ease-smooth)]',
          isMobileMenuOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="bg-[#0B0F1A]/95 backdrop-blur-2xl border-t border-[rgba(0,168,255,0.08)] px-4 py-5 space-y-3">
          <Link
            href="/fuer-kunden"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-4 p-4 rounded-2xl border border-[#00A8FF]/12 bg-[#00A8FF]/[0.04] active:bg-[#00A8FF]/[0.09] transition-all duration-300"
          >
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A8FF] to-[#00D4FF] flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-[#0B0F1A]" aria-hidden />
            </span>
            <span>
              <span className="block font-heading font-bold text-foreground">Ich suche einen Coach</span>
              <span className="block text-xs text-faint mt-0.5">Finde den passenden Trainer</span>
            </span>
          </Link>

          <Link
            href="/for-coaches"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-4 p-4 rounded-2xl border border-[#00FF94]/12 bg-[#00FF94]/[0.04] active:bg-[#00FF94]/[0.09] transition-all duration-300"
          >
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00FF94] to-[#39FF14] flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-[#0B0F1A]" aria-hidden />
            </span>
            <span>
              <span className="block font-heading font-bold text-foreground">Ich bin ein Coach</span>
              <span className="block text-xs text-faint mt-0.5">Professionalisiere dein Business</span>
            </span>
          </Link>

          <div className="pt-2 border-t border-[rgba(0,168,255,0.08)]">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-soft hover:text-foreground rounded-xl transition-colors"
            >
              <LogIn className="w-4 h-4" aria-hidden /> Anmelden
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
