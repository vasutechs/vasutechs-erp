var config = require('./config')();
var url = require('url');
var dbApi = require('./dbApi')();
var apiConnect = function() {
    // respond to all requests
    config.httpMiddleWare.use(function(req, res) {
        var apiUrl = url.parse(req.url, true).pathname,
            apiPath = apiUrl.split('/api'),
            year = apiUrl.match(new RegExp("YEAR-(.*)/api")),
            inputData = '';
        dbApi.setCurrentDb(year);
        req.on('data', function(resData) {
            inputData += resData;
        });
        if (apiUrl.indexOf('/api') > -1) {

            req.on('end', function(data) {
                if (apiPath[1] === '/download') {
                    data = dbApi.getTableData();
                } else if (apiPath[1] === '/getDatabases') {
                    data = { list: dbApi.getListDb() };
                } else if (apiPath[1] === '/upload') {
                    data = dbApi.uploadDb(inputData);
                } else if (apiPath[1] === '/calendarYear') {
                    dbApi.setCurrentDb(year);
                } else if (req.method === 'POST') {
                    data = dbApi.setTableData(apiPath[1], inputData);
                } else {
                    data = dbApi.getTableData(apiPath[1]);
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            });

        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end();
        }
    });
};


var serverAPi = function(newConfig) {
    var http = require('http');
    config = Object.assign(config, newConfig || {});
    config.httpMiddleWare.use(require('serve-static')(config.webServer.distPath));
    apiConnect();
    //create node.js http server and listen on port
    return http.createServer(config.httpMiddleWare).listen(config.webServer.serverPort).on('listening', function() {
        require('open')(config.webServer.serverPath);
    });
};
if (config.arg.run) {
    serverAPi();
}
module.exports = serverAPi;