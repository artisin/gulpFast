var browserSync = require('browser-sync'),
    gulp        = require('gulp'),
    config      = require('../config/browser-sync');

gulp.task('browser-sync', function() {
  return browserSync(config);
});
