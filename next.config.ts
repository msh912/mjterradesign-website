import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Required — three/r3f ship untranspiled ESM and the build breaks without this.
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    '@react-three/rapier',
  ],
  devIndicators: false,
  images: { formats: ['image/avif', 'image/webp'], unoptimized: true },
  // Memory cache avoids ENOSPC from the filesystem webpack cache.
  webpack: (config) => {
    config.cache = { type: 'memory' }
    return config
  },
}

export default nextConfig
