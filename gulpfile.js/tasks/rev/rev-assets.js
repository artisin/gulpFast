var config    = require('../../config'),
    gulp      = require('gulp'),
    path      = require('path'),
    rev       = require('gulp-rev'),
    revNapkin = require('gulp-rev-napkin');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  // Ignore files that may reference assets. We'll rev them next.
  var ignoreThese = '!' + path.join(config.root.destAssets, '/**/*+(css|js|json|html)');
  return gulp.src([path.join(config.root.destAssets, '/**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(config.root.destAssets))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(path.join(config.root.destAssets, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(config.root.destAssets));
});
