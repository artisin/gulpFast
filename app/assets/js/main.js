var exclaimify = require('./exclaimify');

console.log(exclaimify('app.js loaded'));

// let button = document.getElementById('button');

// let alertAsyncMessage = function() {
//   // CommonJS async syntax webpack magic
//   require.ensure([], function() {
//     const message = require("./asyncMessage")
//     alert(exclaimify(message))
//   })
// }

console.log('asset references liks this one:');
console.log('assets/images/gulp.png');

// button.addEventListener('click', alertAsyncMessage)
