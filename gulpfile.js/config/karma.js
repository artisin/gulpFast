var config        = require('./'),
    webpackConfig = require('./webpack')('test'),
    path          = require('path');

module.exports = {
  frameworks: ['mocha', 'sinon-chai'],
  files: [
    path.resolve(config.sourceAssets + '/js/__tests__/*')
  ],
  preprocessors: {
    'app/assets/js/**/__tests__/*': ['webpack']
  },
  webpack: webpackConfig,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')]
}