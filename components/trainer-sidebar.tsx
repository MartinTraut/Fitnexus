'use client'

import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, UserCircle, Inbox, Users,
  MessageCircle, CreditCard, Settings, LogOut,
} from 'lucide-react'
import { signOut } from '@/lib/auth'

const navItems = [
  { href: '/dashboard/trainer', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/trainer/profile', icon: UserCircle, label: 'Profil' },
  { href: '/dashboard/trainer/leads', icon: Inbox, label: 'Leads' },
  { href: '/dashboard/trainer/clients', icon: Users, label: 'Kunden' },
  { href: '/dashboard/trainer/messages', icon: MessageCircle, label: 'Nachrichten' },
  { href: '/dashboard/trainer/billing', icon: CreditCard, label: 'Billing' },
]

export function TrainerSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    signOut()
    router.push('/')
  }

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-40">
      <div className="flex flex-col flex-1 bg-[#0D1320] border-r border-[rgba(0,255,148,0.1)]">
        <div className="flex items-center h-20 px-6 border-b border-[rgba(0,255,148,0.08)]">
          <Logo size="lg" />
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/dashboard/trainer' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[#00FF94]/10 text-[#00FF94] shadow-[0_0_10px_rgba(0,255,148,0.1)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-[#1A2332]'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive && 'drop-shadow-[0_0_6px_rgba(0,255,148,0.5)]')} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-[rgba(0,255,148,0.08)] space-y-1">
          <Link
            href="/dashboard/trainer/settings"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              pathname === '/dashboard/trainer/settings'
                ? 'bg-[#00FF94]/10 text-[#00FF94] shadow-[0_0_10px_rgba(0,255,148,0.1)]'
                : 'text-muted-foreground hover:text-foreground hover:bg-[#1A2332]'
            )}
          >
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
