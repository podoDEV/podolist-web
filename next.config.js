module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    console.log(webpack.outputPath);
    config.module.rules.push({
      test: /\.(svg|png|jpe?g|gif)$/i,
      use: [
        {
          loader: "file-loader"
        }
      ]
    });
    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  }
};
