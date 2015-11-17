var config          = require('../config'),
    path            = require('path'),
    webpack         = require('webpack'),
    webpackManifest = require('./webpackManifest'),
    _               = require('lodash');

module.exports = function(env) {
  // debugger
  var jsSrc = path.resolve(config.root.src, config.tasks.js.src);
  var jsDest = path.resolve(config.root.dest, config.tasks.js.dest);
  var publicPath = path.join(config.tasks.js.dest, '/');
  var filenamePattern = env === 'production' ? '[name]-[hash].js' : '[name].js';
  var chunkFilePattern = env === 'production' ? '[name]-[hash].js' : '[name].js';

  var extensions = config.tasks.js.extensions.map(function(extension) {
    return '.' + extension;
  });

  //externals
  var externals = {};
  //merge from config
  externals = _.merge(config.tasks.js.externals || {}, externals);

  var alias = {};
  //merge form config
  alias = _.merge(config.tasks.js.alias || {}, alias);

  //auto load modules
  var providePlugin = {};
  providePlugin = _.merge(config.tasks.js.providePlugin || {}, providePlugin);

  //loaders
  var loaders = [{
    test: /\.js$/,
    loader: 'babel',
    exclude: /(node_modules|bower_components)/,
    query: {
      // https://github.com/babel/babel-loader#options
      // cacheDirectory: true
      presets: ['es2015']
    }
  }, {
    test: /\.(html|nunjs|nunjucks)?$/,
    loader: 'nunjucks-loader',
    exclude: /node_modules/,
    query: {
      root: path.resolve(config.root.src, config.tasks.html.src)
    }
  }, {
    test: '\.jpg$',
    loader: 'file-loader'
  }, {
    test: '\.png$',
    loader: 'url-loader?mimetype=image/png'
  }];

  //add loaders from config
  loaders = _.union(config.tasks.js.loaders || [], loaders);

  var webpackConfig = {
    target: 'web',
    plugins: [],
    // Reduce compilation time by telling webpack to not parse these libraries.
    // Only add libraries that have no dependencies eg. no require, define or similar calls.
    noParse: [/nunjucks\-slim/],
    resolve: {
      root: jsSrc,
      modulesDirectories: ['src', 'node_modules', 'bower_components'],
      extensions: [''].concat(extensions),
      alias: alias
    },
    resolveLoader: {
      root: path.join(process.env.PWD, 'node_modules')
    },
    module: {
      loaders: loaders
    },
    externals: externals
  };

  if (env !== 'test') {
    // Karma doesn't need entry points or output settings
    // reduce and join path for abs path
    webpackConfig.entry = _.reduce(config.tasks.js.entries, function (prv, val, key) {
      if (_.isString(val)) {
        prv[key] = path.resolve(config.root.src, config.tasks.js.src, val);
      }else {
        prv[key] = val;
      }
      return prv;
    }, {});

    webpackConfig.output = {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath: publicPath,
      chunkFilename: chunkFilePattern
    };

    //push regardless
    webpackConfig.plugins.push(new webpack.ProvidePlugin(providePlugin));

    if (config.tasks.js.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
          chunkFilename: chunkFilePattern,
          async: true
        })
      );
    }

    if (config.tasks.js.explicitVendorChunk) {
      // Create an explicit vendor commons chunk
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      });
    }
  }

  if (env === 'development') {
    webpackConfig.devtool = '#source-map';
    webpack.debug = true;
  }


  if (env === 'production') {
    webpackConfig.plugins.push(
      new webpackManifest(config.root.destAssets, config.root.destAssets),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      // new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.ProvidePlugin(providePlugin)
    );
  }

  return webpackConfig;
};
