const webpack = require('webpack');

/**
 * @author
 * Nathan Romriell - 10/15/2019
 *
 * @info
 * Webpack Configuration File
 *
 */
const config = {
  entry: ['babel-polyfill', __dirname + '/App.jsx'],
    output: {
      path: __dirname + '/build',
        filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css']
    },
    module: {
      rules: [
          {
              test: /\.jsx?/,
              exclude: /node_modules/,
              use: ['babel-loader']
          },
          {
              test: /\.css$/i,
              use: ['style-loader','css-loader']
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: ['file-loader']
          }
      ]
    }
};

module.exports = config;