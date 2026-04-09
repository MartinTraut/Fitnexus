'use client'

import { useState, useEffect, useRef } from 'react'
import type { ProgressPhoto } from '@/types'
import { getProgressPhotos, addProgressPhoto } from '@/lib/store'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { cn } from '@/lib/utils'
import { Camera, Upload, X, ImageIcon, Calendar } from 'lucide-react'

interface PhotoGalleryProps {
  customerId: string
  canUpload?: boolean
}

const CATEGORIES = [
  { key: 'all', label: 'Alle' },
  { key: 'front', label: 'Front' },
  { key: 'side', label: 'Seite' },
  { key: 'back', label: 'Rücken' },
  { key: 'other', label: 'Sonstige' },
] as const

type FilterCategory = typeof CATEGORIES[number]['key']

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function PhotoGallery({ customerId, canUpload = false }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([])
  const [filter, setFilter] = useState<FilterCategory>('all')
  const [selectedPhoto, setSelectedPhoto] = useState<ProgressPhoto | null>(null)
  const [uploadCategory, setUploadCategory] = useState<ProgressPhoto['category']>('front')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPhotos(getProgressPhotos(customerId))
  }, [customerId])

  const filteredPhotos = filter === 'all'
    ? photos
    : photos.filter((p) => p.category === filter)

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    const photo = addProgressPhoto({
      customer_id: customerId,
      image_url: url,
      category: uploadCategory,
    })
    setPhotos((prev) => [photo, ...prev])

    // Reset
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      {/* Header with Upload */}
      {canUpload && (
        <GlassCard className="p-4" hover={false}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#00A8FF]/10 flex items-center justify-center">
                <Camera className="w-4 h-4 text-[#00D4FF]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Foto hochladen</p>
                <p className="text-xs text-muted-foreground">Dokumentiere deinen Fortschritt visuell</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value as ProgressPhoto['category'])}
                className="bg-[#1A2332] border border-white/[0.06] text-sm text-foreground rounded-lg px-3 py-2 focus:outline-none focus:border-[#00D4FF]/40"
              >
                <option value="front">Front</option>
                <option value="side">Seite</option>
                <option value="back">Rücken</option>
                <option value="other">Sonstige</option>
              </select>
              <GradientButton
                variant="cyan"
                size="sm"
                onClick={() => fileRef.current?.click()}
              >
                <Upload className="w-4 h-4" /> Foto
              </GradientButton>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </GlassCard>
      )}

      {/* Category Filter */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200',
              filter === cat.key
                ? 'bg-[#00A8FF]/10 text-[#00D4FF] shadow-[0_0_10px_rgba(0,168,255,0.1)]'
                : 'text-muted-foreground hover:text-foreground hover:bg-[#1A2332]'
            )}
          >
            {cat.label}
            {cat.key !== 'all' && (
              <span className="ml-1.5 text-xs opacity-50">
                {photos.filter((p) => p.category === cat.key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredPhotos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#1A2332] border border-white/[0.04] hover:border-[#00D4FF]/30 transition-all duration-300"
            >
              <img
                src={photo.image_url}
                alt={`Fortschritt ${photo.category}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(photo.recorded_at)}
                </p>
                <p className="text-[10px] text-white/50 capitalize mt-0.5">{photo.category}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <GlassCard className="p-10 text-center" hover={false}>
          <ImageIcon className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-1">Noch keine Fotos vorhanden</p>
          {canUpload && (
            <p className="text-xs text-muted-foreground/60">Lade dein erstes Fortschrittsfoto hoch, um deinen Wandel festzuhalten.</p>
          )}
          {canUpload && (
            <GradientButton
              variant="cyan"
              size="sm"
              outline
              className="mt-4"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="w-4 h-4" /> Erstes Foto hochladen
            </GradientButton>
          )}
        </GlassCard>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[85vh] rounded-2xl overflow-hidden bg-[#0D1320] border border-white/[0.08]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={selectedPhoto.image_url}
              alt={`Fortschritt ${selectedPhoto.category}`}
              className="w-full max-h-[75vh] object-contain"
            />
            <div className="p-4 border-t border-white/[0.04]">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground capitalize">{selectedPhoto.category}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(selectedPhoto.recorded_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
