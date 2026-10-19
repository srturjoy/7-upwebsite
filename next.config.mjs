/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  allowedDevOrigins: [
    'localhost:3000',
    'localhost:8080',
    'ais-dev-y3q3kpfcgwldmd2iblv3c4-27259659557.asia-southeast1.run.app',
    '*.run.app',
    '*.google.com',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tabs',
    ],
  },
}

export default nextConfig

