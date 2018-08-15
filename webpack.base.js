const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const entrys = fs.readdirSync(path.resolve(__dirname, './src/pages'))
if (!entrys.length) {
  throw new Error('入口文件不存在')
}
const entrySchemas = {}
entrys.forEach(item => {
  let name = item.replace(/\.js/, '')
  entrySchemas[name] = path.join(__dirname, `./src/pages/${item}`)
})
module.exports = {
  entry: entrySchemas,
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    ...entrys.map(v => {
      let name = v.replace(/\.js/, '')
      return new HtmlWebpackPlugin({
        template: path.join(__dirname, './index.html'),
        filename: `${name}.html`,
        title: name,
        chunks: [name, 'vendor', 'common']
      })
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.json', '.css', '.vue']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 合并多次引入的模块
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 2,
          name: 'common'
        },
        // 提取第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
}