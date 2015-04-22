var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer-core');
var     handleErrors = require('../lib/handleErrors'),
browserSync  = require('browser-sync'),
        config       = require('../config/postCss');
// var mqpacker = require('css-mqpacker');
// var csswring = require('csswring');

gulp.task('postCss', function () {
    var processors = [
        autoprefixer({ browsers: ['last 2 version'] })
    ];
    return gulp.src(config.src)
        .pipe(postcss(processors))
        .on('error', handleErrors)
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});