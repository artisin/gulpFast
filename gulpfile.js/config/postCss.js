var config = require('./');

module.exports = {
  src: config.publicTemp + "/styles/**/*.css",
  compiled: config.publicTemp + "/compiled",
  dest: config.publicAssets + '/styles',
};