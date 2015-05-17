var gulp       = require('gulp'),
    rev        = require('gulp-rev'),
    nano       = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    concatCss  = require('gulp-concat-css'),
    del        = require('del'),
    override   = require('gulp-rev-css-url'),
    filter     = require('gulp-filter'),
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

//Extracts shared css that the user want to be seperate 
gulp.task('extractSharedCss', ['removeOldCss'], function () {
  return gulp.src(config.publicTemp + "/compiled/**/*.css")
  .pipe(filter(function (file) {
    var name = file.relative;
    //Find files with shared in their name
    if ((/(?=shared)/gi).test(name)){
      //If the file does not have - or _ add to styles
      if (!(/(\_|\-)/gi).test(name)){
        return file;
      }
    }
  }))
  .pipe(gulp.dest(config.publicAssets + '/styles'));
});

//Concat specified css files into one
gulp.task('concatCss', ['extractSharedCss'], function(){
  return gulp.src(config.publicTemp + "/compiled/**/*.css")
    .pipe(filter(function (file) {
      var name = file.relative;
      //Find files with shared in their name
      if ((/(?=shared)/gi).test(name)){
        //If the file does have - or _ concat
        if ((/(\_|\-)/gi).test(name)){
          return file;
        }
      }
    }))
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