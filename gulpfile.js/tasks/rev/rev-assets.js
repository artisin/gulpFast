var gulp       = require('gulp'),
    rev        = require('gulp-rev'),
    nano       = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    concatCss  = require('gulp-concat-css'),
    del        = require('del'),
    override   = require('gulp-rev-css-url'),
    config     = require('../../config');


gulp.task('rev-assets', ['miniCss'], function(){
  var pub = config.publicAssets + '/**/*',
      ignore = '!' + config.publicAssets+ '/**/*+(js|json|html|txt|xml)';
  return gulp.src([pub, ignore])
    .pipe(rev())
    .pipe(override())
    .pipe(gulp.dest(config.publicAssets))
    .pipe(rev.manifest('dist/rev-manifest.json', {merge: true}))
    .pipe(gulp.dest(''));
});

//Del old css files
gulp.task('removeOldCss', function (cb) {
  del([
    config.publicAssets + "/styles",
  ], cb);
});

//Concat css into one file
gulp.task('concatCss', ['removeOldCss'], function(){
  return gulp.src(config.publicTemp + "/compiled/**/*.css")
    .pipe(concatCss('shared.css'))
    .pipe(gulp.dest(config.publicAssets + '/styles'));
});

//Minify css
gulp.task('miniCss', ['concatCss'], function(){
  return gulp.src(config.publicAssets + '/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(nano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.publicAssets + '/styles'));
});