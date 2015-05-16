var browserSync = require('browser-sync'),
    changed     = require('gulp-changed'),
    config      = require('../config/fonts'),
    gulp        = require('gulp');

gulp.task('fonts', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
