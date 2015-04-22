var gulp         = require('gulp'),
    gulpSequence = require('gulp-sequence'),
    colors       = require('colors'),
    config       = require('../config'),
    del          = require('del');


gulp.task('build:production', function(cb) {
  process.env.NODE_ENV = 'production';
  //Karma is being a bitch
  gulpSequence('clean', 
    ['fonts', 'images', 'iconFont'], 
    ['stylus', 'webpack:production', 'jade'], 
    'rev', 
    'cleanTemp', 
    'complete', 
    cb);
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
});

