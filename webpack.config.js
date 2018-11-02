const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    core: "./src/core/index.js",
    index: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "stage-1"]
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    port: 9000
  },
  plugins: [new webpack.optimize.OccurrenceOrderPlugin()]
};
