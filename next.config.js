/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/landingpage',
        permanent: false,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.lottie$/,
      type: 'asset/resource',
    });
    return config;
  },
}

module.exports = nextConfig
