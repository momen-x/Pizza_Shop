import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // i18n: {
  //   locales: ['en', 'ar',], // The languages you support
  //   defaultLocale: 'en',         // The default language
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.surlatable.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
