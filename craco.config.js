// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Adding polyfills for Node.js core modules
      webpackConfig.resolve.fallback = {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        zlib: require.resolve("browserify-zlib"),
        url: require.resolve("url/"),
      };

      return webpackConfig;
    },
  },
};
