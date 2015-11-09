var gulp         = require('gulp'),
    gulpSequence = require('gulp-sequence'),
    getEnabledTasks = require('../lib/getEnabledTasks');

var productionTask = function(cb) {
  var tasks = getEnabledTasks('production');
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'rev', cb);
};

gulp.task('build', productionTask);
module.exports = productionTask;
