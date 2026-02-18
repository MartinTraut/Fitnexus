import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'green' | 'brand'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  outline?: boolean
  glow?: boolean
}

const solidVariants = {
  cyan: 'bg-gradient-to-r from-[#00A8FF] to-[#00D4FF] text-white hover:shadow-[0_0_30px_rgba(0,168,255,0.35)]',
  green: 'bg-gradient-to-r from-[#00CC76] to-[#39FF14] text-[#0B0F1A] hover:shadow-[0_0_30px_rgba(0,255,148,0.35)]',
  brand: 'bg-gradient-to-r from-[#00A8FF] via-[#00D4FF] to-[#00FF94] text-[#0B0F1A] hover:shadow-[0_0_30px_rgba(0,212,255,0.35)]',
}

const outlineVariants = {
  cyan: 'border border-[#00A8FF]/40 bg-[#00A8FF]/[0.06] text-[#00D4FF] hover:bg-[#00A8FF]/[0.12] hover:border-[#00A8FF]/60 hover:shadow-[0_0_20px_rgba(0,168,255,0.15)]',
  green: 'border border-[#00FF94]/40 bg-[#00FF94]/[0.06] text-[#00FF94] hover:bg-[#00FF94]/[0.12] hover:border-[#00FF94]/60 hover:shadow-[0_0_20px_rgba(0,255,148,0.15)]',
  brand: 'border border-[#00A8FF]/40 bg-[#00A8FF]/[0.06] text-[#00D4FF] hover:bg-[#00A8FF]/[0.12] hover:border-[#00D4FF]/60 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]',
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm rounded-xl gap-2',
  md: 'px-6 py-3 text-sm rounded-xl gap-2',
  lg: 'px-8 py-3.5 text-base rounded-2xl gap-2.5',
  xl: 'px-10 py-4.5 text-lg rounded-2xl gap-3',
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = 'cyan', size = 'md', outline = false, glow = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-[var(--ease-smooth)]',
          'active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none',
          outline ? outlineVariants[variant] : solidVariants[variant],
          buttonSizes[size],
          glow && 'animate-pulse-glow',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
GradientButton.displayName = 'GradientButton'
