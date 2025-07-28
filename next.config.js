/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
      },
    ];
  },
};

module.exports = nextConfig;