var gulp         = require('gulp'),
    autoprefixer = require('autoprefixer-core'),
    handleErrors = require('../lib/handleErrors'),
    browserSync  = require('browser-sync'),
    config       = require('../config/postCss'),
    postcss      = require('gulp-postcss'),
    cssnext      = require('cssnext'),
    postEasings  = require('postcss-easings'),
    gulpif       = require('gulp-if'),
    postSize     = require('postcss-size'),
    revCompile   = process.env.NODE_ENV === 'production';

gulp.task('postCss', function () {
    var processors = [
        postSize,
        postEasings,
        cssnext,
        autoprefixer({ browsers: ['last 2 version'] }),
    ];
    return gulp.src(config.src)
        .pipe(postcss(processors))
        .on('error', handleErrors)
        // .pipe(gulp.dest(config.dest))
        //If we doing production we then need to make a second copy
        //and put that into a seperate location so rev-css has
        //some styles to work with
        .pipe(gulpif(revCompile, 
            gulp.dest(config.compiled),
            gulp.dest(config.dest)
        ))
        .pipe(browserSync.reload({stream:true}));
});


