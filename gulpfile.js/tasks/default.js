var gulp            = require('gulp'),
    gulpSequence    = require('gulp-sequence'),
    getEnabledTasks = require('../lib/getEnabledTasks');

var defaultTask = function(cb) {
  var tasks = getEnabledTasks('watch');
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'watch', cb);
};

gulp.task('default', defaultTask);
module.exports = defaultTask;
