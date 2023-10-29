/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  rewrites: async () => {
    return [
      {
        source: "/cv",
        destination: "/data/cv_muhammad_aryo_muzakki.pdf",
      }
    ]
  },
}

module.exports = nextConfig
