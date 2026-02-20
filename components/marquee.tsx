import { MapPin, Dumbbell } from 'lucide-react'

const cities = [
  'Berlin', 'München', 'Hamburg', 'Köln', 'Frankfurt', 'Stuttgart',
  'Düsseldorf', 'Leipzig', 'Hannover', 'Nürnberg',
]

const categories = [
  'Personal Training', 'Yoga', 'Krafttraining', 'CrossFit', 'Boxen',
  'Pilates', 'Functional Training', 'HIIT', 'Calisthenics', 'Mobility',
]

interface MarqueeProps {
  items?: string[]
}

export function Marquee({ items }: MarqueeProps) {
  return (
    <div className="relative py-8 border-y border-[rgba(0,168,255,0.06)] bg-[#080C15]/60">
      <div className="marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-content" aria-hidden={copy === 1}>
            {categories.map((cat, i) => (
              <span key={`cat-${copy}-${i}`} className="flex items-center gap-2 text-sm text-muted-foreground/60 whitespace-nowrap">
                <Dumbbell className="w-3.5 h-3.5 text-[#00A8FF]/40" />
                {cat}
              </span>
            ))}
            {cities.map((city, i) => (
              <span key={`city-${copy}-${i}`} className="flex items-center gap-2 text-sm text-muted-foreground/60 whitespace-nowrap">
                <MapPin className="w-3.5 h-3.5 text-[#00FF94]/40" />
                {city}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
