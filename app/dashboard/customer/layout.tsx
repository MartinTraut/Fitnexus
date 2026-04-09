import { CustomerSidebar } from '@/components/customer-sidebar'
import { CustomerMobileNav } from '@/components/customer-mobile-nav'

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <CustomerSidebar />
      <div className="md:pl-64">
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
      </div>
      <CustomerMobileNav />
    </div>
  )
}
