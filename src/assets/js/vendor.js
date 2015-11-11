//vender
//loads the scripts
var $script = require('scriptjs');

const $ = $script('https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js' function() {
  debugger
  return jQuery;
});

module.exports = {
  jQuery: $
}

//jQuery
// require.ensure([], function(require) {
//   if (!window.jQuery) {
//     require('./fallback/jquery-2.1.4.js');
//   }
// }, 'chunk.jQuery');

//https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js

