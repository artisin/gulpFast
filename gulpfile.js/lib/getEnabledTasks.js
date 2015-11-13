var config = require('../config'),
    _      = require('lodash');

// Grouped by what can run in parallel
var assetTasks = ['fonts', 'iconFont', 'images', 'svgSprite'];
var codeTasks = ['html', 'css', 'js'];

module.exports = function(env) {
  var jsTasks = {
    watch: 'webpack:watch',
    development: 'webpack:watch',
    production: 'webpack:production'
  };

  var matchFilter = function(task) {
    if (config.tasks[task] && config.tasks[task].active !== false) {
      if (task === 'js') {
        task = jsTasks[env] || jsTasks.watch;
      }
      return task;
    }
  };

  return {
    assetTasks: _.compact(assetTasks.map(matchFilter)),
    codeTasks: _.compact(codeTasks.map(matchFilter))
  };
};
