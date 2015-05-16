var config = require('./')
var karmaWebpack = require('karma-webpack')
var webpackConfig = require('./webpack')('test')
var path            = require('path')

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