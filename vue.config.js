const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: require.resolve("@open-wc/webpack-import-meta-loader"),
        },
          {
              test: /\.wasm$/,
              type: 'javascript/auto',
              loader: 'file-loader'
          },
      ],
    },
      plugins: [
          new CopyWebpackPlugin([
                { from: 'node_modules/medea-jason', to: 'node_modules/medea-jason' }
              ],
          ),
      ],
  },
};


