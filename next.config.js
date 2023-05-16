/** @type {import('next').NextConfig} */
const path = require('path');

const Dotenv = require("dotenv-webpack")

const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  webpack: config => {
    config.plugins.push(
      new Dotenv({
        path: `./.env.${
          process.env.NODE_ENV === "production" ? "production" : "local"
        }`,
      })
    )
    return config
  },
}

module.exports = nextConfig