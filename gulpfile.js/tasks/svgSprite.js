var config      = require('../config'),
    browserSync = require('browser-sync'),
    gulp        = require('gulp'),
    imagemin    = require('gulp-imagemin'),
    svgstore    = require('gulp-svgstore'),
    path        = require('path');

gulp.task('svgSprite', function() {
  var settings = {
    src: path.join(config.root.src, config.tasks.svgSprite.src, '/*.svg'),
    dest: path.join(config.root.dest, config.tasks.svgSprite.dest)
  };

  return gulp.src(settings.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream());
});

