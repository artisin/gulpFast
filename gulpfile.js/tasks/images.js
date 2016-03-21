var config      = require('../config'),
    browserSync = require('browser-sync'),
    changed     = require('gulp-changed'),
    gulp        = require('gulp'),
    imagemin    = require('gulp-imagemin'),
    path        = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**'),
  dest: path.join(config.root.dest, config.tasks.images.dest)
};

gulp.task('images', function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
});
