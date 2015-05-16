var gulp       = require('gulp'),
    del        = require('del'),
    config     = require('../config'),
    jadeConfig = require('../config/jade'),
    iconConfig = require('../config/iconFont');

gulp.task('clean', function (cb) {
  del([
    config.publicDirectory,
    iconConfig.stylusDest,
    jadeConfig.dest,
  ], cb);
});
