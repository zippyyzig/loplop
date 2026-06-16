import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface InlineCTAProps {
  heading: string
  body?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  variant?: "light" | "dark"
}

export default function InlineCTA({ heading, body, primaryCta, secondaryCta, variant = "light" }: InlineCTAProps) {
  const isDark = variant === "dark"
  return (
    <section
      className={`${isDark ? "bg-[var(--luxury-navy)] text-white" : "bg-white border-y border-[var(--luxury-border)]"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className={`text-xl md:text-2xl font-bold text-balance ${isDark ? "text-white" : "text-[var(--luxury-navy)]"}`}>
            {heading}
          </h2>
          {body && (
            <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-white/70" : "text-gray-600"}`}>
              {body}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3 flex-shrink-0">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--luxury-gold)] text-[var(--luxury-navy)] rounded-lg font-semibold text-sm hover:brightness-110 transition-all"
          >
            {primaryCta.label}
            <ChevronRight className="h-4 w-4" />
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                isDark
                  ? "border border-white/30 text-white hover:bg-white/10"
                  : "border-2 border-[var(--luxury-navy)] text-[var(--luxury-navy)] hover:bg-[var(--luxury-navy)]/5"
              }`}
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
