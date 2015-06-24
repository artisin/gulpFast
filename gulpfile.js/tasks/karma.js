var gulp     = require('gulp'),
    karma    = require('karma'),
    argv     = require('yargs').argv,
    testOnly = argv._[0] === 'test';

var karmaTask = function(done) {
  var testing = testOnly ? false : true;
  karma.server.start({
    configFile: process.cwd() + '/karma.conf.js',
    //single run when in development, but if 'gulp test' it will be continuous
    singleRun: testing
  }, function(exitStatus) {
    // Karma's return status is not compatible with gulp's streams
    // See: http://stackoverflow.com/questions/26614738/issue-running-karma-task-from-gulp
    // or: https://github.com/gulpjs/gulp/issues/587 for more information
    done(exitStatus ? "There are failing unit tests" : undefined);
  });
};

gulp.task('test', karmaTask);

module.exports = karmaTask;