const HtmlPlugin = require('html-webpack-plugin');
module.exports = {
  entry: 'src/index.js',
  output: {
    path: 'dist',
    filename: 'app.js',
  },
  plugins: [
    HtmlPlugin(),
  ],
};

