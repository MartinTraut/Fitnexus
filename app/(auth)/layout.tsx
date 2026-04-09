import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#0B0F1A]" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-[20%] w-[500px] h-[500px] rotate-[-30deg] bg-gradient-to-b from-[#00A8FF]/[0.06] to-transparent blur-[120px]" />
      <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rotate-[15deg] bg-gradient-to-t from-[#00FF94]/[0.04] to-transparent blur-[120px]" />

      {/* Logo */}
      <Link href="/" className="relative z-10 flex items-center gap-3 mb-8">
        <Image src="/logo.png" alt="FITNEXUS" width={48} height={48} priority />
        <span className="font-heading font-bold text-2xl tracking-brand gradient-brand-text">FITNEXUS</span>
      </Link>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">{children}</div>

      {/* Bottom link */}
      <p className="relative z-10 mt-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-[#00D4FF] transition-colors">
          &larr; Zurück zur Startseite
        </Link>
      </p>
    </div>
  )
}
