import { Logo } from '@/components/ui/logo'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-[#0B0F1A] relative overflow-hidden">
      {/* Ambient light */}
      <div className="absolute top-0 right-[20%] w-[400px] h-[400px] rotate-[-30deg] bg-gradient-to-b from-[#00A8FF]/[0.06] to-transparent blur-[100px]" />
      <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-gradient-to-t from-[#00FF94]/[0.04] to-transparent blur-[100px]" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8 gap-4">
          <div className="animate-float">
            <Image src="/logo.png" alt="FITNEXUS" width={100} height={100} className="drop-shadow-[0_0_25px_rgba(0,168,255,0.3)]" priority />
          </div>
          <span className="text-2xl font-heading font-bold tracking-brand gradient-brand-text">FITNEXUS</span>
        </div>
        {children}
      </div>
    </div>
  )
}
