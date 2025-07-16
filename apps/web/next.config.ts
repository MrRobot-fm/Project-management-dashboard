/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yfbjmmyragzgsqoiljzz.supabase.co",
      },
      {
        protocol: "https",
        hostname: "smziwvrwugqumvfslugc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
