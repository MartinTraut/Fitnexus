'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Dumbbell, UtensilsCrossed, TrendingUp, MessageCircle,
  Flame, Trophy, Target, ChevronRight, Send, Check, Star,
} from 'lucide-react'

function NutritionMockup() {
  return (
    <div className="h-full w-full bg-[#0B0F1A] text-white p-4 overflow-hidden">
      <p className="text-[10px] font-semibold text-[#00FF94] tracking-widest uppercase mb-2">Ernährungsplan</p>
      <h3 className="text-sm font-bold mb-4">Heutiger Fortschritt</h3>
      {/* Radial circles */}
      <div className="flex justify-around mb-5">
        {[
          { val: 91, label: 'Kalorien', color: '#FF6B35' },
          { val: 86, label: 'Protein', color: '#00D4FF' },
          { val: 78, label: 'Carbs', color: '#00FF94' },
        ].map((r) => (
          <div key={r.label} className="flex flex-col items-center">
            <svg width="52" height="52" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(0,168,255,0.06)" strokeWidth="4" />
              <circle cx="26" cy="26" r="20" fill="none" stroke={r.color} strokeWidth="4" strokeLinecap="round"
                strokeDasharray={`${r.val * 1.256} ${125.6}`}
                transform="rotate(-90 26 26)" />
              <text x="26" y="26" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="700" fill="white">{r.val}%</text>
            </svg>
            <span className="text-[8px] text-[#94A3B8] mt-1">{r.label}</span>
          </div>
        ))}
      </div>
      {/* Meals */}
      {[
        { name: 'Frühstück', cal: '630 kcal', time: '07:00' },
        { name: 'Mittagessen', cal: '605 kcal', time: '12:00' },
        { name: 'Abendessen', cal: '635 kcal', time: '19:00' },
      ].map((m) => (
        <div key={m.name} className="flex items-center gap-2.5 p-2 rounded-lg bg-[#111827] border border-[rgba(0,168,255,0.06)] mb-1.5">
          <div className="w-7 h-7 rounded-lg bg-[#00FF94]/10 flex items-center justify-center">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#00FF94]" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold text-white">{m.name}</p>
            <p className="text-[8px] text-[#94A3B8]">{m.time}</p>
          </div>
          <span className="text-[9px] font-medium text-[#00D4FF]">{m.cal}</span>
        </div>
      ))}
    </div>
  )
}

function ProgressMockup() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85]
  return (
    <div className="h-full w-full bg-[#0B0F1A] text-white p-4 overflow-hidden">
      <p className="text-[10px] font-semibold text-[#00D4FF] tracking-widest uppercase mb-2">Fortschritt</p>
      <h3 className="text-sm font-bold mb-3">Gewichtsverlauf</h3>
      {/* Mini chart */}
      <div className="bg-[#111827] rounded-xl border border-[rgba(0,168,255,0.06)] p-3 mb-4">
        <div className="flex items-end gap-1.5 h-20">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className="w-full rounded-t-md"
                style={{
                  height: `${h}%`,
                  background: i >= 6 ? 'linear-gradient(to top, #00A8FF, #00FF94)' : 'rgba(0,168,255,0.15)',
                }}
              />
              <span className="text-[7px] text-[#64748B]">W{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Gewicht', val: '82.5 kg', trend: '-3.5', color: '#00D4FF' },
          { label: 'KFA', val: '18.3%', trend: '-3.8', color: '#FF6B35' },
          { label: 'Muskeln', val: '35.2 kg', trend: '+2.4', color: '#00FF94' },
        ].map((s) => (
          <div key={s.label} className="bg-[#111827] rounded-lg border border-[rgba(0,168,255,0.06)] p-2 text-center">
            <p className="text-[10px] font-bold text-white">{s.val}</p>
            <p className="text-[7px] text-[#94A3B8]">{s.label}</p>
            <p className="text-[8px] font-semibold mt-0.5" style={{ color: s.color }}>{s.trend}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChatMockup() {
  return (
    <div className="h-full w-full bg-[#0B0F1A] text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-[rgba(0,168,255,0.06)] flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00A8FF] to-[#00D4FF] flex items-center justify-center text-[9px] font-bold text-[#0B0F1A]">M</div>
        <div>
          <p className="text-[10px] font-semibold">Max Mustermann</p>
          <p className="text-[7px] text-[#00FF94]">Online</p>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 p-3 space-y-2 overflow-hidden">
        <div className="flex justify-start">
          <div className="bg-[#111827] rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%] border border-[rgba(0,168,255,0.06)]">
            <p className="text-[9px] text-white">Super Session heute! Vergiss nicht deine Protein-Shakes</p>
            <span className="text-[7px] text-[#64748B] mt-0.5 block">14:20</span>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#00A8FF]/15 border border-[#00A8FF]/15 rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%]">
            <p className="text-[9px] text-white">Danke! War ein gutes Workout</p>
            <span className="text-[7px] text-[#64748B] mt-0.5 block text-right">14:35</span>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-[#111827] rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%] border border-[rgba(0,168,255,0.06)]">
            <p className="text-[9px] text-white">Dein neuer Trainingsplan ist online. Schau mal rein!</p>
            <span className="text-[7px] text-[#64748B] mt-0.5 block">15:10</span>
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="p-2 border-t border-[rgba(0,168,255,0.06)] flex gap-2">
        <div className="flex-1 bg-[#111827] rounded-lg px-3 py-1.5 text-[8px] text-[#64748B] border border-[rgba(0,168,255,0.06)]">Nachricht schreiben...</div>
        <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-[#00A8FF] to-[#00D4FF] flex items-center justify-center"><Send className="w-3 h-3 text-white" /></div>
      </div>
    </div>
  )
}

export function AppShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30])
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section ref={ref} className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-radial-center opacity-20" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          <span className="section-label text-[#00D4FF]">Die App</span>
        </div>
        <h2 className="text-center font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
          <span className="text-foreground">Alles was du brauchst.</span>
          <br />
          <span className="gradient-brand-text">In einer App.</span>
        </h2>
        <p className="text-center text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mb-16">
          Trainingspläne, Ernährung, Fortschritt, Chat mit deinem Coach – alles nahtlos verbunden. So sieht dein Cockpit aus:
        </p>

        {/* Floating Mockups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <motion.div style={{ y: y1 }} className="relative">
            <div className="rounded-2xl overflow-hidden border border-[rgba(0,168,255,0.12)] shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_20px_rgba(0,168,255,0.05)] bg-[#0D1320]">
              <div className="h-[280px] md:h-[320px]">
                <NutritionMockup />
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4 font-medium">Ernährungstracking</p>
            <p className="text-center text-xs text-muted-foreground/60 mt-1">Makros, Mahlzeiten, Ziele</p>
          </motion.div>

          <motion.div style={{ y: y2 }} className="relative md:-mt-8">
            <div className="rounded-2xl overflow-hidden border border-[rgba(0,168,255,0.12)] shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_20px_rgba(0,168,255,0.05)] bg-[#0D1320] neon-border">
              <div className="h-[280px] md:h-[320px]">
                <ProgressMockup />
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4 font-medium">Fortschrittstracking</p>
            <p className="text-center text-xs text-muted-foreground/60 mt-1">Charts, Körperdaten, Trends</p>
          </motion.div>

          <motion.div style={{ y: y3 }} className="relative">
            <div className="rounded-2xl overflow-hidden border border-[rgba(0,168,255,0.12)] shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_20px_rgba(0,168,255,0.05)] bg-[#0D1320]">
              <div className="h-[280px] md:h-[320px]">
                <ChatMockup />
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4 font-medium">Coach-Chat</p>
            <p className="text-center text-xs text-muted-foreground/60 mt-1">Direkte Kommunikation</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
