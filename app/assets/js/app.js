let exclaimify = require('./exclaimify');

console.log(exclaimify('app.js loaded'));

// let button = document.getElementById('button');

// let alertAsyncMessage = function() {
//   // CommonJS async syntax webpack magic
//   require.ensure([], function() {
//     const message = require("./asyncMessage")
//     alert(exclaimify(message))
//   })
// }

console.log(`
  asset references liksde this one:
    assets/images/gulp.png
  get updated in js too!`)

// button.addEventListener('click', alertAsyncMessage)
