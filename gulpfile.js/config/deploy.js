var config = require('./'),
    git    = require('github-url-from-git');


var gitUserName = require('git-user-name');

// gitUserName();
// repo();

var gulp    = require('gulp');

module.exports = {
  url: function () {
    var username = require('git-username')(),
        repo = require('git-repo-name')(),
        slug = username + '.github.io/' + repo;
    return 'http://' + slug;
  },
  src: config.publicDirectory + '/**/*'
};

