import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface RelatedPageItem {
  label: string
  href: string
}

interface RelatedPagesProps {
  items: RelatedPageItem[]
}

export default function RelatedPages({ items }: RelatedPagesProps) {
  return (
    <section className="bg-[var(--luxury-navy)] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">Related pages</p>
        <div className="flex flex-wrap gap-3">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:border-[var(--luxury-gold)] hover:text-[var(--luxury-gold)] transition-colors"
            >
              {item.label}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
