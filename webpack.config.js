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
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      }
    ]
  }
};
