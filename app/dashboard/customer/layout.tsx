import type { Metadata } from 'next'
import { CustomerNav } from '@/components/dashboard/nav'

export const metadata: Metadata = {
  title: 'Mein Bereich',
  robots: { index: false, follow: false },
}

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <CustomerNav />
      <div className="md:pl-64">
        <main className="min-h-screen pb-24 md:pb-0">{children}</main>
      </div>
    </div>
  )
}
