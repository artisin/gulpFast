var config     = require('../../config'),
    gulp       = require('gulp'),
    path       = require('path'),
    revReplace = require('gulp-rev-replace');

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function() {
  var manifest = gulp.src(path.join(config.root.destAssets, 'rev-manifest.json'));

  return gulp.src(path.join(config.root.destAssets, '/**/**.{css,js}'))
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(config.root.destAssets));
});
