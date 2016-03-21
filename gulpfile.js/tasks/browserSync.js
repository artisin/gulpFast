var browserSync = require('browser-sync'),
    config      = require('../config'),
    gulp        = require('gulp');

gulp.task('browserSync', function() {
  browserSync.init(config.tasks.browserSync);
});
