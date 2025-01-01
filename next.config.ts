import "./env"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "xwytwwlrmpybwtpsqfks.supabase.co" },
    ],
  },
}

export default nextConfig
