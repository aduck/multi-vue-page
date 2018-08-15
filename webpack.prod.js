const merge = require('webpack-merge')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const base = require('./webpack.base')
const prod = {
  plugins: [
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        mangle: false,
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),
  ]
}
module.exports = merge(base, prod)