/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "*.imagekit.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "countryroof.in" },
      { protocol: "https", hostname: "www.countryroof.in" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 75, 80, 85],
  },
  experimental: {
    optimizePackageImports: ["@radix-ui", "lucide-react"],
    ppr: false,
  },
  transpilePackages: [],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  swcMinify: true,
  reactStrictMode: true,
  
  // Disable caching for API routes to ensure fresh data
  async headers() {
    return [
      {
        // Apply to all API routes
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      {
        // Apply to admin pages
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // 1. Existing www redirects
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.countryroof.in" }],
        destination: "https://countryroof.in/:path*",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "host", value: "roof.countryroof.in" }],
        destination: "https://countryroof.in/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "roof.countryroof.in" }],
        destination: "https://countryroof.in/:path+",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
