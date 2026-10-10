/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
}

export default nextConfig

