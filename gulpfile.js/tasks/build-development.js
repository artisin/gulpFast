var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');


gulp.task('development', function(cb) {
  gulpSequence(
    'clean', 
    ['fonts', 'images', 'iconFont', 'svg-sprite'], 
    ['post-css', 'webpack:development'],
    'jade',
    ['watch', 'browser-sync'], 
  cb);
});
