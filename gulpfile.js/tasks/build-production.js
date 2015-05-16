var gulp         = require('gulp'),
    gulpSequence = require('gulp-sequence'),
    colors       = require('colors'),
    del          = require('del'),
    config       = require('../config');


gulp.task('build', function(cb) {
  process.env.NODE_ENV = 'production';
  gulpSequence(
    'karma',
    'clean', 
    ['fonts', 'images', 'iconFont'], 
    ['postCss', 'jade', 'webpack:production'], 
    'rev', 
    'cleanTemp', 
    'complete', 
    cb)
});

gulp.task('cleanTemp', function (cb) {
  del([
    config.publicTemp,
  ], cb);
});


gulp.task('complete', function() {
  console.log('Project Succsess.'.bold.bgRed);
  console.log('Project Succsess.'.bold.bgWhite);
  console.log('Project Succsess.'.bold.bgBlue);
  process.exit();
});

