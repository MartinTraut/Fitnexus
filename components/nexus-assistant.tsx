'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  getNexusReply,
  nexusSuggestions,
  nexusWelcome,
  type NexusMessage,
} from '@/lib/nexus-engine'

const STORAGE_KEY = 'nexus-chat-v1'

function formatRich(text: string) {
  // Renders **bold** segments + line breaks. Keeps it dependency-free.
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {p.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{p}</span>
  })
}

export function NexusAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<NexusMessage[]>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [hasNewBadge, setHasNewBadge] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Restore from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as NexusMessage[]
        if (Array.isArray(parsed)) setMessages(parsed)
      }
    } catch {}
  }, [])

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {}
  }, [messages])

  // Autoscroll
  useEffect(() => {
    if (!open) return
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    })
  }, [messages, isThinking, open])

  // Focus on open
  useEffect(() => {
    if (open) {
      setHasNewBadge(false)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [open])

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isThinking) return

    const userMsg: NexusMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
      ts: Date.now(),
    }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setIsThinking(true)

    try {
      const reply = await getNexusReply(trimmed)
      const botMsg: NexusMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: reply,
        ts: Date.now(),
      }
      setMessages((m) => [...m, botMsg])
    } finally {
      setIsThinking(false)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  function clearChat() {
    setMessages([])
  }

  const showWelcome = messages.length === 0

  return (
    <>
      {/* ───────── Floating Action Button ───────── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'NEXUS Assistent schließen' : 'NEXUS Assistent öffnen'}
        className={cn(
          'fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60]',
          'flex items-center gap-2.5 pl-2 pr-4 py-2',
          'rounded-full',
          'bg-[#0D1320]/90 backdrop-blur-xl',
          'border border-[rgba(0,168,255,0.25)]',
          'shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(0,168,255,0.18)]',
          'hover:border-[rgba(0,168,255,0.45)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_32px_rgba(0,168,255,0.3)]',
          'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'group'
        )}
      >
        <span className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-[rgba(0,168,255,0.35)]">
          <Image src="/logo-icon.png" alt="" width={72} height={72} className="absolute inset-0 w-full h-full object-cover scale-110" />
          {hasNewBadge && !open && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00FF94] ring-2 ring-[#0D1320]">
              <span className="absolute inset-0 rounded-full bg-[#00FF94] animate-ping opacity-75" />
            </span>
          )}
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-xs font-semibold text-foreground flex items-center gap-1">
            NEXUS
            <Sparkles className="w-3 h-3 text-[#00FF94]" />
          </span>
          <span className="text-[10px] text-muted-foreground/70">
            {open ? 'Schließen' : 'Frag den Assistenten'}
          </span>
        </span>
      </motion.button>

      {/* ───────── Chat Panel ───────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[59] bg-[#04070F]/60 backdrop-blur-sm sm:hidden"
            />

            <motion.div
              role="dialog"
              aria-label="NEXUS Assistent"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'fixed z-[60]',
                'inset-x-3 bottom-3 top-16 sm:inset-auto',
                'sm:right-6 sm:bottom-24 sm:top-auto sm:w-[400px] sm:h-[640px]',
                'flex flex-col',
                'rounded-[28px] sm:rounded-3xl',
                'bg-[#0B0F1A]/95 backdrop-blur-2xl',
                'border border-[rgba(0,168,255,0.18)]',
                'shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(0,168,255,0.12)]',
                'overflow-hidden'
              )}
            >
              {/* Subtle top glow */}
              <div aria-hidden className="absolute top-0 left-0 right-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(0,168,255,0.18),transparent_70%)] pointer-events-none" />

              {/* ── Header ── */}
              <div className="relative flex items-center justify-between px-5 pt-5 pb-4 border-b border-[rgba(0,168,255,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-[rgba(0,168,255,0.35)]">
                    <Image src="/logo-icon.png" alt="" width={88} height={88} className="absolute inset-0 w-full h-full object-cover scale-110" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground leading-tight flex items-center gap-1.5">
                      NEXUS
                      <Sparkles className="w-3.5 h-3.5 text-[#00FF94]" />
                    </p>
                    <p className="text-[11px] text-muted-foreground/60 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" />
                      Online · Dein Assistent
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button
                      onClick={clearChat}
                      className="text-[10px] tracking-wider uppercase text-muted-foreground/50 hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-[rgba(0,168,255,0.06)] transition-colors"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Schließen"
                    className="p-2 rounded-xl text-muted-foreground/70 hover:text-foreground hover:bg-[rgba(0,168,255,0.06)] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── Messages ── */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                {showWelcome && (
                  <>
                    <Bubble role="assistant">{formatRich(nexusWelcome)}</Bubble>
                    <div className="flex flex-col gap-2 pt-1">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 ml-1 mb-1">
                        Vorschläge
                      </p>
                      {nexusSuggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="text-left text-xs px-4 py-2.5 rounded-xl border border-[rgba(0,168,255,0.12)] bg-[rgba(0,168,255,0.04)] text-foreground/85 hover:border-[rgba(0,168,255,0.3)] hover:bg-[rgba(0,168,255,0.1)] transition-all duration-200"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {messages.map((m) => (
                  <Bubble key={m.id} role={m.role}>
                    {formatRich(m.content)}
                  </Bubble>
                ))}

                {isThinking && (
                  <div className="flex items-center gap-2 pl-1">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[rgba(0,168,255,0.3)]">
                      <Image src="/logo-icon.png" alt="" width={56} height={56} className="absolute inset-0 w-full h-full object-cover scale-110" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[rgba(0,168,255,0.06)] border border-[rgba(0,168,255,0.1)]">
                      <Dot delay={0} />
                      <Dot delay={0.15} />
                      <Dot delay={0.3} />
                    </div>
                  </div>
                )}
              </div>

              {/* ── Input ── */}
              <div className="border-t border-[rgba(0,168,255,0.08)] p-3">
                <div className="flex items-end gap-2 p-1.5 rounded-2xl bg-[#0D1320]/80 border border-[rgba(0,168,255,0.12)] focus-within:border-[rgba(0,168,255,0.35)] transition-colors">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    rows={1}
                    placeholder="Frag NEXUS …"
                    className="flex-1 bg-transparent border-0 outline-none resize-none text-sm text-foreground placeholder:text-muted-foreground/40 px-3 py-2 max-h-32 min-h-[36px]"
                  />
                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim() || isThinking}
                    aria-label="Senden"
                    className={cn(
                      'flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all',
                      input.trim() && !isThinking
                        ? 'bg-gradient-to-br from-[#00A8FF] to-[#00FF94] text-[#0B0F1A] shadow-[0_0_18px_rgba(0,168,255,0.35)] hover:shadow-[0_0_24px_rgba(0,168,255,0.55)]'
                        : 'bg-[rgba(0,168,255,0.06)] text-muted-foreground/40 cursor-not-allowed'
                    )}
                  >
                    {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground/30 text-center mt-2">
                  NEXUS kann sich irren — bei Gesundheitsthemen Coach oder Arzt fragen.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Subcomponents ─────────────────────────────────────────────────

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-md bg-gradient-to-br from-[#00A8FF] to-[#00D4FF] text-[#0B0F1A] text-sm leading-relaxed font-medium shadow-[0_4px_16px_rgba(0,168,255,0.2)]">
          {children}
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-start gap-2.5">
      <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-0.5 ring-1 ring-[rgba(0,168,255,0.3)]">
        <Image src="/logo-icon.png" alt="" width={56} height={56} className="absolute inset-0 w-full h-full object-cover scale-110" />
      </div>
      <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-tl-md bg-[rgba(0,168,255,0.06)] border border-[rgba(0,168,255,0.1)] text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={{ duration: 1, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}
