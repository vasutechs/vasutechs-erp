var gulp = require('gulp');
var config = require('./build_tasks/config')();
config = Object.assign(config, {
    src: {
        js: './src/js',
        template: './src/template',
        defaultSrcJsFiles: ['./src/js/boot.js', './src/js/components/**.**', './src/js/factory/**.**', './src/js/services/**.**', './src/js/controllers/admin/**', './src/js/controllers/dashboard.js', './src/js/controllers/databaseUpload.js'],
        defaultModules: ['databaseUpload', 'databaseDownload', 'calendarYear', 'dashboard', 'admin/**'],
        assets: './src/assets'
    },
    dist: {
        path: './dist'
    }
});

require(config.buildTasks + '/build.js')(config, gulp);