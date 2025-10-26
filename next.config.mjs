const nextConfig = {
  poweredByHeader: false,
  basePath: "/fr",
  assetPrefix: "/fr",
  trailingSlash: false,

  // Image optimization configuration
  images: {
    dangerouslyAllowSVG: true,

    localPatterns: [
      {
        pathname: "/**",
        search: "",
      },
    ],
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  compress: true,

  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Content-Disposition",
            value: 'inline; filename="restricted"',
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Content-Disposition",
            value: "inline",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "x-powered-by",
            value: "",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
