var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');


gulp.task('development', function(cb) {
  gulpSequence(
    'clean', 
    ['fonts', 'images', 'iconFont'], 
    ['postCss', 'webpack:development'],
    'jade',
    ['watch', 'browserSync'], 
  cb);
});
