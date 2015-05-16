var gulp         = require('gulp'),
    repeatString = require('../../lib/repeatString'),
    sizereport   = require('gulp-sizereport'),
    config       = require('../../config');

gulp.task('size-report',  function() {
  var hashedFiles = '/**/*-' + repeatString('[a-z,0-9]', 8)  + '*.*';

  return gulp.src([config.publicAssets + hashedFiles, '*!rev-manifest.json'])
    .pipe(sizereport({
        gzip: true
    }));
});
