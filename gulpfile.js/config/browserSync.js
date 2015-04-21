var config = require('./');

module.exports = {
  server: {
    baseDir: config.publicDirectory
  },
  files: ['dist/**/*.html']
};
