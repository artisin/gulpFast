var compress = require('compression'),
    config   = require('../config'),
    express  = require('express'),
    gulp     = require('gulp'),
    gutil    = require('gulp-util'),
    logger   = require('morgan'),
    open     = require('open'),
    path     = require('path');

var settings = {
  root: path.resolve(process.cwd(), config.root.dest),
  port: process.env.PORT || 5000,
  logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
  staticOptions: {
    extensions: ['html'],
    maxAge: '31556926'
  }
};

gulp.task('server', function() {
  var url = 'http://localhost:' + settings.port;
  //express
  express()
    .use(compress())
    .use(logger(settings.logLevel))
    .use('/', express.static(settings.root, settings.staticOptions))
    .listen(settings.port);

  gutil.log('production server started on ' + gutil.colors.green(url));
  open(url);
});

