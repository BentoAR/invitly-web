import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  compress: true,
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
