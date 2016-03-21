var config        = require('./gulpfile.js/config'),
    karmaWebpack  = require('karma-webpack'),
    webpackConfig = require('./gulpfile.js/lib/webpack-multi-config'),
    path          = require('path');

var testSrc = path.join(config.root.src, config.tasks.js.src, '/**/__tests__/*');

var karmaConfig = {
  frameworks: ['mocha', 'sinon-chai'],
  files: [testSrc],
  preprocessors: {},
  webpack: webpackConfig('test'),
  browserNoActivityTimeout: 10000,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  colors: true,
  browsers: ['PhantomJS_custom'],
  // you can define custom flags
  customLaunchers: {
    'PhantomJS_custom': {
      base: 'PhantomJS',
      options: {
        windowName: 'my-window',
        settings: {
          webSecurityEnabled: false
        }
      },
      flags: ['--load-images=false'],
      debug: false
    }
  },
  phantomjsLauncher: {
    // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
    exitOnResourceError: true
  }
};

karmaConfig.preprocessors[testSrc] = ['webpack'];

module.exports = function(config) {
  config.set(karmaConfig);
};
