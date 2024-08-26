/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
      },
      {
        hostname: process.env.NEXT_PUBLIC_SUPABASE_HOST_NAME,
      },
    ],
  },
};

export default nextConfig;
