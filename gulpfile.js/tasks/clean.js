var gulp   = require('gulp'),
    del    = require('del'),
    config = require('../config'),
    path   = require('path');

gulp.task('clean', function (cb) {
  var files = [path.join(config.root.dest, 'rev-manifest.json')];
  //cycle files
  for (var key in config.tasks) {
    var task = config.tasks[key];
    if (task.dest) {
      var glob = '**/*' + (task.extensions ? ('.{' + task.extensions.join(',') + ',map}') : '');
      files.push(path.join(config.root.dest, task.dest, glob));
    }
  }
  //add .temp
  files.push(config.root.destTemp);

  // Don't touch node_modules or source files!
  files.push('!node_modules/**/*');
  files.push('!' + path.join(config.root.src, '/**/*'));

  del(files).then(function () {
    cb();
  });
});

