//Final production step, update, minify, and report
var gulp = require('gulp'),
    gulpSequence = require('gulp-sequence');


gulp.task('rev', function(cb) {
  gulpSequence(
    [
    //Add md5 hashes to assets referenced by CSS and JS files
    'rev-assets',
    //Import root-assest, such as 404, favicon, ect
    'root-assets',
    ],
    //Rev and compress CSS and JS files (this is done after assets, so that if
    //a referenced asset hash changes, the parent hash will change as well
    'rev-css',
    //Update asset references with reved filenames in compiled css + js
    'rev-update-references',
    //Update asset references in HTML
    'update-html',
    //Minify html
    'mini-html',
    //Remove old
    'rev-del',
    //Report Size
    'size-report',
  cb);
});