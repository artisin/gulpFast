var gulp       = require('gulp'),
    rev        = require('gulp-rev'),
    nano       = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    concatCss  = require('gulp-concat-css'),
    del        = require('del'),
    config     = require('../../config');


gulp.task('rev-css', function(){
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


gulp.task('removeOldCss', function (cb) {
  del([
    config.publicAssets + "/styles/",
  ], cb);
});
