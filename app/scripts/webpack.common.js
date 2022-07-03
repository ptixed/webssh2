
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ES3Plugin = require("webpack-es3-plugin");

module.exports = {
  context: path.resolve('__dirname', '../'),
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  entry: {
    webssh2: [
      'core-js/stable/array', 
      'core-js/stable/number', 
      'core-js/stable/map', 
      'core-js/stable/object', 
      'core-js/stable/promise', 
      'core-js/stable/string', 
      './client/src/js/index.ts'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: ['./client/src/client.htm', './client/src/favicon.ico'],
    }),
    new MiniCssExtractPlugin(),
    new ES3Plugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../client/public'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
};
