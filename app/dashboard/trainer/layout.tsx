import type { Metadata } from 'next'
import { TrainerNav } from '@/components/dashboard/nav'

export const metadata: Metadata = {
  title: 'Coach-Bereich',
  robots: { index: false, follow: false },
}

export default function TrainerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <TrainerNav />
      <div className="md:pl-64">
        <main className="min-h-screen pb-24 md:pb-0">{children}</main>
      </div>
    </div>
  )
}
