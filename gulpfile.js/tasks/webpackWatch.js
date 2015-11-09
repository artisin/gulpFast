var webpackConfig = require('../lib/webpack-multi-config'),
    gulp          = require('gulp'),
    logger        = require('../lib/compileLogger'),
    webpack       = require('webpack'),
    browserSync   = require('browser-sync');

gulp.task('webpack:watch', function(callback) {
  var initialCompile = false;
  webpack(webpackConfig('development')).watch(200, function(err, stats) {
    logger(err, stats);
    browserSync.reload();
    // On the initial compile, let gulp know the task is done
    if (!initialCompile) {
      initialCompile = true;
      callback();
    }
  });
});
