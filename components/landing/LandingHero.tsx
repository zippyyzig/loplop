import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface LandingHeroProps {
  breadcrumb?: string
  h1: string
  subtitle: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  badge?: string
}

export default function LandingHero({
  breadcrumb,
  h1,
  subtitle,
  primaryCta,
  secondaryCta,
  badge,
}: LandingHeroProps) {
  return (
    <section className="bg-[var(--luxury-navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--luxury-gold)] transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">{breadcrumb}</span>
          </nav>
        )}

        {badge && (
          <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase border border-[var(--luxury-gold)]/50 text-[var(--luxury-gold)] rounded-full">
            {badge}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance mb-6 max-w-4xl">
          {h1}
        </h1>

        <p className="text-lg text-white/75 leading-relaxed max-w-3xl mb-10">
          {subtitle}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--luxury-gold)] text-[var(--luxury-navy)] rounded-lg font-semibold text-sm transition-all hover:brightness-110 hover:shadow-lg"
          >
            {primaryCta.label}
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white rounded-lg font-semibold text-sm transition-all hover:border-white/70 hover:bg-white/10"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
