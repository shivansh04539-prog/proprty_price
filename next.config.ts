import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash:false,

async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.saharanpurprice.in',
          },
        ],
        destination: 'https://saharanpurprice.in/:path*',
        permanent: true, // This tells Google it's a permanent 301 redirect
      },
    ];
  },




  images: {
    remotePatterns: [
      // ✅ YOUR OWN DOMAIN (MOST IMPORTANT)
      {
        protocol: "https",
        hostname: "saharanpurprice.in",
      },

      // ✅ UNSPLASH (optional)
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
