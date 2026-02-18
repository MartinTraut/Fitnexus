import { MobileNav } from '@/components/mobile-nav'
import { DashboardSidebar } from '@/components/dashboard-sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <DashboardSidebar />
      <div className="md:pl-64">
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
      </div>
      <MobileNav />
    </div>
  )
}
