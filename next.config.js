/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["drive.google.com", "mega.nz"],
  },
  async rewrites() {
    return [
      {
        source: "/(.*)",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
