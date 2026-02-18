import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  showText?: boolean
  className?: string
}

const sizes = {
  sm: { icon: 36, text: 'text-lg', gap: 'gap-2' },
  md: { icon: 44, text: 'text-xl', gap: 'gap-2.5' },
  lg: { icon: 56, text: 'text-2xl', gap: 'gap-3' },
  xl: { icon: 72, text: 'text-3xl', gap: 'gap-3.5' },
  hero: { icon: 100, text: 'text-4xl', gap: 'gap-4' },
}

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const s = sizes[size]
  return (
    <Link href="/" className={cn('flex items-center', s.gap, className)}>
      <Image
        src="/logo.png"
        alt="FITNEXUS Logo"
        width={s.icon}
        height={s.icon}
        className="object-contain"
        priority
      />
      {showText && (
        <span className={cn('font-heading font-bold tracking-brand gradient-brand-text', s.text)}>
          FITNEXUS
        </span>
      )}
    </Link>
  )
}

export function LogoIcon({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="FITNEXUS"
      width={size}
      height={size}
      className={cn('object-contain', className)}
      priority
    />
  )
}
