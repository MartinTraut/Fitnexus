'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { WorkspaceLayout } from '@/components/workspace/workspace-layout'

const clientData: Record<string, {
  name: string
  customerId: string
  pkg: string
}> = {
  'client-001': { name: 'Client#3847', customerId: 'c_demo', pkg: 'Transformation' },
  'client-002': { name: 'Client#1938', customerId: 'c_demo_2', pkg: 'Starter' },
  'client-003': { name: 'Client#5612', customerId: 'c_demo_3', pkg: 'Premium' },
}

export default function TrainerWorkspacePage() {
  const params = useParams()
  const id = params.id as string
  const client = clientData[id] ?? clientData['client-001']

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Back + Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/trainer/clients">
          <button className="w-10 h-10 rounded-xl bg-[#1A2332] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[#1A2332]/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{client.name}</h1>
          <p className="text-muted-foreground text-sm">Workspace · {client.pkg}</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-[#00FF94]/10 text-[#00FF94] font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Aktiv
        </span>
      </div>

      <WorkspaceLayout
        role="trainer"
        partnerId={id}
        partnerName={client.name}
        customerId={client.customerId}
        trainerId="tr_1"
      />
    </div>
  )
}
