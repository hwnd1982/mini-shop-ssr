/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lava-overjoyed-tern.glitch.me',
        port: '',
        pathname: '/img/**',
      },
    ],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig;
