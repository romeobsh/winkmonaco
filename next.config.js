/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp", "image/png", "image/jpeg", "image/jpg"],
    domains: ["drive.google.com", "mega.nz"],
  },
};

module.exports = nextConfig;
