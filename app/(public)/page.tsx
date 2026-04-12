'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { StarRating } from '@/components/star-rating'
import { FAQAccordion } from '@/components/faq-accordion'
import { AnimatedSection, StaggerGroup, StaggerItem, motion } from '@/components/motion'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { faqItems, testimonials } from '@/lib/mock-data'
import {
  Search, Zap, ArrowRight, X,
  Dumbbell, Users, MapPin, Star, Check,
  MessageCircle, TrendingUp, Shield, Lock,
  Apple, BarChart3, Target, Layers, ClipboardList,
} from 'lucide-react'

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO — Cinematic, purpose-driven
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#050810]" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute top-[-15%] right-[5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(0,168,255,0.1)_0%,transparent_65%)]" />
        <div className="absolute bottom-[-5%] left-[0%] w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,148,0.06)_0%,transparent_65%)]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[1400px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,168,255,0.03)_0%,transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="flex flex-col items-center text-center">

            {/* Logo — large, cinematic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-5 mb-14"
            >
              <Image
                src="/logo-icon.png"
                alt="FITNEXUS"
                width={260}
                height={260}
                className="object-contain w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px]"
                priority
              />
              <span className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl tracking-[0.05em] gradient-brand-text">
                FITNEXUS
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-heading font-bold leading-[0.92] tracking-tight mb-8 max-w-5xl"
            >
              <span className="text-foreground">Die Plattform, die</span>
              <br />
              <span className="text-foreground">Fitness Coaching</span>
              <br />
              <span className="gradient-brand-text">revolutioniert.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground/70 max-w-2xl mb-14 leading-relaxed font-light"
            >
              Kunden finden den perfekten Coach. Coaches professionalisieren ihr Business.
              Alles in <span className="text-foreground font-normal">einem System</span>.
            </motion.p>

            {/* Simple CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="/fuer-kunden">
                <GradientButton variant="cyan" size="xl" glow className="min-w-[220px]">
                  <Search className="w-5 h-5" /> Coach finden
                </GradientButton>
              </Link>
              <Link href="/for-coaches">
                <GradientButton variant="green" size="xl" className="min-w-[220px]">
                  <Zap className="w-5 h-5" /> Als Coach starten
                </GradientButton>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-14 text-xs text-muted-foreground/40"
            >
              {[
                { icon: Dumbbell, text: '500+ Coaches' },
                { icon: Users, text: '10.000+ Nutzer' },
                { icon: MapPin, text: '50+ Städte' },
                { icon: Star, text: '4.8 Bewertung' },
              ].map((s) => (
                <span key={s.text} className="flex items-center gap-1.5">
                  <s.icon className="w-3.5 h-3.5 text-[#00D4FF]/40" /> {s.text}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3D SCROLL PREVIEW — Show what the platform looks like
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden -mt-20">
        <ContainerScroll
          titleComponent={
            <div className="mb-4">
              <p className="text-sm font-semibold tracking-brand-wide uppercase text-[#00D4FF] mb-4">Die Plattform</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.08]">
                So sieht <span className="gradient-brand-text">FITNEXUS</span> aus
              </h2>
              <p className="mt-4 text-muted-foreground/60 max-w-lg mx-auto text-base">
                Ein Blick in die Zukunft deines Coachings.
              </p>
            </div>
          }
        >
          {/* Mock Dashboard Preview */}
          <div className="w-full h-full p-6 md:p-8 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="ml-4 flex-1 h-7 rounded-lg bg-[#1A2332]/60 flex items-center px-3">
                <span className="text-[10px] text-muted-foreground/40">fitnexus.de/dashboard</span>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-4 gap-4 mb-5">
              {[
                { label: 'Trainingseinheiten', value: '24', color: '#00A8FF' },
                { label: 'Streak', value: '12 Tage', color: '#FFD700' },
                { label: 'Fortschritt', value: '-3.6 kg', color: '#00FF94' },
                { label: 'Nächste Session', value: 'Mo, 10:00', color: '#00D4FF' },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[10px] text-muted-foreground/50 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Trainingsplan + Chat */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="col-span-2 p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-foreground">Trainingsplan — Push Day</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00A8FF]/10 text-[#00A8FF]">3/5 erledigt</span>
                </div>
                <div className="space-y-2">
                  {[
                    { ex: 'Bankdrücken — 4×8 @ 80kg', done: true },
                    { ex: 'Schrägbank — 3×10 @ 60kg', done: true },
                    { ex: 'Schulterdrücken — 4×10 @ 42.5kg', done: true },
                    { ex: 'Seitheben — 4×15 @ 12kg', done: false },
                    { ex: 'Trizeps Pushdown — 3×12 @ 30kg', done: false },
                  ].map((item) => (
                    <div key={item.ex} className="flex items-center gap-3 p-2 rounded-lg bg-[#1A2332]/40">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${item.done ? 'border-[#00FF94]/30 bg-[#00FF94]/5' : 'border-muted-foreground/15'}`}>
                        {item.done && <Check className="w-3 h-3 text-[#00FF94]" />}
                      </div>
                      <span className={`text-xs ${item.done ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>{item.ex}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Chat — Coach Max</p>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-[#00A8FF]/10 text-[10px] text-[#00D4FF]">Gewicht eingetragen?</div>
                  <div className="p-2 rounded-lg bg-[#1A2332]/60 text-[10px] text-muted-foreground ml-4">82.4 kg — neuer Tiefpunkt!</div>
                  <div className="p-2 rounded-lg bg-[#00A8FF]/10 text-[10px] text-[#00D4FF]">Mega, 3.6 kg runter! Sauber.</div>
                  <div className="p-2 rounded-lg bg-[#1A2332]/60 text-[10px] text-muted-foreground ml-4">Danke Coach!</div>
                  <div className="p-2 rounded-lg bg-[#00A8FF]/10 text-[10px] text-[#00D4FF]">Schulterdrücken steigern wir.</div>
                </div>
              </div>
            </div>

            {/* Ernährung + Fortschritt + Termine + Coaches */}
            <div className="grid grid-cols-4 gap-4">
              {/* Ernährung */}
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Ernährung</p>
                <div className="space-y-3">
                  {[
                    { label: 'Kalorien', pct: 94, color: '#00D4FF' },
                    { label: 'Protein', pct: 92, color: '#00FF94' },
                    { label: 'Carbs', pct: 87, color: '#FFD700' },
                    { label: 'Fett', pct: 85, color: '#00A8FF' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-muted-foreground/50">{m.label}</span>
                        <span className="font-semibold" style={{ color: m.color }}>{m.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#1A2332]/60 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gewichtsverlauf + Fortschritt */}
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-foreground">Gewichtsverlauf</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00FF94]/10 text-[#00FF94]">-3.6 kg</span>
                </div>
                {/* SVG Chart */}
                <svg viewBox="0 0 200 60" className="w-full h-[60px] mb-3" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00FF94" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#00FF94" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineFill" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00A8FF" />
                      <stop offset="100%" stopColor="#00FF94" />
                    </linearGradient>
                  </defs>
                  <path d="M0,2 L18,6 L36,10 L54,15 L72,19 L90,24 L108,28 L126,33 L144,38 L162,42 L180,47 L200,54 L200,60 L0,60 Z" fill="url(#areaFill)" />
                  <path d="M0,2 L18,6 L36,10 L54,15 L72,19 L90,24 L108,28 L126,33 L144,38 L162,42 L180,47 L200,54" fill="none" stroke="url(#lineFill)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="200" cy="54" r="3" fill="#00FF94" />
                  <circle cx="0" cy="2" r="2" fill="#00A8FF" opacity="0.5" />
                </svg>
                <div className="flex justify-between text-[9px] text-muted-foreground/25 mb-3">
                  <span>86 kg</span><span>Woche 1–12</span><span>82.4 kg</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: 'Körperfett', value: '14.8%', change: '-2.4%', color: '#00D4FF' },
                    { label: 'Muskelmasse', value: '38.2 kg', change: '+1.8 kg', color: '#39FF14' },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground/40">{b.label}: <span className="text-foreground font-semibold">{b.value}</span></span>
                      <span className="text-[10px] font-bold" style={{ color: b.color }}>{b.change}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Termine */}
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Termine</p>
                <div className="space-y-2">
                  {[
                    { time: 'Mo 10:00', title: 'Push Training', active: true },
                    { time: 'Mi 18:00', title: 'Beintraining', active: false },
                    { time: 'Fr 09:00', title: 'Pull Training', active: false },
                    { time: 'Sa 11:00', title: 'Mobility', active: false },
                  ].map((t) => (
                    <div key={t.time} className="flex items-center gap-3 p-2 rounded-lg bg-[#1A2332]/40">
                      <div className={`w-1 h-6 rounded-full ${t.active ? 'bg-[#00FF94]' : 'bg-[#00A8FF]/25'}`} />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{t.title}</p>
                        <p className="text-[10px] text-muted-foreground/30">{t.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meine Coaches */}
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Meine Coaches</p>
                <div className="space-y-2">
                  {[
                    { name: 'Max Krüger', spec: 'Kraft & Hypertrophie', rating: 4.9, color: '#00A8FF' },
                    { name: 'Lisa Meier', spec: 'Mobility & Yoga', rating: 4.8, color: '#00D4FF' },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-3 p-2 rounded-lg bg-[#1A2332]/40">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-[#0B0F1A]" style={{ background: c.color }}>
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-foreground">{c.name}</p>
                        <p className="text-[10px] text-muted-foreground/30">{c.spec}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" />
                        <span className="text-xs font-semibold text-foreground">{c.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WAS IST FITNEXUS
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <p className="text-sm font-semibold tracking-brand-wide uppercase text-[#00D4FF] mb-4">Die Mission</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.08] mb-6">
                Coaching verdient eine <span className="gradient-brand-text">bessere Infrastruktur</span>
              </h2>
              <p className="text-lg text-muted-foreground/70 leading-relaxed">
                Millionen Menschen wollen fitter werden. Tausende Coaches können ihnen helfen.
                Aber zwischen beiden steht ein Chaos aus WhatsApp, Excel und verstreuten Tools.
                FITNEXUS räumt damit auf.
              </p>
            </div>
          </AnimatedSection>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: 'Eine Plattform. Alles drin.', desc: 'Coach-Suche, Kommunikation, Trainingspläne, Ernährung, Fortschritt und Verträge — gebündelt statt verstreut.', color: '#00A8FF' },
              { icon: Shield, title: 'Vertrauen als Fundament.', desc: 'Verifizierte Coaches, echte Bewertungen, sichere Kommunikation. Keine Fake-Profile, keine leeren Versprechen.', color: '#00D4FF' },
              { icon: Target, title: 'Ergebnisse statt Hoffnung.', desc: 'Strukturiertes Coaching mit messbarem Fortschritt. Datengetrieben, transparent und auf dein Ziel ausgerichtet.', color: '#00FF94' },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <motion.div whileHover={{ y: -4, transition: { duration: 0.25 } }} className="p-8 rounded-3xl bg-[#0D1320]/40 border border-[rgba(0,168,255,0.06)] hover:border-[rgba(0,168,255,0.15)] transition-all duration-500 h-full">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${item.color}12` }}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROBLEM VS SOLUTION — High contrast split
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.08]">
                Vorher vs. <span className="gradient-brand-text">Nachher</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* PROBLEM — Red-tinted card */}
            <AnimatedSection variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}>
              <div className="h-full p-8 md:p-10 rounded-3xl bg-[#1a0a0a]/40 border border-red-500/[0.12] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(255,50,50,0.06)_0%,transparent_70%)]" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                      <X className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-brand-wide uppercase text-red-400">Ohne FITNEXUS</p>
                      <p className="text-[11px] text-red-400/50">So läuft Coaching heute</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: MessageCircle, title: 'WhatsApp-Chaos', desc: '15 Kunden in 15 Chats. Nachrichten gehen unter. Keine Struktur.' },
                      { icon: ClipboardList, title: 'PDF-Trainingspläne', desc: 'Per E-Mail verschickt. Nicht trackbar. Nicht interaktiv.' },
                      { icon: TrendingUp, title: 'Kein Tracking', desc: 'Fortschritt wird nicht dokumentiert. Motivation sinkt.' },
                      { icon: Lock, title: 'Kein Vertrauen', desc: 'Keine echten Bewertungen. Kunden wissen nicht, wem sie vertrauen.' },
                      { icon: BarChart3, title: 'Excel-Abrechnung', desc: 'Manuell, fehleranfällig, zeitraubend.' },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4 p-3 rounded-xl bg-red-500/[0.04] border border-red-500/[0.06]">
                        <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <item.icon className="w-4 h-4 text-red-400/70" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-red-300/90">{item.title}</p>
                          <p className="text-xs text-red-300/40 leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* SOLUTION — Green-tinted card */}
            <AnimatedSection variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}>
              <div className="h-full p-8 md:p-10 rounded-3xl bg-[#0a1a0f]/40 border border-[#00FF94]/[0.12] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,148,0.06)_0%,transparent_70%)]" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#00FF94]/15 flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#00FF94]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-brand-wide uppercase text-[#00FF94]">Mit FITNEXUS</p>
                      <p className="text-[11px] text-[#00FF94]/50">So läuft Coaching in Zukunft</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: MessageCircle, title: 'In-App Kommunikation', desc: 'Ein Chat pro Kunde. Bilder, Dateien, Read-Status. Alles zentral.' },
                      { icon: Dumbbell, title: 'Interaktive Pläne', desc: 'Trainingspläne direkt in der App. Trackbar. Satz für Satz.' },
                      { icon: TrendingUp, title: 'Automatisches Tracking', desc: 'Gewicht, Körperfett, Fotos — alles visualisiert in Echtzeit-Charts.' },
                      { icon: Star, title: 'Echte Bewertungen', desc: '6 Dimensionen. Nur echte Kunden. Vertrauen durch Transparenz.' },
                      { icon: Shield, title: 'Digitale Verträge', desc: 'Ein Klick. Fair, transparent, rechtssicher. Keine Excel-Tabelle.' },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4 p-3 rounded-xl bg-[#00FF94]/[0.03] border border-[#00FF94]/[0.06]">
                        <div className="w-9 h-9 rounded-lg bg-[#00FF94]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <item.icon className="w-4 h-4 text-[#00FF94]/80" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#00FF94]/90">{item.title}</p>
                          <p className="text-xs text-[#00FF94]/40 leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS — Visual journey
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,168,255,0.03)_0%,transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-20">
              <p className="text-sm font-semibold tracking-brand-wide uppercase text-[#00D4FF] mb-4">So funktioniert&apos;s</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.1]">
                Dein Weg zum <span className="gradient-brand-text">Ergebnis</span>
              </h2>
              <p className="mt-4 text-muted-foreground/60 max-w-lg mx-auto">Vier Schritte. Keine Hürden. Kein Papierkram.</p>
            </div>
          </AnimatedSection>

          <StaggerGroup className="space-y-6 max-w-4xl mx-auto">
            {[
              { num: '01', icon: Search, title: 'Entdecken', desc: 'Durchsuche hunderte verifizierte Coaches. Filtere nach Stadt, Spezialisierung, Preis, Bewertung und Coaching-Art. Finde genau den Coach, der zu deinen Zielen passt.', color: '#00A8FF', accent: 'rgba(0,168,255,0.06)' },
              { num: '02', icon: MessageCircle, title: 'Kennenlernen', desc: 'Buche ein kostenloses Erstgespräch — komplett anonym über die Plattform. Lerne deinen Coach kennen, bevor du dich entscheidest. Kein Risiko, keine Verpflichtung.', color: '#00D4FF', accent: 'rgba(0,212,255,0.06)' },
              { num: '03', icon: Dumbbell, title: 'Trainieren', desc: 'Erhalte individuelle Trainingspläne und Ernährungsberatung direkt in FITNEXUS. Tracke jede Übung, jeden Satz, jedes Kilo. Dein Coach sieht deinen Fortschritt in Echtzeit.', color: '#00FF94', accent: 'rgba(0,255,148,0.06)' },
              { num: '04', icon: TrendingUp, title: 'Wachsen', desc: 'Sieh deine Transformation in Daten und Fotos. Gewicht, Körperfett, Muskelmasse — alles visualisiert. Feiere deine Erfolge und setze dir neue Ziele.', color: '#39FF14', accent: 'rgba(57,255,20,0.06)' },
            ].map((step, i) => (
              <StaggerItem key={step.num}>
                <motion.div whileHover={{ x: 8, transition: { duration: 0.25 } }}>
                  <div className="flex gap-6 md:gap-8 items-start p-6 md:p-8 rounded-3xl border transition-all duration-400" style={{ borderColor: `${step.color}15`, background: step.accent }}>
                    {/* Number + Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center" style={{ background: `${step.color}12` }}>
                          <step.icon className="w-7 h-7 md:w-8 md:h-8" style={{ color: step.color }} />
                        </div>
                        <span className="absolute -top-2 -left-2 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-[#0B0F1A]" style={{ background: step.color }}>
                          {step.num}
                        </span>
                      </div>
                      {i < 3 && (
                        <div className="hidden md:block w-[2px] h-6 mx-auto mt-2 rounded-full" style={{ background: `${step.color}20` }} />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground/70 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SOCIAL PROOF
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-brand-wide uppercase text-[#00D4FF] mb-4">Stimmen</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
                Was unsere Community sagt
              </h2>
            </div>
          </AnimatedSection>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <motion.div whileHover={{ y: -4, transition: { duration: 0.25 } }}>
                  <GlassCard className="flex flex-col p-8 h-full" hover={false}>
                    <div className="text-3xl font-serif text-[#00A8FF]/15 leading-none mb-3">&ldquo;</div>
                    <StarRating rating={t.rating} className="mb-4" />
                    <blockquote className="flex-1 text-sm text-muted-foreground/80 leading-relaxed mb-6">{t.quote}</blockquote>
                    <div className="border-t border-[rgba(0,168,255,0.06)] pt-5 flex items-center gap-3">
                      <Image src={t.image} alt={t.name} width={44} height={44} className="rounded-full object-cover ring-2 ring-[rgba(0,168,255,0.1)]" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">Noch Fragen?</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <FAQAccordion items={faqItems.slice(0, 6)} />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA — The Big Decision
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-32 lg:py-40 overflow-hidden section-glow-top">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00A8FF]/[0.03] to-[#0B0F1A]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(0,168,255,0.05)_0%,transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Image src="/logo-icon.png" alt="" width={64} height={64} className="object-contain mx-auto mb-6" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.05] mb-4">
                Bereit für dein <span className="gradient-brand-text">nächstes Level?</span>
              </h2>
              <p className="text-lg text-muted-foreground/60 max-w-lg mx-auto">
                Wähle deinen Weg und starte in unter 60 Sekunden.
              </p>
            </div>
          </AnimatedSection>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ich suche einen Coach */}
            <StaggerItem>
              <Link href="/fuer-kunden" className="group block">
                <motion.div whileHover={{ y: -6, transition: { duration: 0.25 } }} whileTap={{ scale: 0.98 }}>
                  <div className="p-8 md:p-10 rounded-3xl border border-[#00A8FF]/15 bg-[#0A1628]/50 hover:border-[#00A8FF]/30 hover:shadow-[0_12px_50px_rgba(0,168,255,0.12)] transition-all duration-500 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A8FF] to-[#00D4FF] flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(0,168,255,0.3)] transition-shadow duration-500">
                      <Search className="w-7 h-7 text-[#0B0F1A]" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3">Ich suche einen Coach</h3>
                    <p className="text-muted-foreground/70 leading-relaxed mb-6">
                      Finde verifizierte Trainer, lies echte Bewertungen, buche ein kostenloses Kennenlerngespräch und starte deine Transformation — alles kostenlos.
                    </p>
                    <ul className="space-y-2 mb-8">
                      {['Komplett kostenlos', 'Anonyme Erstgespräche', '500+ verifizierte Coaches', 'Fortschritt sichtbar gemacht'].map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground/60">
                          <Check className="w-3.5 h-3.5 text-[#00D4FF] flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <GradientButton variant="cyan" size="lg" glow className="w-full">
                      Coach finden <ArrowRight className="w-4 h-4" />
                    </GradientButton>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>

            {/* Ich bin ein Coach */}
            <StaggerItem>
              <Link href="/for-coaches" className="group block">
                <motion.div whileHover={{ y: -6, transition: { duration: 0.25 } }} whileTap={{ scale: 0.98 }}>
                  <div className="p-8 md:p-10 rounded-3xl border border-[#00FF94]/15 bg-[#0A1628]/50 hover:border-[#00FF94]/30 hover:shadow-[0_12px_50px_rgba(0,255,148,0.12)] transition-all duration-500 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00FF94] to-[#39FF14] flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(0,255,148,0.3)] transition-shadow duration-500">
                      <Zap className="w-7 h-7 text-[#0B0F1A]" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3">Ich bin ein Coach</h3>
                    <p className="text-muted-foreground/70 leading-relaxed mb-6">
                      Professionalisiere dein Coaching-Business. Erhalte qualifizierte Leads, verwalte Kunden, erstelle Pläne und baue deine Reputation auf.
                    </p>
                    <ul className="space-y-2 mb-8">
                      {['In 5 Minuten online', 'Automatische Lead-Generierung', 'Alles-in-einem Dashboard', 'Ab 49€/Monat'].map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground/60">
                          <Check className="w-3.5 h-3.5 text-[#00FF94] flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <GradientButton variant="green" size="lg" className="w-full">
                      Als Coach starten <ArrowRight className="w-4 h-4" />
                    </GradientButton>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}
