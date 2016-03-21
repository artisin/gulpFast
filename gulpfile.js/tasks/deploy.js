var config  = require('../config'),
    ghPages = require('gulp-gh-pages'),
    gulp    = require('gulp'),
    open    = require('open'),
    packJ   = require('../../package.json'),
    os      = require('os'),
    path    = require('path');

var settings = {
  url: packJ.homepage || function () {
    var username = require('git-username')(),
        repo = require('git-repo-name')(),
        slug = username + '.github.io/' + repo;
    return 'http://' + slug;
  },
  src: config.dest + '/**/*',
  ghPages: {
    cacheDir: path.join(os.tmpdir(), packJ.name)
  }
};

gulp.task('deploy', ['build'], function() {
  return gulp.src(settings.src)
    .pipe(ghPages(settings.ghPages))
    .on('end', function() {
      open(settings.url);
    });
});
