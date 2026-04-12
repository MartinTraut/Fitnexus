'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { AnimatedSection, StaggerGroup, StaggerItem, motion } from '@/components/motion'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { pricingPlans } from '@/lib/mock-data'
import {
  Zap, ArrowRight, Check, Star, Users,
  MessageCircle, Dumbbell, TrendingUp, Apple,
  Globe, Target, Award, BarChart3, CreditCard,
  Shield, Eye, Sparkles, Inbox,
  ClipboardList, FileText,
} from 'lucide-react'

const coachPlans = pricingPlans.filter(p => p.name !== 'Kunde')

export default function ForCoachesPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#060910]" />
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,148,0.12)_0%,transparent_65%)] blur-[30px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,148,0.06)_0%,transparent_65%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF94]/[0.08] border border-[#00FF94]/20 text-sm text-[#00FF94] font-medium mb-8">
              <Zap className="w-4 h-4" /> Für Fitness Coaches und Personal Trainer
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] tracking-normal mb-8">
              <span className="text-foreground">Mehr Kunden.</span><br />
              <span className="text-foreground">Weniger Chaos.</span><br />
              <span className="gradient-green-text text-glow-green">Mehr Umsatz.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg sm:text-xl text-muted-foreground/80 max-w-xl mb-10 leading-relaxed">
              FITNEXUS professionalisiert dein Coaching-Business. Neue Kunden finden dich. Du konzentrierst dich aufs Coaching.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <GradientButton variant="green" size="xl" glow><Zap className="w-5 h-5" /> Jetzt kostenlos starten</GradientButton>
              </Link>
              <Link href="#features">
                <GradientButton variant="green" outline size="xl">Features ansehen</GradientButton>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap items-center gap-6 mt-12 text-xs text-muted-foreground/50">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#00FF94]" /> Keine Einrichtungsgebühr</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#00FF94]" /> Monatlich kündbar</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#00FF94]" /> In 5 Minuten online</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PAIN POINTS ═══ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-brand-wide uppercase text-red-400/80 mb-4">Kennst du das?</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.08]">
                Coaching ist deine Leidenschaft.<br /><span className="text-red-400/70">Verwaltung dein Albtraum.</span>
              </h2>
            </div>
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { icon: MessageCircle, text: '15 Kunden in 15 WhatsApp-Chats' },
              { icon: ClipboardList, text: 'Trainingspläne als PDF verschicken' },
              { icon: CreditCard, text: 'Abrechnung per Excel und PayPal' },
              { icon: Globe, text: 'Neue Kunden nur über Instagram' },
            ].map((item) => (
              <StaggerItem key={item.text}>
                <div className="p-6 rounded-2xl bg-red-500/[0.03] border border-red-500/[0.08] h-full">
                  <item.icon className="w-5 h-5 text-red-400/60 mb-4" />
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <AnimatedSection className="text-center">
            <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground">Es gibt einen <span className="gradient-green-text">besseren Weg</span>.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-20">
              <p className="text-sm font-semibold tracking-brand-wide uppercase text-[#00FF94] mb-4">Features</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.08] mb-5">
                Alles was du brauchst. <span className="gradient-green-text">An einem Ort.</span>
              </h2>
            </div>
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Inbox, title: 'Automatische Leads', desc: 'Kunden finden dich über die Suche. Qualifizierte Anfragen direkt in dein Dashboard.', hl: true },
              { icon: Eye, title: 'Premium-Profil', desc: 'Bio, Pakete, Bewertungen, Spezialisierungen — deine professionelle Landingpage.' },
              { icon: MessageCircle, title: 'In-App Chat', desc: 'Zentrale Kommunikation. Bilder, Dateien, Read-Status. Kein WhatsApp mehr.' },
              { icon: Dumbbell, title: 'Trainingsplan-Builder', desc: 'Wochenpläne mit Übungen, Sätzen, Wiederholungen. Kunden tracken Fortschritte.' },
              { icon: Apple, title: 'Ernährungspläne', desc: 'Kalorienziele, Makros, Mahlzeiten. Alles digital, immer abrufbar.' },
              { icon: TrendingUp, title: 'Progress Tracking', desc: 'Gewicht, Körperfett, Fotos — automatisch visualisiert in Charts.' },
              { icon: Star, title: 'Bewertungen & Ranking', desc: '6 Kategorien. Echte Bewertungen. Höheres Rating = mehr Sichtbarkeit.', hl: true },
              { icon: FileText, title: 'Digitale Verträge', desc: 'Angebote mit Paketen und Preisen. Kunden akzeptieren mit einem Klick.' },
              { icon: BarChart3, title: 'Business Analytics', desc: 'Umsatz, Kunden, Leads, Bewertungen — alles auf einen Blick.' },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className={`p-8 rounded-3xl h-full transition-all duration-500 ${item.hl ? 'bg-[#00FF94]/[0.04] border border-[#00FF94]/15' : 'bg-[#0D1320]/40 border border-[rgba(0,168,255,0.06)]'} hover:border-[rgba(0,255,148,0.15)]`}>
                  <div className="w-12 h-12 rounded-xl bg-[#00FF94]/[0.08] flex items-center justify-center mb-5">
                    <item.icon className="w-5 h-5 text-[#00FF94]" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ 3D SCROLL — Coach Dashboard Preview ═══ */}
      <section className="relative overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="mb-4">
              <p className="text-sm font-semibold tracking-[0.1em] uppercase text-[#00FF94] mb-4">Dein Dashboard</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.08]">
                So sieht dein <span className="gradient-green-text">Coach-Dashboard</span> aus
              </h2>
            </div>
          }
        >
          <div className="w-full h-full p-4 md:p-6 overflow-hidden">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="ml-3 flex-1 h-6 rounded-lg bg-[#1A2332]/60 flex items-center px-3">
                <span className="text-[9px] text-muted-foreground/30">fitnexus.de/dashboard/trainer</span>
              </div>
            </div>
            {/* KPIs */}
            <div className="grid grid-cols-4 gap-4 mb-5">
              {[
                { l: 'Aktive Kunden', v: '47', c: '#00FF94' },
                { l: 'Neue Leads', v: '12', c: '#00A8FF' },
                { l: 'Bewertung', v: '4.9 ★', c: '#FFD700' },
                { l: 'Umsatz/Monat', v: '8.340€', c: '#00FF94' },
              ].map((s) => (
                <div key={s.l} className="p-4 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,255,148,0.06)]">
                  <p className="text-2xl font-bold" style={{ color: s.c }}>{s.v}</p>
                  <p className="text-[10px] text-muted-foreground/50 mt-1">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Leads + Kunden + Chat */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,255,148,0.06)]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-foreground">Neue Leads</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00FF94]/10 text-[#00FF94]">3 offen</span>
                </div>
                <div className="space-y-2">
                  {[
                    { id: '#4821', goal: 'Muskelaufbau', city: 'München' },
                    { id: '#7193', goal: 'Abnehmen', city: 'München' },
                    { id: '#2547', goal: 'Krafttraining', city: 'Online' },
                    { id: '#8912', goal: 'Reha-Training', city: 'München' },
                  ].map((l) => (
                    <div key={l.id} className="flex items-center gap-2 p-2 rounded-lg bg-[#00FF94]/[0.04] border border-[#00FF94]/[0.06]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                      <div className="flex-1">
                        <p className="text-xs text-foreground font-medium">Client{l.id}</p>
                        <p className="text-[10px] text-muted-foreground/30">{l.goal} · {l.city}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,255,148,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Aktive Kunden</p>
                <div className="space-y-2">
                  {[
                    { n: 'Laura M.', p: 'Transformation 12W', s: '4/12' },
                    { n: 'Tim R.', p: 'Starter 4W', s: '2/4' },
                    { n: 'Anna S.', p: 'Premium 12W', s: '9/12' },
                    { n: 'Markus B.', p: 'Online Coaching', s: '6/12' },
                  ].map((c) => (
                    <div key={c.n} className="flex items-center justify-between p-2 rounded-lg bg-[#1A2332]/40">
                      <div>
                        <p className="text-xs text-foreground font-medium">{c.n}</p>
                        <p className="text-[10px] text-muted-foreground/30">{c.p}</p>
                      </div>
                      <span className="text-[10px] font-semibold text-[#00D4FF]">{c.s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,255,148,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Nachrichten</p>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-[#1A2332]/60 text-[10px] text-muted-foreground">Wie lief das Training?</div>
                  <div className="p-2 rounded-lg bg-[#00FF94]/10 text-[10px] text-[#00FF94] ml-4">Super, 80kg geschafft!</div>
                  <div className="p-2 rounded-lg bg-[#1A2332]/60 text-[10px] text-muted-foreground">Stark! Nächste Woche steigern.</div>
                  <div className="p-2 rounded-lg bg-[#00FF94]/10 text-[10px] text-[#00FF94] ml-4">Bin bereit, Coach!</div>
                  <div className="p-2 rounded-lg bg-[#1A2332]/60 text-[10px] text-muted-foreground">Ernährungsplan aktualisiert.</div>
                </div>
              </div>
            </div>

            {/* Termine + Bewertungen + Verträge + Umsatz */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,255,148,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Heute — 5 Sessions</p>
                <div className="space-y-2">
                  {[
                    { time: '08:00', client: 'Anna S.', done: true },
                    { time: '10:00', client: 'Markus B.', done: true },
                    { time: '14:00', client: 'Laura M.', done: false },
                    { time: '16:00', client: 'Tim R.', done: false },
                    { time: '18:00', client: 'Neuer Lead', done: false },
                  ].map((t) => (
                    <div key={t.time} className="flex items-center gap-2 p-2 rounded-lg bg-[#1A2332]/40">
                      <span className="text-[10px] font-mono text-muted-foreground/30 w-10">{t.time}</span>
                      <div className={`w-1.5 h-1.5 rounded-full ${t.done ? 'bg-[#00FF94]' : 'bg-muted-foreground/15'}`} />
                      <span className="text-xs text-foreground">{t.client}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,255,148,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Bewertungen</p>
                <div className="space-y-2">
                  {[
                    { dim: 'Fachwissen', val: 98 },
                    { dim: 'Kommunikation', val: 95 },
                    { dim: 'Motivation', val: 100 },
                    { dim: 'Preis-Leistung', val: 88 },
                    { dim: 'Ergebnisse', val: 94 },
                  ].map((r) => (
                    <div key={r.dim}>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-muted-foreground/50">{r.dim}</span>
                        <span className="font-semibold text-[#FFD700]">{r.val}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#1A2332]/60 overflow-hidden">
                        <div className="h-full rounded-full bg-[#FFD700]" style={{ width: `${r.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,255,148,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Verträge</p>
                <div className="space-y-2">
                  {[
                    { name: 'Transformation 12W', clients: 8, color: '#00FF94' },
                    { name: 'Starter 4W', clients: 5, color: '#00D4FF' },
                    { name: 'Premium 12W', clients: 4, color: '#39FF14' },
                    { name: 'Online Coaching', clients: 12, color: '#00A8FF' },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center gap-2 p-2 rounded-lg bg-[#1A2332]/40">
                      <div className="w-1 h-5 rounded-full" style={{ background: p.color }} />
                      <div className="flex-1">
                        <p className="text-xs text-foreground font-medium">{p.name}</p>
                      </div>
                      <span className="text-[10px] font-semibold" style={{ color: p.color }}>{p.clients} Kunden</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,255,148,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Umsatz</p>
                <div className="space-y-2.5">
                  {[
                    { label: 'Dieser Monat', value: '8.340€', color: '#00FF94' },
                    { label: 'Vormonat', value: '7.100€', color: '#00D4FF' },
                    { label: 'Wachstum', value: '+18%', color: '#39FF14' },
                  ].map((u) => (
                    <div key={u.label} className="flex items-center justify-between p-2 rounded-lg bg-[#1A2332]/40">
                      <p className="text-[10px] text-muted-foreground/40">{u.label}</p>
                      <p className="text-sm font-bold" style={{ color: u.color }}>{u.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
                Coaches auf FITNEXUS <span className="gradient-green-text">wachsen schneller</span>
              </h2>
            </div>
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { value: '10+ Std.', label: 'Weniger Verwaltung/Woche', desc: 'Automatisierte Tools sparen dir wertvolle Stunden.' },
              { value: '3x', label: 'Mehr qualifizierte Anfragen', desc: 'Dreimal mehr Leads als über Social Media allein.' },
              { value: '89%', label: 'Kundenbindung', desc: 'Kunden über FITNEXUS bleiben im Schnitt 89% länger.' },
            ].map((s) => (
              <StaggerItem key={s.label}>
                <GlassCard className="p-8 text-center h-full" hover={false}>
                  <p className="text-4xl font-heading font-bold gradient-green-text mb-2">{s.value}</p>
                  <p className="text-sm font-semibold text-foreground mb-3">{s.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ DASHBOARD PREVIEW ═══ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
              <p className="text-sm font-semibold tracking-brand-wide uppercase text-[#00FF94] mb-4">Dashboard</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground leading-[1.08] mb-6">
                Dein Business. Auf einen <span className="gradient-green-text">Blick.</span>
              </h2>
              <ul className="space-y-3">
                {['Leads annehmen oder ablehnen mit einem Klick', 'Verträge digital erstellen und unterzeichnen', 'Workspaces pro Kunde mit allen Daten', 'Umsatzübersicht und Analytics in Echtzeit'].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-[#00FF94] mt-0.5 flex-shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection variants={{ hidden: { opacity: 0, x: 40, scale: 0.95 }, visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
              <GlassCard className="p-6 lg:p-8 shine" hover={false} neonBorder>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-xs text-muted-foreground">Coach Dashboard</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[{ l: 'Kunden', v: '24', c: '#00FF94' }, { l: 'Leads', v: '7', c: '#00D4FF' }, { l: 'Rating', v: '4.9', c: '#FFD700' }, { l: 'Umsatz', v: '4.280€', c: '#00FF94' }].map((s) => (
                    <div key={s.l} className="p-3 rounded-xl bg-[#0B0F1A]/60 border border-[rgba(0,168,255,0.06)]">
                      <p className="text-lg font-bold" style={{ color: s.c }}>{s.v}</p>
                      <p className="text-[10px] text-muted-foreground">{s.l}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {['Neue Anfrage: Client#4821', '5-Sterne Bewertung erhalten', 'Session morgen 10:00'].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0B0F1A]/40">
                      <div className="w-2 h-2 rounded-full bg-[#00FF94]" /><span className="text-xs text-muted-foreground">{i}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-brand-wide uppercase text-[#00FF94] mb-4">Preise</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-5">
                Investiere in dein <span className="gradient-green-text">Business</span>
              </h2>
            </div>
          </AnimatedSection>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coachPlans.map((plan) => (
              <StaggerItem key={plan.name}>
                <div className={`flex flex-col h-full rounded-3xl p-8 ${plan.highlighted ? 'bg-[#0D1320]/80 border border-[#00FF94]/20 shadow-[0_0_40px_rgba(0,255,148,0.06)] relative' : 'bg-[#0D1320]/40 border border-[rgba(0,168,255,0.06)]'}`}>
                  {plan.highlighted && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00FF94] to-[#39FF14] text-[#0B0F1A] text-xs font-bold px-5 py-1.5 rounded-full">Empfohlen</span>}
                  <h3 className="text-xl font-heading font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-heading font-bold text-foreground">{plan.price}</span>
                    <span className="text-base text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <ul className="flex-1 space-y-3.5 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-[#00FF94] mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{f}</span></li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <GradientButton variant="green" outline={!plan.highlighted} size="lg" className="w-full">{plan.ctaText}</GradientButton>
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF94]/[0.02] to-[#0B0F1A]" />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.05] mb-6">
            Bereit, dein Coaching<br /><span className="gradient-green-text text-glow-green">zu professionalisieren?</span>
          </h2>
          <p className="text-lg text-muted-foreground/70 mb-12 max-w-lg mx-auto">
            Erstelle dein Profil in 5 Minuten und erhalte deine ersten Leads. Kostenlos starten.
          </p>
          <Link href="/register">
            <GradientButton variant="green" size="xl" glow className="min-w-[280px]"><Zap className="w-5 h-5" /> Jetzt kostenlos starten</GradientButton>
          </Link>
          <p className="text-xs text-muted-foreground/40 mt-6">Keine Kreditkarte nötig. Monatlich kündbar.</p>
        </AnimatedSection>
      </section>
    </>
  )
}
