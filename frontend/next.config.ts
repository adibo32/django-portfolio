import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  onDemandEntries: {
    maxInactiveAge: 60000,
    pagesBufferLength: 5,
  }
};

export default nextConfig;
