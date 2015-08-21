var gulp         = require('gulp'),
    gulpSequence = require('gulp-sequence'),
    colors       = require('colors'),
    del          = require('del'),
    argv         = require('yargs').argv,
    deploy       = argv._[0] === 'deploy',
    config       = require('../config');


gulp.task('build', function(cb) {
  process.env.NODE_ENV = 'production';
  gulpSequence(
    'test',
    'clean', 
    ['fonts', 'images', 'iconFont', 'svg-sprite'], 
    ['post-css', 'webpack:production'],
    'jade', 
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
  if (!deploy) {
    //Exit gulp
    process.exit();
  }
});

