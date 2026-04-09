'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { getMessages, sendMessage, markMessagesRead } from '@/lib/store'
import { Input } from '@/components/ui/input'
import type { Message } from '@/types'
import { Send, CheckCheck, Check, Image as ImageIcon, Paperclip } from 'lucide-react'

interface ChatWindowProps {
  threadId: string
  currentUserId: string
  otherUserName: string
  otherUserImage?: string
}

function formatMessageTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  const time = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })

  if (diffDays === 0) return time
  if (diffDays === 1) return `Gestern, ${time}`
  if (diffDays < 7) {
    const day = date.toLocaleDateString('de-DE', { weekday: 'long' })
    return `${day}, ${time}`
  }
  return `${date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' })}, ${time}`
}

function formatDateSeparator(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffDays === 0) return 'Heute'
  if (diffDays === 1) return 'Gestern'
  if (diffDays < 7) return date.toLocaleDateString('de-DE', { weekday: 'long' })
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
}

function shouldShowDateSeparator(current: Message, previous: Message | null): boolean {
  if (!previous) return true
  const currentDate = new Date(current.created_at).toDateString()
  const previousDate = new Date(previous.created_at).toDateString()
  return currentDate !== previousDate
}

export function ChatWindow({ threadId, currentUserId, otherUserName, otherUserImage }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadMessages = useCallback(() => {
    const msgs = getMessages(threadId)
    setMessages(msgs)
    markMessagesRead(threadId, currentUserId)
  }, [threadId, currentUserId])

  // Initial load
  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  // Poll for new messages
  useEffect(() => {
    const interval = setInterval(loadMessages, 2000)
    return () => clearInterval(interval)
  }, [loadMessages])

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    const content = newMessage.trim()
    setNewMessage('')

    sendMessage({
      thread_id: threadId,
      sender_id: currentUserId,
      content,
    })

    loadMessages()
    setIsSending(false)
    inputRef.current?.focus()
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-3.5">
        <div className="relative">
          {otherUserImage ? (
            <img
              src={otherUserImage}
              alt={otherUserName}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-[#00A8FF]/20"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#00A8FF]/20 to-[#00FF94]/20 ring-2 ring-[#00A8FF]/20">
              <span className="text-sm font-bold text-[#00A8FF]">
                {otherUserName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0B0F1A] bg-[#00FF94]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{otherUserName}</h3>
          <p className="text-xs text-white/40">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
      >
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A8FF]/10">
                <Send className="h-6 w-6 text-[#00A8FF]/40" />
              </div>
              <p className="text-sm text-white/40">Noch keine Nachrichten</p>
              <p className="mt-1 text-xs text-white/25">Starte die Konversation mit {otherUserName}</p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
          const isSender = msg.sender_id === currentUserId
          const showDate = shouldShowDateSeparator(msg, messages[i - 1] ?? null)

          return (
            <div key={msg.id}>
              {/* Date Separator */}
              {showDate && (
                <div className="flex items-center justify-center py-3">
                  <div className="rounded-full bg-white/[0.06] px-3 py-1">
                    <span className="text-[11px] font-medium text-white/40">
                      {formatDateSeparator(msg.created_at)}
                    </span>
                  </div>
                </div>
              )}

              {/* Message Bubble */}
              <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-1`}>
                <div
                  className={`group relative max-w-[75%] rounded-2xl px-3.5 py-2 ${
                    isSender
                      ? 'rounded-br-md bg-gradient-to-br from-[#00A8FF]/90 to-[#00A8FF]/70 text-white'
                      : 'rounded-bl-md bg-white/[0.06] text-white/90 border border-white/[0.04]'
                  }`}
                >
                  <p className="text-[13.5px] leading-relaxed whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                  <div className={`mt-1 flex items-center gap-1 ${isSender ? 'justify-end' : ''}`}>
                    <span className={`text-[10px] ${isSender ? 'text-white/50' : 'text-white/30'}`}>
                      {formatMessageTime(msg.created_at)}
                    </span>
                    {isSender && (
                      msg.is_read ? (
                        <CheckCheck className="h-3 w-3 text-[#00FF94]" />
                      ) : (
                        <Check className="h-3 w-3 text-white/40" />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="border-t border-white/[0.06] px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/60"
          >
            <Paperclip className="h-4.5 w-4.5" />
          </button>
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Nachricht schreiben..."
              className="rounded-full border-white/10 bg-white/[0.04] pr-10 text-white placeholder:text-white/30 focus-visible:border-[#00A8FF]/40 focus-visible:ring-[#00A8FF]/15"
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#00A8FF] to-[#00D4FF] text-white transition-all hover:shadow-[0_0_20px_rgba(0,168,255,0.3)] disabled:opacity-30 disabled:hover:shadow-none"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
