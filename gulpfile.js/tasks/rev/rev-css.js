var config = require('../../config');
var gulp   = require('gulp');
var rev    = require('gulp-rev');
var nano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var config = require('../../config');


gulp.task('rev-css', ['rev-update-references'], function(){

  return gulp.src(config.publicTemp + "/compiled/**/*.css")
    //Concat css into one file
    .pipe(concatCss('shared.css'))
    .pipe(sourcemaps.init())
    .pipe(rev())
    .pipe(nano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.publicAssets + '/styles'))
    .pipe(rev.manifest('dist/rev-manifest.json', {merge: true}))
    .pipe(gulp.dest(''));
});


