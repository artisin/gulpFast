var gulp        = require('gulp'),
    revReplace  = require('gulp-rev-replace'),
    config      = require('../../config');

gulp.task('update-html', function(){
  var manifest = gulp.src(config.publicDirectory + "/rev-manifest.json");
  return gulp.src(config.publicDirectory + '/**/*.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(config.publicDirectory));
});
