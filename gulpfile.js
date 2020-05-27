var gulp = require('gulp');
var config = require('./build_tasks/config')();
require(config.buildTasks + '/build.js')(config, gulp);