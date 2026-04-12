'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GradientButton } from '@/components/gradient-button'
import { GlassCard } from '@/components/glass-card'
import { TrainerCard } from '@/components/trainer-card'
import { AnimatedSection, StaggerGroup, StaggerItem, motion } from '@/components/motion'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { mockTrainers } from '@/lib/mock-data'
import {
  Search, ArrowRight, Check, Shield, Lock, Star, Eye,
  MessageCircle, Dumbbell, TrendingUp, Apple, Clock,
  MapPin, Filter, Heart, UserCheck, ChevronRight,
  Sparkles, Target, Award, Users, Zap,
} from 'lucide-react'

const previewTrainers = mockTrainers.slice(0, 3)

export default function FuerKundenPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#060910]" />
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(0,168,255,0.15)_0%,transparent_65%)] blur-[30px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08)_0%,transparent_65%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A8FF]/[0.08] border border-[#00A8FF]/20 text-sm text-[#00D4FF] font-medium mb-8"
            >
              <Search className="w-4 h-4" />
              Für alle, die mehr aus ihrem Training rausholen wollen
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] tracking-normal mb-8"
            >
              <span className="text-foreground">Dein perfekter</span>
              <br />
              <span className="text-foreground">Coach wartet</span>
              <br />
              <span className="gradient-cyan-text text-glow-cyan">auf dich.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-muted-foreground/80 max-w-xl mb-10 leading-relaxed"
            >
              Schluss mit ziellosen Workouts und YouTube-Programmen.
              FITNEXUS verbindet dich mit verifizierten Fitness Coaches,
              die genau zu deinen Zielen passen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/trainers">
                <GradientButton variant="cyan" size="xl" glow>
                  <Search className="w-5 h-5" />
                  Coaches entdecken
                </GradientButton>
              </Link>
              <Link href="#vorteile">
                <GradientButton variant="cyan" outline size="xl">
                  Mehr erfahren
                </GradientButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ WARUM FITNEXUS ═══ */}
      <section id="vorteile" className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-20">
              <p className="text-sm font-semibold tracking-brand-wide uppercase text-[#00D4FF] mb-4">Vorteile</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.08] mb-5">
                Warum Tausende <span className="gradient-cyan-text">FITNEXUS</span> vertrauen
              </h2>
              <p className="text-lg text-muted-foreground/60 max-w-2xl mx-auto">
                Kein Rätselraten. Kein Risiko. Nur Coaches, die liefern.
              </p>
            </div>
          </AnimatedSection>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: UserCheck,
                title: 'Verifizierte Coaches',
                desc: 'Jeder Coach auf FITNEXUS wird geprüft. Qualifikationen, Zertifikate und Erfahrung — verifiziert, bevor du sie siehst.',
              },
              {
                icon: Star,
                title: 'Echte Bewertungen',
                desc: 'Keine Fake-Reviews. Nur Kunden, die tatsächlich mit dem Coach trainiert haben, können bewerten. In 6 Kategorien.',
              },
              {
                icon: Lock,
                title: 'Anonymität bis zum Start',
                desc: 'Deine persönlichen Daten bleiben geschützt. Erst wenn du einen Vertrag abschließt, werden Kontaktdaten freigegeben.',
              },
              {
                icon: MessageCircle,
                title: 'Sichere Kommunikation',
                desc: 'Kein WhatsApp nötig. Schreib deinem Coach direkt über FITNEXUS — verschlüsselt, strukturiert und alles an einem Ort.',
              },
              {
                icon: Dumbbell,
                title: 'Individuelle Pläne',
                desc: 'Dein Coach erstellt Trainingspläne direkt in der Plattform. Interaktiv, trackbar und auf dich zugeschnitten.',
              },
              {
                icon: TrendingUp,
                title: 'Sichtbarer Fortschritt',
                desc: 'Gewicht, Körperfett, Muskelmasse, Fotos — alles wird getrackt. Du siehst genau, wo du stehst und wie weit du gekommen bist.',
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-8 rounded-3xl bg-[#0D1320]/40 border border-[rgba(0,168,255,0.06)] hover:border-[rgba(0,168,255,0.15)] transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#00A8FF]/[0.08] flex items-center justify-center mb-5">
                    <item.icon className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ SO FINDEST DU DEINEN COACH ═══ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-20">
              <p className="text-sm font-semibold tracking-brand-wide uppercase text-[#00D4FF] mb-4">Der Prozess</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.1]">
                In 3 Minuten zum <span className="gradient-cyan-text">richtigen Coach</span>
              </h2>
            </div>
          </AnimatedSection>

          <StaggerGroup className="space-y-8 max-w-3xl mx-auto">
            {[
              {
                num: '01',
                title: 'Sag uns, was du suchst',
                desc: 'Muskelaufbau? Abnehmen? Mobility? Yoga? Wähle dein Ziel, deinen Standort und dein Budget. Unsere intelligenten Filter zeigen dir nur Coaches, die wirklich zu dir passen.',
                features: ['Stadt oder Online', '18 Spezialisierungen', 'Preisfilter', 'Bewertungsfilter'],
              },
              {
                num: '02',
                title: 'Lerne deinen Coach kennen',
                desc: 'Sieh dir Profile an, lies echte Bewertungen und buche ein kostenloses Kennenlerngespräch. Alles anonym — dein Coach sieht nur dein Alias, nicht deine echten Daten.',
                features: ['Kostenlos & unverbindlich', 'Komplett anonym', 'Direkt über FITNEXUS', 'Kein WhatsApp-Austausch'],
              },
              {
                num: '03',
                title: 'Trainiere mit System',
                desc: 'Dein Coach erstellt Trainings- und Ernährungspläne direkt in FITNEXUS. Du trackst deinen Fortschritt, lädst Fotos hoch und kommunizierst alles über die Plattform.',
                features: ['Individuelle Pläne', 'Progress Tracking', 'Check-in Fotos', 'Direkte Kommunikation'],
              },
            ].map((step, i) => (
              <StaggerItem key={step.num}>
                <div className="flex gap-6 md:gap-10 items-start">
                  <div className="flex-shrink-0">
                    <span className="text-5xl md:text-6xl font-heading font-bold text-[#00A8FF]/10">{step.num}</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.features.map((f) => (
                        <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00A8FF]/[0.06] border border-[#00A8FF]/10 text-xs text-[#00D4FF]">
                          <Check className="w-3 h-3" /> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ 3D SCROLL — So sieht dein Dashboard aus ═══ */}
      <section className="relative overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="mb-4">
              <p className="text-sm font-semibold tracking-[0.1em] uppercase text-[#00D4FF] mb-4">Dein Dashboard</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-[1.08]">
                So sieht <span className="gradient-cyan-text">dein Bereich</span> aus
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
                <span className="text-[9px] text-muted-foreground/30">fitnexus.de/dashboard/customer</span>
              </div>
            </div>
            {/* KPIs */}
            <div className="grid grid-cols-4 gap-4 mb-5">
              {[
                { l: 'Mein Coach', v: 'Max K.', c: '#00A8FF' },
                { l: 'Nächste Session', v: 'Mo, 10:00', c: '#00D4FF' },
                { l: 'Fortschritt', v: '-4.8 kg', c: '#00FF94' },
                { l: 'Streak', v: '12 Tage', c: '#FFD700' },
              ].map((s) => (
                <div key={s.l} className="p-4 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                  <p className="text-2xl font-bold" style={{ color: s.c }}>{s.v}</p>
                  <p className="text-[10px] text-muted-foreground/50 mt-1">{s.l}</p>
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
                    { ex: 'Bankdrücken — 4×8 @ 45kg', done: true },
                    { ex: 'Schrägbank Kurzhantel — 3×12 @ 14kg', done: true },
                    { ex: 'Schulterdrücken — 4×10 @ 20kg', done: true },
                    { ex: 'Seitheben — 4×15 @ 6kg', done: false },
                    { ex: 'Trizeps Dips — 3×12 BW', done: false },
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
                  <div className="p-2 rounded-lg bg-[#00A8FF]/10 text-[10px] text-[#00D4FF]">Wie geht&apos;s dir heute?</div>
                  <div className="p-2 rounded-lg bg-[#1A2332]/60 text-[10px] text-muted-foreground ml-4">Gut! Bin motiviert</div>
                  <div className="p-2 rounded-lg bg-[#00A8FF]/10 text-[10px] text-[#00D4FF]">Schulterdrücken steigern wir auf 20kg</div>
                  <div className="p-2 rounded-lg bg-[#1A2332]/60 text-[10px] text-muted-foreground ml-4">Neuer PR!</div>
                  <div className="p-2 rounded-lg bg-[#00A8FF]/10 text-[10px] text-[#00D4FF]">Ernährung sieht top aus.</div>
                </div>
              </div>
            </div>

            {/* Ernährung + Fortschritt + Termine + Coach */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Ernährung</p>
                <div className="space-y-3">
                  {[
                    { label: 'Kalorien', pct: 92, color: '#00D4FF' },
                    { label: 'Protein', pct: 90, color: '#00FF94' },
                    { label: 'Carbs', pct: 87, color: '#FFD700' },
                    { label: 'Fett', pct: 86, color: '#00A8FF' },
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
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Fortschritt</p>
                <div className="space-y-2.5">
                  {[
                    { label: 'Gewicht', value: '68.2 kg', change: '-4.8 kg', color: '#00FF94' },
                    { label: 'Körperfett', value: '21.3%', change: '-3.1%', color: '#00D4FF' },
                    { label: 'Muskelmasse', value: '27.8 kg', change: '+1.7 kg', color: '#39FF14' },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center justify-between p-2 rounded-lg bg-[#1A2332]/40">
                      <div>
                        <p className="text-[10px] text-muted-foreground/40">{b.label}</p>
                        <p className="text-sm font-bold text-foreground">{b.value}</p>
                      </div>
                      <span className="text-xs font-bold" style={{ color: b.color }}>{b.change}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Termine</p>
                <div className="space-y-2">
                  {[
                    { time: 'Mo 10:00', title: 'Push Training', active: true },
                    { time: 'Mi 18:00', title: 'Beintraining', active: false },
                    { time: 'Fr 09:00', title: 'Pull Training', active: false },
                    { time: 'Sa 10:00', title: 'Yoga Flow', active: false },
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
              <div className="p-5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.06)]">
                <p className="text-sm font-semibold text-foreground mb-3">Mein Coach</p>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-[#1A2332]/40 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00A8FF] flex items-center justify-center text-xs font-bold text-[#0B0F1A]">MK</div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Max Krüger</p>
                    <p className="text-[10px] text-muted-foreground/30">Kraft & Hypertrophie</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {['Verifiziert', '127 Bewertungen', '4.9 ★ Rating'].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-[10px] text-muted-foreground/50">
                      <Check className="w-3 h-3 text-[#00FF94]" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* ═══ PREVIEW COACHES ═══ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <p className="text-sm font-semibold tracking-brand-wide uppercase text-[#00D4FF] mb-4">Coaches</p>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
                  Entdecke Top Coaches
                </h2>
              </div>
              <Link href="/trainers">
                <GradientButton variant="cyan" outline size="md">
                  Alle ansehen <ArrowRight className="w-4 h-4" />
                </GradientButton>
              </Link>
            </div>
          </AnimatedSection>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewTrainers.map((t) => (
              <StaggerItem key={t.id}>
                <TrainerCard
                  id={t.slug} name={t.display_name} image={t.profile_image_url}
                  city={t.city} categories={t.categories} hourlyRate={t.hourly_rate}
                  rating={t.rating_average} ratingCount={t.rating_count} isVerified={t.is_verified} certificateCount={t.certificates?.length}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ KOSTENLOS FÜR DICH ═══ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-glow-top">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <GlassCard className="p-10 md:p-14 text-center shine" hover={false} neonBorder>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF94]/[0.08] border border-[#00FF94]/20 text-sm text-[#00FF94] font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Komplett kostenlos
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
                FITNEXUS ist für Kunden <span className="gradient-green-text">kostenlos</span>
              </h2>
              <p className="text-lg text-muted-foreground/70 max-w-xl mx-auto mb-8 leading-relaxed">
                Suche, vergleiche, buche Erstgespräche, kommuniziere, tracke deinen Fortschritt.
                Alles ohne einen Cent zu bezahlen. Ohne versteckte Kosten. Ohne Abo.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['Coach-Suche', 'Erstgespräch', 'Chat', 'Trainingspläne', 'Fortschritt', 'Bewertungen'].map((f) => (
                  <span key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-[#00FF94]" /> {f}
                  </span>
                ))}
              </div>
              <Link href="/register">
                <GradientButton variant="cyan" size="xl" glow>
                  Jetzt kostenlos starten <ArrowRight className="w-5 h-5" />
                </GradientButton>
              </Link>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00A8FF]/[0.03] to-[#0B0F1A]" />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-foreground leading-[1.05] mb-6">
            Finde den Coach, der <span className="gradient-cyan-text">dein Leben verändert</span>
          </h2>
          <p className="text-lg text-muted-foreground/70 mb-10 max-w-lg mx-auto">
            Hunderte Coaches warten auf dich. Starte jetzt — kostenlos und in unter 60 Sekunden.
          </p>
          <Link href="/trainers">
            <GradientButton variant="cyan" size="xl" glow>
              <Search className="w-5 h-5" /> Coaches entdecken
            </GradientButton>
          </Link>
        </AnimatedSection>
      </section>
    </>
  )
}
