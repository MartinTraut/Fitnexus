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
import { createBooking, getOrCreateThread, sendMessage } from '@/lib/store'
import { Calendar, MessageSquare, Clock, CheckCircle2, Loader2 } from 'lucide-react'

interface BookingModalProps {
  trainerId: string
  trainerName: string
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ trainerId, trainerName, isOpen, onClose }: BookingModalProps) {
  const [message, setMessage] = useState('')
  const [goals, setGoals] = useState('')
  const [preferredTimes, setPreferredTimes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsSubmitting(true)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Create booking
    const fullMessage = [
      message,
      goals && `\n\nZiele: ${goals}`,
      preferredTimes && `\nBevorzugte Zeiten: ${preferredTimes}`,
    ].filter(Boolean).join('')

    createBooking({
      trainer_id: trainerId,
      customer_id: 'c_demo',
      message: fullMessage,
      preferred_times: preferredTimes || undefined,
    })

    // Create chat thread and send initial message
    const thread = getOrCreateThread(trainerId, 'c_demo')
    sendMessage({
      thread_id: thread.id,
      sender_id: 'c_demo',
      content: fullMessage,
    })

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleClose = () => {
    setMessage('')
    setGoals('')
    setPreferredTimes('')
    setIsSuccess(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="border-[#00A8FF]/20 bg-[#0B0F1A]/95 backdrop-blur-xl sm:max-w-lg"
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
              <h3 className="text-xl font-bold text-white">Anfrage gesendet</h3>
              <p className="mt-2 text-sm text-white/60 max-w-xs mx-auto">
                Deine Anfrage wurde an {trainerName} gesendet. Du wirst benachrichtigt, sobald eine Antwort vorliegt.
              </p>
            </div>
            <GradientButton variant="cyan" onClick={handleClose}>
              Verstanden
            </GradientButton>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-white text-lg">
                Kennenlerngespräch anfragen
              </DialogTitle>
              <DialogDescription className="text-white/50">
                Sende eine Anfrage an <span className="text-[#00A8FF]">{trainerName}</span> für ein kostenloses Erstgespräch.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5 mt-2">
              {/* Message */}
              <div className="space-y-2">
                <Label className="text-white/80 text-sm">
                  <MessageSquare className="h-3.5 w-3.5 text-[#00A8FF]" />
                  Deine Nachricht *
                </Label>
                <Textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Stell dich kurz vor und beschreibe, was du suchst..."
                  className="min-h-[100px] border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus-visible:border-[#00A8FF]/50 focus-visible:ring-[#00A8FF]/20"
                  required
                />
              </div>

              {/* Goals */}
              <div className="space-y-2">
                <Label className="text-white/80 text-sm">
                  <svg className="h-3.5 w-3.5 text-[#00FF94]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  Deine Ziele
                </Label>
                <Input
                  value={goals}
                  onChange={e => setGoals(e.target.value)}
                  placeholder="z.B. Muskelaufbau, Abnehmen, Beweglichkeit..."
                  className="border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus-visible:border-[#00A8FF]/50 focus-visible:ring-[#00A8FF]/20"
                />
              </div>

              {/* Preferred Times */}
              <div className="space-y-2">
                <Label className="text-white/80 text-sm">
                  <Clock className="h-3.5 w-3.5 text-[#00A8FF]" />
                  Bevorzugte Zeiten
                </Label>
                <Input
                  value={preferredTimes}
                  onChange={e => setPreferredTimes(e.target.value)}
                  placeholder="z.B. Mo-Mi Nachmittag, Fr Vormittag..."
                  className="border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus-visible:border-[#00A8FF]/50 focus-visible:ring-[#00A8FF]/20"
                />
              </div>

              {/* Info Notice */}
              <GlassCard hover={false} className="flex items-start gap-3 p-3 border border-[#00A8FF]/10">
                <Calendar className="h-4 w-4 text-[#00A8FF] mt-0.5 shrink-0" />
                <p className="text-xs text-white/50 leading-relaxed">
                  Der Coach wird sich innerhalb von 24h bei dir melden. Deine Kontaktdaten bleiben bis zur Vertragsvereinbarung anonym.
                </p>
              </GlassCard>

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
                  variant="cyan"
                  className="flex-1"
                  disabled={!message.trim() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Senden...
                    </>
                  ) : (
                    'Anfrage senden'
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
