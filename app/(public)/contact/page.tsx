'use client'

import { useState } from 'react'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { SectionHeading } from '@/components/section-heading'
import { AnimatedSection } from '@/components/motion'
import { Mail, Clock, Send, MapPin, ArrowRight, MessageCircle, ChevronDown } from 'lucide-react'

const subjectOptions = [
  'Allgemeine Anfrage',
  'Frage als Kunde',
  'Frage als Coach',
  'Technisches Problem',
  'Kooperation & Partnerschaften',
  'Presse & Medien',
  'Sonstiges',
]

const contactInfo = [
  {
    icon: Mail,
    label: 'E-Mail',
    value: 'hello@fitnexus.de',
    description: 'Fuer alle Anfragen.',
  },
  {
    icon: Clock,
    label: 'Antwortzeit',
    value: 'Innerhalb von 24 Stunden',
    description: 'Mo-Fr, werktags.',
  },
  {
    icon: MapPin,
    label: 'Standort',
    value: 'Deutschland',
    description: 'Remote-first Team.',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement actual form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const inputClasses =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#00A8FF]/40 focus:ring-1 focus:ring-[#00A8FF]/20 focus:bg-white/[0.06] transition-all duration-300'

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F1A]" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 right-[25%] w-[400px] h-[400px] bg-gradient-to-b from-[#00A8FF]/[0.06] to-transparent blur-[100px] opacity-50" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-sm font-semibold tracking-brand-wide uppercase gradient-cyan-text mb-4">Kontakt</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.08] mb-6">
              <span className="text-foreground">Wir sind</span>{' '}
              <span className="gradient-brand-text">fuer dich da</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Fragen, Feedback oder Ideen? Schreib uns. Wir antworten in der Regel innerhalb von 24 Stunden.
            </p>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
      </section>

      {/* ═══ CONTACT FORM + INFO ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00A8FF]/[0.03] blur-[200px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <GlassCard className="p-8 lg:p-10" hover={false} neonBorder>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-green mb-6 shadow-[0_0_30px_rgba(0,255,148,0.2)]">
                      <Send className="w-7 h-7 text-[#0B0F1A]" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                      Nachricht gesendet
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
                      Vielen Dank fuer deine Nachricht. Wir melden uns innerhalb von 24 Stunden bei dir.
                    </p>
                    <GradientButton
                      variant="cyan"
                      outline
                      size="md"
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormData({ name: '', email: '', subject: '', message: '' })
                      }}
                    >
                      Weitere Nachricht senden
                    </GradientButton>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                        Schreib uns eine Nachricht
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Fuelle das Formular aus und wir antworten dir schnellstmoeglich.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name + Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            placeholder="Dein Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                            E-Mail
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder="deine@email.de"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={inputClasses}
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2">
                          Betreff
                        </label>
                        <div className="relative">
                          <select
                            id="subject"
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                          >
                            <option value="" disabled>
                              Bitte waehlen
                            </option>
                            {subjectOptions.map((option) => (
                              <option key={option} value={option} className="bg-[#0B0F1A] text-foreground">
                                {option}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                          Nachricht
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          placeholder="Deine Nachricht..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={`${inputClasses} resize-none`}
                        />
                      </div>

                      {/* Submit */}
                      <GradientButton
                        type="submit"
                        variant="cyan"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Wird gesendet...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Nachricht senden
                          </>
                        )}
                      </GradientButton>
                    </form>
                  </>
                )}
              </GlassCard>
            </AnimatedSection>

            {/* Sidebar Info */}
            <AnimatedSection className="lg:col-span-2" delay={0.15}>
              <div className="space-y-6 lg:sticky lg:top-32">
                {/* Contact Info Cards */}
                {contactInfo.map((info) => (
                  <GlassCard key={info.label} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl gradient-cyan flex items-center justify-center shadow-[0_0_15px_rgba(0,168,255,0.12)]">
                        <info.icon className="w-5 h-5 text-[#0B0F1A]" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground/60 uppercase tracking-brand-wide mb-1">
                          {info.label}
                        </p>
                        <p className="text-sm font-semibold text-foreground mb-0.5">
                          {info.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                ))}

                {/* Social / Community */}
                <GlassCard className="p-6" glow="cyan">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageCircle className="w-5 h-5 text-[#00D4FF]" />
                    <h3 className="text-sm font-heading font-semibold text-foreground">Community</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Folge uns fuer Updates, Tipps und Einblicke hinter die Kulissen von FITNEXUS.
                  </p>
                  <div className="flex items-center gap-3">
                    {['Instagram', 'LinkedIn', 'Twitter'].map((platform) => (
                      <span
                        key={platform}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-muted-foreground hover:text-[#00D4FF] hover:border-[#00A8FF]/30 transition-all duration-300 cursor-pointer"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </GlassCard>

                {/* FAQ Hint */}
                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    Vielleicht findest du deine Antwort schon hier:
                  </p>
                  <a href="/faq" className="inline-flex items-center gap-2 text-sm text-[#00D4FF] hover:text-[#00A8FF] transition-colors duration-300 font-medium">
                    Zu den FAQ <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
