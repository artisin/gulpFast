var gulp         = require('gulp'),
    Server       = require('karma').Server,
    gulpSequence = require('gulp-sequence'),
    colors       = require('colors');

var karmaTask = function(done) {
  new Server({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, function(exitStatus) {
    // Karma's return status is not compatible with gulp's streams
    // See: http://stackoverflow.com/questions/26614738/issue-running-karma-task-from-gulp
    // or: https://github.com/gulpjs/gulp/issues/587 for more information
    if (exitStatus) {
      throw new Error('There are failing unit tests');
    }else {
      done();
    }
  }).start();
};

//start test runner
gulp.task('testRunner', karmaTask);

gulp.task('testComplete', function() {
  console.log('Test Succsess.'.bold.bgRed);
  console.log('Test Succsess.'.bold.bgWhite);
  console.log('Test Succsess.'.bold.bgBlue);
  process.exit();
});

gulp.task('test', function(cb) {
  gulpSequence(
    'testRunner',
    'testComplete',
    cb);
});

module.exports = karmaTask;

