var server = function(config) {
    var express = require("express");
    var open = require('open');

    config.app.use(express.static(config.webServer.distPath));

    config.task.server = function() {
        var createServer = function() {
            config.app.listen(config.webServer.serverPort, function() {
                open(config.webServer.serverPath + ':' + config.webServer.serverPort);
            }).on('error', function(err) {
                config.webServer.serverPort++;
                createServer();
            });
        };
        //create node.js http server and listen on port
        createServer();

    };
    if (config.arg.run) {
        config.task.server();
    }
};
module.exports = server;