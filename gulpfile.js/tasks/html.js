var config       = require('../config'),
    browserSync  = require('browser-sync'),
    data         = require('gulp-data'),
    gulp         = require('gulp'),
    handleErrors = require('../lib/handleErrors'),
    htmlmin      = require('gulp-htmlmin'),
    path         = require('path'),
    render       = require('gulp-nunjucks-render'),
    fs           = require('fs'),
    gulpif       = require('gulp-if'),
    _            = require('lodash');

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**');

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.{html,nunj,nunjs,nunjucks}'), exclude],
  dest: path.join(config.root.dest, config.tasks.html.dest)
};

var getData = function() {
  //get folder
  var dataFolder = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFolder);
  //no data found
  if (!fs.existsSync(dataFolder)) {
    return false;
  }
  //get files in folder
  var dataFiles = fs.readdirSync(dataFolder);
  //map out files and phrase content
  var dataMap = _.map(dataFiles, function (val) {
    var valPath = path.join(dataFolder, val);
    var valData = fs.readFileSync(valPath, 'utf8');
    //basic saftey check for empty files
    if (valData.length) {
      return JSON.parse(valData);
    }
  });
  //reduce data into on obj
  var dataObj = _.reduce(dataMap, function (prv, cur) {
    prv = _.merge(cur, prv);
    return prv;
  }, {});
  return dataObj;
};

//@todo - cache files?
gulp.task('html', function() {
  render.nunjucks.configure([path.join(config.root.src, config.tasks.html.src)], {watch: false });
  return gulp.src(paths.src)
    //pipe in data if any
    .pipe(gulpif(getData, data(getData)))
    .on('error', handleErrors)
    .pipe(render())
    .on('error', handleErrors)
    .pipe(gulpif(process.env.NODE_ENV === 'production', htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
});
