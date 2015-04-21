var config  = require('../config/webpack')('production'),
    gulp    = require('gulp'),
    logger  = require('../lib/compileLogger'),
    webpack = require('webpack');

gulp.task('webpack:production', function(callback) {
  webpack(config, function(err, stats) {
    logger(err, stats);
    callback();
  });
});
