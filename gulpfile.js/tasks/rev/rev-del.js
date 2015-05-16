var config       = require('../../config');
var gulp = require('gulp');
var rev = require('gulp-rev');
var revDel = require('rev-del');

gulp.task('rev-del', function(){
  var manifest = gulp.src(config.publicDirectory + "/rev-manifest.json");
  console.log(manifest)
  return gulp.src(config.publicDirectory + '/**/**')
    // .pipe(revDel(manifest))
    .pipe(gulp.dest(''))
});
