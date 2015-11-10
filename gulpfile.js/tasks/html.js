var config       = require('../config'),
    browserSync  = require('browser-sync'),
    data         = require('gulp-data'),
    gulp         = require('gulp'),
    gulpif       = require('gulp-if'),
    handleErrors = require('../lib/handleErrors'),
    htmlmin      = require('gulp-htmlmin'),
    path         = require('path'),
    render       = require('gulp-nunjucks-render'),
    filter       = require('gulp-filter'),
    fs           = require('fs');

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**');

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.{html,nunjs}'), exclude],
  dest: path.join(config.root.dest, config.tasks.html.dest)
};

var getData = function(file) {
  var dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFile);
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
};

gulp.task('html', function() {
  render.nunjucks.configure([path.join(config.root.src, config.tasks.html.src)], {watch: false });
  return gulp.src(paths.src)
    .pipe(data(getData))
    .on('error', handleErrors)
    .pipe(render())
    .on('error', handleErrors)
    .pipe(gulpif(process.env.NODE_ENV === 'production', htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
});

