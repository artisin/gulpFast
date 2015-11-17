var gulp         = require('gulp'),
    gulpSequence = require('gulp-sequence'),
    getEnabledTasks = require('../lib/getEnabledTasks');

gulp.task('build', ['production-build'], function() {
  console.log('Project Succsess.'.bold.bgRed);
  console.log('Project Succsess.'.bold.bgWhite);
  console.log('Project Succsess.'.bold.bgBlue);
  // process.exit();
  // if (!deploy) {
  //   //Exit gulp
  // }
});

gulp.task('production-build', function(cb) {
  var tasks = getEnabledTasks('production');
  debugger
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, cb);
});
