var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, './app.jsx')
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.jsx?$/
      }
    ]
  },
  devtool: 'inline-source-map'
};