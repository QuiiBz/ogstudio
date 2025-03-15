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
  outputFileTracingIncludes: {
    '/api/og/\\[key\\]': ['node_modules/@resvg/resvg-wasm/index_bg.wasm'],
    '/api/template/\\[slug\\]': ['node_modules/@resvg/resvg-wasm/index_bg.wasm'],
    '/templates/\\[slug\\]': ['node_modules/@resvg/resvg-wasm/index_bg.wasm'],
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
  }
}

module.exports = nextConfig
