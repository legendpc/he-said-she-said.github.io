module.exports = function(grunt) {
  var _ = grunt.util._;
  var shell = require('shelljs');

  var config = {};
  var globalOptions = {
    urls: 'etc/urls.json',
    logdir: 'logs',
    docdir: 'docs'
  };
  var tasks = shell.ls('tasks').map(function(taskFile) {
    var name = taskFile.split('.')[0];
    var module = require('./tasks/' + name);

    config[name] = _.extend({}, {options: globalOptions});

    return {name: name, module: module, desc: module.desc};
  });

  grunt.initConfig(config);

  tasks.forEach(function(task) {
    grunt.registerTask(task.name, task.desc, task.module);
  });
};
