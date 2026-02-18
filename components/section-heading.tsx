import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  gradient?: boolean
  centered?: boolean
  className?: string
}

export function SectionHeading({ title, subtitle, gradient = true, centered = true, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-14', centered && 'text-center', className)}>
      <h2
        className={cn(
          'font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]',
          gradient ? 'gradient-brand-text' : 'text-foreground'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-lg text-muted-foreground/80 max-w-2xl leading-relaxed', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
