import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/glass-card'
import { StarRating } from '@/components/star-rating'
import { GradientButton } from '@/components/gradient-button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface TrainerCardProps {
  id: string
  name: string
  image?: string | null
  city: string
  categories: string[]
  hourlyRate: number
  rating: number
  ratingCount: number
  isVerified?: boolean
  className?: string
}

export function TrainerCard({
  id, name, image, city, categories, hourlyRate, rating, ratingCount, isVerified, className
}: TrainerCardProps) {
  return (
    <GlassCard className={cn('p-5 group', className)}>
      <div className="flex items-start gap-4">
        {/* Round Profile Photo */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[rgba(0,168,255,0.2)] group-hover:border-[#00A8FF]/40 transition-colors duration-300">
            {image ? (
              <Image src={image} alt={name} width={80} height={80} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full gradient-cyan opacity-20" />
            )}
          </div>
          {isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0D1320] border-2 border-[#00A8FF]/30 flex items-center justify-center">
              <Shield className="w-3 h-3 text-[#00D4FF]" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-[#00D4FF] transition-colors duration-300">
                {name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-sm">{city}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-[#00D4FF]">ab {hourlyRate}€</p>
              <p className="text-[11px] text-muted-foreground">/Std.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={rating} size="sm" />
            <span className="text-xs text-muted-foreground">({ratingCount})</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {categories.slice(0, 3).map((cat) => (
              <Badge key={cat} variant="secondary" className="bg-[#00A8FF]/[0.06] text-[#00D4FF]/80 border border-[#00A8FF]/15 text-[11px] px-2 py-0.5">
                {cat}
              </Badge>
            ))}
            {categories.length > 3 && (
              <Badge variant="secondary" className="bg-[#1A2332]/50 text-muted-foreground border-none text-[11px] px-2 py-0.5">
                +{categories.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[rgba(0,168,255,0.06)]">
        <Link href={`/trainer/${id}`} className="flex-1">
          <GradientButton variant="cyan" outline size="sm" className="w-full text-xs">
            Profil ansehen
          </GradientButton>
        </Link>
        <Link href="/auth/register" className="flex-1">
          <GradientButton variant="green" size="sm" className="w-full text-xs">
            Direkt buchen
          </GradientButton>
        </Link>
      </div>
    </GlassCard>
  )
}
