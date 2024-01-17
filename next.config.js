/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['drive.google.com', 'mega.nz', 'drive.usercontent.google.com'],
  },
};

module.exports = nextConfig;
