'use client'

import { useState, useEffect, useCallback } from 'react'
import { getThreadsForUser, getMessages, getUnreadCount } from '@/lib/store'
import { mockTrainers } from '@/lib/mock-data'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { ChatThread, Message } from '@/types'
import { Search, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ThreadListProps {
  userId: string
  userRole: 'customer' | 'trainer'
  activeThreadId?: string
  onSelectThread: (threadId: string) => void
}

interface ThreadWithMeta extends ChatThread {
  otherUserName: string
  otherUserImage: string | null
  lastMessage: string | null
  unreadCount: number
}

export function ThreadList({ userId, userRole, activeThreadId, onSelectThread }: ThreadListProps) {
  const [threads, setThreads] = useState<ThreadWithMeta[]>([])
  const [search, setSearch] = useState('')

  const loadThreads = useCallback(() => {
    const rawThreads = getThreadsForUser(userId)

    const enriched: ThreadWithMeta[] = rawThreads.map(thread => {
      // Resolve the other user's info
      const otherUserId = userRole === 'customer' ? thread.trainer_id : thread.customer_id
      const trainer = mockTrainers.find(t => t.id === otherUserId)

      let otherUserName: string
      let otherUserImage: string | null = null

      if (userRole === 'customer' && trainer) {
        otherUserName = trainer.display_name
        otherUserImage = trainer.profile_image_url
      } else if (userRole === 'trainer' && !trainer) {
        // Customer - show anonymous name
        const hash = otherUserId.replace(/\D/g, '').slice(-4).padStart(4, '0')
        otherUserName = `Client#${hash || '0000'}`
      } else if (trainer) {
        otherUserName = trainer.display_name
        otherUserImage = trainer.profile_image_url
      } else {
        otherUserName = `Client#${Math.floor(1000 + Math.random() * 9000)}`
      }

      // Get last message
      const msgs = getMessages(thread.id)
      const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null

      // Get unread count
      const unread = getUnreadCount(thread.id, userId)

      return {
        ...thread,
        otherUserName,
        otherUserImage,
        lastMessage: lastMsg?.content ?? null,
        unreadCount: unread,
      }
    })

    // Sort by last_message_at descending
    enriched.sort((a, b) => {
      const aTime = a.last_message_at ? new Date(a.last_message_at).getTime() : 0
      const bTime = b.last_message_at ? new Date(b.last_message_at).getTime() : 0
      return bTime - aTime
    })

    setThreads(enriched)
  }, [userId, userRole])

  useEffect(() => {
    loadThreads()
    const interval = setInterval(loadThreads, 3000)
    return () => clearInterval(interval)
  }, [loadThreads])

  const filtered = search.trim()
    ? threads.filter(t =>
        t.otherUserName.toLowerCase().includes(search.toLowerCase()) ||
        t.lastMessage?.toLowerCase().includes(search.toLowerCase())
      )
    : threads

  function formatTime(dateStr: string | null): string {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffDays === 0) return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    if (diffDays === 1) return 'Gestern'
    if (diffDays < 7) return date.toLocaleDateString('de-DE', { weekday: 'short' })
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-4 py-4">
        <h2 className="mb-3 text-lg font-bold text-white">Nachrichten</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Suchen..."
            className="pl-9 rounded-xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/30 focus-visible:border-[#00A8FF]/40 focus-visible:ring-[#00A8FF]/15"
          />
        </div>
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04]">
              <MessageSquare className="h-6 w-6 text-white/20" />
            </div>
            <p className="text-sm text-white/40 text-center">
              {search ? 'Keine Ergebnisse gefunden' : 'Noch keine Konversationen'}
            </p>
            {!search && (
              <p className="mt-1 text-xs text-white/25 text-center">
                Starte eine Konversation über ein Trainerprofil
              </p>
            )}
          </div>
        )}

        {filtered.map(thread => (
          <button
            key={thread.id}
            onClick={() => onSelectThread(thread.id)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-white/[0.04]',
              activeThreadId === thread.id && 'bg-[#00A8FF]/[0.06] border-l-2 border-[#00A8FF]',
              activeThreadId !== thread.id && 'border-l-2 border-transparent'
            )}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              {thread.otherUserImage ? (
                <img
                  src={thread.otherUserImage}
                  alt={thread.otherUserName}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#00A8FF]/15 to-[#00FF94]/15">
                  <span className="text-sm font-bold text-[#00A8FF]">
                    {thread.otherUserName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {thread.unreadCount > 0 && (
                <div className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#00A8FF] ring-2 ring-[#0B0F1A]">
                  <span className="text-[9px] font-bold text-white">{thread.unreadCount}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className={cn(
                  'truncate text-sm font-medium',
                  thread.unreadCount > 0 ? 'text-white' : 'text-white/70'
                )}>
                  {thread.otherUserName}
                </span>
                <span className="shrink-0 text-[11px] text-white/30">
                  {formatTime(thread.last_message_at)}
                </span>
              </div>
              <p className={cn(
                'mt-0.5 truncate text-xs',
                thread.unreadCount > 0 ? 'text-white/60 font-medium' : 'text-white/35'
              )}>
                {thread.lastMessage || 'Noch keine Nachrichten'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
