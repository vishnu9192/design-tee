import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/shop',
        destination: '/dashboard/shop',
      },
      {
        source: '/shop/shirts',
        destination: '/dashboard/shop/shirts',
      },
      {
        source: '/shop/tshirts',
        destination: '/dashboard/shop/tshirts',
      },
      {
        source: '/cart',
        destination: '/dashboard/cart',
      },
      {
        source: '/design',
        destination: '/dashboard/design',
      },
    ]
  },
};

export default nextConfig;
