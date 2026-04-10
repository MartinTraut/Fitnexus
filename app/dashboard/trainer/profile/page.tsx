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
  Award, Upload, FileText, Video, Play, AlertCircle, Search,
} from 'lucide-react'

// Die gängigsten Kategorien — prominent angezeigt
const popularCategories = [
  'Personal Training', 'Krafttraining', 'Abnehmen / Fettabbau', 'Muskelaufbau',
  'Online Coaching', 'Ernährungsberatung', 'Yoga', 'HIIT', 'CrossFit',
  'Bodybuilding', 'Functional Training', 'Ausdauer',
]

// Alle verfügbaren Sportarten und Coaching-Bereiche — durchsuchbar
const allCategories = [
  // Fitness & Kraft
  'Personal Training', 'Krafttraining', 'Muskelaufbau', 'Bodybuilding', 'Powerlifting',
  'Olympic Weightlifting', 'Functional Training', 'Kettlebell Training', 'TRX / Suspension Training',
  'Calisthenics', 'Bodyweight Training', 'Home Workouts', 'EMS Training',
  // Ausdauer & Cardio
  'Ausdauer', 'Laufen / Running', 'Marathon-Vorbereitung', 'Triathlon', 'Radfahren / Cycling',
  'Indoor Cycling / Spinning', 'Schwimmen', 'Rudern',
  // Gruppenfitness & Kurse
  'HIIT', 'CrossFit', 'Boot Camp', 'Gruppentraining', 'Outdoor Training',
  'Zirkeltraining', 'Tabata',
  // Kampfsport
  'Boxen', 'Kickboxen', 'Muay Thai', 'MMA', 'Brazilian Jiu-Jitsu', 'Judo',
  'Karate', 'Taekwondo', 'Krav Maga', 'Wing Chun', 'Capoeira', 'Fechten',
  'Selbstverteidigung', 'Fitness-Boxen',
  // Mind & Body
  'Yoga', 'Pilates', 'Meditation', 'Achtsamkeit', 'Atemtraining',
  'Tai Chi', 'Qi Gong', 'Stretching', 'Faszientraining',
  // Mobility & Reha
  'Mobility', 'Rehabilitation', 'Physiotherapie', 'Schmerztherapie',
  'Haltungskorrektur', 'Rückentraining', 'Beckenboden-Training',
  'Seniorentraining', 'Prähabilitation',
  // Ernährung & Gewicht
  'Ernährungsberatung', 'Abnehmen / Fettabbau', 'Gewichtsmanagement',
  'Meal Prep Coaching', 'Vegane Ernährung', 'Sporternährung',
  'Essstörungen (Begleitung)', 'Darmsanierung',
  // Sport-spezifisch
  'Fußball', 'Basketball', 'Tennis', 'Golf', 'Handball', 'Volleyball',
  'Leichtathletik', 'Turnen', 'Klettern / Bouldern', 'Surfing',
  'Skateboarding', 'Skifahren', 'Snowboarding', 'Eishockey',
  'Tauchen', 'Segeln', 'Reiten',
  // Wettkampf
  'Wettkampfvorbereitung', 'Contest Prep', 'Athletiktraining',
  'Schnelligkeit / Speed Training', 'Sprungkraft', 'Agility',
  // Spezialgebiete
  'Schwangerschaftstraining', 'Post-Natal Training', 'Kindertraining',
  'Jugendtraining', 'Betriebliches Gesundheitsmanagement',
  'Stressmanagement', 'Schlaf-Coaching', 'Mentaltraining',
  'Biohacking', 'Longevity / Anti-Aging',
  // Tanz & Bewegung
  'Tanzen', 'Pole Dance / Pole Fitness', 'Aerial Yoga / Silk',
  'Ballett Fitness', 'Zumba', 'Dance Fitness',
  // Wasser
  'Aqua Fitness', 'Wassergymnastik', 'Stand-Up Paddling (SUP)',
  // Online
  'Online Coaching', 'Hybrid Coaching', 'Video-Coaching',
]

const popularLanguages = ['Deutsch', 'Englisch', 'Spanisch', 'Französisch', 'Türkisch', 'Arabisch', 'Russisch', 'Italienisch']

const allLanguages = [
  'Deutsch', 'Englisch', 'Spanisch', 'Französisch', 'Türkisch',
  'Arabisch', 'Russisch', 'Italienisch', 'Portugiesisch', 'Polnisch',
  'Niederländisch', 'Schwedisch', 'Norwegisch', 'Dänisch', 'Finnisch',
  'Griechisch', 'Tschechisch', 'Ungarisch', 'Rumänisch', 'Bulgarisch',
  'Kroatisch', 'Serbisch', 'Bosnisch', 'Albanisch', 'Ukrainisch',
  'Chinesisch (Mandarin)', 'Japanisch', 'Koreanisch', 'Hindi', 'Urdu',
  'Persisch (Farsi)', 'Hebräisch', 'Thai', 'Vietnamesisch', 'Indonesisch',
  'Malaiisch', 'Tagalog', 'Swahili', 'Amharisch', 'Kurdisch',
  'Gebärdensprache (DGS)', 'Gebärdensprache (ASL)',
]

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
  const [categorySearch, setCategorySearch] = useState('')
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [languageSearch, setLanguageSearch] = useState('')
  const [showAllLanguages, setShowAllLanguages] = useState(false)

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

          {/* Intro Video — Pflicht */}
          <GlassCard className="p-6" hover={false}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-[#00D4FF]" />
                <h2 className="text-base font-heading font-semibold text-foreground">Vorstellungsvideo</h2>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-semibold border border-red-500/20 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Pflicht
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Zeige potenziellen Kunden, wer du bist. Ein kurzes Video (30–90 Sek.) erhöht deine Buchungsrate um bis zu 3x.
            </p>

            {/* Video Preview / Upload Area */}
            <div className="relative w-full aspect-video rounded-2xl bg-[#1A2332] border-2 border-dashed border-[#00A8FF]/20 hover:border-[#00A8FF]/40 transition-colors cursor-pointer overflow-hidden group">
              {/* Placeholder state */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#00A8FF]/10 flex items-center justify-center mb-3 group-hover:bg-[#00A8FF]/20 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-7 h-7 text-[#00D4FF] ml-0.5" />
                </div>
                <p className="text-sm font-medium text-muted-foreground group-hover:text-[#00D4FF] transition-colors">Video hochladen</p>
                <p className="text-[11px] text-muted-foreground/50 mt-1">MP4, MOV. Max 100 MB. 30–90 Sekunden.</p>
              </div>
            </div>

            {/* Or paste URL */}
            <div className="mt-4">
              <Label className="text-xs text-muted-foreground mb-1.5 block">Oder Video-URL einfügen</Label>
              <div className="relative">
                <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <Input
                  placeholder="https://youtube.com/watch?v=... oder Vimeo-Link"
                  className="pl-10 bg-[#0B0F1A]/50 border-[rgba(0,168,255,0.15)] focus:border-[#00A8FF]/40"
                />
              </div>
            </div>

            {/* Tips */}
            <div className="mt-4 p-3 rounded-xl bg-[#00A8FF]/[0.03] border border-[#00A8FF]/8">
              <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                <span className="font-semibold text-[#00D4FF]">Tipps für ein gutes Video:</span>
                <br />
                Stelle dich kurz vor, zeige deine Persönlichkeit, erkläre deinen Coaching-Ansatz und was Kunden von dir erwarten können. Gute Beleuchtung und ruhiger Hintergrund.
              </p>
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

          {/* Categories — Popular + Search */}
          <GlassCard className="p-6" hover={false}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-heading font-semibold text-foreground">Kategorien & Sportarten</h2>
              <span className="text-xs text-muted-foreground">{selectedCategories.length} ausgewählt</span>
            </div>
            <p className="text-xs text-muted-foreground mb-5">Wähle deine Spezialisierungen. Kunden finden dich über diese Kategorien.</p>

            {/* Selected Categories */}
            {selectedCategories.length > 0 && (
              <div className="mb-5">
                <p className="text-[11px] font-medium text-[#00FF94] uppercase tracking-wider mb-2">Ausgewählt</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium bg-[#00FF94]/15 text-[#00FF94] border border-[#00FF94]/30 hover:bg-[#00FF94]/25 transition-all duration-200"
                    >
                      {cat}
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Categories */}
            <div className="mb-5">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Beliebt</p>
              <div className="flex flex-wrap gap-2">
                {popularCategories.filter(c => !selectedCategories.includes(c)).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="px-3 py-1.5 rounded-xl text-sm font-medium bg-[#1A2332]/50 text-muted-foreground border border-transparent hover:border-[rgba(0,255,148,0.2)] hover:text-foreground hover:bg-[#1A2332] transition-all duration-200"
                  >
                    + {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <Input
                  value={categorySearch}
                  onChange={(e) => { setCategorySearch(e.target.value); setShowAllCategories(true) }}
                  onFocus={() => setShowAllCategories(true)}
                  placeholder="Sportart suchen... (z.B. Boxen, Tauchen, Yoga)"
                  className="pl-10 bg-[#0B0F1A]/50 border-[rgba(0,255,148,0.15)] focus:border-[#00FF94]/40"
                />
              </div>

              {showAllCategories && (
                <div className="max-h-[280px] overflow-y-auto rounded-xl border border-[rgba(0,255,148,0.08)] bg-[#0B0F1A]/50 p-2 space-y-0.5">
                  {allCategories
                    .filter(c => !selectedCategories.includes(c))
                    .filter(c => !categorySearch || c.toLowerCase().includes(categorySearch.toLowerCase()))
                    .map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { toggleCategory(cat); setCategorySearch('') }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-[#00FF94]/[0.06] transition-all duration-150"
                      >
                        <span className="text-[#00FF94]/60 mr-2">+</span> {cat}
                      </button>
                    ))
                  }
                  {allCategories
                    .filter(c => !selectedCategories.includes(c))
                    .filter(c => !categorySearch || c.toLowerCase().includes(categorySearch.toLowerCase()))
                    .length === 0 && (
                    <p className="text-sm text-muted-foreground/50 text-center py-4">Keine Sportart gefunden</p>
                  )}
                </div>
              )}

              {showAllCategories && (
                <button
                  onClick={() => { setShowAllCategories(false); setCategorySearch('') }}
                  className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Suche schließen
                </button>
              )}
            </div>
          </GlassCard>

          {/* Languages — Popular + Search */}
          <GlassCard className="p-6" hover={false}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-heading font-semibold text-foreground">Sprachen</h2>
              <span className="text-xs text-muted-foreground">{selectedLanguages.length} ausgewählt</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">In welchen Sprachen bietest du Coaching an?</p>

            {/* Selected */}
            {selectedLanguages.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {selectedLanguages.map((lang) => (
                    <button key={lang} onClick={() => toggleLanguage(lang)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium bg-[#00FF94]/15 text-[#00FF94] border border-[#00FF94]/30 hover:bg-[#00FF94]/25 transition-all">
                      <Globe className="w-3.5 h-3.5" /> {lang} <X className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular */}
            <div className="flex flex-wrap gap-2 mb-4">
              {popularLanguages.filter(l => !selectedLanguages.includes(l)).map((lang) => (
                <button key={lang} onClick={() => toggleLanguage(lang)}
                  className="px-3 py-1.5 rounded-xl text-sm font-medium bg-[#1A2332]/50 text-muted-foreground border border-transparent hover:border-[rgba(0,255,148,0.2)] hover:text-foreground transition-all">
                  + {lang}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
              <Input
                value={languageSearch}
                onChange={(e) => { setLanguageSearch(e.target.value); setShowAllLanguages(true) }}
                onFocus={() => setShowAllLanguages(true)}
                placeholder="Sprache suchen..."
                className="pl-10 bg-[#0B0F1A]/50 border-[rgba(0,255,148,0.15)] focus:border-[#00FF94]/40"
              />
            </div>

            {showAllLanguages && (
              <>
                <div className="mt-2 max-h-[200px] overflow-y-auto rounded-xl border border-[rgba(0,255,148,0.08)] bg-[#0B0F1A]/50 p-2 space-y-0.5">
                  {allLanguages
                    .filter(l => !selectedLanguages.includes(l))
                    .filter(l => !languageSearch || l.toLowerCase().includes(languageSearch.toLowerCase()))
                    .map((lang) => (
                      <button key={lang} onClick={() => { toggleLanguage(lang); setLanguageSearch('') }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-[#00FF94]/[0.06] transition-all">
                        <span className="text-[#00FF94]/60 mr-2">+</span> {lang}
                      </button>
                    ))
                  }
                  {allLanguages.filter(l => !selectedLanguages.includes(l)).filter(l => !languageSearch || l.toLowerCase().includes(languageSearch.toLowerCase())).length === 0 && (
                    <p className="text-sm text-muted-foreground/50 text-center py-3">Keine Sprache gefunden</p>
                  )}
                </div>
                <button onClick={() => { setShowAllLanguages(false); setLanguageSearch('') }}
                  className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Suche schließen
                </button>
              </>
            )}
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
                { name: 'Starter', price: '260€', sessions: '4 Sessions / 4 Wochen', desc: '4 Sessions pro Monat' },
                { name: 'Transformation', price: '720€', sessions: '12 Sessions / 8 Wochen', desc: '12 Sessions in 8 Wochen + Ernährungsplan' },
                { name: 'Premium', price: '1.200€', sessions: '20 Sessions / 8 Wochen', desc: 'Unbegrenzt Sessions + Full Support' },
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
          {/* Certificates & Licenses */}
          <GlassCard className="p-6" hover={false}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFD700]" />
                <h2 className="text-base font-heading font-semibold text-foreground">Zertifikate & Lizenzen</h2>
              </div>
              <button className="flex items-center gap-1.5 text-sm text-[#00FF94] hover:text-[#00CC76] transition-colors">
                <Plus className="w-4 h-4" /> Hinzufügen
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-5">
              Verifizierte Zertifikate werden auf deinem öffentlichen Profil angezeigt und stärken das Vertrauen deiner Kunden.
            </p>
            <div className="space-y-3">
              {[
                { name: 'A-Lizenz Fitnesstrainer', issuer: 'Deutsche Sporthochschule Köln', year: '2019', verified: true },
                { name: 'Ernährungsberater B-Lizenz', issuer: 'IST-Studieninstitut', year: '2020', verified: true },
                { name: 'Functional Training Specialist', issuer: 'Perform Better', year: '2022', verified: false },
              ].map((cert, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#0B0F1A]/50 border border-[rgba(0,255,148,0.08)] hover:border-[rgba(0,255,148,0.15)] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-foreground">{cert.name}</p>
                      {cert.verified && (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#00FF94]/10 text-[#00FF94] font-medium">
                          <CheckCircle2 className="w-3 h-3" /> Verifiziert
                        </span>
                      )}
                      {!cert.verified && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFD700]/10 text-[#FFD700] font-medium">
                          Prüfung ausstehend
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer} · {cert.year}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="w-8 h-8 rounded-lg bg-[#1A2332] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Zertifikat hochladen">
                      <Upload className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-[#1A2332] flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Upload Area */}
            <div className="mt-4 p-4 rounded-xl border-2 border-dashed border-[rgba(0,255,148,0.15)] hover:border-[#00FF94]/30 transition-colors cursor-pointer text-center">
              <FileText className="w-6 h-6 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">PDF, JPG oder PNG hochladen (Max. 10 MB)</p>
              <p className="text-[10px] text-muted-foreground/50 mt-1">Zertifikate werden von unserem Team geprüft und verifiziert</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
