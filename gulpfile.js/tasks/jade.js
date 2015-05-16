var browserSync     = require('browser-sync'),
    config          = require('../config/jade'),
    gulp            = require('gulp'),
    handleErrors    = require('../lib/handleErrors'),
    jadeInheritance = require('gulp-jade-inheritance'),
    jade            = require('gulp-jade'),
    changed         = require('gulp-changed'),
    cached          = require('gulp-cached'),
    gulpif          = require('gulp-if'),
    rename          = require('gulp-rename'),
    filter          = require('gulp-filter'),
    inject          = require('gulp-inject'),
    browserSync     = require('browser-sync'),
    gulpif          = require('gulp-if'),
    argv            = require('yargs').argv,
    devel           = argv._[0] === 'build' || 'deploy' ? false : true,
    deploy          = argv._[0] === 'deploy';



gulp.task('jade', ['compileJade'], function () {
  var target = gulp.src(config.injectJade);
  // It's not necessary to read the files (will speed up things), we're only after their paths
  var global = gulp.src([
    //Inject assests that only have `shared` in their name
    config.publicAssets + '/styles/**/*shared*.css',
    config.publicAssets + '/js/**/*shared*.js'
  ], {read: false})
  //Filter out any js or css files that have an underscore in file name
  //since we do not want to inject these files into html
  //NOTE: this is only done on produciton
  //This is mainly for buttron since we want a sepearte file during devel
  //avoide lengthy compile times but in production we only want one shared css file
  .pipe(filter(function (file) {
      if(devel){
        return file;
      }else{
        if (!(/\_/g).test(file.relative)) {
          console.log(file)
          return file;
        }
      }
  }));
  

  return target
    .pipe(inject(global ,{
      relative: true,
      ignorePath: 'dist',
      addRootSlash: false,
      name: 'global',
      //Transforimg file path to cut off the initial `../` 
      //there is prbly a better way of doing this. But, this works. 
      transform: function (filepath) {
        var newArg = arguments;
        filepath = filepath.substring(3, filepath.length);
        newArg[0] = filepath;
        return inject.transform.apply(inject.transform, newArg);
      },
    }))
    .on('error', handleErrors)
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
    //Remove subPages dirc 
    .pipe(rename(function (path) {
      // console.log(arguments)
      var newDir = path.dirname.replace('subPages', '');
      //On deploy to github remove all directories and hifenate them
      if (deploy) {
        if (/(\\|\/)$|^(\\|\/)/.test(newDir)) {
          newDir = newDir.replace('/', '-');
          path.basename = path.basename + newDir;
          newDir = '.';
        }
      }
      path.dirname = newDir;
      return path;
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.publicTemp));
});
