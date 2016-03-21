var config             = require('../../config'),
    gulp               = require('gulp'),
    iconfont           = require('gulp-iconfont'),
    generateIconStylus = require('./generateIconStylus'),
    handleErrors       = require('../../lib/handleErrors'),
    packJ              = require('../../../package.json'),
    path               = require('path');

var fontPath = path.join(config.root.dest, config.tasks.iconFont.dest);
var cssPath = path.join(config.root.dest, config.tasks.css.dest);

var settings = {
  name: packJ.name + ' icons',
  src: path.join(config.root.src, config.tasks.iconFont.src, '/*.svg'),
  dest: path.join(config.root.dest, config.tasks.iconFont.dest),
  stylusDest: path.join(config.root.src, config.tasks.css.src, config.tasks.iconFont.stylusDest),
  template: path.normalize('./gulpfile.js/tasks/iconFont/template.styl'),
  stylusOutputName: '_icons.styl',
  fontPath: path.relative(cssPath, fontPath),
  className: 'icon',
  options: {
    svg: true,
    timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
    fontName: 'icons',
    appendUnicode: true,
    normalize: false,
    formats: config.tasks.iconFont.extensions
  }
};

gulp.task('iconFont', function() {
  return gulp.src(settings.src)
    .pipe(iconfont(settings.options))
    .on('glyphs', generateIconStylus(settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(settings.dest));
});
