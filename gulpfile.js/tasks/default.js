var gulp            = require('gulp'),
    gulpSequence    = require('gulp-sequence'),
    getEnabledTasks = require('../lib/getEnabledTasks');

gulp.task('default', function(cb) {
  var tasks = getEnabledTasks('watch');
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'watch', cb);
});
