var exclaimify = require('../exclaimify');

describe('exclaimify.js', function () {

  it('should make strings exciting!', function () {
    exclaimify('test').should.equal('test!');
  });
});