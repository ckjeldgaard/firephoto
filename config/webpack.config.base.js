const helpers = require('./helpers'),
  NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
  entry: {
    'main': helpers.root('/src/main.tsx')
  },
  output: {
    path: helpers.root('/dist'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.html']
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: ['./src/index.html']
      }
    ],
  },
  plugins: [
    new NamedModulesPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: './assets'
    }, ]),
  ]
};

module.exports = config;
