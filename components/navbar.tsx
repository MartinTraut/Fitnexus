'use client'

import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'
import { GradientButton } from '@/components/gradient-button'
import { Menu, X, Zap } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createMockUser, setMockUser, getMockUser } from '@/lib/mock-auth'

const links = [
  { href: '/search', label: 'Coaches' },
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Preise' },
  { href: '/#faq', label: 'FAQ' },
]

export function Navbar() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    setIsLoggedIn(!!getMockUser())
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDemoLogin = () => {
    const user = createMockUser('Alex Demo', 'alex@demo.de', 'customer')
    setMockUser(user)
    router.push('/dashboard')
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[var(--ease-smooth)]',
        isScrolled
          ? 'glass border-b border-[rgba(0,168,255,0.06)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <Logo size="lg" />

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-gradient-to-r after:from-[#00A8FF] after:to-[#00D4FF] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <Link href="/dashboard">
                <GradientButton size="sm" variant="cyan">
                  Dashboard
                </GradientButton>
              </Link>
            ) : (
              <>
                <button
                  onClick={handleDemoLogin}
                  className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 px-4 py-2 flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Demo
                </button>
                <Link href="/auth/login">
                  <GradientButton size="sm" variant="cyan">
                    Loslegen
                  </GradientButton>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground transition-transform duration-200 active:scale-90"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        'md:hidden overflow-hidden transition-all duration-400 ease-[var(--ease-smooth)]',
        isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="glass border-t border-[rgba(0,168,255,0.06)] px-4 py-6 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-muted-foreground hover:text-foreground hover:bg-[#00A8FF]/[0.04] transition-all duration-200 px-3 py-3 rounded-xl"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 mt-3 space-y-3 border-t border-[rgba(0,168,255,0.06)]">
            {isLoggedIn ? (
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <GradientButton size="md" variant="cyan" className="w-full">
                  Dashboard
                </GradientButton>
              </Link>
            ) : (
              <>
                <button onClick={handleDemoLogin} className="w-full text-base font-medium text-foreground px-3 py-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Demo starten
                </button>
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <GradientButton size="md" variant="cyan" className="w-full">
                    Loslegen
                  </GradientButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
