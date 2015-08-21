var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    config      = require('../config/svg-sprite'),
    imagemin    = require('gulp-imagemin'),
    svgstore    = require('gulp-svgstore');

gulp.task('svg-sprite', function() {
  return gulp.src(config.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});