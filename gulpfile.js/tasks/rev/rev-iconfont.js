var gulp         = require('gulp'),
    config       = require('../../config'),
    iconConfig   = require('../../config/iconFont'),
    handleErrors = require('../../lib/handleErrors'),
    fs           = require('fs'),
    _            = require('underscore'),
    rename       = require("gulp-rename");

// .ttf fonts have an embedded timestamp, which cause the contents
// of the file to change ever-so-slightly. This was a problem for
// file reving, which generates a hash based on the contents of the file.
// This meant that even if source files had not changed, the hash would
// change with every recompile, as well as .eot, and .woff files, which
// are derived from a source svg font

// The solution is to only hash svg font files, then append the
// generated hash to the ttf, eot, and woff files (instead of
// leting each file generate its own hash)
gulp.task('rev-iconfont', function() {
  var manifest = require('../../.' + config.publicDirectory + '/rev-manifest.json');
  var svgIcon;
  //Grab the svg font file
  _.each(manifest, function(reference, key) {
    var fontPath = iconConfig.dest.split(config.publicDirectory)[1].substr(1);
    //remove `assets` from name
    fontPath = fontPath.replace('assets/', '');
    //Get svg icon hash
    if (key.match(fontPath + '/' + iconConfig.options.fontName)) {
      var path = key.split('.svg')[0];
      var hash = reference.split(path)[1].split('.svg')[0];
      svgIcon = {
        path: path,
        hash: hash
      };
    }
  });
  //Filter out only icons files
  var icons = iconConfig.dest + '/' + iconConfig.options.fontName + '.{eot,woff,woff2,ttf}';
  return gulp.src(icons)
  .pipe(rename(function (path) {
    var keyName = svgIcon.path + path.extname;
    //Rename
    path.basename = path.basename + svgIcon.hash;
    var hashName = svgIcon.path + svgIcon.hash + path.extname;
    manifest[keyName] = hashName;
    //Write to mainifest
    fs.writeFile(config.publicDirectory + '/rev-manifest.json', JSON.stringify(manifest));
    return path;
  }))
  .on('error', handleErrors)
  .pipe(gulp.dest(iconConfig.dest));
});
