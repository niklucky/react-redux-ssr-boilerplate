var { resolve } = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var { devServer } = require('../src/config');

var staticPath = resolve(__dirname, '../public');
var distPath = resolve(__dirname, '../public/dist');

var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));
var extractCSS = new ExtractTextPlugin({ filename: '[name]-[chunkhash].css', allChunks: true });

module.exports = {
  devtool: false,
  context: resolve(__dirname, '..'),
  entry: [
    './src/client.js'
  ],
  output: {
    path: distPath,
    publicPath: '/dist/',
    pathinfo: true,
    filename: 'bundle-[hash].js',
    sourceMapFilename: '[name].map'
  },
  resolve: {
    modules: [
      "node_modules",
      resolve(__dirname, "src")
    ],
    extensions: ['.js', '.scss', '.css', '.eot']
  },
  module: {
    rules: [
     {
       test: /\.js?$/,
       use: [
         { loader: 'eslint-loader' }
       ],
       include: [
         resolve(__dirname, "../src"),
       ],
       enforce: 'pre'
     },
     {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        include: [
          resolve(__dirname, "../src")
        ],
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
        use: [
          {
            loader : 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=image/svg+xml" },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        use: 'url-loader?limit=10240'
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false, options: { postcss: [ autoprefixer ] } }),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            screw_ie8: true
        },
        comments: false
    }),
    webpackIsomorphicToolsPlugin,
    extractCSS,
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __CLIENT__: true,
      __SERVER__: false,
      __DEVTOOLS__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        WEBPACK: true
      }
    })
  ],
};
