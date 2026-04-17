import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  images: {
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
