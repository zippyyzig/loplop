"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  title: string
  faqs: FAQItem[]
}

export default function FAQAccordion({ title, faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-[var(--luxury-cream)] border-t border-[var(--luxury-border)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--luxury-navy)] text-balance mb-10">
          {title}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className="bg-white border border-[var(--luxury-border)] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[var(--luxury-cream)] transition-colors"
                >
                  <h3 className="text-sm md:text-base font-semibold text-[var(--luxury-navy)] leading-snug pr-2">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full border border-[var(--luxury-border)] flex items-center justify-center text-[var(--luxury-navy)]">
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 border-t border-[var(--luxury-border)] pt-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
