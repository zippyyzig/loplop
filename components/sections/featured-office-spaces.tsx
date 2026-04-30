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
  {
    id: 4,
    type: "Virtual Office",
    tagline: "Presence Without Premises",
    description: "Professional business address with mail handling and call services",
    seats: "Unlimited",
    price: "₹3,500/mo",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80",
    gradient: "from-violet-500/90 to-purple-600/90",
    accent: "bg-violet-500",
    features: ["Business Address", "Mail Handling", "Call Reception"],
    url: "/office-space?space_type=virtual_office"
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
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 mb-4">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Premium Workspaces
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Where <span className="text-primary">Work</span> Meets{" "}
            <span className="relative inline-block">
              Excellence
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path 
                  d="M2 6C50 2 150 2 198 6" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  className="text-primary/40"
                />
              </svg>
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From coworking desks to managed offices, find the perfect workspace that scales with your ambition
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-12 p-4 rounded-2xl bg-muted/50 border border-border/50">
          {STATS.map((stat, index) => (
            <AnimatedStat key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Office Spaces Grid - Bento Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
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

        {/* CTA Section */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:p-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Need Help Finding Your Ideal Workspace?
              </h3>
              <p className="text-slate-300 max-w-lg">
                Our workspace consultants will help you find the perfect office solution for your team
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/office-space"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-6 py-3 rounded-xl",
                  "bg-white text-slate-900 font-semibold",
                  "hover:bg-slate-100 transition-colors",
                  "shadow-lg"
                )}
              >
                Browse All Spaces
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-6 py-3 rounded-xl",
                  "bg-white/10 text-white font-semibold",
                  "border border-white/20",
                  "hover:bg-white/20 transition-colors"
                )}
              >
                Talk to Expert
              </Link>
            </div>
          </div>

          {/* Floating Icons */}
          <div className="absolute top-4 left-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm hidden md:block">
            <Wifi className="h-5 w-5 text-white/60" />
          </div>
          <div className="absolute bottom-4 right-20 p-2 rounded-lg bg-white/10 backdrop-blur-sm hidden md:block">
            <Coffee className="h-5 w-5 text-white/60" />
          </div>
          <div className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm hidden md:block">
            <Clock className="h-5 w-5 text-white/60" />
          </div>
        </div>
      </div>
    </section>
  )
}
