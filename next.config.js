/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = withPWA({
  swcMinify: true,
  images: {
    allowFutureImage: true,
    domains: ["github.com"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
