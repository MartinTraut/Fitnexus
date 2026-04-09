'use client'

import { useState, useEffect, useCallback } from 'react'
import { initializeStore, getThreadsForUser, getMessages } from '@/lib/store'
import { ThreadList } from '@/components/chat/thread-list'
import { ChatWindow } from '@/components/chat/chat-window'
import { cn } from '@/lib/utils'
import { Send, ArrowLeft, Users } from 'lucide-react'
import type { ChatThread } from '@/types'

export default function TrainerMessagesPage() {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    initializeStore()
    setMounted(true)
  }, [])

  // Resolve other user info for the ChatWindow
  const getThreadMeta = useCallback(() => {
    if (!activeThreadId) return null
    const threads = getThreadsForUser('tr_1')
    const thread = threads.find((t) => t.id === activeThreadId)
    if (!thread) return null
    // For trainer view, show anonymized client name
    const clientName = `Client#${thread.customer_id.slice(-4).toUpperCase()}`
    return {
      otherUserName: clientName,
      otherUserImage: undefined,
    }
  }, [activeThreadId])

  const threadMeta = getThreadMeta()

  if (!mounted) return null

  return (
    <div className="h-[calc(100vh-5rem)] md:h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-[rgba(0,255,148,0.1)]">
        <div className="flex items-center gap-3">
          {activeThreadId && (
            <button
              onClick={() => setActiveThreadId(null)}
              className="md:hidden p-1.5 rounded-lg hover:bg-[#1A2332] transition-colors text-muted-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Nachrichten
          </h1>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Thread List */}
        <div
          className={cn(
            'w-full md:w-80 lg:w-96 border-r border-[rgba(0,255,148,0.1)] flex flex-col overflow-hidden',
            activeThreadId ? 'hidden md:flex' : 'flex'
          )}
        >
          <ThreadList
            userId="tr_1"
            userRole="trainer"
            activeThreadId={activeThreadId ?? undefined}
            onSelectThread={(id) => setActiveThreadId(id)}
          />
        </div>

        {/* Message Area */}
        <div
          className={cn(
            'flex-1 flex flex-col',
            !activeThreadId ? 'hidden md:flex' : 'flex'
          )}
        >
          {activeThreadId && threadMeta ? (
            <ChatWindow
              threadId={activeThreadId}
              currentUserId="tr_1"
              otherUserName={threadMeta.otherUserName}
              otherUserImage={threadMeta.otherUserImage}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="bg-[#00FF94]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-[#00FF94]" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  Wähle eine Konversation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Wähle einen Chat aus der Liste, um die Konversation zu öffnen.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
