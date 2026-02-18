import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'green' | 'none'
  hover?: boolean
  neonBorder?: boolean
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = 'none', hover = true, neonBorder = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl glass-card',
          hover && 'hover:translate-y-[-2px] hover:scale-[1.005]',
          glow === 'cyan' && 'glow-cyan-soft',
          glow === 'green' && 'glow-green-soft',
          neonBorder && 'neon-border',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassCard.displayName = 'GlassCard'
