const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    // below line only works for webpack 1.0
    // path: './dist', 
    filename: 'index_bundle.js'
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/, //Check for all js files
        loader: 'babel-loader',
        query: {
          presets: [ "babel-preset-es2015" ].map(require.resolve)
        },
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('.'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: [autoprefixer]
    //   }
    // }),
    HtmlWebpackPluginConfig
  ]
}
