const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const html = new HtmlWebpackPlugin({template: './src/index.html'})
const offline = new OfflinePlugin

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: './assets/',
  },
  plugins: [html, offline],
}