const path = require('path');

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
    ],
  },
};

