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
        buildTasks: __dirname,
        task: {},
        mangoDb: false,
        mangoDbUrl: 'mongodb://localhost:27017',
        apiProRes: null
    };
    config.apiPromise = function() {
        config.apiProRes = null;
        return new Promise(function(res) {
            config.apiProRes = res;
        });
    };
    return config;
};