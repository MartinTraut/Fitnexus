import { GlassCard } from '@/components/glass-card'
import { Search, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-5rem)] md:h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[rgba(0,168,255,0.1)] flex-shrink-0">
        <div className="p-4 border-b border-[rgba(0,168,255,0.08)]">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Nachrichten</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Suchen..." className="pl-10 bg-[#0B0F1A]/50 border-[rgba(0,168,255,0.15)] placeholder:text-muted-foreground/50" />
          </div>
        </div>
        <div className="overflow-y-auto max-h-48 md:max-h-[calc(100vh-10rem)]">
          {[
            { name: 'Max Mustermann', image: 'https://randomuser.me/api/portraits/men/32.jpg', lastMsg: 'Super Session heute!', time: 'Vor 2h', unread: true, active: true },
            { name: 'Support Team', image: null, lastMsg: 'Willkommen bei FITNEXUS!', time: 'Vor 1d', unread: false, active: false },
          ].map((thread, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${thread.active ? 'bg-[#00A8FF]/5 border-l-2 border-[#00A8FF]' : 'hover:bg-[#1A2332]/50'}`}>
              {thread.image ? (
                <Image src={thread.image} alt={thread.name} width={40} height={40} className="rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full gradient-cyan flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">{thread.name[0]}</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm text-foreground truncate">{thread.name}</p>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2">{thread.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{thread.lastMsg}</p>
              </div>
              {thread.unread && <div className="w-2 h-2 rounded-full bg-[#00D4FF] flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-[rgba(0,168,255,0.08)] flex items-center gap-3">
          <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="Max Mustermann" width={32} height={32} className="rounded-full object-cover" />
          <div>
            <p className="font-medium text-sm text-foreground">Max Mustermann</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex justify-start">
            <div className="glass-card rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]">
              <p className="text-sm text-foreground">Hey! Wie gehts dir nach dem Training gestern?</p>
              <span className="text-[10px] text-muted-foreground mt-1 block">10:30</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-[#00A8FF]/20 border border-[#00A8FF]/20 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
              <p className="text-sm text-foreground">War super! Muskelkater aber alles gut</p>
              <span className="text-[10px] text-muted-foreground mt-1 block text-right">10:45</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="glass-card rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]">
              <p className="text-sm text-foreground">Vergiss nicht die Protein-Shakes nach dem Training. Bis Mittwoch!</p>
              <span className="text-[10px] text-muted-foreground mt-1 block">14:20</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[rgba(0,168,255,0.08)]">
          <div className="flex items-center gap-3">
            <Input placeholder="Nachricht schreiben..." className="flex-1 bg-[#0B0F1A]/50 border-[rgba(0,168,255,0.15)] placeholder:text-muted-foreground/50" />
            <button className="w-10 h-10 rounded-xl gradient-cyan flex items-center justify-center text-white hover:shadow-[0_0_15px_rgba(0,168,255,0.3)] transition-all duration-200">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
