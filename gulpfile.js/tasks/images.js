var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    changed      = require('gulp-changed'),
    config       = require('../config/images'),
    pngquant     = require('imagemin-pngquant'),
    handleErrors = require('../lib/handleErrors'),
    imagemin     = require('gulp-imagemin');

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
     // Optimize
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      use: [pngquant({quality: '65-80', speed: 4})]
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
