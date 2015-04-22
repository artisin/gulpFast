var config     = require('./'),
    fontConfig = require('./fonts');

module.exports = {
  name: 'goFast Icons',
  src: config.sourceAssets + '/icons/*.svg',
  dest: fontConfig.dest,
  stylusDest: config.sourceAssets + '/styles/_generated',
  template: './gulpfile.js/tasks/iconFont/template.styl',
  stylusOutputName: '_icons.styl',
  fontPath: '../../assets/fonts',
  className: 'icon',
  options: {
    fontName: 'icons',
    appendCodepoints: true,
    normalize: true
  }
};
