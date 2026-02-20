'use client'

interface RadialProgressProps {
  value: number
  max: number
  label: string
  unit?: string
  color?: string
  size?: number
}

export function RadialProgress({
  value,
  max,
  label,
  unit = '',
  color = '#00A8FF',
  size = 100,
}: RadialProgressProps) {
  const pct = Math.min(value / max, 1)
  const r = (size - 12) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct)

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(0, 168, 255, 0.06)"
          strokeWidth="6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text
          x={size / 2}
          y={size / 2 - 4}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="18"
          fontWeight="700"
          fill="white"
          fontFamily="var(--font-manrope), sans-serif"
        >
          {value}
        </text>
        <text
          x={size / 2}
          y={size / 2 + 14}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="9"
          fill="#94A3B8"
          fontFamily="var(--font-inter), sans-serif"
        >
          {unit}
        </text>
      </svg>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
}
