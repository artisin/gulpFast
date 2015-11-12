var config          = require('../config'),
    path            = require('path'),
    webpack         = require('webpack'),
    webpackManifest = require('./webpackManifest'),
    fs              = require('fs'),
    _               = require('lodash');

module.exports = function(env) {
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

  //loaders
  var loaders = [{
    test: /\.js$/,
    loader: 'babel',
    exclude: /(node_modules|bower_components)/,
    query: {
      // https://github.com/babel/babel-loader#options
      cacheDirectory: true,
      presets: ['es2015']
    }
  }, {
    test: /\.(nunj|nunjucks)$/,
    loader: 'nunjucks-loader'
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
    context: jsSrc,
    plugins: [],
    //to suppress superfluous whitespace characters and line terminators on input sizes >100KB
    compact: false,
    resolve: {
      root: jsSrc,
      modulesDirectories: ['node_modules', 'bower_components'],
      extensions: [''].concat(extensions),
      alias: alias
    },
    module: {
      noParse: [],
      loaders: loaders
    },
    externals: externals
  };

  if (env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.tasks.js.entries;

    webpackConfig.output = {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath: publicPath,
      chunkFilename: chunkFilePattern
    };

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
  }

  if (env === 'development') {
    webpackConfig.devtool = '#source-map';
    webpack.debug = true;
  }

  var providePlugin = {};
  providePlugin = _.merge(config.tasks.js.providePlugin || {}, providePlugin);

  if (env === 'production') {
    webpackConfig.plugins.push(
      new webpackManifest(publicPath, config.root.destAssets),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.ProvidePlugin(providePlugin)
    );
  }

  return webpackConfig;
};
