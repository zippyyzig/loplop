import { getDatabase } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

// Disable caching for this route
export const dynamic = "force-dynamic"
export const revalidate = 0

// Common location aliases and variations
const LOCATION_ALIASES: Record<string, string[]> = {
  "gurgaon": ["gurugram", "ggn", "gurgoan"],
  "gurugram": ["gurgaon", "ggn", "gurgoan"],
  "delhi": ["new delhi", "delhi ncr", "ncr"],
  "noida": ["greater noida", "noida extension"],
  "dwarka expressway": ["dwarka exp", "dwarka expway", "dwe"],
  "golf course road": ["gcr", "golf course", "golf course rd"],
  "golf course extension road": ["gcer", "golf course ext", "golf course extension"],
  "sohna road": ["sohna rd", "sohna"],
  "southern peripheral road": ["spr", "southern peripheral", "sp road"],
  "nh-48": ["nh 48", "national highway 48", "delhi jaipur highway"],
  "mg road": ["mahatma gandhi road", "m g road"],
}

// Property type keywords
const PROPERTY_TYPE_KEYWORDS: Record<string, string[]> = {
  "apartment": ["flat", "flats", "apartments", "apt", "apts"],
  "villa": ["villas", "bungalow", "bungalows", "independent house", "kothi"],
  "plot": ["plots", "land", "lands", "plotting"],
  "penthouse": ["penthouses", "duplex penthouse"],
  "commercial": ["commercial property", "shop", "shops", "retail", "showroom"],
  "office": ["office space", "offices", "workspace", "coworking"],
  "sco": ["sco plots", "shop cum office"],
  "independent floor": ["floors", "builder floor", "builder floors", "independent floors"],
  "duplex": ["duplexes", "duplex apartment"],
  "studio": ["studio apartment", "studio flat"],
}

// Project status keywords
const STATUS_KEYWORDS: Record<string, string[]> = {
  "ready_to_move": ["ready to move", "rtm", "ready", "possession", "immediate", "move in ready", "completed"],
  "under_construction": ["under construction", "uc", "ongoing", "constructing", "being built"],
  "launched": ["new launch", "newly launched", "just launched", "fresh launch", "new project"],
  "upcoming": ["upcoming", "pre launch", "pre-launch", "coming soon"],
}

// BHK patterns
const BHK_PATTERNS = [
  /(\d+)\s*bhk/i,
  /(\d+)\s*bedroom/i,
  /(\d+)\s*bed/i,
  /(\d+)\s*br/i,
]

// Budget patterns (in lakhs/crores)
const BUDGET_PATTERNS = [
  /(\d+(?:\.\d+)?)\s*(?:cr|crore|crores)/i,
  /(\d+(?:\.\d+)?)\s*(?:l|lac|lakh|lakhs)/i,
  /under\s*(\d+(?:\.\d+)?)\s*(?:cr|crore|crores)/i,
  /below\s*(\d+(?:\.\d+)?)\s*(?:cr|crore|crores)/i,
  /budget\s*(?:of|around|is)?\s*(\d+(?:\.\d+)?)\s*(?:cr|crore|l|lac|lakh)/i,
]

// Segment keywords
const SEGMENT_KEYWORDS: Record<string, string[]> = {
  "luxury": ["luxury", "ultra luxury", "premium luxury", "high end", "luxurious"],
  "premium": ["premium", "high premium"],
  "mid": ["mid range", "mid segment", "medium", "mid budget"],
  "affordable": ["affordable", "budget", "low budget", "cheap", "economical"],
}

// Near me / proximity keywords
const NEAR_ME_PATTERNS = [
  /near\s*(?:me|by|here)/i,
  /nearby/i,
  /close\s*(?:to\s*me|by)/i,
  /around\s*(?:me|here)/i,
  /in\s*my\s*(?:area|location|vicinity)/i,
  /closest/i,
  /nearest/i,
  /within\s*(\d+)\s*(?:km|kilometer|kilometers|kms)/i,
]

// Distance range keywords
const DISTANCE_PATTERNS = [
  /within\s*(\d+)\s*(?:km|kilometer|kilometers|kms)/i,
  /(\d+)\s*(?:km|kilometer|kilometers|kms)\s*(?:radius|range|away)/i,
  /less\s*than\s*(\d+)\s*(?:km|kms)/i,
  /under\s*(\d+)\s*(?:km|kms)/i,
]

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function tokenize(text: string): string[] {
  return normalizeText(text).split(" ").filter(Boolean)
}

// Fuzzy matching for partial/incomplete words
function fuzzyMatch(query: string, target: string, threshold = 0.6): boolean {
  const q = query.toLowerCase()
  const t = target.toLowerCase()
  
  // Exact match
  if (t.includes(q) || q.includes(t)) return true
  
  // Check if query is a prefix of target
  if (t.startsWith(q) || q.startsWith(t)) return true
  
  // Calculate Levenshtein distance for fuzzy matching
  const distance = levenshteinDistance(q, t)
  const maxLen = Math.max(q.length, t.length)
  const similarity = 1 - distance / maxLen
  
  return similarity >= threshold
}

function levenshteinDistance(a: string, b: string): number {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null))
  
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j
  
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      )
    }
  }
  
  return matrix[b.length][a.length]
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

interface ParsedQuery {
  locations: string[]
  propertyTypes: string[]
  bhk: number | null
  minBudget: number | null
  maxBudget: number | null
  status: string[]
  segments: string[]
  developers: string[]
  keywords: string[]
  originalQuery: string
  isNearMeSearch: boolean
  maxDistanceKm: number | null
}

interface UserLocation {
  latitude: number
  longitude: number
  source?: "browser" | "ip" | "default"
  city?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function parseVoiceQuery(query: string, db: any): Promise<ParsedQuery> {
  const normalized = normalizeText(query)
  const tokens = tokenize(query)
  
  const result: ParsedQuery = {
    locations: [],
    propertyTypes: [],
    bhk: null,
    minBudget: null,
    maxBudget: null,
    status: [],
    segments: [],
    developers: [],
    keywords: [],
    originalQuery: query,
    isNearMeSearch: false,
    maxDistanceKm: null,
  }
  
  // Check for "near me" type queries
  for (const pattern of NEAR_ME_PATTERNS) {
    if (pattern.test(normalized)) {
      result.isNearMeSearch = true
      break
    }
  }
  
  // Check for specific distance radius
  for (const pattern of DISTANCE_PATTERNS) {
    const match = normalized.match(pattern)
    if (match) {
      result.maxDistanceKm = parseInt(match[1])
      result.isNearMeSearch = true
      break
    }
  }
  
  // Default radius if "near me" but no specific distance mentioned
  if (result.isNearMeSearch && !result.maxDistanceKm) {
    result.maxDistanceKm = 25 // Default 25km radius
  }
  
  // Extract BHK
  for (const pattern of BHK_PATTERNS) {
    const match = normalized.match(pattern)
    if (match) {
      result.bhk = parseInt(match[1])
      break
    }
  }
  
  // Extract budget
  for (const pattern of BUDGET_PATTERNS) {
    const match = normalized.match(pattern)
    if (match) {
      const value = parseFloat(match[1])
      const isLakh = /l|lac|lakh/i.test(match[0])
      const amount = isLakh ? value * 100000 : value * 10000000 // Convert to rupees
      
      if (/under|below|budget/i.test(match[0])) {
        result.maxBudget = amount
      } else {
        result.minBudget = amount * 0.8 // 20% below mentioned price
        result.maxBudget = amount * 1.2 // 20% above mentioned price
      }
      break
    }
  }
  
  // Extract locations (check aliases) - only if not a "near me" search
  if (!result.isNearMeSearch) {
    for (const [location, aliases] of Object.entries(LOCATION_ALIASES)) {
      if (normalized.includes(location) || aliases.some(alias => normalized.includes(alias))) {
        result.locations.push(location)
      }
    }
    
    // Extract sectors
    const sectorMatch = normalized.match(/sector\s*(\d+[a-z]?)/gi)
    if (sectorMatch) {
      result.locations.push(...sectorMatch.map(s => s.replace(/\s+/g, " ")))
    }
  }
  
  // Extract property types
  for (const [type, keywords] of Object.entries(PROPERTY_TYPE_KEYWORDS)) {
    if (normalized.includes(type) || keywords.some(kw => normalized.includes(kw))) {
      result.propertyTypes.push(type)
    }
  }
  
  // Extract status
  for (const [status, keywords] of Object.entries(STATUS_KEYWORDS)) {
    if (keywords.some(kw => normalized.includes(kw))) {
      result.status.push(status)
    }
  }
  
  // Extract segments
  for (const [segment, keywords] of Object.entries(SEGMENT_KEYWORDS)) {
    if (keywords.some(kw => normalized.includes(kw))) {
      result.segments.push(segment)
    }
  }
  
  // Get developers from database for matching
  const developers = await db.collection("developers").find({}).project({ name: 1, slug: 1 }).toArray()
  for (const dev of developers) {
    const devName = dev.name.toLowerCase()
    if (normalized.includes(devName) || tokens.some(t => fuzzyMatch(t, devName))) {
      result.developers.push(dev.name)
    }
  }
  
  // Also check for developer names in properties (for developers not in developers collection)
  const developerNames = await db.collection("properties").distinct("developer_name")
  for (const devName of developerNames) {
    if (!devName) continue
    const lowerName = devName.toLowerCase()
    // Check for partial matches (e.g., "m3m" matches "M3M India")
    if (tokens.some(t => lowerName.includes(t) || t.includes(lowerName.split(" ")[0]))) {
      if (!result.developers.includes(devName)) {
        result.developers.push(devName)
      }
    }
  }
  
  // Remaining tokens become keywords for text search
  const usedTerms = new Set([
    ...result.locations,
    ...result.propertyTypes,
    ...result.status,
    ...result.segments,
    ...result.developers.map(d => d.toLowerCase()),
    "bhk", "bedroom", "bed", "br",
    "cr", "crore", "crores", "l", "lac", "lakh", "lakhs",
    "under", "below", "budget", "around",
    "sector",
    "near", "me", "nearby", "close", "closest", "nearest", "here", "my", "area", "location", "vicinity",
    "within", "km", "kms", "kilometer", "kilometers", "radius", "range", "away",
  ])
  
  result.keywords = tokens.filter(t => 
    t.length > 2 && 
    !usedTerms.has(t) && 
    !/^\d+$/.test(t)
  )
  
  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildMongoQuery(parsed: ParsedQuery): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const andConditions: any[] = []
  
  // Status filter - active or available
  andConditions.push({
    $or: [{ status: "active" }, { status: "available" }, { status: { $exists: false } }]
  })
  
  // Location filter (only if not a near-me search, as we'll handle that differently)
  if (parsed.locations.length > 0 && !parsed.isNearMeSearch) {
    const locationConditions = parsed.locations.map(loc => ({
      $or: [
        { address: { $regex: loc, $options: "i" } },
        { neighborhood: { $regex: loc, $options: "i" } },
        { city: { $regex: loc, $options: "i" } },
        { state: { $regex: loc, $options: "i" } },
        { property_name: { $regex: loc, $options: "i" } },
      ]
    }))
    andConditions.push({ $or: locationConditions.flatMap(c => c.$or) })
  }
  
  // Property type filter
  if (parsed.propertyTypes.length > 0) {
    const typeConditions = parsed.propertyTypes.map(type => ({
      $or: [
        { property_type: { $regex: type, $options: "i" } },
        { property_category: { $regex: type, $options: "i" } },
      ]
    }))
    andConditions.push({ $or: typeConditions.flatMap(c => c.$or) })
  }
  
  // BHK filter
  if (parsed.bhk) {
    andConditions.push({
      $or: [
        { bedrooms: parsed.bhk },
        { bhk_configuration: { $regex: `^${parsed.bhk}`, $options: "i" } },
        { configurations: { $elemMatch: { type: { $regex: `^${parsed.bhk}`, $options: "i" } } } },
      ]
    })
  }
  
  // Budget filter
  if (parsed.minBudget) {
    andConditions.push({ lowest_price: { $gte: parsed.minBudget } })
  }
  if (parsed.maxBudget) {
    andConditions.push({
      $or: [
        { lowest_price: { $lte: parsed.maxBudget } },
        { max_price: { $lte: parsed.maxBudget } }
      ]
    })
  }
  
  // Status filter
  if (parsed.status.length > 0) {
    andConditions.push({
      $or: parsed.status.map(s => ({
        $or: [
          { project_status: s },
          { possession_type: s },
        ]
      })).flatMap(c => c.$or)
    })
  }
  
  // Segment filter
  if (parsed.segments.length > 0) {
    andConditions.push({
      $or: parsed.segments.map(s => ({ target_segment: { $regex: s, $options: "i" } }))
    })
  }
  
  // Developer filter
  if (parsed.developers.length > 0) {
    andConditions.push({
      $or: parsed.developers.map(d => ({ developer_name: { $regex: d, $options: "i" } }))
    })
  }
  
  // Keyword search (searches property_name, about_project, project_highlights, address, neighborhood)
  if (parsed.keywords.length > 0) {
    const keywordRegex = parsed.keywords.join("|")
    andConditions.push({
      $or: [
        { property_name: { $regex: keywordRegex, $options: "i" } },
        { about_project: { $regex: keywordRegex, $options: "i" } },
        { address: { $regex: keywordRegex, $options: "i" } },
        { neighborhood: { $regex: keywordRegex, $options: "i" } },
        { city: { $regex: keywordRegex, $options: "i" } },
        { developer_name: { $regex: keywordRegex, $options: "i" } },
        { project_highlights: { $elemMatch: { $regex: keywordRegex, $options: "i" } } },
      ]
    })
  }
  
  return andConditions.length > 0 ? { $and: andConditions } : {}
}

// Filter and sort properties by distance from user location
function filterByDistance(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: any[],
  userLocation: UserLocation,
  maxDistanceKm: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any[] {
  return properties
    .map(property => {
      // Skip if property doesn't have coordinates
      if (!property.latitude || !property.longitude) {
        // Assign a large distance so it appears last if no coords
        return { ...property, distance: 9999 }
      }
      
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        property.latitude,
        property.longitude
      )
      
      return { ...property, distance }
    })
    .filter(property => property.distance <= maxDistanceKm)
    .sort((a, b) => a.distance - b.distance)
}

// Format distance for display
function formatDistance(km: number): string {
  if (km >= 9999) return "Distance unknown"
  if (km < 1) {
    return `${Math.round(km * 1000)} m away`
  }
  if (km < 10) {
    return `${km.toFixed(1)} km away`
  }
  return `${Math.round(km)} km away`
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("q") || searchParams.get("query") || ""
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit
    
    // User location parameters for "near me" searches
    const userLat = searchParams.get("lat")
    const userLng = searchParams.get("lng")
    const locationSource = searchParams.get("loc_source") as "browser" | "ip" | "default" | null
    const userCity = searchParams.get("city")
    
    if (!query.trim()) {
      return NextResponse.json({ 
        error: "Query is required",
        properties: [],
        pagination: { page: 1, limit, total: 0, pages: 0 }
      }, { status: 400 })
    }
    
    const db = await getDatabase()
    
    // Parse the voice query
    const parsed = await parseVoiceQuery(query, db)
    
    // Check if this is a "near me" search and we have user location
    const isLocationSearch = parsed.isNearMeSearch && userLat && userLng
    
    // Build MongoDB query
    const mongoQuery = buildMongoQuery(parsed)
    
    // For "near me" searches, we need to fetch more properties first, then filter by distance
    const fetchLimit = isLocationSearch ? 200 : limit // Fetch more for distance filtering
    const fetchSkip = isLocationSearch ? 0 : skip // Don't skip for distance filtering
    
    // Execute search
    const [properties, total] = await Promise.all([
      db.collection("properties")
        .find(mongoQuery)
        .sort({ is_featured: -1, created_at: -1 })
        .skip(fetchSkip)
        .limit(fetchLimit)
        .toArray(),
      db.collection("properties").countDocuments(mongoQuery)
    ])
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let finalProperties: any[] = properties
    let finalTotal = total
    
    // If this is a location-based search, filter and sort by distance
    if (isLocationSearch && userLat && userLng) {
      const userLocation: UserLocation = {
        latitude: parseFloat(userLat),
        longitude: parseFloat(userLng),
        source: locationSource || "browser",
        city: userCity || undefined,
      }
      
      const maxDistance = parsed.maxDistanceKm || 25
      const filteredByDistance = filterByDistance(properties, userLocation, maxDistance)
      
      finalTotal = filteredByDistance.length
      finalProperties = filteredByDistance.slice(skip, skip + limit)
    }
    
    // Serialize
    const serializedProperties = finalProperties.map(p => ({
      ...p,
      _id: p._id.toString(),
      distanceText: p.distance !== undefined ? formatDistance(p.distance) : undefined,
    }))
    
    return NextResponse.json({
      properties: serializedProperties,
      pagination: {
        page,
        limit,
        total: finalTotal,
        pages: Math.ceil(finalTotal / limit),
      },
      parsed: {
        locations: parsed.locations,
        propertyTypes: parsed.propertyTypes,
        bhk: parsed.bhk,
        budget: parsed.minBudget || parsed.maxBudget ? {
          min: parsed.minBudget,
          max: parsed.maxBudget,
        } : null,
        status: parsed.status,
        segments: parsed.segments,
        developers: parsed.developers,
        keywords: parsed.keywords,
        isNearMeSearch: parsed.isNearMeSearch,
        maxDistanceKm: parsed.maxDistanceKm,
      },
      location: isLocationSearch ? {
        latitude: parseFloat(userLat!),
        longitude: parseFloat(userLng!),
        source: locationSource,
        city: userCity,
      } : null,
      originalQuery: query,
    })
  } catch (error) {
    console.error("[v0] Voice search error:", error)
    return NextResponse.json(
      { error: "Failed to process voice search" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const query = body.query || body.q || ""
    const page = parseInt(body.page || "1")
    const limit = parseInt(body.limit || "12")
    
    // Location data from body
    const userLat = body.latitude || body.lat
    const userLng = body.longitude || body.lng
    const locationSource = body.locationSource || body.loc_source
    const userCity = body.city
    
    // Redirect to GET handler with location params
    const url = new URL(req.url)
    url.searchParams.set("q", query)
    url.searchParams.set("page", page.toString())
    url.searchParams.set("limit", limit.toString())
    
    if (userLat) url.searchParams.set("lat", userLat.toString())
    if (userLng) url.searchParams.set("lng", userLng.toString())
    if (locationSource) url.searchParams.set("loc_source", locationSource)
    if (userCity) url.searchParams.set("city", userCity)
    
    return GET(new NextRequest(url))
  } catch (error) {
    console.error("[v0] Voice search POST error:", error)
    return NextResponse.json(
      { error: "Failed to process voice search" },
      { status: 500 }
    )
  }
}
