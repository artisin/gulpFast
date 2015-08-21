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
    configStylus = require('../config/stylus'),
    autoprefixer = require('autoprefixer-core'),
    browserSync  = require('browser-sync'),
    configPost   = require('../config/postCss'),
    postcss      = require('gulp-postcss'),
    cssnext      = require('cssnext'),
    postFocus    = require('postcss-focus'),
    postEasings  = require('postcss-easings'),
    postDefault  = require('postcss-default-unit'),
    gulpif       = require('gulp-if'),
    postSize     = require('postcss-size'),
    argv         = require('yargs').argv,
    devel        = argv._[0] === undefined;

/*-----------------------------*/
/// Post Css
/*-----------------------------*/
gulp.task('post-css', ['stylus'], function () {
    var processors = [
        cssnext,
        postDefault,
        postSize,
        postEasings,
        postFocus,
        autoprefixer({ browsers: ['last 2 version'] }),
    ];
    return gulp.src(configPost.src)
        .pipe(postcss(processors))
        .on('error', handleErrors)
        .pipe(gulp.dest(configPost.dest))
        //If we doing production we then need to make a second copy
        //and put that into a seperate location so rev-css has
        //some styles to work with
        .pipe(gulpif(!devel, gulp.dest(configPost.compiled)))
        .pipe(browserSync.reload({stream:true}));
});

/*-----------------------------*/
/// Stylus
/*-----------------------------*/
gulp.task('stylus', function () {
  return gulp.src(configStylus.src)
    //filter out partials (folders and files starting with "_" )
    .pipe(filter(function (file) {
       if (!/\/_/.test(file.path) || !/^_/.test(file.relative)) {
        return file;
       }
    }))
    //Only complie changes
    .pipe(changed(configStylus.dest, {
        extension: '.css',
        hasChanged: compareLastModifiedTime
    }))
    .pipe(stylus({
        use:[koutoSwiss(), rupture(), lost(), typographic()],
        'include css': true,
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(configStylus.dest));
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