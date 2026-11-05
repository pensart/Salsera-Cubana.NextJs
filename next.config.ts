import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Keeps the public URLs of the Astro site, such as /danslessen/.
  trailingSlash: true,
  images: {
    // The same formats the Astro <Picture> components generated.
    formats: ["image/avif", "image/webp"],
    // Event covers are stored in Sanity.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
