var gulp         = require('gulp'),
    config       = require('../config'),
    handleErrors = require('../lib/handleErrors'),
    postcss      = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    path         = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    fs           = require('fs'),
    gutil        = require('gulp-util'),
    stylus       = require('gulp-stylus'),
    filter       = require('gulp-filter'),
    changed      = require('gulp-changed'),
    browserSync  = require('browser-sync');

var paths = {
  src: path.join(config.root.srcAssets,  config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  postSrc: path.join(config.root.destTemp,  config.tasks.css.post, '/**/*.css'),
  postDest: path.join(config.root.destTemp,  config.tasks.css.post),
  dest: path.join(config.root.destAssets,  config.tasks.css.dest)
};

/*-----------------------------*/
/// Post Css
/*-----------------------------*/
gulp.task('css', ['stylus'], function () {
  //grabs the plugins from the config file
  var postCssPlugins = config.tasks.css.postCss.plugins.map(function (plugin) {
    var _plugin = require(plugin);
    if (_plugin) {
      return _plugin();
    }
    console.warn('Post-CSS Plugin Error: ' + plugin + 'not found make sure it is installed via npm.');
  });
  return gulp.src(paths.postSrc)
      .pipe(sourcemaps.init())
      .pipe(postcss(postCssPlugins))
      .pipe(autoprefixer(config.tasks.css.autoprefixer))
      .on('error', handleErrors)
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.stream());
});

/*-----------------------------*/
/// Stylus
/*-----------------------------*/
gulp.task('stylus', function () {
  //grabs the plugins from the config file
  var stylusPlugins = config.tasks.css.stylus.plugins.map(function (plugin) {
    var _plugin = require(plugin);
    if (_plugin) {
      return _plugin();
    }
    console.warn('Stylus Plugin Error: ' + plugin + 'not found make sure it is installed via npm.');
  });
  return gulp.src(paths.src)
    //filter out partials (folders and files starting with "_" )
    .pipe(filter(function (file) {
      if (config.tasks.css.filterPartials) {
        if (!/\/_/.test(file.path) || !/^_/.test(file.relative)) {
          return file;
        }
      }else {
        return file;
      }
    }))
    //Only complie changes
    .pipe(changed(paths.postDest, {
      extension: '.css',
      hasChanged: compareLastModifiedTime
    }))
    .pipe(stylus({
      use: stylusPlugins,
      'include css': true
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.postDest));
});


/**
 * only push through files changed more recently than the destination files
 * NOTE: It will always pass through, shared.styl, since the files will be
 * imported, the file will not reflect said changes, so we must just
 * assume that the file is changed.
 */
function fsOperationFailed(stream, sourceFile, err) {
  if (err) {
    if (err.code !== 'ENOENT') {
      stream.emit('error', new gutil.PluginError('gulp-changed', err, {
        fileName: sourceFile.path
      }));
    }
    stream.push(sourceFile);
  }
  return err;
}
function compareLastModifiedTime(stream, cb, sourceFile, targetPath) {
  fs.stat(targetPath, function (err, targetStat) {
    if (!fsOperationFailed(stream, sourceFile, err)) {
      //Push share.styl regardless
      if (sourceFile.relative === 'shared.styl'){
        stream.push(sourceFile);
      }else if (sourceFile.stat.mtime > targetStat.mtime) {
        stream.push(sourceFile);
      }
    }
    cb();
  });
}

