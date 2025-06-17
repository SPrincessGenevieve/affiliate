import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // anything hitting /api/* will be proxied
        destination: "https://va-affiliate.gonearby.app/api/:path*", // your Django backend URL
      },
    ];
  },
};

export default nextConfig;
