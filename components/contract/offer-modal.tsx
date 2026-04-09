'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { createContract } from '@/lib/store'
import {
  FileText,
  Euro,
  Calendar,
  Dumbbell,
  CheckCircle2,
  Loader2,
  Eye,
  ArrowRight,
} from 'lucide-react'

interface OfferModalProps {
  trainerId: string
  customerId: string
  customerName: string
  isOpen: boolean
  onClose: () => void
}

export function OfferModal({ trainerId, customerId, customerName, isOpen, onClose }: OfferModalProps) {
  const [packageName, setPackageName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [durationWeeks, setDurationWeeks] = useState('')
  const [sessions, setSessions] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const priceNum = parseFloat(price) || 0
  const weeksNum = parseInt(durationWeeks) || 0
  const sessionsNum = parseInt(sessions) || 0
  const platformFee = priceNum * 0.07
  const trainerPayout = priceNum - platformFee
  const pricePerSession = sessionsNum > 0 ? priceNum / sessionsNum : 0

  const isValid = packageName.trim() && priceNum > 0 && weeksNum > 0 && sessionsNum > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 600))

    createContract({
      trainer_id: trainerId,
      customer_id: customerId,
      package_name: packageName.trim(),
      price: priceNum,
      duration_weeks: weeksNum,
      sessions: sessionsNum,
    })

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleClose = () => {
    setPackageName('')
    setDescription('')
    setPrice('')
    setDurationWeeks('')
    setSessions('')
    setIsSuccess(false)
    setShowPreview(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="border-[#00FF94]/20 bg-[#0B0F1A]/95 backdrop-blur-xl sm:max-w-lg max-h-[90vh] overflow-y-auto"
        showCloseButton={!isSubmitting}
      >
        {isSuccess ? (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-[#00FF94]/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#00FF94]/10 ring-2 ring-[#00FF94]/30">
                <CheckCircle2 className="h-10 w-10 text-[#00FF94]" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white">Angebot erstellt</h3>
              <p className="mt-2 text-sm text-white/60 max-w-xs mx-auto">
                Das Angebot wurde an {customerName} gesendet. Du wirst benachrichtigt, sobald es angenommen oder abgelehnt wird.
              </p>
            </div>
            <GradientButton variant="green" onClick={handleClose}>
              Verstanden
            </GradientButton>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-white text-lg">
                Angebot erstellen
              </DialogTitle>
              <DialogDescription className="text-white/50">
                Erstelle ein individuelles Angebot für <span className="text-[#00FF94]">{customerName}</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5 mt-2">
              {/* Package Name */}
              <div className="space-y-2">
                <Label className="text-white/80 text-sm">
                  <FileText className="h-3.5 w-3.5 text-[#00FF94]" />
                  Paketname *
                </Label>
                <Input
                  value={packageName}
                  onChange={e => setPackageName(e.target.value)}
                  placeholder="z.B. Transformation 12 Wochen"
                  className="border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus-visible:border-[#00FF94]/50 focus-visible:ring-[#00FF94]/20"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-white/80 text-sm">
                  Beschreibung
                </Label>
                <Textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Was ist im Paket enthalten?"
                  className="min-h-[80px] border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus-visible:border-[#00FF94]/50 focus-visible:ring-[#00FF94]/20"
                />
              </div>

              {/* Price + Duration Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-white/80 text-sm">
                    <Euro className="h-3.5 w-3.5 text-[#00FF94]" />
                    Preis (Gesamt) *
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      placeholder="0.00"
                      className="border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 pr-8 focus-visible:border-[#00FF94]/50 focus-visible:ring-[#00FF94]/20"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/30">
                      &euro;
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-[#00A8FF]" />
                    Dauer (Wochen) *
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    value={durationWeeks}
                    onChange={e => setDurationWeeks(e.target.value)}
                    placeholder="8"
                    className="border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus-visible:border-[#00FF94]/50 focus-visible:ring-[#00FF94]/20"
                    required
                  />
                </div>
              </div>

              {/* Sessions */}
              <div className="space-y-2">
                <Label className="text-white/80 text-sm">
                  <Dumbbell className="h-3.5 w-3.5 text-[#00A8FF]" />
                  Anzahl Sessions *
                </Label>
                <Input
                  type="number"
                  min="1"
                  value={sessions}
                  onChange={e => setSessions(e.target.value)}
                  placeholder="12"
                  className="border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus-visible:border-[#00FF94]/50 focus-visible:ring-[#00FF94]/20"
                  required
                />
              </div>

              {/* Preview Toggle */}
              {isValid && (
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white/70"
                >
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Kundenvorschau
                  </span>
                  <ArrowRight className={`h-4 w-4 transition-transform ${showPreview ? 'rotate-90' : ''}`} />
                </button>
              )}

              {/* Customer Preview */}
              {showPreview && isValid && (
                <GlassCard hover={false} neonBorder className="p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#00FF94]" />
                    <span className="text-xs font-medium text-[#00FF94] uppercase tracking-wider">
                      Kundenansicht
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white">{packageName}</h4>
                    {description && (
                      <p className="mt-1 text-sm text-white/50">{description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-white/[0.04] p-3 text-center">
                      <div className="text-lg font-bold text-white">{priceNum.toFixed(0)}&euro;</div>
                      <div className="text-[10px] text-white/40 mt-0.5">Gesamtpreis</div>
                    </div>
                    <div className="rounded-lg bg-white/[0.04] p-3 text-center">
                      <div className="text-lg font-bold text-white">{sessionsNum}</div>
                      <div className="text-[10px] text-white/40 mt-0.5">Sessions</div>
                    </div>
                    <div className="rounded-lg bg-white/[0.04] p-3 text-center">
                      <div className="text-lg font-bold text-white">{weeksNum}</div>
                      <div className="text-[10px] text-white/40 mt-0.5">Wochen</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/40 pt-1 border-t border-white/[0.06]">
                    <span>Preis pro Session</span>
                    <span className="text-white/60 font-medium">{pricePerSession.toFixed(2)}&euro;</span>
                  </div>
                </GlassCard>
              )}

              {/* Payout Info (Trainer only) */}
              {isValid && (
                <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-xs text-white/40">
                  <span>Dein Auszahlungsbetrag (abzgl. 7% Plattformgebühr)</span>
                  <span className="font-semibold text-[#00FF94]">{trainerPayout.toFixed(2)}&euro;</span>
                </div>
              )}

              {/* Submit */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white/80"
                >
                  Abbrechen
                </button>
                <GradientButton
                  type="submit"
                  variant="green"
                  className="flex-1"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Erstellen...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      Angebot senden
                    </>
                  )}
                </GradientButton>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
