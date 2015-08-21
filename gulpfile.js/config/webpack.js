var path            = require('path'),
    paths           = require('./'),
    webpack         = require('webpack'),
    webpackManifest = require('../lib/webpackManifest');

module.exports = function(env) {
  var jsSrc = path.resolve(paths.sourceAssets + '/js'),
      jsDest = paths.publicAssets + '/js',
      publicPath = 'assets/js/';

  var webpackConfig = {
    context: jsSrc,
    entry: {
      main: [ './main.js' ],
      vendor: ['./vendor.js']
    },

    output: {
      path: jsDest,
      filename: env === 'production' ? '[name]-[hash].js' : '[name].js',
      chunkFilename: env === 'production' ? '[name]-[hash].js' : '[name].js',
      publicPath: publicPath
    },

    plugins: [],

    resolve: {
      extensions: ['', '.js']
    },

    module: {
      loaders: [
        {
          test: /\.js?$/,
          loader: 'babel',
          exclude: /(node_modules|bower_components)/,
          query: {
            loose: 'all'
          }
        },
        {
          test: /\.css$/,
          loader: 'css-loader',
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.txt$/,
          loader: 'raw-loader',
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.styl$/, 
          loader: 'raw-loader',
          exclude: /(node_modules|bower_components)/
        }
      ]
    }
  };

  if(env !== 'test') {
    // Factor out common dependencies into a shared.js
    webpackConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'shared',
        filename: env === 'production' ? '[name]-[hash].js' : '[name].js',
      })
    );
  }

  if(env === 'development') {
    webpackConfig.devtool = 'source-map';
    webpack.debug = true;
  }

  if(env === 'production') {
    webpackConfig.plugins.push(
      new webpackManifest(publicPath, 'dist'),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    );
  }

  return webpackConfig;
};
