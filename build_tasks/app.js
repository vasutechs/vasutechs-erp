var app = function() {
    var config = require('./config')();
    var cookieParser = require("cookie-parser");
    var session = require("express-session");
    var express = require("express");
    var arg = require('minimist')(process.argv);
    const fs = require('fs');

    config.arg = arg;
    config.app = express();
    config.app.use(express.json({ limit: '50mb' }));
    config.app.use(express.urlencoded({ extended: false, limit: '50mb' }));
    config.app.use(cookieParser());
    config.app.use(
        session({
            secret: config.appName,
            name: config.appName,
            resave: true,
            saveUninitialized: true,
            //cookie: { maxAge: 15000 } /* 6000 ms? 6 seconds -> wut? :S */
        })
    );

    fs.readdirSync(config.buildTasks).forEach(file => {
        if (file !== 'app.js' && file !== 'config.js') {
            require('./' + file)(config);
        }
    });
}

module.exports = app();