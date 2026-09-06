import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "localhost:3000",
    "localhost:3001",
    ".trycloudflare.com",
  ],
};

export default nextConfig;