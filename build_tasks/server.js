var server = function(config) {
    var express = require("express");
    var open = require('open');

    config.app.use(express.json());
    config.app.use(express.urlencoded({ extended: false }));
    config.app.use(express.static(config.webServer.distPath));

    config.task.server = function() {
        //create node.js http server and listen on port
        config.app.listen(config.webServer.serverPort, function() {
            open(config.webServer.serverPath);
        });
    };
    if (config.arg.run) {
        config.task.server();
    }
};
module.exports = server;