module.exports = function() {
    var config = {
        arg: require('minimist')(process.argv),
        httpMiddleWare: require('connect')(),
        webServer: {
            distPath: './',
            serverPort: '9000',
            serverPath: 'http://localhost:9000'
        },
        buildTasks: './build_tasks',
        task: {},
        release: {
            path: './release',
            dist: './release/dist',
            namePefix: 'VasuTechsERP-',
            defaultFiles: [
                'index.html',
                'build_tasks/server.js',
                'build_tasks/dbApi.js',
                'build_tasks/config.js',
                'package.json',
                'start'
            ]
        }
    };
    config.buildProRes = null;
    config.buildPromise = new Promise(function(res) {
        config.buildProRes = res;
    });
    return config;
};