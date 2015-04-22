var gulp = require('gulp');
var del = require('del');
var config = require('../config');
var jadeConfig = require('../config/jade');
var iconConfig = require('../config/iconFont');

gulp.task('clean', function (cb) {
  del([
    config.publicDirectory,
    iconConfig.stylusDest,
    jadeConfig.dest,
  ], cb);
});
