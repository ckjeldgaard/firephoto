const glob = require('glob'),
  path = require('path'),
  CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin'),
  UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  PurifyCSSPlugin = require('purifycss-webpack'),
  FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  webpackConfig = require('./webpack.config.base'),
  helpers = require('./helpers'),
  DefinePlugin = require('webpack/lib/DefinePlugin'),
  SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'),
  env = require('../environment/prod.env');

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

const purifyCss = new PurifyCSSPlugin({
  paths: glob.sync(path.join(__dirname, '../src/**/*.html')),
  purifyOptions: {
    info: true,
    whitelist: []
  }
});

webpackConfig.module.rules = [...webpackConfig.module.rules,
  {
    test: /\.scss$/,
    use: extractSass.extract({
      use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true,
            importLoaders: 2
          }
        },
        {
          loader: 'postcss-loader',
          options: {
              plugins: () => [autoprefixer],
              sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded',
            sourceMap: true,
            sourceMapContents: true
          }
        }
      ],
      // use style-loader in development
      fallback: 'style-loader'
    })
  },
  {
    test: /\.(jpg|png|gif|svg)$/,
    loader: 'file-loader?name=../assets/img/[name].[ext]'
  },
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    loader: 'file-loader?name=fonts/[name].[ext]'
  }
];

// ensure ts lint fails the build
webpackConfig.module.rules[0].options = {
  failOnHint: true
};

webpackConfig.plugins = [...webpackConfig.plugins,
  new CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function(module){
      return module.context && module.context.indexOf('node_modules') !== -1;
    }
  }),
  new CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  extractSass,
  new HtmlWebpackPlugin({
    inject: true,
    template: helpers.root('/src/index.html'),
    favicon: helpers.root('/src/favicon.ico'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  new UglifyJsPlugin({
    include: /\.js$/,
    minimize: true
  }),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    test: /\.js$/
  }),
  new DefinePlugin({
    'process.env': env
  }),
  new SWPrecacheWebpackPlugin({
    cacheId: 'firephoto-app',
    filename: 'service-worker.js',
    maximumFileSizeToCacheInBytes: 3000000,
    staticFileGlobs: ['dist/**/*.{js,html,css}'],
    minify: true,
    stripPrefix: 'dist/'
  }),
  new FaviconsWebpackPlugin(helpers.root('/src/icon.png'))
];

module.exports = webpackConfig;
