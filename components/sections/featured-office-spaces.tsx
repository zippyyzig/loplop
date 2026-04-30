"use client"

import { useState, useRef, useEffect, memo } from "react"
import { 
  Building2, 
  Users, 
  Clock, 
  Wifi, 
  Coffee, 
  ArrowRight, 
  Sparkles,
  MapPin,
  CheckCircle2,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Office space categories with images
const OFFICE_SPACES = [
  {
    id: 1,
    type: "Coworking",
    tagline: "Collaborate & Create",
    description: "Flexible hot desks and dedicated spaces for individuals and small teams",
    seats: "50+",
    price: "₹8,000/seat",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    gradient: "from-cyan-500/90 to-blue-600/90",
    accent: "bg-cyan-500",
    features: ["High-Speed WiFi", "24/7 Access", "Meeting Rooms"],
    url: "/office-space?space_type=coworking"
  },
  {
    id: 2,
    type: "Managed Office",
    tagline: "Your Brand, Our Space",
    description: "Fully customized private offices tailored to your brand identity",
    seats: "100+",
    price: "₹15,000/seat",
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&auto=format&fit=crop&q=80",
    gradient: "from-emerald-500/90 to-teal-600/90",
    accent: "bg-emerald-500",
    features: ["Custom Branding", "Private Space", "Dedicated Support"],
    url: "/office-space?space_type=managed_office"
  },
  {
    id: 3,
    type: "Private Office",
    tagline: "Executive Excellence",
    description: "Premium private cabins for focused work and confidential meetings",
    seats: "20+",
    price: "₹25,000/cabin",
    image: "https://images.unsplash.com/photo-1606836576983-8b458e75221d?w=800&auto=format&fit=crop&q=80",
    gradient: "from-amber-500/90 to-orange-600/90",
    accent: "bg-amber-500",
    features: ["Private Cabin", "Premium Amenities", "Concierge"],
    url: "/office-space?space_type=private_office"
  },
]

// Animated stats
const STATS = [
  { value: "50+", label: "Premium Locations", icon: Building2 },
  { value: "10,000+", label: "Seats Available", icon: Users },
  { value: "24/7", label: "Access Hours", icon: Clock },
  { value: "99%", label: "Client Satisfaction", icon: Sparkles },
]

// Office space card component
const OfficeSpaceCard = memo(function OfficeSpaceCard({ 
  space, 
  index,
  isActive,
  onHover
}: { 
  space: typeof OFFICE_SPACES[0]
  index: number
  isActive: boolean
  onHover: (id: number | null) => void
}) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "50px" }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-2xl overflow-hidden cursor-pointer",
        "h-[320px] md:h-[380px]",
        "shadow-lg bg-slate-200",
        "transition-all duration-500 ease-out",
        isActive 
          ? "scale-[1.03] shadow-2xl z-10" 
          : "hover:scale-[1.02]",
        "will-change-transform",
        // Staggered animation
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => onHover(space.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Background Image */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center",
          "transition-transform duration-700 ease-out",
          isActive ? "scale-110" : "scale-100"
        )}
        style={{ backgroundImage: `url(${space.image})` }}
      />

      {/* Dark Overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20",
        "transition-opacity duration-300"
      )} />

      {/* Colored Overlay on Hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t",
        space.gradient,
        "transition-opacity duration-500",
        isActive ? "opacity-70" : "opacity-0"
      )} />

      {/* Type Badge */}
      <div className={cn(
        "absolute top-4 left-4",
        "px-3 py-1.5 rounded-full",
        space.accent,
        "text-white text-xs font-bold uppercase tracking-wider",
        "shadow-lg flex items-center gap-1.5"
      )}>
        <Building2 className="h-3.5 w-3.5" />
        {space.type}
      </div>

      {/* Price Badge */}
      <div className={cn(
        "absolute top-4 right-4",
        "px-3 py-1.5 rounded-full",
        "bg-white/20 backdrop-blur-md",
        "text-white text-xs font-semibold",
        "border border-white/30"
      )}>
        From {space.price}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {/* Tagline */}
        <p className={cn(
          "text-white/90 text-xs font-semibold tracking-widest uppercase mb-1",
          "transition-all duration-300",
          isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-70"
        )}>
          {space.tagline}
        </p>

        {/* Description */}
        <p className={cn(
          "text-white/80 text-sm mb-3 line-clamp-2",
          "transition-all duration-300 delay-75",
          isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}>
          {space.description}
        </p>

        {/* Features */}
        <div className={cn(
          "flex flex-wrap gap-2 mb-3",
          "transition-all duration-300 delay-100",
          isActive ? "translate-y-0 opacity-100 max-h-20" : "translate-y-2 opacity-0 max-h-0 overflow-hidden"
        )}>
          {space.features.map((feature, i) => (
            <span 
              key={i}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-xs"
            >
              <CheckCircle2 className="h-3 w-3" />
              {feature}
            </span>
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-3">
          <span className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-semibold",
            "bg-white/20 backdrop-blur-sm text-white"
          )}>
            <Users className="h-3 w-3 inline mr-1" />
            {space.seats} Seats
          </span>
        </div>

        {/* CTA Button */}
        <div className={cn(
          "overflow-hidden transition-all duration-500",
          isActive ? "max-h-14 opacity-100" : "max-h-0 opacity-0"
        )}>
          <Link
            href={space.url}
            className={cn(
              "inline-flex items-center gap-2 w-full justify-center",
              "py-3 px-4 rounded-xl",
              "bg-white text-foreground font-semibold text-sm",
              "hover:bg-white/90 transition-colors",
              "shadow-xl"
            )}
          >
            Explore {space.type}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Shine Effect */}
      <div className={cn(
        "absolute inset-0 opacity-0",
        isActive ? "opacity-100" : "",
        "bg-gradient-to-r from-transparent via-white/20 to-transparent",
        "-translate-x-full",
        isActive ? "translate-x-full" : "",
        "transition-all duration-1000 ease-out"
      )} />
    </div>
  )
})

// Animated counter component
function AnimatedStat({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const Icon = stat.icon

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "20px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-2 p-4",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="p-3 rounded-xl bg-primary/10 mb-1">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="text-2xl md:text-3xl font-bold text-foreground">
        {stat.value}
      </span>
      <span className="text-xs text-muted-foreground font-medium text-center">
        {stat.label}
      </span>
    </div>
  )
}

export default function FeaturedOfficeSpaces() {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <section className="w-full py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Premium Workspaces
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Where Work Meets Excellence
            </h2>
            <p className="text-sm text-muted-foreground max-w-md">
              From coworking desks to managed offices, find the perfect workspace that scales with your ambition
            </p>
          </div>

          <Link
            href="/properties?segment=luxury"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full",
              "bg-primary/5 hover:bg-primary/10 border border-primary/20",
              "text-primary font-medium text-sm",
              "transition-all duration-300",
              "hover:gap-3 group"
            )}
          >
            View All Luxury
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Office Spaces Grid - Bento Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10">
          {OFFICE_SPACES.map((space, index) => (
            <OfficeSpaceCard 
              key={space.id} 
              space={space} 
              index={index}
              isActive={activeId === space.id}
              onHover={setActiveId}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
