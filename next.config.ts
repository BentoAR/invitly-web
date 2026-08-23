import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  async redirects() {
    return [
      {
        source: "/templates",
        destination: "/es/templates",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/es/pricing",
        permanent: true,
      },
      {
        source: "/empresas",
        destination: "/es/empresas",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/es/contact",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bento.com.ar" }],
        destination: "https://bento.com.ar/:path*",
        permanent: true,
      },
    ]
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https" as const,
        hostname: "invitation-bucket-aws.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https" as const,
        hostname: "d14sb9d2krfjkl.cloudfront.net",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
