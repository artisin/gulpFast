var gulp               = require('gulp'),
    iconfont           = require('gulp-iconfont'),
    config             = require('../../config/iconFont'),
    generateIconStylus = require('./generateIconStylus'),
    handleErrors       = require('../../lib/handleErrors');

gulp.task('iconFont', function() {
  return gulp.src(config.src)
    .pipe(iconfont(config.options))
    .on('glyphs', generateIconStylus)
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});
