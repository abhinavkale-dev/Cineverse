import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  },
  env: {
    TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN,
  },
};

export default nextConfig;
