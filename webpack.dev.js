const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base')
const merge = require('webpack-merge')
const dev = {
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 1234,
    host: 'localhost',
    overlay: true,
    compress: true,
    open: true,
    hot: true,
    inline: true,
    progress: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}
module.exports = merge(base, dev)