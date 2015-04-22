var config = require('../../config');
var filter = require('gulp-filter');
var gulp   = require('gulp');
var rev    = require('gulp-rev');
var nano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify-css');
var gulp = require('gulp');
var config = require('../../config');

gulp.task('rev-css', ['rev-update-references'], function(){

  return gulp.src(config.publicTemp + "/compiled/**/*.css")
    .pipe(sourcemaps.init())
    .pipe(rev())
    .pipe(nano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.publicAssets + '/styles'))
    .pipe(rev.manifest('dist/rev-manifest.json', {merge: true}))
    .pipe(gulp.dest(''));
});


