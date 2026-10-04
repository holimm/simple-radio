import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/SimpleRadio",
        destination: "/",
        permanent: true,
      },
      {
        source: "/SimpleRadio/MusicStreamer",
        destination: "/MusicStreamer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
