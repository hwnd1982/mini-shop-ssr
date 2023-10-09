/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["ru"],
    defaultLocale: 'ru',
  },
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
