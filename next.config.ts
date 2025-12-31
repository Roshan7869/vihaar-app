import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // ========== IMAGE OPTIMIZATION ==========
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fonts.gstatic.com",
        pathname: "/**",
      },
    ],
    // Modern format support - AVIF first (best compression), WebP fallback
    formats: ["image/avif", "image/webp"],

    // Device sizes for responsive srcset generation
    deviceSizes: [640, 750, 828, 1080, 1280, 1440, 1920, 2048],

    // Image sizes for srcset generation
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache optimized images for 1 year
    minimumCacheTTL: 60 * 60 * 24 * 365,

    // Don't optimize in dev for faster refreshes
    unoptimized: process.env.NODE_ENV === "development",
  },

  // ========== CACHING HEADERS ==========
  headers: async () => [
    // Static assets - cache forever (immutable)
    {
      source: "/_next/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    // Optimized images - cache forever
    {
      source: "/_next/image/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    // Public static files
    {
      source: "/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    // Service Worker - no cache, always fresh
    {
      source: "/sw.js",
      headers: [
        {
          key: "Cache-Control",
          value: "no-cache, no-store, must-revalidate",
        },
        {
          key: "Content-Type",
          value: "application/javascript; charset=utf-8",
        },
      ],
    },
    // API routes - short cache with revalidation
    {
      source: "/api/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400",
        },
      ],
    },
    // HTML pages - no cache, CDN cache with revalidation
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
      ],
    },
  ],

  // ========== COMPRESSION & SECURITY ==========
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // ========== EXPERIMENTAL FEATURES ==========
  experimental: {
    // CSS optimization
    optimizeCss: true,
  },

  // ========== BUILD OPTIMIZATION ==========
  onDemandEntries: {
    // Keep pages in memory for 25 seconds
    maxInactiveAge: 25 * 1000,
    // Buffer 5 pages
    pagesBufferLength: 5,
  },
};

export default withBundleAnalyzer(nextConfig);
