/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Increase body size limit for file uploads
    isrMemoryCacheSize: 0, // Disable ISR memory cache to save memory
  },
  // This doesn't work in Vercel, but needed for local development
  serverRuntimeConfig: {
    bodyParser: {
      sizeLimit: '500mb',
    },
  },
}

module.exports = nextConfig
