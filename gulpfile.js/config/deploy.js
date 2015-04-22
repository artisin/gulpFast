var config = require('./'); 

module.exports = {
  url: function () {
    var username = require('git-username')(),
        repo = require('git-repo-name')(),
        slug = username + '.github.io/' + repo;
    return 'http://' + slug;
  },
  src: config.publicDirectory + '/**/*'
};

