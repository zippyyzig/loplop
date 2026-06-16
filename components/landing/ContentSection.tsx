interface ContentSectionProps {
  title: string
  children: React.ReactNode
  background?: "white" | "cream"
  id?: string
}

export default function ContentSection({ title, children, background = "white", id }: ContentSectionProps) {
  return (
    <section
      id={id}
      className={`${background === "cream" ? "bg-[var(--luxury-cream)]" : "bg-white"} border-t border-[var(--luxury-border)]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--luxury-navy)] text-balance mb-8">
          {title}
        </h2>
        <div className="text-gray-700 leading-relaxed space-y-5 text-[0.9375rem]">
          {children}
        </div>
      </div>
    </section>
  )
}
