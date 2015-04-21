var config = require('./')

module.exports = {
  watch: config.sourceDirectory + '/views/**/**/*.jade',
  src: config.sourceDirectory + '/views/**/*.jade',
  dest: config.publicDirectory
}