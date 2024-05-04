/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
      },
      {
        hostname: "cbboxofzpwjfpihaoyhn.supabase.co",
      },
    ],
  },
};

export default nextConfig;
