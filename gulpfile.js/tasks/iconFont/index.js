var gulp               = require('gulp'),
    iconfont           = require('gulp-iconfont'),
    config             = require('../../config/iconFont'),
    generateIconStylus = require('./generateIconStylus'),
    handleErrors       = require('../../lib/handleErrors');

gulp.task('iconFont', function() {
  return gulp.src(config.src)
    .pipe(iconfont(config.options))
    .on('error', handleErrors)
    .on('codepoints', generateIconStylus)
    .pipe(gulp.dest(config.dest));
});
