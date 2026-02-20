'use client'

import { useMemo } from 'react'

interface DataPoint {
  label: string
  value: number
}

export interface DataSeries {
  name: string
  data: DataPoint[]
  color: string
}

interface LineChartProps {
  series: DataSeries[]
  height?: number
  showDots?: boolean
  showArea?: boolean
  showGrid?: boolean
  yUnit?: string
  ySteps?: number
}

function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return ''
  let d = `M ${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i]
    const next = points[i + 1]
    const cpx = (curr.x + next.x) / 2
    d += ` C ${cpx},${curr.y} ${cpx},${next.y} ${next.x},${next.y}`
  }
  return d
}

export function LineChart({
  series,
  height = 220,
  showDots = true,
  showArea = true,
  showGrid = true,
  yUnit = '',
  ySteps = 4,
}: LineChartProps) {
  const padding = { top: 20, right: 16, bottom: 36, left: 48 }
  const chartWidth = 600
  const chartHeight = height

  const { minY, maxY, xLabels, seriesPaths } = useMemo(() => {
    const allValues = series.flatMap((s) => s.data.map((d) => d.value))
    const dataMin = Math.min(...allValues)
    const dataMax = Math.max(...allValues)
    const range = dataMax - dataMin || 1
    const margin = range * 0.1
    const minY = Math.floor(dataMin - margin)
    const maxY = Math.ceil(dataMax + margin)
    const xLabels = series[0]?.data.map((d) => d.label) || []

    const innerW = chartWidth - padding.left - padding.right
    const innerH = chartHeight - padding.top - padding.bottom

    const seriesPaths = series.map((s) => {
      const points = s.data.map((d, i) => ({
        x: padding.left + (i / Math.max(s.data.length - 1, 1)) * innerW,
        y: padding.top + innerH - ((d.value - minY) / (maxY - minY)) * innerH,
      }))
      const path = smoothPath(points)
      const areaPath = path + ` L ${points[points.length - 1].x},${padding.top + innerH} L ${points[0].x},${padding.top + innerH} Z`
      return { points, path, areaPath, color: s.color, name: s.name }
    })

    return { minY, maxY, xLabels, seriesPaths }
  }, [series, chartHeight])

  const innerH = chartHeight - padding.top - padding.bottom
  const innerW = chartWidth - padding.left - padding.right

  const yGridLines = Array.from({ length: ySteps + 1 }, (_, i) => {
    const val = minY + ((maxY - minY) / ySteps) * i
    const y = padding.top + innerH - (i / ySteps) * innerH
    return { val, y }
  })

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {seriesPaths.map((s, i) => (
            <linearGradient key={i} id={`area-gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* Grid lines */}
        {showGrid && yGridLines.map((line, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={line.y}
              x2={chartWidth - padding.right}
              y2={line.y}
              stroke="rgba(0, 168, 255, 0.06)"
              strokeDasharray={i === 0 ? 'none' : '4 4'}
            />
            <text
              x={padding.left - 8}
              y={line.y + 4}
              textAnchor="end"
              fontSize="10"
              fill="#64748B"
              fontFamily="var(--font-inter), sans-serif"
            >
              {Math.round(line.val)}{yUnit}
            </text>
          </g>
        ))}

        {/* X labels */}
        {xLabels.map((label, i) => {
          const x = padding.left + (i / Math.max(xLabels.length - 1, 1)) * innerW
          return (
            <text
              key={i}
              x={x}
              y={chartHeight - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#64748B"
              fontFamily="var(--font-inter), sans-serif"
            >
              {label}
            </text>
          )
        })}

        {/* Area fills */}
        {showArea && seriesPaths.map((s, i) => (
          <path
            key={`area-${i}`}
            d={s.areaPath}
            fill={`url(#area-gradient-${i})`}
          />
        ))}

        {/* Lines */}
        {seriesPaths.map((s, i) => (
          <path
            key={`line-${i}`}
            d={s.path}
            fill="none"
            stroke={s.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Dots */}
        {showDots && seriesPaths.map((s, si) =>
          s.points.map((p, pi) => (
            <g key={`dot-${si}-${pi}`}>
              <circle cx={p.x} cy={p.y} r="5" fill={s.color} opacity="0.15" />
              <circle cx={p.x} cy={p.y} r="3" fill="#0B0F1A" stroke={s.color} strokeWidth="1.5" />
            </g>
          ))
        )}
      </svg>

      {/* Legend */}
      {series.length > 1 && (
        <div className="flex items-center justify-center gap-5 mt-3">
          {series.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-[2px] rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-[11px] text-muted-foreground">{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
