'use client'

import { useState, useEffect, useCallback } from 'react'
import { initializeStore, getThreadsForUser, getMessages } from '@/lib/store'
import { mockTrainers } from '@/lib/mock-data'
import { ThreadList } from '@/components/chat/thread-list'
import { ChatWindow } from '@/components/chat/chat-window'
import { cn } from '@/lib/utils'
import { Send, ArrowLeft } from 'lucide-react'
import type { ChatThread } from '@/types'

export default function MessagesPage() {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    initializeStore()
    setMounted(true)
  }, [])

  // Resolve other user info for the ChatWindow
  const getThreadMeta = useCallback(() => {
    if (!activeThreadId) return null
    const threads = getThreadsForUser('c_demo')
    const thread = threads.find((t) => t.id === activeThreadId)
    if (!thread) return null
    const trainer = mockTrainers.find((t) => t.id === thread.trainer_id)
    return {
      otherUserName: trainer?.display_name ?? 'Trainer',
      otherUserImage: trainer?.profile_image_url ?? undefined,
    }
  }, [activeThreadId])

  const threadMeta = getThreadMeta()

  if (!mounted) return null

  return (
    <div className="h-[calc(100vh-5rem)] md:h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-[rgba(0,168,255,0.08)]">
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
            'w-full md:w-80 lg:w-96 border-r border-[rgba(0,168,255,0.08)] flex flex-col overflow-hidden',
            activeThreadId ? 'hidden md:flex' : 'flex'
          )}
        >
          <ThreadList
            userId="c_demo"
            userRole="customer"
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
              currentUserId="c_demo"
              otherUserName={threadMeta.otherUserName}
              otherUserImage={threadMeta.otherUserImage}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="bg-[#00A8FF]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-[#00D4FF]" />
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
