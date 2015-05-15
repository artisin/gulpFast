var gulp         = require('gulp'),
    fs           = require('fs'),
    gutil        = require('gulp-util'),
    handleErrors = require('../lib/handleErrors'),
    stylus       = require('gulp-stylus'),
    koutoSwiss   = require('kouto-swiss'),
    lost         = require('lost-grid'),
    rupture      = require('rupture'),
    filter       = require('gulp-filter'),
    typographic  = require('typographic'),
    changed      = require('gulp-changed'),
    config       = require('../config/stylus');


gulp.task('stylus', function () {
  return gulp.src(config.src)
    //filter out partials (folders and files starting with "_" )
    .pipe(filter(function (file) {
        return !/\/_/.test(file.path) || !/^_/.test(file.relative);
    }))
    //Only complie changes
    .pipe(changed(config.dest, {
        extension: '.css',
        hasChanged: compareLastModifiedTime
    }))
    .pipe(stylus({
        use:[koutoSwiss(), rupture(), lost(), typographic()],
        'include css': true,
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});



/**
 * only push through files changed more recently than the destination files
 * NOTE: It will always pass through, shared.styl, since the files will be
 * imported, the file will not reflect said changes, so we must just
 * assume that the file is changed.
 */
function compareLastModifiedTime(stream, cb, sourceFile, targetPath) {
    fs.stat(targetPath, function (err, targetStat) {
        if (!fsOperationFailed(stream, sourceFile, err)) {
            //Push share.styl regardless
            if (sourceFile.relative === 'shared.styl'){
                stream.push(sourceFile);
            }
            else if (sourceFile.stat.mtime > targetStat.mtime) {
                stream.push(sourceFile);
            }
        }

        cb();
    });
}

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