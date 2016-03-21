var config    = require('../../config'),
    gulp      = require('gulp'),
    path      = require('path');


var paths = {
  src: path.join(config.root.src, config.tasks.rootAssets.src + '/*'),
  dest: path.join(config.root.dest, config.tasks.rootAssets.dest)
};

gulp.task('root-assets', function() {
  return gulp.src(paths.src)
  .pipe(gulp.dest(paths.dest));
});
