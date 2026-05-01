"use client"

import {
  MapPin, Train, Plane, Car, Hospital,
  GraduationCap, ShoppingBag, Bus, ExternalLink,
  Navigation, Building, Church, Landmark, Coffee,
  UtensilsCrossed, Fuel, ParkingCircle, Waves,
  TreePine, Dumbbell, Baby, Stethoscope, Pill,
  Store, Banknote, Hotel, Theater, Music,
  BookOpen, Library, Users, Building2, Factory,
  Warehouse, Ship, Zap, Droplets, Shield,
  type LucideIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Keyword-based icon matching for intelligent icon selection
// Updated to remove overly generic catch-all words like "station" or "terminal"
const ICON_KEYWORDS: Array<{ keywords: string[]; icon: LucideIcon; color: string }> = [
  // Transportation
  { keywords: ["metro", "subway", "underground"], icon: Train, color: "from-blue-500/20 to-blue-500/5 text-blue-600" },
  { keywords: ["airport", "flight", "aviation"], icon: Plane, color: "from-purple-500/20 to-purple-500/5 text-purple-600" },
  { keywords: ["railway", "rail", "train", "railroad"], icon: Train, color: "from-amber-500/20 to-amber-500/5 text-amber-600" },
  { keywords: ["bus", "transport", "depot", "isbt"], icon: Bus, color: "from-teal-500/20 to-teal-500/5 text-teal-600" },
  { keywords: ["highway", "expressway", "road", "toll", "freeway", "nh-", "sh-"], icon: Car, color: "from-orange-500/20 to-orange-500/5 text-orange-600" },
  { keywords: ["port", "harbour", "harbor", "dock", "ship"], icon: Ship, color: "from-sky-500/20 to-sky-500/5 text-sky-600" },
  { keywords: ["parking", "car park"], icon: ParkingCircle, color: "from-slate-500/20 to-slate-500/5 text-slate-600" },
  { keywords: ["petrol", "fuel", "gas station", "pump", "cng"], icon: Fuel, color: "from-red-500/20 to-red-500/5 text-red-600" },

  // Healthcare
  { keywords: ["hospital", "medical", "healthcare", "emergency", "trauma"], icon: Hospital, color: "from-red-500/20 to-red-500/5 text-red-600" },
  { keywords: ["clinic", "diagnostic", "lab", "pathology"], icon: Stethoscope, color: "from-rose-500/20 to-rose-500/5 text-rose-600" },
  { keywords: ["pharmacy", "chemist", "medical store", "drug"], icon: Pill, color: "from-green-500/20 to-green-500/5 text-green-600" },

  // Education
  { keywords: ["school", "academy", "vidyalaya", "public school", "dps", "dav"], icon: GraduationCap, color: "from-green-500/20 to-green-500/5 text-green-600" },
  { keywords: ["college", "university", "institute", "iit", "nit", "bits"], icon: BookOpen, color: "from-indigo-500/20 to-indigo-500/5 text-indigo-600" },
  { keywords: ["library"], icon: Library, color: "from-amber-500/20 to-amber-500/5 text-amber-600" },

  // Shopping & Commercial
  { keywords: ["mall", "shopping", "plaza", "galleria", "emporium"], icon: ShoppingBag, color: "from-pink-500/20 to-pink-500/5 text-pink-600" },
  { keywords: ["market", "bazaar", "mandi", "haat", "mart"], icon: Store, color: "from-indigo-500/20 to-indigo-500/5 text-indigo-600" },
  { keywords: ["supermarket", "grocery", "hypermarket", "bigbazaar", "dmart"], icon: ShoppingBag, color: "from-emerald-500/20 to-emerald-500/5 text-emerald-600" },

  // Food & Dining
  { keywords: ["restaurant", "dining", "food", "eatery", "dhaba", "cafe"], icon: UtensilsCrossed, color: "from-orange-500/20 to-orange-500/5 text-orange-600" },
  { keywords: ["coffee", "starbucks", "ccd", "barista"], icon: Coffee, color: "from-amber-600/20 to-amber-600/5 text-amber-700" },

  // Recreation & Entertainment
  { keywords: ["park", "garden", "green", "nature", "eco"], icon: TreePine, color: "from-green-600/20 to-green-600/5 text-green-700" },
  { keywords: ["gym", "fitness", "sports", "stadium", "club"], icon: Dumbbell, color: "from-violet-500/20 to-violet-500/5 text-violet-600" },
  { keywords: ["pool", "swimming", "aqua"], icon: Waves, color: "from-cyan-500/20 to-cyan-500/5 text-cyan-600" },
  { keywords: ["cinema", "movie", "multiplex", "pvr", "inox", "theater"], icon: Theater, color: "from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-600" },
  { keywords: ["music", "concert", "auditorium"], icon: Music, color: "from-pink-500/20 to-pink-500/5 text-pink-600" },

  // Religious & Cultural
  { keywords: ["temple", "mandir", "gurudwara", "mosque", "masjid", "church", "religious"], icon: Church, color: "from-yellow-500/20 to-yellow-500/5 text-yellow-600" },
  { keywords: ["heritage", "monument", "fort", "museum", "historical"], icon: Landmark, color: "from-stone-500/20 to-stone-500/5 text-stone-600" },

  // Business & Office
  { keywords: ["office", "corporate", "business", "it park", "tech park", "sez"], icon: Building2, color: "from-cyan-500/20 to-cyan-500/5 text-cyan-600" },
  { keywords: ["workplace", "work", "coworking"], icon: Building, color: "from-blue-500/20 to-blue-500/5 text-blue-600" },
  { keywords: ["bank", "atm", "finance", "hdfc", "icici", "sbi", "axis"], icon: Banknote, color: "from-emerald-500/20 to-emerald-500/5 text-emerald-600" },
  { keywords: ["industrial", "factory", "manufacturing"], icon: Factory, color: "from-gray-500/20 to-gray-500/5 text-gray-600" },
  { keywords: ["warehouse", "storage", "godown"], icon: Warehouse, color: "from-stone-500/20 to-stone-500/5 text-stone-600" },

  // Accommodation
  { keywords: ["hotel", "resort", "inn", "lodge", "taj", "marriott", "hilton"], icon: Hotel, color: "from-amber-500/20 to-amber-500/5 text-amber-600" },

  // Services & Utilities
  { keywords: ["police", "security", "fire"], icon: Shield, color: "from-blue-600/20 to-blue-600/5 text-blue-700" },
  { keywords: ["power", "electricity", "substation"], icon: Zap, color: "from-yellow-500/20 to-yellow-500/5 text-yellow-600" },
  { keywords: ["water", "sewage", "treatment"], icon: Droplets, color: "from-blue-400/20 to-blue-400/5 text-blue-500" },

  // Community
  { keywords: ["community", "society", "club house", "amenity"], icon: Users, color: "from-violet-500/20 to-violet-500/5 text-violet-600" },
  { keywords: ["creche", "daycare", "playschool", "nursery", "kindergarten"], icon: Baby, color: "from-pink-400/20 to-pink-400/5 text-pink-500" },
]

// Function to find the best matching icon based on type and name
// Updated to prioritize matching the 'type' category before scanning the 'name'
function getIconAndColor(type: string, name: string): { icon: LucideIcon; color: string } {
  // Replace underscores with spaces so things like "bus_stand" map to "bus stand"
  const typeLower = (type || "").toLowerCase().replace(/_/g, " ")
  const nameLower = (name || "").toLowerCase()

  // PRIORITY 1: Match against the explicit category 'type' first
  for (const entry of ICON_KEYWORDS) {
    if (entry.keywords.some(keyword => typeLower.includes(keyword.toLowerCase()))) {
      return { icon: entry.icon, color: entry.color }
    }
  }

  // PRIORITY 2: If the type doesn't yield a match, scan the 'name' string
  for (const entry of ICON_KEYWORDS) {
    if (entry.keywords.some(keyword => nameLower.includes(keyword.toLowerCase()))) {
      return { icon: entry.icon, color: entry.color }
    }
  }

  // Default fallback if neither matches
  return { icon: MapPin, color: "from-primary/20 to-primary/5 text-primary" }
}

const TYPE_LABELS: Record<string, string> = {
  metro: "Metro Station",
  airport: "Airport",
  highway: "Highway",
  hospital: "Hospital",
  school: "School",
  mall: "Mall",
  railway: "Railway Station",
  bus_stand: "Bus Stand",
  market: "Market",
  workplace: "Workplace",
  park: "Park",
  temple: "Temple",
  bank: "Bank",
  restaurant: "Restaurant",
  hotel: "Hotel",
  cinema: "Cinema",
  gym: "Fitness Center",
  pharmacy: "Pharmacy",
  college: "College",
  office: "Office",
}

interface ConnectivityItem {
  type: string
  type_label?: string
  name: string
  distance: string
}

interface NearbyItem {
  category: string
  name: string
  distance: string
}

interface LocationConnectivityProps {
  connectivity?: ConnectivityItem[]
  nearby?: NearbyItem[]
  googleMapLink?: string
  address?: string
  city?: string
  state?: string
}

export function LocationConnectivity({
  connectivity,
  nearby,
  googleMapLink,
  address,
  city,
  state
}: LocationConnectivityProps) {
  // Combine connectivity and nearby into a single list
  const allLocations: ConnectivityItem[] = [
    ...(connectivity || []),
    ...(nearby?.map(n => ({
      type: n.category as ConnectivityItem["type"],
      name: n.name,
      distance: n.distance
    })) || [])
  ]

  if (allLocations.length === 0 && !googleMapLink) return null

  const fullAddress = [address, city, state].filter(Boolean).join(", ")

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-muted/50 to-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Navigation className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Location & Connectivity</h2>
            <p className="text-muted-foreground text-sm mt-0.5">Everything within easy reach</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connectivity List */}
          <div className="space-y-3">
            {allLocations.map((item, index) => {
              // Smart icon matching based on both type and name
              const { icon: Icon, color: colorClass } = getIconAndColor(item.type, item.name)
              // Use type_label if available (for custom types), otherwise use TYPE_LABELS lookup or format the type
              const label = item.type_label || TYPE_LABELS[item.type] || item.type?.replace(/_/g, " ")?.replace(/\b\w/g, l => l.toUpperCase()) || "Location"

              return (
                <div
                  key={index}
                  className={cn(
                    // Changed gap and padding to be smaller on mobile and larger on sm screens
                    "group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border border-border rounded-xl",
                    "hover:border-primary/30 hover:shadow-md transition-all duration-300"
                  )}
                >
                  <div className={cn(
                    // Scaled down icon container slightly for mobile
                    "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                    "group-hover:scale-110 transition-transform duration-300",
                    colorClass
                  )}>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-grow min-w-0">
                    {/* REMOVED 'truncate', added better line-height handling */}
                    <p className="text-[14px] sm:text-[15px] font-semibold text-foreground leading-tight sm:leading-normal">
                      {item.name}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{label}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {/* Added whitespace-nowrap to prevent distance text from breaking on small screens */}
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary text-xs sm:text-sm font-bold rounded-full whitespace-nowrap">
                      {item.distance}
                    </span>
                  </div>
                </div>
              )
            })}

            {allLocations.length === 0 && fullAddress && (
              <div className="p-4 sm:p-5 bg-card border border-border rounded-xl">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-[14px] sm:text-[15px] text-foreground">{fullAddress}</p>
                </div>
              </div>
            )}
          </div>

          {/* Map or CTA */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {googleMapLink ? (
              <div className="h-full min-h-[300px] sm:min-h-[350px] flex flex-col">
                <iframe
                  src={googleMapLink.replace("/maps/", "/maps/embed?pb=")}
                  className="flex-grow w-full"
                  style={{ minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="p-4 border-t border-border bg-muted/30">
                  <Button asChild variant="outline" className="w-full">
                    <a href={googleMapLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] sm:min-h-[350px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-muted/50 to-muted/30">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-muted-foreground/40" />
                </div>
                <p className="text-muted-foreground mb-2">Map view not available</p>
                {fullAddress && (
                  <p className="text-sm text-foreground font-medium">{fullAddress}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}