interface InfoGridItem {
  title: string
  body: string
}

interface InfoGridProps {
  title: string
  subtitle?: string
  items: InfoGridItem[]
  background?: "white" | "cream"
}

export default function InfoGrid({ title, subtitle, items, background = "cream" }: InfoGridProps) {
  return (
    <section
      className={`${background === "cream" ? "bg-[var(--luxury-cream)]" : "bg-white"} border-t border-[var(--luxury-border)]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--luxury-navy)] text-balance">{title}</h2>
          {subtitle && <p className="mt-3 text-gray-600 leading-relaxed max-w-3xl">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[var(--luxury-border)] rounded-xl p-5"
            >
              <h3 className="font-bold text-[var(--luxury-navy)] mb-2 text-sm">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
