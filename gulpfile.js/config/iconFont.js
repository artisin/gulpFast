var config     = require('./'),
    fontConfig = require('./fonts');

module.exports = {
  name: 'Gulp Starter Icons',
  src: config.sourceAssets + '/icons/*.svg',
  dest: fontConfig.dest,
  stylusDest: config.sourceAssets + '/styles/generated',
  template: './gulpfile.js/tasks/iconFont/template.styl',
  stylusOutputName: '_icons.styl',
  fontPath: '../../assets/fonts',
  className: 'icon',
  options: {
    fontName: 'icons',
    appendCodepoints: true,
    normalize: false
  }
};
