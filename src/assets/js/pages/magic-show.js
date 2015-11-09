
//webpack magic, with named chunks
require.ensure([], function(require) {
  const magic = require("./../components/magicChunk");
  if (magic.button) {
    let alertAsyncMessage = function() {
      alert(magic.message);
    };
    magic.button.addEventListener('click', alertAsyncMessage);
  }
  //This will be the filename of the generated chunk so your 
}, 'magic.chunk');


