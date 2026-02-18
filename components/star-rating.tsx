import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  className?: string
}

const starSizes = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

export function StarRating({ rating, maxRating = 5, size = 'md', showValue = true, className }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            starSizes[size],
            i < Math.floor(rating)
              ? 'fill-[#00FF94] text-[#00FF94] drop-shadow-[0_0_3px_rgba(0,255,148,0.4)]'
              : i < rating
              ? 'fill-[#00FF94]/50 text-[#00FF94]/50'
              : 'fill-transparent text-muted-foreground/20'
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1.5 text-sm font-semibold text-[#00FF94]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
