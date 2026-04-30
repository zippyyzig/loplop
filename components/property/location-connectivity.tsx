"use client"

import { 
  MapPin, Train, Plane, Car, Hospital, 
  GraduationCap, ShoppingBag, Bus, ExternalLink,
  Navigation, Building
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TYPE_ICONS: Record<string, any> = {
  metro: Train,
  airport: Plane,
  highway: Car,
  hospital: Hospital,
  school: GraduationCap,
  mall: ShoppingBag,
  railway: Train,
  bus_stand: Bus,
  market: ShoppingBag,
  workplace: Building,
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
}

const TYPE_COLORS: Record<string, string> = {
  metro: "from-blue-500/20 to-blue-500/5 text-blue-600",
  airport: "from-purple-500/20 to-purple-500/5 text-purple-600",
  highway: "from-orange-500/20 to-orange-500/5 text-orange-600",
  hospital: "from-red-500/20 to-red-500/5 text-red-600",
  school: "from-green-500/20 to-green-500/5 text-green-600",
  mall: "from-pink-500/20 to-pink-500/5 text-pink-600",
  railway: "from-amber-500/20 to-amber-500/5 text-amber-600",
  bus_stand: "from-teal-500/20 to-teal-500/5 text-teal-600",
  market: "from-indigo-500/20 to-indigo-500/5 text-indigo-600",
  workplace: "from-cyan-500/20 to-cyan-500/5 text-cyan-600",
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
              const Icon = TYPE_ICONS[item.type] || MapPin
              // Use type_label if available (for custom types), otherwise use TYPE_LABELS lookup or format the type
              const label = item.type_label || TYPE_LABELS[item.type] || item.type?.replace(/_/g, " ")?.replace(/\b\w/g, l => l.toUpperCase()) || "Location"
              const colorClass = TYPE_COLORS[item.type] || "from-primary/20 to-primary/5 text-primary"

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
