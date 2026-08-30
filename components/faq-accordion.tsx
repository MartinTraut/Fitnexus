'use client'

import { useId, useState } from 'react'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const uid = useId()

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${uid}-q-${index}`
        const panelId = `${uid}-a-${index}`

        return (
          <div
            key={item.question}
            className={cn(
              'rounded-2xl surface transition-all duration-500 ease-[var(--ease-smooth)]',
              isOpen
                ? 'border-[rgba(0,168,255,0.28)] shadow-[0_18px_50px_-24px_rgba(0,168,255,0.5)]'
                : 'hover:border-[rgba(0,168,255,0.2)]'
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span
                  className={cn(
                    'font-medium transition-colors duration-300',
                    isOpen ? 'text-[#00D4FF]' : 'text-foreground group-hover:text-[#00D4FF]'
                  )}
                >
                  {item.question}
                </span>
                {/* Plus dreht zu Minus — eindeutiger als ein Pfeil, der auch
                    „weiterblättern" heißen könnte. */}
                <span
                  aria-hidden
                  className={cn(
                    'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-400 ease-[var(--ease-smooth)]',
                    isOpen
                      ? 'rotate-45 border-[#00D4FF]/45 bg-[#00D4FF]/12 text-[#00D4FF]'
                      : 'border-[rgba(0,168,255,0.18)] text-[#00D4FF]/70 group-hover:border-[#00D4FF]/40'
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                'grid transition-all duration-500 ease-[var(--ease-smooth)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 t-body text-soft">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
