'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'glass-card rounded-2xl overflow-hidden transition-all duration-400 ease-[var(--ease-smooth)]',
            openIndex === index && 'shadow-[0_0_20px_rgba(0,168,255,0.06)]'
          )}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-5 text-left group"
            aria-expanded={openIndex === index}
          >
            <span className="font-medium text-foreground pr-4 group-hover:text-[#00D4FF] transition-colors duration-300">{item.question}</span>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-[#00D4FF]/60 transition-all duration-300 ease-[var(--ease-smooth)] flex-shrink-0',
                openIndex === index && 'rotate-180 text-[#00D4FF]'
              )}
            />
          </button>
          <div
            className={cn(
              'grid transition-all duration-400 ease-[var(--ease-smooth)]',
              openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            )}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-muted-foreground leading-relaxed text-sm">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
