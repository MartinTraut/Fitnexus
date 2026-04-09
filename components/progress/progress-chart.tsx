'use client'

import { useState, useMemo } from 'react'
import type { ProgressMetric } from '@/types'
import { GlassCard } from '@/components/glass-card'
import { cn } from '@/lib/utils'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import { TrendingUp } from 'lucide-react'

interface ProgressChartProps {
  metrics: ProgressMetric[]
}

const LINES = [
  { key: 'weight_kg', label: 'Gewicht (kg)', color: '#00A8FF', defaultOn: true },
  { key: 'muscle_mass_kg', label: 'Muskelmasse (kg)', color: '#00FF94', defaultOn: false },
  { key: 'body_fat_percent', label: 'Körperfett (%)', color: '#FF6B6B', defaultOn: false },
] as const

type LineKey = typeof LINES[number]['key']

function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; color: string; dataKey: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0D1320] border border-white/[0.08] rounded-xl p-3 shadow-xl">
      <p className="text-xs text-muted-foreground mb-2 font-medium">{label}</p>
      {payload.map((entry) => {
        const line = LINES.find((l) => l.key === entry.dataKey)
        return (
          <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{line?.label}:</span>
            <span className="font-semibold text-foreground">{entry.value}</span>
          </div>
        )
      })}
    </div>
  )
}

export function ProgressChart({ metrics }: ProgressChartProps) {
  const [activeLines, setActiveLines] = useState<Set<LineKey>>(
    new Set(LINES.filter((l) => l.defaultOn).map((l) => l.key))
  )

  const chartData = useMemo(() => {
    return metrics.map((m) => ({
      date: formatDate(m.recorded_at),
      weight_kg: m.weight_kg,
      body_fat_percent: m.body_fat_percent,
      muscle_mass_kg: m.muscle_mass_kg,
    }))
  }, [metrics])

  function toggleLine(key: LineKey) {
    setActiveLines((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        if (next.size > 1) next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  // Calculate trends
  const latestMetric = metrics[metrics.length - 1]
  const previousMetric = metrics.length > 1 ? metrics[metrics.length - 2] : null
  const weightDiff = latestMetric && previousMetric && latestMetric.weight_kg && previousMetric.weight_kg
    ? (latestMetric.weight_kg - previousMetric.weight_kg).toFixed(1)
    : null

  if (metrics.length === 0) {
    return (
      <GlassCard className="p-8 text-center" hover={false}>
        <TrendingUp className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">Noch keine Messdaten vorhanden.</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Trage deinen ersten Fortschritt ein, um den Chart zu sehen.</p>
      </GlassCard>
    )
  }

  return (
    <div className="space-y-4">
      {/* Legend / Toggles */}
      <div className="flex flex-wrap items-center gap-2">
        {LINES.map((line) => {
          const isActive = activeLines.has(line.key)
          return (
            <button
              key={line.key}
              onClick={() => toggleLine(line.key)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border',
                isActive
                  ? 'border-white/[0.1] bg-white/[0.04]'
                  : 'border-transparent bg-transparent opacity-40 hover:opacity-70'
              )}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: line.color }} />
              {line.label}
            </button>
          )
        })}

        {weightDiff && (
          <span className={cn(
            'ml-auto text-xs font-medium px-2.5 py-1 rounded-lg',
            Number(weightDiff) < 0
              ? 'bg-[#00FF94]/10 text-[#00FF94]'
              : Number(weightDiff) > 0
                ? 'bg-red-500/10 text-red-400'
                : 'bg-[#1A2332] text-muted-foreground'
          )}>
            {Number(weightDiff) > 0 ? '+' : ''}{weightDiff} kg
          </span>
        )}
      </div>

      {/* Chart */}
      <GlassCard className="p-4 pt-6" hover={false}>
        <div className="h-[280px] sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2332" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                tickLine={false}
                axisLine={{ stroke: '#1A2332' }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              {LINES.map((line) =>
                activeLines.has(line.key) ? (
                  <Line
                    key={line.key}
                    type="monotone"
                    dataKey={line.key}
                    stroke={line.color}
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: line.color, stroke: '#0B0F1A', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: line.color, stroke: '#0B0F1A', strokeWidth: 2 }}
                    connectNulls
                  />
                ) : null
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  )
}
