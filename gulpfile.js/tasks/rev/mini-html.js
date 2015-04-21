var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var config  = require('../../config');

gulp.task('mini-html', function() {
  return gulp.src(config.publicDirectory+'/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(config.publicDirectory));
});