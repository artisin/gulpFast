//jsfallback declared heres

//jQuery
require.ensure([], function(require) {
  if (!window.jQuery) {
    require('./fallback/jquery-2.1.4.js');
  }
}, 'chunk.jQuery');
