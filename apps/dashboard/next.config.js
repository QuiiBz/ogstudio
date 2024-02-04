/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  webpack: (config, { webpack }) => {
    // define plugin
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.VITEST_POOL_ID': false,
      })
    )

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/*',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/*',
      },
    ]
  },
  // experimental: {
  //   ppr: true,
  // }
}

module.exports = nextConfig
