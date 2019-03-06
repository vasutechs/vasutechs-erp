var gulp = require('gulp');
var glob = require('glob');
var config = {
        src: {
            js: './src/js',
            template: './src/template',
            defaultSrcJsFiles:['./src/js/boot.js', './src/js/components/**.**', './src/js/factory/**.**', './src/js/services/**.**', './src/js/controllers/**.js', './src/js/controllers/admin/**', './src/js/controllers/**'],
            lib: [
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './node_modules/font-awesome/css/font-awesome.min.css',
                './node_modules/font-awesome/fonts/**.**',
                './node_modules/jquery/dist/jquery.min.js',
                './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
                './node_modules/angular/angular.min.js',
                './node_modules/angular-route/angular-route.min.js'
            ],
            assets: './src/assets'
        },
        dist: {
            js: './dist/js',
            template: './dist/template',
            lib: './dist/vendor/',
            assets: './dist/assets'
        },
        webServer: {
            distPath: 'dist',
            serverPort: '9000',
            serverPath: 'http://localhost:9000'
        },
        httpMiddleWare: null,
        releaseProject: {
            path:'./release',
            js:'./release/js',
            namePefix: 'VasuTechsERP-',
            defaultFiles: [
                'release',
                'build_tasks',
                'gulpfile.js',
                'package.json',
                'start'
            ]
        },
        buildTasks: './build_tasks'
    };

var task = {};

glob.sync(config.buildTasks + '/*.js').forEach(function(taskFile) {
    require(taskFile)(config, task, gulp);
});

gulp.task('default', function() {

});