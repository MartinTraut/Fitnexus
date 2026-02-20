'use client'

interface BarData {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: BarData[]
  height?: number
  yUnit?: string
  defaultColor?: string
  showValues?: boolean
}

export function BarChart({
  data,
  height = 180,
  yUnit = '',
  defaultColor = '#00A8FF',
  showValues = true,
}: BarChartProps) {
  const maxVal = Math.max(...data.map((d) => d.value), 1)
  const padding = { top: 16, right: 8, bottom: 32, left: 40 }
  const chartWidth = 600
  const innerW = chartWidth - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const barWidth = Math.min(innerW / data.length * 0.55, 40)
  const gap = innerW / data.length

  const gridLines = Array.from({ length: 4 }, (_, i) => {
    const val = (maxVal / 3) * i
    const y = padding.top + innerH - (val / maxVal) * innerH
    return { val, y }
  })

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${chartWidth} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {data.map((d, i) => (
            <linearGradient key={i} id={`bar-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={d.color || defaultColor} stopOpacity="0.9" />
              <stop offset="100%" stopColor={d.color || defaultColor} stopOpacity="0.4" />
            </linearGradient>
          ))}
        </defs>

        {/* Grid */}
        {gridLines.map((line, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={line.y}
              x2={chartWidth - padding.right}
              y2={line.y}
              stroke="rgba(0, 168, 255, 0.06)"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 6}
              y={line.y + 3}
              textAnchor="end"
              fontSize="10"
              fill="#64748B"
              fontFamily="var(--font-inter), sans-serif"
            >
              {Math.round(line.val)}{yUnit}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const barH = (d.value / maxVal) * innerH
          const x = padding.left + gap * i + (gap - barWidth) / 2
          const y = padding.top + innerH - barH
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={barWidth / 4}
                fill={`url(#bar-grad-${i})`}
              />
              {showValues && (
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill={d.color || defaultColor}
                  fontFamily="var(--font-inter), sans-serif"
                >
                  {d.value}
                </text>
              )}
              <text
                x={x + barWidth / 2}
                y={height - 8}
                textAnchor="middle"
                fontSize="10"
                fill="#64748B"
                fontFamily="var(--font-inter), sans-serif"
              >
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
