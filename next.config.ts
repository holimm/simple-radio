import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/MySimpleRadio",
        destination: "/",
        permanent: true,
      },
      {
        source: "/MySimpleRadio/MusicStreamer",
        destination: "/MusicStreamer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
