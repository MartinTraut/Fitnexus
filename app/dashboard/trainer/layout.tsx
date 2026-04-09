import { TrainerSidebar } from '@/components/trainer-sidebar'
import { TrainerMobileNav } from '@/components/trainer-mobile-nav'

export default function TrainerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <TrainerSidebar />
      <div className="md:pl-64">
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
      </div>
      <TrainerMobileNav />
    </div>
  )
}
