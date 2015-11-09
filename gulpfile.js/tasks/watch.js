var config = require('../config'),
    gulp   = require('gulp'),
    path   = require('path'),
    watch  = require('gulp-watch');

gulp.task('watch', ['browserSync'], function() {
  var watchableTasks = ['fonts', 'iconFont', 'images', 'svgSprite', 'html', 'css'];
  //cycle to watch and start
  watchableTasks.forEach(function(taskName) {
    var task = config.tasks[taskName];
    if (task) {
      var glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');
      watch(glob, function() {
        gulp.start(taskName);
      });
    }
  });
});

