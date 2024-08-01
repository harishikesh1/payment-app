const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /node_modules\/@mapbox\/node-pre-gyp\/lib\/util\/nw-pre-gyp\/index\.html$/,
      use: 'ignore-loader',
    });
    return config;
  },
  transpilePackages: ["@repo/ui", "@repo/db"],
};

module.exports = nextConfig;
