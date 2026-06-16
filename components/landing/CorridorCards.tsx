import Link from "next/link"
import { MapPin, ChevronRight } from "lucide-react"

interface CorridorItem {
  name: string
  sectors: string
  priceRange: string
  highlight: string
  ctaLabel: string
  ctaHref: string
  rightFor?: string
}

interface CorridorCardsProps {
  title: string
  subtitle?: string
  corridors: CorridorItem[]
}

export default function CorridorCards({ title, subtitle, corridors }: CorridorCardsProps) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--luxury-navy)] text-balance">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed max-w-3xl">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corridors.map((corridor, i) => (
            <article
              key={i}
              className="group bg-[var(--luxury-cream)] border border-[var(--luxury-border)] rounded-2xl p-6 flex flex-col gap-4 hover:border-[var(--luxury-gold)] hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-[var(--luxury-navy)] flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-[var(--luxury-gold)]" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[var(--luxury-navy)] leading-tight">{corridor.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{corridor.sectors}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-semibold bg-[var(--luxury-gold)]/15 text-[var(--luxury-navy)] rounded-full">
                  {corridor.priceRange}
                </span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed flex-1">{corridor.highlight}</p>

              {corridor.rightFor && (
                <p className="text-xs text-[var(--luxury-navy)] font-medium bg-[var(--luxury-navy)]/5 rounded-lg px-3 py-2 leading-snug">
                  <span className="font-bold">Right for you if:</span> {corridor.rightFor}
                </p>
              )}

              <Link
                href={corridor.ctaHref}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--luxury-navy)] group-hover:text-[var(--luxury-gold)] transition-colors mt-auto"
              >
                {corridor.ctaLabel}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
