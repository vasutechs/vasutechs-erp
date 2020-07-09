module.exports = function() {
    var config = {
        appName: 'Vasutechs-ERP',
        arg: null,
        app: null,
        webServer: {
            distPath: './',
            serverPort: 9000,
            serverPath: 'http://localhost'
        },
        buildTasks: './build_tasks',
        task: {}
    };
    config.buildProRes = null;
    config.buildPromise = new Promise(function(res) {
        config.buildProRes = res;
    });
    return config;
};