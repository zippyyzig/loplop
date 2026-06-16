interface StatItem {
  value: string
  label: string
}

interface MarketSnapshotProps {
  title: string
  description?: string
  stats: StatItem[]
}

export default function MarketSnapshot({ title, description, stats }: MarketSnapshotProps) {
  return (
    <section className="bg-[var(--luxury-cream)] border-y border-[var(--luxury-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--luxury-navy)] text-balance">{title}</h2>
          {description && (
            <p className="mt-3 text-gray-600 leading-relaxed max-w-3xl">{description}</p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[var(--luxury-border)] p-5"
            >
              <p className="text-xl md:text-2xl font-bold text-[var(--luxury-navy)] mb-1 leading-tight">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
