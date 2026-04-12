'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { initializeStore, getContractsForCustomer } from '@/lib/store'

export default function WorkspaceRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    initializeStore()
    const contracts = getContractsForCustomer('c_demo')
    const active = contracts.find(c => c.status === 'active') ?? contracts[0]

    if (active) {
      router.replace(`/dashboard/customer/workspace/${active.trainer_id}`)
    } else {
      router.replace('/dashboard/customer/search')
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#00A8FF]/30 border-t-[#00A8FF] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Workspace wird geladen...</p>
      </div>
    </div>
  )
}
