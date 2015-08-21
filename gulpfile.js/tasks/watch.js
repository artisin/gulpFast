var gulp     = require('gulp'),
    watch    = require('gulp-watch'),
    jade     = require('../config/jade'),
    images   = require('../config/images'),
    stylus   = require('../config/stylus'),
    fonts    = require('../config/fonts'),
    iconFont  = require('../config/iconFont'),
    svgSprite = require('../config/svg-sprite');

//Watch said files
gulp.task('watch', ['browser-sync'], function() {
  watch(images.src, function() { gulp.start('images'); });
  watch(stylus.src, function() { gulp.start('post-css'); });
  watch(fonts.src, function() { gulp.start('fonts'); });
  watch(jade.watch, function() { gulp.start('jade'); });
  watch(iconFont.src, function() { gulp.start('iconFont'); });
  watch(svgSprite.src, function() { gulp.start('svg-sprite'); });
});
