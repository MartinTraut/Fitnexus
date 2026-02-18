'use client'

import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Search, Calendar, MessageCircle, User,
  Dumbbell, UtensilsCrossed, TrendingUp, FileText, Star,
  Settings, LogOut,
} from 'lucide-react'
import { clearMockUser } from '@/lib/mock-auth'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/search', icon: Search, label: 'Trainer finden' },
  { href: '/dashboard/calendar', icon: Calendar, label: 'Kalender' },
  { href: '/dashboard/chat', icon: MessageCircle, label: 'Nachrichten' },
  { href: '/dashboard/workouts', icon: Dumbbell, label: 'Trainingspläne' },
  { href: '/dashboard/nutrition', icon: UtensilsCrossed, label: 'Ernährung' },
  { href: '/dashboard/progress', icon: TrendingUp, label: 'Fortschritt' },
  { href: '/dashboard/profile', icon: User, label: 'Profil' },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    clearMockUser()
    router.push('/')
  }

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-40">
      <div className="flex flex-col flex-1 bg-[#0D1320] border-r border-[rgba(0,168,255,0.1)]">
        <div className="flex items-center h-20 px-6 border-b border-[rgba(0,168,255,0.08)]">
          <Logo size="lg" />
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[#00A8FF]/10 text-[#00D4FF] shadow-[0_0_10px_rgba(0,168,255,0.1)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-[#1A2332]'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive && 'drop-shadow-[0_0_6px_rgba(0,212,255,0.5)]')} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-[rgba(0,168,255,0.08)] space-y-1">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-[#1A2332] transition-all duration-200">
            <Settings className="w-5 h-5" /> Einstellungen
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
            <LogOut className="w-5 h-5" /> Abmelden
          </button>
        </div>
      </div>
    </aside>
  )
}
