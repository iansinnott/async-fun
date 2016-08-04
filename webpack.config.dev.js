const path = require('path');
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
        loaders: ['style', 'css'],
      },
      {
        test: /\.styl$/,
        loaders: [
          'style',
          'css',
          'postcss',
          'stylus',
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
    }),
  ],
  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  },
};

