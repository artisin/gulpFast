var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sourcemaps   = require('gulp-sourcemaps'),
    handleErrors = require('../lib/handleErrors'),
    config       = require('../config/stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    stylus       = require('gulp-stylus'),
    koutoSwiss   = require('kouto-swiss'),
    lost         = require('lost-grid'),
    rupture      = require('rupture'),
    typographic  = require('typographic');


gulp.task('stylus', function () {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(stylus({
        use:[koutoSwiss(), rupture(), lost(), typographic()],
        'include css': true,
    }))
    .pipe(autoprefixer(config.autoprefixer))
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});