var config    = require('../../config'),
    gulp      = require('gulp'),
    path      = require('path'),
    rev       = require('gulp-rev'),
    filter       = require('gulp-filter'),
    revNapkin = require('gulp-rev-napkin');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  // Ignore files that may reference assets. We'll rev them next.
  var ignoreThese = '!' + path.join('/**/*+(css|js|json|html)');
  // debugger
  return gulp.src([path.join(config.root.dest, '/**/**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(config.root.dest))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(path.join(config.root.dest, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''));
});
