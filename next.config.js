/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { http: false, https: false, 'https-proxy-agent': false };
    }
    return config;
  },
};

export default nextConfig
