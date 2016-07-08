var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './app/index'
  ],
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dev'),
    filename: 'helm.bundle.js',
    publicPath: '/dev/'
  },
  plugins: [
  ],
  resolve: { fallback: path.join(__dirname, 'node_modules') },
  resolveLoader: { fallback: path.join(__dirname, 'node_modules') },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
    ]
  }
};
