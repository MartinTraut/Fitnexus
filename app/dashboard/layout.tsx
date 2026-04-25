import { NexusAssistant } from '@/components/nexus-assistant'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NexusAssistant />
    </>
  )
}
