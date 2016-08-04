const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'dist',
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      {
        test: /\.styl/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus'),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new HtmlPlugin({
      template: './src/index.html',
    }),
  ],
  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  },
};

