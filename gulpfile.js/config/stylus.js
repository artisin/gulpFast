var config = require('./');

module.exports = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: config.sourceAssets + "/styles/**/*.{styl,css}",
  dest: config.publicTemp + '/styles',
};