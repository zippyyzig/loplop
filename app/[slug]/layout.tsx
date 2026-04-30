import type { Metadata } from "next"

// Location slugs
const LOCATION_SLUGS = ['golf-course-road', 'golf-course-extn-road', 'dwarka-expressway', 'southern-peripheral-road', 'sohna', 'new-gurgaon', 'nh-48', 'manesar']

// Type slug to display name mapping
const TYPE_DISPLAY_NAMES: Record<string, string> = {
  'ready-to-move': 'Ready to Move Properties',
  'new-launch': 'New Launch Properties',
  'upcoming': 'Upcoming Projects',
  'luxury-apartments': 'Luxury Apartments',
  'plots-and-lands': 'Plots and Lands',
  'office-spaces': 'Office Spaces',
  'commercial-properties': 'Commercial Properties',
  'furnished-flats': 'Furnished Flats',
}

const LOCATION_DISPLAY_NAMES: Record<string, string> = {
  'golf-course-road': 'Golf Course Road',
  'golf-course-extn-road': 'Golf Course Extension Road',
  'dwarka-expressway': 'Dwarka Expressway',
  'southern-peripheral-road': 'Southern Peripheral Road',
  'sohna': 'Sohna',
  'new-gurgaon': 'New Gurgaon',
  'nh-48': 'NH-48',
  'manesar': 'Manesar',
}

const TYPE_DESCRIPTIONS: Record<string, string> = {
  'ready-to-move': 'Browse ready to move properties in Gurgaon. Move into your dream home immediately with CountryRoof.',
  'new-launch': 'Discover newly launched properties from top developers in Gurgaon. Be among the first to own.',
  'upcoming': 'Explore upcoming projects launching soon. Book early at pre-launch prices.',
  'luxury-apartments': 'Premium luxury apartments with world-class amenities in Gurgaon.',
  'plots-and-lands': 'Prime plots and land parcels for your dream home or investment in Gurgaon.',
  'commercial-properties': 'Premium commercial spaces for offices, shops, and businesses in Gurgaon.',
  'furnished-flats': 'Fully furnished apartments ready to move in with complete furnishing in Gurgaon.',
}

const LOCATION_DESCRIPTIONS: Record<string, string> = {
  'golf-course-road': 'Explore premium properties on Golf Course Road, Gurgaon - the most prestigious address in Delhi NCR.',
  'golf-course-extn-road': 'Find luxury properties on Golf Course Extension Road, Gurgaon - the emerging premium corridor.',
  'dwarka-expressway': 'Discover properties along Dwarka Expressway - excellent connectivity and growth potential.',
  'southern-peripheral-road': 'Browse properties on Southern Peripheral Road - a prime investment destination.',
  'sohna': 'Explore affordable and luxury properties in Sohna - the next big destination.',
  'new-gurgaon': 'Find properties in New Gurgaon sectors - modern living with excellent amenities.',
  'nh-48': 'Discover properties along NH-48 corridor - industrial and commercial hub.',
  'manesar': 'Browse properties in Manesar - industrial growth and affordable housing.',
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const isLocation = LOCATION_SLUGS.includes(slug)
  const displayName = isLocation
    ? LOCATION_DISPLAY_NAMES[slug] || slug
    : TYPE_DISPLAY_NAMES[slug] || slug
  const description = isLocation
    ? LOCATION_DESCRIPTIONS[slug] || `Find properties in ${displayName}, Gurgaon`
    : TYPE_DESCRIPTIONS[slug] || `Browse ${displayName} in Gurgaon`

  return {
    title: `${displayName} in Gurgaon | Properties for Sale | CountryRoof`,
    description,
    alternates: {
      canonical: `https://countryroof.in/${slug}`,
    },
    openGraph: {
      title: `${displayName} | CountryRoof`,
      description,
      url: `https://countryroof.in/${slug}`,
    },
  }
}

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
