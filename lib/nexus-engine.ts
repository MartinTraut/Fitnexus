// ──────────────────────────────────────────────────────────────────
// NEXUS Assistant — response engine
// Rule-based responder for now. Swap `getNexusReply` for an LLM
// fetch (e.g. /api/nexus → Anthropic/OpenAI/Gemini) when ready.
// ──────────────────────────────────────────────────────────────────

export type NexusRole = 'user' | 'assistant'

export interface NexusMessage {
  id: string
  role: NexusRole
  content: string
  ts: number
}

interface Rule {
  keywords: string[]
  reply: () => string
}

const rules: Rule[] = [
  {
    keywords: ['coach finden', 'coach suchen', 'trainer finden', 'wie finde'],
    reply: () =>
      'Gehe auf **Coach finden** in der Navigation. Du kannst nach Stadt, Spezialisierung (Kraft, Mobility, Abnehmen, …), Preis und Bewertung filtern. Das **Erstgespräch ist kostenlos und anonym** — kein Risiko, keine Verpflichtung.',
  },
  {
    keywords: ['preis', 'kosten', 'tarif', 'pricing', 'monatlich'],
    reply: () =>
      'Für **Athleten** ist FITNEXUS komplett kostenlos. **Coaches** starten ab **49 €/Monat** — inkl. Lead-Generierung, Plan-Editor, Chat, digitale Verträge und Abrechnung.',
  },
  {
    keywords: ['abnehmen', 'fett', 'gewicht verlieren', 'diät'],
    reply: () =>
      '**Faustregel**: 300–500 kcal Defizit/Tag, 1,8–2,2 g Protein pro kg Körpergewicht, 3–4 Krafttrainings pro Woche. Das ergibt ~0,5 kg Fett pro Woche bei Muskelerhalt. Auf FITNEXUS findest du **Ernährungs-Coaches**, die dir individuelle Pläne bauen.',
  },
  {
    keywords: ['muskelaufbau', 'masse aufbauen', 'hypertrophie', 'masseaufbau'],
    reply: () =>
      'Für Muskelaufbau: **leichter Kalorienüberschuss** (200–400 kcal), **1,6–2 g Protein/kg KG**, progressiver Overload bei 6–12 Wiederholungen, 10–20 Sätze pro Muskelgruppe und Woche. Schlaf ≥ 7 h. Im Plan-Editor deines Coaches kannst du genau das tracken.',
  },
  {
    keywords: ['protein', 'eiweiß', 'eiweiss'],
    reply: () =>
      'Empfohlene Proteinzufuhr: **1,6–2,2 g pro kg Körpergewicht** bei Krafttraining. Quellen: Hähnchen, Magerquark, Eier, Linsen, Whey. Verteilt über 3–5 Mahlzeiten — der Körper kann pro Mahlzeit ~30–40 g effektiv verarbeiten.',
  },
  {
    keywords: ['vor dem training', 'pre workout', 'vorm training', 'vor training'],
    reply: () =>
      '**60–90 Min vorher**: komplexe Kohlenhydrate + etwas Protein (z. B. Haferflocken + Quark, Reis + Hähnchen). **30 Min vorher**: schnelle Kohlenhydrate (Banane, Reiswaffel). Genug trinken (500 ml Wasser).',
  },
  {
    keywords: ['nach dem training', 'post workout', 'nach training', 'recovery'],
    reply: () =>
      'Innerhalb von **60 Min nach dem Training**: 20–40 g Protein + Kohlenhydrate. Ideal: Whey-Shake mit Banane oder Magerquark mit Honig. Schlaf und Pausentage sind genauso wichtig wie das Training selbst.',
  },
  {
    keywords: ['anfänger', 'anfanger', 'einsteiger', 'fang an', 'starten'],
    reply: () =>
      'Für **Anfänger**: 3× pro Woche Ganzkörper-Training mit Grundübungen (Kniebeuge, Bankdrücken, Kreuzheben, Klimmzug, Schulterdrücken). **Erst Technik, dann Gewicht**. Such dir einen Coach, der dich in den ersten 8–12 Wochen begleitet — das verhindert teure Fehler.',
  },
  {
    keywords: ['vertrag', 'kündigen', 'rechtlich', 'agb'],
    reply: () =>
      'Verträge auf FITNEXUS sind **digital, transparent und rechtssicher**. Laufzeiten, Kündigungsfristen und Konditionen siehst du **bevor du unterschreibst**. Kündigung läuft direkt über dein Dashboard.',
  },
  {
    keywords: ['als coach', 'coach werden', 'business', 'lead', 'kunden bekommen'],
    reply: () =>
      'Als Coach auf FITNEXUS bekommst du: **automatische Lead-Generierung**, Plan-Editor, In-App-Chat, digitale Verträge, Abrechnung, Reviews. Setup in **5 Minuten**. Reg dich unter **Als Coach starten** an.',
  },
  {
    keywords: ['was ist fitnexus', 'was ist das', 'fitnexus'],
    reply: () =>
      'FITNEXUS ist die **Coach-Marketplace + Coaching-Plattform** im DACH-Raum. Athleten finden verifizierte Coaches, Coaches professionalisieren ihr Business. Training, Ernährung, Chat und Fortschritt — alles in einem System.',
  },
  {
    keywords: ['hallo', 'hi', 'hey', 'moin', 'servus'],
    reply: () =>
      'Hey! 👋 Ich bin **NEXUS**, dein Assistent rund um FITNEXUS und Fitness allgemein. Frag mich z. B. nach Trainingstipps, Ernährung, oder wie du den richtigen Coach findest.',
  },
  {
    keywords: ['danke', 'merci', 'thanks'],
    reply: () => 'Gern. 💪 Wenn du noch was brauchst — ich bin hier.',
  },
]

const fallback =
  'Gute Frage. Ich bin spezialisiert auf **FITNEXUS**, **Training**, **Ernährung** und **Coach-Themen**. Stell mir eine konkrete Frage dazu — z. B. „Wie finde ich einen Coach?", „Wie viel Protein brauche ich?" oder „Wie starte ich als Anfänger?"'

export async function getNexusReply(input: string): Promise<string> {
  // Simulate latency for natural typing feel
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 700))
  const q = input.toLowerCase().trim()
  if (!q) return fallback
  for (const rule of rules) {
    if (rule.keywords.some((k) => q.includes(k))) return rule.reply()
  }
  return fallback
}

export const nexusSuggestions = [
  'Wie finde ich den richtigen Coach?',
  'Was esse ich vor dem Training?',
  'Wie baue ich Muskeln auf?',
  'Was kostet FITNEXUS für Coaches?',
]

export const nexusWelcome =
  'Hey, ich bin **NEXUS**, dein FITNEXUS-Assistent. 💪 Ich helfe dir bei Fragen rund um **Training**, **Ernährung**, **Coaches finden** und **wie FITNEXUS funktioniert**.'
