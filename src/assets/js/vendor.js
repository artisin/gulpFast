//vender

//loads the scripts
let $script = require('scriptjs');

window['$'] = $script('https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js', function() {
  return jQuery;
});
