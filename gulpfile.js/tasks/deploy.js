var gulp    = require('gulp'),
   ghPages  = require('gulp-gh-pages'),
   open     = require('open'),
   config   = require('../config/deploy');

gulp.task('deploy', ['build'], function() {
  return gulp.src(config.src)
    .pipe(ghPages())
    .on('end', function(){
      open(config.url());
      //Exit gulp
      process.exit();
    });
});