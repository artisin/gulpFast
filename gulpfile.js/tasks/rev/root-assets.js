var gulp    = require('gulp'),
    config  = require('../../config');

gulp.task('root-assets', function(){
  return gulp.src(config.sourceAssets + "/_root/*")
  .pipe(gulp.dest(config.publicDirectory));
});