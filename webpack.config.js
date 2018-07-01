const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/client-test.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};
