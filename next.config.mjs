/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
        has: [
          {
            type: 'header',
            key: 'x-redirection',
            value: 'blog',
          },
        ],
      },
    ]
  },
}

export default nextConfig
