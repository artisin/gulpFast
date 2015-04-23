var browserSync     = require('browser-sync'),
    config          = require('../config/jade'),
    gulp            = require('gulp'),
    handleErrors    = require('../lib/handleErrors'),
    jadeInheritance = require('gulp-jade-inheritance'),
    jade            = require('gulp-jade'),
    changed         = require('gulp-changed'),
    cached          = require('gulp-cached'),
    gulpif          = require('gulp-if'),
    filter          = require('gulp-filter'),
    inject          = require('gulp-inject'),
    browserSync     = require('browser-sync'),
    gulpif          = require('gulp-if'),
    // tap             = require('gulp-tap'),
    // path            = require('path'),
    argv            = require('yargs').argv,
    devel           = argv._[0] !== 'build';

gulp.task('jade', ['compileJade'], function () {
    var target = gulp.src(config.injectJade);
  // It's not necessary to read the files (will speed up things), we're only after their paths
  var global = gulp.src([
    //Inject assests that only have `shared` in their name
    config.publicAssets + '/styles/**/*shared*.css',
    config.publicAssets + '/js/**/*shared*.js'
  ], {read: false});

  return target
    .pipe(inject(global ,{
    relative: false,
    ignorePath: 'dist',
    addRootSlash: false,
    name: 'global'
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});



gulp.task('compileJade', function() {
  return gulp.src(config.src)
    //only pass unchanged *main* files and *all* the partials
    .pipe(changed('dist', {extension: '.html'}))
    //filter out unchanged partials, but it only works when in devel
    .pipe(gulpif(devel, cached('jade')))
    //find files that depend on the files that have changed
    .pipe(jadeInheritance({basedir: './app/views'}))
    //filter out partials (folders and files starting with "_" )
    .pipe(filter(function (file) {
        return !/\/_/.test(file.path) || !/^_/.test(file.relative);
    }))
    .pipe(jade({
      pretty: true
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.publicTemp))
});
