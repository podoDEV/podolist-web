module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [
        require.resolve("babel-preset-react-app"),
        require.resolve("@emotion/babel-preset-css-prop")
      ]
    }
  });

  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
