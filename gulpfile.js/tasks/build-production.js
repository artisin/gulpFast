var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:production', function(cb) {
  process.env.NODE_ENV = 'production';
  //Karma is being a bitch
  gulpSequence('clean', ['fonts', 'images', 'iconFont'], 'stylus', 'webpack:production', 'jade', 'rev', cb);
});
