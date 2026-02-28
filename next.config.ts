import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  trailingSlash: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "saharanpurprice.in",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },

  staticPageGenerationTimeout: 100,
};

export default nextConfig;
