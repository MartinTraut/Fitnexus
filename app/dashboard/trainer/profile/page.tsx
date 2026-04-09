'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import {
  Camera, ExternalLink, Save, Trash2, Edit3,
  Plus, X, MapPin, Euro, Globe, CheckCircle2,
} from 'lucide-react'

const allCategories = [
  'Krafttraining', 'Ausdauer', 'Yoga', 'Pilates', 'CrossFit',
  'Ernährungsberatung', 'Gewichtsverlust', 'Bodybuilding', 'Rehabilitation',
  'Functional Training', 'HIIT', 'Schwimmen',
]

const allLanguages = ['Deutsch', 'Englisch', 'Spanisch', 'Französisch', 'Türkisch']

export default function TrainerProfilePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Krafttraining', 'Ernährungsberatung', 'Functional Training',
  ])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['Deutsch', 'Englisch'])
  const [coachingModes, setCoachingModes] = useState({
    online: true,
    vorOrt: true,
    hybrid: false,
  })

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    )
  }

  const profileCompletion = 75

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Profil bearbeiten</h1>
        <div className="flex items-center gap-3">
          <Link href="/trainers/max-mustermann">
            <GradientButton variant="green" size="sm" outline>
              <ExternalLink className="w-4 h-4" /> Profil ansehen
            </GradientButton>
          </Link>
          <GradientButton variant="green" size="sm">
            <Save className="w-4 h-4" /> Speichern
          </GradientButton>
        </div>
      </div>

      {/* Profile Completion */}
      <GlassCard className="p-5" hover={false}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#00FF94]" />
            <p className="text-sm font-medium text-foreground">Dein Profil ist zu {profileCompletion}% vollständig</p>
          </div>
          <span className="text-sm font-bold text-[#00FF94]">{profileCompletion}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#1A2332] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00CC76] to-[#00FF94] transition-all duration-500"
            style={{ width: `${profileCompletion}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Füge ein Profilbild und deine Spezialisierungen hinzu, um 100% zu erreichen.</p>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Photo + Basic Info */}
        <div className="space-y-6">
          {/* Profile Photo */}
          <GlassCard className="p-6" hover={false}>
            <h2 className="text-base font-heading font-semibold text-foreground mb-4">Profilbild</h2>
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-32 h-32 rounded-2xl bg-[#1A2332] border-2 border-dashed border-[rgba(0,255,148,0.2)] flex items-center justify-center group cursor-pointer hover:border-[#00FF94]/40 transition-colors">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2 group-hover:text-[#00FF94] transition-colors" />
                  <p className="text-xs text-muted-foreground group-hover:text-[#00FF94] transition-colors">Bild hochladen</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">JPG, PNG. Max 5 MB.</p>
            </div>
          </GlassCard>

          {/* Coaching Modes */}
          <GlassCard className="p-6" hover={false}>
            <h2 className="text-base font-heading font-semibold text-foreground mb-4">Coaching-Art</h2>
            <div className="space-y-3">
              {[
                { key: 'online' as const, label: 'Online', desc: 'Video-Calls & Remote-Coaching' },
                { key: 'vorOrt' as const, label: 'Vor Ort', desc: 'Persönliches Training' },
                { key: 'hybrid' as const, label: 'Hybrid', desc: 'Kombination aus Online & Vor Ort' },
              ].map((mode) => (
                <label key={mode.key} className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F1A]/50 cursor-pointer hover:bg-[#1A2332]/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{mode.label}</p>
                    <p className="text-xs text-muted-foreground">{mode.desc}</p>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full relative transition-colors ${coachingModes[mode.key] ? 'bg-[#00FF94]' : 'bg-[#1A2332]'}`}
                    onClick={() => setCoachingModes((prev) => ({ ...prev, [mode.key]: !prev[mode.key] }))}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${coachingModes[mode.key] ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                </label>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Center + Right: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <GlassCard className="p-6" hover={false}>
            <h2 className="text-base font-heading font-semibold text-foreground mb-5">Grundinformationen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Name</Label>
                <Input defaultValue="Max Mustermann" className="bg-[#0B0F1A]/50 border-[rgba(0,255,148,0.15)] focus:border-[#00FF94]/40" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Stadt</Label>
                <Input defaultValue="Berlin" className="bg-[#0B0F1A]/50 border-[rgba(0,255,148,0.15)] focus:border-[#00FF94]/40" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center gap-1.5"><Euro className="w-3.5 h-3.5" /> Stundensatz (€)</Label>
                <Input type="number" defaultValue="89" className="bg-[#0B0F1A]/50 border-[rgba(0,255,148,0.15)] focus:border-[#00FF94]/40" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Erfahrung (Jahre)</Label>
                <Input type="number" defaultValue="8" className="bg-[#0B0F1A]/50 border-[rgba(0,255,148,0.15)] focus:border-[#00FF94]/40" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="text-sm text-muted-foreground">Bio</Label>
                <Textarea
                  rows={4}
                  defaultValue="Zertifizierter Personal Trainer mit 8 Jahren Erfahrung. Spezialisiert auf Krafttraining, Ernährungsberatung und Functional Fitness. Mein Ansatz kombiniert evidenzbasiertes Training mit individueller Betreuung."
                  className="bg-[#0B0F1A]/50 border-[rgba(0,255,148,0.15)] focus:border-[#00FF94]/40 resize-none"
                />
              </div>
            </div>
          </GlassCard>

          {/* Categories */}
          <GlassCard className="p-6" hover={false}>
            <h2 className="text-base font-heading font-semibold text-foreground mb-4">Kategorien</h2>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => {
                const isSelected = selectedCategories.includes(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#00FF94]/15 text-[#00FF94] border border-[#00FF94]/30'
                        : 'bg-[#1A2332]/50 text-muted-foreground border border-transparent hover:border-[rgba(0,255,148,0.15)] hover:text-foreground'
                    }`}
                  >
                    {isSelected && <span className="mr-1.5">✓</span>}
                    {cat}
                  </button>
                )
              })}
            </div>
          </GlassCard>

          {/* Languages */}
          <GlassCard className="p-6" hover={false}>
            <h2 className="text-base font-heading font-semibold text-foreground mb-4">Sprachen</h2>
            <div className="flex flex-wrap gap-2">
              {allLanguages.map((lang) => {
                const isSelected = selectedLanguages.includes(lang)
                return (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#00FF94]/15 text-[#00FF94] border border-[#00FF94]/30'
                        : 'bg-[#1A2332]/50 text-muted-foreground border border-transparent hover:border-[rgba(0,255,148,0.15)] hover:text-foreground'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    {lang}
                  </button>
                )
              })}
            </div>
          </GlassCard>

          {/* Packages */}
          <GlassCard className="p-6" hover={false}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-heading font-semibold text-foreground">Pakete</h2>
              <button className="flex items-center gap-1.5 text-sm text-[#00FF94] hover:text-[#00CC76] transition-colors">
                <Plus className="w-4 h-4" /> Paket hinzufügen
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Starter Paket', price: '199€/Monat', sessions: '4 Sessions', desc: 'Ideal für Einsteiger' },
                { name: 'Premium Paket', price: '449€/Monat', sessions: '12 Sessions', desc: 'Umfassende Betreuung mit Ernährungsplan' },
              ].map((pkg, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#0B0F1A]/50 border border-[rgba(0,255,148,0.08)]">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-sm text-foreground">{pkg.name}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#00FF94]/10 text-[#00FF94] font-medium">{pkg.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{pkg.sessions} · {pkg.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="w-8 h-8 rounded-lg bg-[#1A2332] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[#1A2332]/80 transition-colors">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-[#1A2332] flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
