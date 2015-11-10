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

  var nodeModules = {};
  fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

  //loaders
  var loaders = [{
    test: /\.js$/,
    loader: 'babel',
    query: {
      // https://github.com/babel/babel-loader#options
      cacheDirectory: true,
      presets: ['es2015']
    }
  }, {
    test: /\.(nunj|nunjucks)$/,
    loader: 'nunjucks-loader'
  }];

  //add loaders from config
  loaders = _.union(loaders, config.tasks.js.loaders || []);

  var webpackConfig = {
    context: jsSrc,
    plugins: [],
    //to suppress superfluous whitespace characters and line terminators on input sizes >100KB
    compact: false,
    resolve: {
      root: jsSrc,
      extensions: [''].concat(extensions)
    },
    module: {
      loaders: loaders
    },
    externals: nodeModules
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
    webpackConfig.devtool = 'source-map';
    webpack.debug = true;
  }

  if (env === 'production') {
    webpackConfig.plugins.push(
      new webpackManifest(publicPath, config.root.destAssets),
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