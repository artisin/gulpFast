var gulp     = require('gulp');
var jade     = require('../config/jade');
var images   = require('../config/images');
var stylus     = require('../config/stylus');
var fonts    = require('../config/fonts');
var watch    = require('gulp-watch');
var config       = require('../config/index');

gulp.task('watch', ['browserSync'], function() {
  watch(images.src, function() { gulp.start('images'); });
  watch(stylus.src, function() { gulp.start('postCss'); });
  watch(fonts.src, function() { gulp.start('fonts'); });
  watch(jade.watch, function() { gulp.start('jade'); });
});

