var config    = require('../../config'),
    gulp      = require('gulp'),
    override  = require('gulp-rev-css-url'),
    minify    = require('gulp-minify-css'),
    revReplace = require('gulp-rev-replace'),
    del       = require('del'),
    path      = require('path'),
    rev       = require('gulp-rev'),
    revNapkin = require('gulp-rev-napkin');

// 4) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css', ['clean-temp'], function() {
  // debugger
  return gulp.src(path.join(config.root.destAssets, '/**/*.css'))
    .pipe(rev())
    .pipe(override())
    // .pipe(revReplace())
    // .pipe(minify())
    .pipe(gulp.dest(config.root.destAssets))
    .pipe(revNapkin({verbose: true}))
    .pipe(rev.manifest(path.join(config.root.destAssets, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(config.root.destAssets));
});

gulp.task('clean-temp', function (cb) {
  var files = [config.root.destTemp];
  del(files).then(function () {
    cb();
  });
});

