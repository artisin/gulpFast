var gulp     = require('gulp'),
    express  = require('express'),
    config   = require('../config/server'),
    gutil    = require('gulp-util'),
    compress = require('compression'),
    logger   = require('morgan'),
    openUrl  = require('open');

gulp.task('server', function() {
  var url = 'http://localhost:' + config.port;

  express()
    .use(compress())
    .use(logger(config.logLevel))
    .use('/', express.static(config.root, config.staticOptions))
    .listen(config.port);
  gutil.log('production server started on ' + gutil.colors.green(url));
  openUrl(url);
});
