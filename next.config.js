/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
        { key: "Access-Control-Allow-Origin", value: "http://localhost:5173" },
        ]
      }
    ]
  },
}

module.exports = nextConfig
