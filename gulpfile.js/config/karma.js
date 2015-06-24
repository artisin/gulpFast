var config        = require('./'),
    webpackConfig = require('./webpack')('test');

//You should prbly config this yourself since it will be dependent on
//your style and method
module.exports = {
  frameworks: ['mocha', 'sinon-chai'],
  files: [
    config.sourceAssets + '/js/__tests__/**/*.js',
  ],
  exclude:[
    config.sourceAssets + '/js/__tests__/**/*.txt',
  ],
  watch: [
    //Watch for txt desc to run test
    config.sourceAssets + '/js/__tests__/**/*.txt',
    config.sourceAssets + '/js/__tests__/**/*.js',
  ],
  preprocessors: {
    'app/assets/js/__tests__/*': ['webpack', 'sourcemap'],
  },
  webpack: webpackConfig,
  //Bumped up to comp for buttron complie time
  browserNoActivityTimeout: 100000,
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
          },
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