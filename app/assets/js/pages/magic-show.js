var exclaimify = require('./../exclaimify');

//webpack magic, with named chunks
require.ensure([], function(require) {
  const magic = require("./../components/magicChunk");
  if (magic.button) {
    let alertAsyncMessage = function() {
      alert(exclaimify(magic.message));
    };
    magic.button.addEventListener('click', alertAsyncMessage);
  }
}, 'magic');


