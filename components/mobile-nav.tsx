'use client'

import { cn } from '@/lib/utils'
import { Home, Search, Calendar, MessageCircle, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/search', icon: Search, label: 'Suche' },
  { href: '/dashboard/calendar', icon: Calendar, label: 'Kalender' },
  { href: '/dashboard/chat', icon: MessageCircle, label: 'Chat' },
  { href: '/dashboard/profile', icon: User, label: 'Profil' },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="glass border-t border-[rgba(0,168,255,0.1)] shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/search' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ease-[var(--ease-smooth)] relative',
                  isActive
                    ? 'text-[#00D4FF]'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isActive && (
                  <div className="absolute -top-2 w-8 h-1 rounded-full bg-gradient-to-r from-[#00A8FF] to-[#00D4FF] shadow-[0_0_10px_rgba(0,168,255,0.5)]" />
                )}
                <div className={cn(
                  'relative transition-all duration-300',
                  isActive && 'drop-shadow-[0_0_8px_rgba(0,212,255,0.6)] scale-110'
                )}>
                  <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
                </div>
                <span className={cn(
                  'text-[10px] font-medium transition-colors duration-300',
                  isActive && 'text-[#00D4FF]'
                )}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom)] bg-[#0D1320]" />
    </nav>
  )
}
