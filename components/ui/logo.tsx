import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  showText?: boolean
  className?: string
}

// Icon size should be ~1.5x the text line-height for visual balance
const sizes = {
  sm: { icon: 28, text: 'text-base', gap: 'gap-2' },
  md: { icon: 34, text: 'text-lg', gap: 'gap-2.5' },
  lg: { icon: 40, text: 'text-xl', gap: 'gap-2.5' },
  xl: { icon: 48, text: 'text-2xl', gap: 'gap-3' },
  hero: { icon: 64, text: 'text-3xl', gap: 'gap-3.5' },
}

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const s = sizes[size]
  return (
    <Link href="/" className={cn('flex items-center', s.gap, className)}>
      <Image
        src="/logo-icon.png"
        alt="FITNEXUS Logo"
        width={s.icon}
        height={s.icon}
        className="object-contain"
        priority
      />
      {showText && (
        <span className={cn('font-heading font-bold tracking-[0.04em] gradient-brand-text', s.text)}>
          FITNEXUS
        </span>
      )}
    </Link>
  )
}

export function LogoIcon({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo-icon.png"
      alt="FITNEXUS"
      width={size}
      height={size}
      className={cn('object-contain', className)}
      priority
    />
  )
}
