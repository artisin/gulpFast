var gulp = require('gulp');
var del = require('del');
var config = require('../config');
var jadeConfig = require('../config/jade');

gulp.task('clean', function (cb) {
  del([
    config.publicAssets,
    jadeConfig.dest,
  ], cb);
});
