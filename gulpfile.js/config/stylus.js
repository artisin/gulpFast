var config = require('./')

module.exports = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: config.sourceAssets + "/styles/**/*.{styl,css}",
  dest: config.publicAssets + '/styles',
  settings: {
    indentedSyntax: true, // Enable .stylus syntax!
    imagePath: 'assets/images' // Used by the image-url helper
  }
};