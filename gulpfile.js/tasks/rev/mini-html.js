var gulp    = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    config  = require('../../config');

gulp.task('mini-html', function() {
  return gulp.src(config.publicDirectory+'/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(config.publicDirectory));
});