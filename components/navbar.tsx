'use client'

import { cn } from '@/lib/utils'
import { Menu, X, Search, Zap, LogIn } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[var(--ease-smooth)]',
        isScrolled
          ? 'bg-[#0B0F1A]/85 backdrop-blur-2xl border-b border-[rgba(0,168,255,0.06)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo — proportional, prominent */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image src="/logo-icon.png" alt="FITNEXUS" width={42} height={42} className="object-contain" priority />
            <span className="font-heading font-bold text-[22px] tracking-[0.04em] gradient-brand-text">
              FITNEXUS
            </span>
          </Link>

          {/* Desktop: 2 Funnel CTAs + Login */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/fuer-kunden">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#00D4FF] border border-[#00A8FF]/20 bg-[#00A8FF]/[0.05] hover:bg-[#00A8FF]/[0.12] hover:border-[#00A8FF]/35 hover:shadow-[0_0_20px_rgba(0,168,255,0.12)] transition-all duration-300">
                <Search className="w-4 h-4" />
                Ich suche einen Coach
              </button>
            </Link>
            <Link href="/for-coaches">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#00FF94] border border-[#00FF94]/20 bg-[#00FF94]/[0.05] hover:bg-[#00FF94]/[0.12] hover:border-[#00FF94]/35 hover:shadow-[0_0_20px_rgba(0,255,148,0.12)] transition-all duration-300">
                <Zap className="w-4 h-4" />
                Ich bin ein Coach
              </button>
            </Link>

            <div className="w-px h-7 bg-[rgba(0,168,255,0.1)] mx-1" />

            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground/60 hover:text-foreground transition-colors duration-300 px-3 py-2 rounded-xl hover:bg-[rgba(0,168,255,0.04)]"
            >
              <LogIn className="w-3.5 h-3.5" />
              Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 text-foreground rounded-xl hover:bg-[rgba(0,168,255,0.04)] active:scale-90 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        'md:hidden overflow-hidden transition-all duration-400 ease-[var(--ease-smooth)]',
        isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="bg-[#0B0F1A]/95 backdrop-blur-2xl border-t border-[rgba(0,168,255,0.06)] px-4 py-5 space-y-3">
          <Link href="/fuer-kunden" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#00A8FF]/10 bg-[#00A8FF]/[0.03] hover:bg-[#00A8FF]/[0.07] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A8FF] to-[#00D4FF] flex items-center justify-center flex-shrink-0">
                <Search className="w-5 h-5 text-[#0B0F1A]" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground">Ich suche einen Coach</p>
                <p className="text-xs text-muted-foreground mt-0.5">Finde den perfekten Trainer für dich</p>
              </div>
            </div>
          </Link>

          <Link href="/for-coaches" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#00FF94]/10 bg-[#00FF94]/[0.03] hover:bg-[#00FF94]/[0.07] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00FF94] to-[#39FF14] flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-[#0B0F1A]" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground">Ich bin ein Coach</p>
                <p className="text-xs text-muted-foreground mt-0.5">Professionalisiere dein Business</p>
              </div>
            </div>
          </Link>

          <div className="pt-2 border-t border-[rgba(0,168,255,0.06)]">
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl transition-colors">
              <LogIn className="w-4 h-4" /> Anmelden
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
