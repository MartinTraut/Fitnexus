'use client'

import { useEffect, useState, useCallback } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import {
  initializeStore,
  getBookingsForTrainer,
  updateBookingStatus,
  getOrCreateThread,
} from '@/lib/store'
import { OfferModal } from '@/components/contract/offer-modal'
import type { Booking } from '@/types'
import {
  Inbox, Clock, CheckCircle2, XCircle,
  Target, Calendar, MessageSquare, UserPlus,
} from 'lucide-react'

type FilterTab = 'alle' | 'offen' | 'angenommen' | 'abgelehnt'

function mapStatusToFilter(status: Booking['status']): 'offen' | 'angenommen' | 'abgelehnt' {
  if (status === 'pending') return 'offen'
  if (status === 'confirmed' || status === 'completed') return 'angenommen'
  return 'abgelehnt'
}

export default function TrainerLeadsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('alle')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [mounted, setMounted] = useState(false)

  // Offer modal state
  const [offerModalOpen, setOfferModalOpen] = useState(false)
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [selectedCustomerName, setSelectedCustomerName] = useState('')

  const loadData = useCallback(() => {
    initializeStore()
    setBookings(getBookingsForTrainer('tr_1'))
    setMounted(true)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const filteredBookings = bookings.filter((b) => {
    if (activeFilter === 'alle') return true
    return mapStatusToFilter(b.status) === activeFilter
  })

  const counts = {
    alle: bookings.length,
    offen: bookings.filter((b) => b.status === 'pending').length,
    angenommen: bookings.filter((b) => b.status === 'confirmed' || b.status === 'completed').length,
    abgelehnt: bookings.filter((b) => b.status === 'cancelled').length,
  }

  const statusConfig = {
    pending: { label: 'Offen', color: 'bg-[#FFD700]/10 text-[#FFD700]', icon: Clock },
    confirmed: { label: 'Angenommen', color: 'bg-[#00FF94]/10 text-[#00FF94]', icon: CheckCircle2 },
    completed: { label: 'Abgeschlossen', color: 'bg-[#00FF94]/10 text-[#00FF94]', icon: CheckCircle2 },
    cancelled: { label: 'Abgelehnt', color: 'bg-red-500/10 text-red-400', icon: XCircle },
  }

  const handleAccept = (booking: Booking) => {
    updateBookingStatus(booking.id, 'confirmed')
    // Create a chat thread for this customer
    getOrCreateThread('tr_1', booking.customer_id)
    // Show offer modal
    setSelectedCustomerId(booking.customer_id)
    setSelectedCustomerName(`Client#${booking.customer_id.slice(-4).toUpperCase()}`)
    setOfferModalOpen(true)
    loadData()
  }

  const handleDecline = (id: string) => {
    updateBookingStatus(id, 'cancelled')
    loadData()
  }

  if (!mounted) return null

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Leads & Anfragen</h1>
          <p className="text-muted-foreground mt-1">{counts.offen} offene Anfragen</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {([
          { key: 'alle' as const, label: 'Alle' },
          { key: 'offen' as const, label: 'Offen' },
          { key: 'angenommen' as const, label: 'Angenommen' },
          { key: 'abgelehnt' as const, label: 'Abgelehnt' },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeFilter === tab.key
                ? 'bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/30'
                : 'bg-[#1A2332]/50 text-muted-foreground hover:text-foreground hover:bg-[#1A2332]'
            }`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeFilter === tab.key ? 'bg-[#00FF94]/20' : 'bg-[#0B0F1A]/50'
            }`}>{counts[tab.key]}</span>
          </button>
        ))}
      </div>

      {/* Lead Cards */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const config = statusConfig[booking.status]
            const clientName = `Client#${booking.customer_id.slice(-4).toUpperCase()}`
            const date = new Date(booking.created_at).toLocaleDateString('de-DE')

            return (
              <GlassCard key={booking.id} className="p-5 md:p-6" hover={false}>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-[#00FF94]/10 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-5 h-5 text-[#00FF94]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-foreground">{clientName}</h3>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{date}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-[#00FF94] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Ziele / Nachricht</p>
                          <p className="text-sm text-foreground">
                            {booking.notes ?? 'Keine Angabe'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-[#00D4FF] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Eingang</p>
                          <p className="text-sm text-foreground">{date}</p>
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-[#0B0F1A]/50">
                        <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{booking.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    {booking.status === 'pending' && (
                      <div className="flex items-center gap-3 pt-1">
                        <GradientButton
                          variant="green"
                          size="sm"
                          onClick={() => handleAccept(booking)}
                        >
                          <CheckCircle2 className="w-4 h-4" /> Annehmen
                        </GradientButton>
                        <GradientButton
                          variant="green"
                          size="sm"
                          outline
                          onClick={() => handleDecline(booking.id)}
                        >
                          <XCircle className="w-4 h-4" /> Ablehnen
                        </GradientButton>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>
      ) : (
        <GlassCard className="p-12 text-center" hover={false}>
          <Inbox className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Keine Anfragen</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Es gibt aktuell keine Anfragen in dieser Kategorie. Neue Leads erscheinen hier, sobald Kunden dich kontaktieren.
          </p>
        </GlassCard>
      )}

      {/* Offer Modal */}
      <OfferModal
        trainerId="tr_1"
        customerId={selectedCustomerId}
        customerName={selectedCustomerName}
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
      />
    </div>
  )
}
