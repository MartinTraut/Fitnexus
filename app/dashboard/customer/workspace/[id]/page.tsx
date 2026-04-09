'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { WorkspaceLayout } from '@/components/workspace/workspace-layout'
import { getTrainerById } from '@/lib/mock-data'

export default function CustomerWorkspacePage() {
  const params = useParams()
  const coachId = params.id as string

  // Resolve trainer data
  const trainer = getTrainerById(coachId)
  const trainerName = trainer?.display_name ?? 'Trainer'
  const trainerImage = trainer?.profile_image_url ?? undefined

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* Back + Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/customer"
          className="p-2 rounded-xl hover:bg-[#1A2332] transition-colors text-muted-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Workspace
          </h1>
          <p className="text-sm text-muted-foreground">{trainerName}</p>
        </div>
      </div>

      <WorkspaceLayout
        role="customer"
        partnerId={coachId}
        partnerName={trainerName}
        partnerImage={trainerImage}
        customerId="c_demo"
        trainerId={coachId}
      />
    </div>
  )
}
