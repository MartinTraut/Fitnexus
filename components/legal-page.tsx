import type { ReactNode } from 'react'

/**
 * Rahmen fuer die Rechtstexte. Bewusst nuechtern gehalten: hier zaehlt
 * Lesbarkeit, nicht Effekt.
 */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <article lang="de" className="relative section-y">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(0,168,255,0.08),transparent)]" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24">
        <h1 className="t-h1 font-heading font-bold text-foreground hyphens-auto break-words">{title}</h1>
        {intro && <p className="mt-5 t-lead text-soft">{intro}</p>}
        <div lang="de" className="mt-12 space-y-10 hyphens-auto [overflow-wrap:break-word] [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:t-h3 [&_h2]:mb-3 [&_p]:t-body [&_p]:text-soft [&_ul]:t-body [&_ul]:text-soft [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-[#00D4FF] [&_a:hover]:underline">
          {children}
        </div>
      </div>
    </article>
  )
}

/**
 * Markiert Angaben, die nur die Geschaeftsfuehrung liefern kann.
 * Sichtbar, damit nichts unbemerkt live geht.
 */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded-md bg-[#FFD700]/12 px-1.5 py-0.5 font-medium text-[#FFD700] not-italic">
      {children}
    </mark>
  )
}
