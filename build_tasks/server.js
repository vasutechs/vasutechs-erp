var config = require('./config')();
var dbApi = require('./dbApi')();
var http = require('http');
var open = require('open');

var apiConnect = function() {
    // respond to all requests
    config.httpMiddleWare.use(function(req, res) {
        var apiUrl = req.originalUrl;
        var inputData = '';

        req.on('data', function(resData) {
            inputData += resData;
        });

        if (apiUrl.indexOf('/api') > -1) {
            req.on('end', function(data) {
                data = dbApi.dbConnect(req, res, inputData);
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
    config = Object.assign(config, newConfig || {});
    config.httpMiddleWare.use(require('serve-static')(config.webServer.distPath));
    apiConnect();
    //create node.js http server and listen on port
    return http.createServer(config.httpMiddleWare).listen(config.webServer.serverPort).on('listening', function() {
        open(config.webServer.serverPath);
    });
};
if (config.arg.run) {
    serverAPi();
}
module.exports = serverAPi;