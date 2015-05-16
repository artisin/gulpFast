//Final production step, update, minify, and report
var gulp = require('gulp'),
    gulpSequence = require('gulp-sequence');


gulp.task('rev', function(cb) {
  gulpSequence(
    //Import root-assest, such as 404, favicon, ect
    'root-assets',
    //Add md5 hashes to reffrenced assests and compress CSS files
    //This should technically be done in seperate steps, but for some
    //reason revReplace will not overwrite the css file and the old
    //name reffrence is used in the css rather than the new
    'rev-assets',
    //Update asset references with reved filenames in compiled js
    'rev-update-references',
    //Update asset references in HTML
    'update-html',
    //Minify html
    'mini-html',
    //Report Size
    'size-report',
  cb);
});