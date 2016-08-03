const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'dist',
    filename: 'app.js',
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
    }),
  ],
};

