var exclaimify = require('./exclaimify');
console.log(exclaimify('main.js loaded'));

require('./pages/home');

// /app/assets/js/pages/home.js
// let button = document.getElementById('button');

// let alertAsyncMessage = function() {
//   // CommonJS async syntax webpack magic
//   require.ensure([], function() {
//     const message = require("./asyncMessage")
//     alert(exclaimify(message))
//   })
// }



// button.addEventListener('click', alertAsyncMessage)
