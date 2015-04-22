var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:development', function(cb) {
  gulpSequence(
    'clean', 
    ['fonts', 'images', 'iconFont'], 
    ['stylus', 'webpack:development'],
    ['jade', 'jadeWatch'],
    ['watch', 'browserSync'], 
  cb);
});
