/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'seasoned-unequaled-attack.glitch.me',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
}

module.exports = nextConfig;
