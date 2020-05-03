var gulp = require('gulp');
var glob = require('glob');
var config = {
    webServer: {
        distPath: './',
        serverPort: '9000',
        serverPath: 'http://localhost:9000'
    },
    httpMiddleWare: null,
    buildTasks: './build_tasks'
};
config.buildProRes = null;
config.buildPromise = new Promise(function(res) {
    config.buildProRes = res;
});


var task = {};

glob.sync(config.buildTasks + '/*.js').forEach(function(taskFile) {
    require(taskFile)(config, task, gulp);
});

gulp.task('default', function() {

});