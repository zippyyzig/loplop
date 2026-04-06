import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Known property type slugs - these are valid type segments
const VALID_TYPE_SLUGS = ['residential', 'commercial', 'plots']

// Known category/filter paths that should NOT be redirected
const VALID_PATHS = [
  'category',
  'location', 
  'types',
  'residential',
  'commercial',
  'plots'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Only handle /properties/* routes
  if (!pathname.startsWith('/properties/')) {
    return NextResponse.next()
  }

  // Extract the path after /properties/
  const pathAfterProperties = pathname.replace('/properties/', '')
  const segments = pathAfterProperties.split('/')
  
  // Skip if empty or has more than 2 segments (already correct format or other route)
  if (segments.length === 0 || segments.length > 2) {
    return NextResponse.next()
  }

  const firstSegment = segments[0]
  
  // If first segment is a valid path (category, location, types, or property type), let it through
  if (VALID_PATHS.includes(firstSegment)) {
    return NextResponse.next()
  }

  // If we have exactly one segment and it's not a valid path, 
  // it's likely an old URL format like /properties/elan-presidential
  // We need to redirect to /properties/residential/{slug} (default to residential)
  if (segments.length === 1 && firstSegment) {
    // This is an old URL format - redirect to new format with default type
    const url = request.nextUrl.clone()
    url.pathname = `/properties/residential/${firstSegment}`
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/properties/:path*',
}
