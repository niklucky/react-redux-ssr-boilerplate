var { resolve } = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var { devServer } = require('../src/config');

var staticPath = resolve(__dirname, '../static');
var distPath = resolve(__dirname, '../static/dist');

var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));
var extractCSS = new ExtractTextPlugin({ filename: '[name]-[chunkhash].css', allChunks: true });

module.exports = {
  devtool: 'inline-source-map',
  context: resolve(__dirname, '..'),
  entry: [
    'webpack-hot-middleware/client',
    './src/client.js'
  ],
  output: {
    path: distPath,
    publicPath: '/',
    pathinfo: true,
    filename: 'bundle-[hash].js'
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: ['.js', '.scss', '.css']
  },
  module: {
    rules: [
     {
       test: /\.js?$/,
       loader: 'eslint-loader',
       include: [
         resolve(__dirname, "../src"),
       ],
       enforce: 'pre'
     },
     {
        test: /\.js$/,
        loader: 'babel-loader',    
        include: [
          resolve(__dirname, "../src")
        ],
        query: {
            presets: [ 'react-hmre' ]
        }        
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[name][local]_[hash:base64:5]!postcss-loader!sass-loader',
        }),
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
        include: resolve(__dirname, "src"),
        use: [
          {
            loader : 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
    webpackIsomorphicToolsPlugin,
    extractCSS,
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __CLIENT__: true,
      __SERVER__: false,
      __DEVTOOLS__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true
      }
    })
  ],
};
