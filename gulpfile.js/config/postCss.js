var config = require('./');

module.exports = {
  src: config.publicTemp + "/styles/**/*.css",
  dest: config.publicAssets + '/styles',
};