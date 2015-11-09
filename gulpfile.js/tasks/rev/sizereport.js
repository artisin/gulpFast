var config       = require('../../config'),
    gulp         = require('gulp'),
    repeatString = require('../../lib/repeatString'),
    sizereport   = require('gulp-sizereport');

// 6) Report sizes
gulp.task('size-report', function() {
  var hashedFiles = '/**/*-' + repeatString('[a-z,0-9]', 8)  + '*.*';

  return gulp.src([config.root.dest + hashedFiles, '*!rev-manifest.json'])
    .pipe(sizereport({
      gzip: true
    }));
});
