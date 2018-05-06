var gulp = require('gulp');
var glob = require('glob');
var config = {
    src: {
        js: './src/js',
        template: './src/template',
        lib: [
            './node_modules/angular/**/**.**',
            './node_modules/angular-route/**/**.**',
            './node_modules/bootstrap/**/**.**',
            './node_modules/jquery/**/**.**',
            './node_modules/font-awesome/**/**.**'
        ],
        data: './src/data',
        assets: './src/assets'
    },
    dist: {
        js: './dist/js',
        template: './dist/template',
        lib: './dist/vendor/',
        data: './dist/data',
        assets: './dist/assets'
    },
    webServer: {
        distPath: 'dist',
        serverPort: '9000',
        serverPath: 'http://localhost:9000'
    },
    buildTasks: './build_task/*.js',
    httpMiddleWare: null
};
var task = {};

glob.sync(config.buildTasks).forEach(function(taskFile) {
    require(taskFile)(gulp, config, task);
});

gulp.task('default', function() {

});