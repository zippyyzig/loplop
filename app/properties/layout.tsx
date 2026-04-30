import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Properties in Gurugram | Flats, Villas, Plots & Commercial | CountryRoof",
  description:
    "Browse premium properties in Gurugram - apartments, villas, plots, and commercial spaces. Filter by location, budget, and amenities to find your perfect property.",
  alternates: {
    canonical: "https://countryroof.in/properties",
  },
  openGraph: {
    title: "Properties in Gurugram | CountryRoof",
    description: "Find your dream property in Gurugram with CountryRoof. Browse apartments, villas, plots and commercial spaces.",
    url: "https://countryroof.in/properties",
  },
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
