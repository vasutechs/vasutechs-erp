module.exports = function(config) {
    var express = require("express");
    var cookieParser = require("cookie-parser");
    var session = require("express-session");
    var JsonDB = require('node-json-db');
    var del = require('del');
    var masterDb = new JsonDB("./data/database", true, true);

    config.app.use(cookieParser());
    config.app.use(
        session({
            secret: config.appName,
            name: config.appName,
            resave: true,
            saveUninitialized: true,
            //cookie: { maxAge: 6000 } /* 6000 ms? 6 seconds -> wut? :S */
        })
    );

    config.task.authLogout = function(req, res, next) {
        req.session.destroy();
        res.status(200).send({ succuss: false });
    };

    config.task.authLogin = function(req, res, next) {
        var currentDb = config.task.setCustomerCurrentDb(req.query, req.body.appCustomer) || masterDb;
        var data = config.task.login(req, currentDb) || {};
        if (data.userName) {
            setAuthSession(req, data);
            config.currentDb = {};
            res.status(200).send(data);
        } else {
            res.status(200).send({ succuss: false });
        }
    };

    var setAuthSession = function(req, data) {
        req.session.auth = data;
    };

    var checkUser = function(req) {
        var user = req.session.auth;
        if (user && user.loggedIn && user.userType === 'SUPERADMIN') {
            return true;
        } else {
            return false;
        }
    };

    var restrictedDbData = function(req, res) {
        var data = {};
        var inputData = req.body;
        var params = req.params;
        var query = req.query;
        var table = config.task.updateDataId(params, inputData, query);
        if (checkUser(req)) {
            if (!config.task.setCustomerCurrentDb(query, query.appCustomer)) {
                config.currentDb = masterDb;
            }

            if (req.method === 'POST') {
                data = config.task.setTableData(table, inputData);
            } else {
                data = config.task.getTableData(table);
            }
            res.status(200).send(data);
        } else {
            res.status(401).send(data);
        }


        return data;
    };

    var removeAppCustomer = function(req, res) {
        var query = req.query;
        if (query.appCustomer) {
            console.log(query.appCustomer);
            del(["./data/appCustomer-" + query.appCustomer]);
        }
    };

    config.task.checkLoggedIn = function(req, res) {
        if (req.session.auth && req.session.auth.loggedIn) {
            res.status(200).send(req.session.auth);
        } else {
            res.status(401).send({});
        }
    };

    config.app.use(express.json());
    config.app.use(express.urlencoded({ extended: false }));

    // redirect to login form
    config.app.use('/api/auth/data/:table', function(req, res) {
        var data = {};
        if (req.session.auth && req.session.auth.loggedIn) {
            data = config.task.dbData(req, res);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } else {
            res.status(401).send({});
        }

    });
    config.app.use('/api/auth/logout', config.task.authLogout);
    config.app.use('/api/auth/login', config.task.authLogin);
    config.app.use("/api/auth/checkLoggedIn", config.task.checkLoggedIn);
    config.app.use("/api/auth/removeAppCustomer", removeAppCustomer);
    config.app.use("/api/auth/restrict/:table", restrictedDbData);
};