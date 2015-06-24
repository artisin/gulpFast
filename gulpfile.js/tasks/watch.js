var gulp     = require('gulp'),
    watch    = require('gulp-watch'),
    jade     = require('../config/jade'),
    images   = require('../config/images'),
    stylus   = require('../config/stylus'),
    karma    = require('../config/karma'),
    fonts    = require('../config/fonts');

//Watch said files
gulp.task('watch', ['browserSync'], function() {
  watch(images.src, function() { gulp.start('images'); });
  watch(stylus.src, function() { gulp.start('postCss'); });
  watch(fonts.src, function() { gulp.start('fonts'); });
  watch(jade.watch, function() { gulp.start('jade'); });
  watch(karma.watch, function() { gulp.start('test'); });
});
