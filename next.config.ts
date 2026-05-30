import type { NextConfig } from "next";

const basePath =
  process.env.GITHUB_PAGES === "true" ? "/Portafolio_2026" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  devIndicators: false,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
