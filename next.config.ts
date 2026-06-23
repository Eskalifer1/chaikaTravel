import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// next/font inlines @font-face via <style> tags — 'unsafe-inline' is required for style-src.
// script-src 'unsafe-inline' is required by Next.js App Router for hydration inline scripts.
// 'unsafe-eval' is required by React in development mode for callstack reconstruction — never used in production.
// For a stricter setup without 'unsafe-inline', use nonce-based CSP (see Next.js CSP docs).
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://images.unsplash.com;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
`
  .replace(/\n/g, " ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  // X-Frame-Options is kept for older browsers that do not support frame-ancestors in CSP
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    deviceSizes: [640, 1080, 1920],
    imageSizes: [320, 640],
    // Unsplash may return short Cache-Control TTLs — enforce a minimum of 24 hours
    // so optimized images are served from Next.js cache instead of re-fetched upstream
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
