const webpack = require('webpack');

const config = {
  entry: __dirname + '/index.jsx',
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
              use: 'babel-loader'
          }
      ]
    }
};

module.exports = config;