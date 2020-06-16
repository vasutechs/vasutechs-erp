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
            //cookie: { maxAge: 15000 } /* 6000 ms? 6 seconds -> wut? :S */
        })
    );

    config.task.authLogout = function(req, res, next) {
        req.session.destroy();
        res.status(200).send({});
    };

    config.task.authLogin = function(req, res) {
        var data = config.task.login(req, masterDb) || config.task.login(req) || {};
        if (data.userName) {
            setAuthSession(req, data);
            res.status(200).send(data);
        } else {
            res.status(200).send({});
        }
    };

    var setAuthSession = function(req, data) {
        req.session.auth = data;
    };

    var checkSuperAdminUser = function(req) {
        var user = req.session.auth;
        if (user && user.loggedIn && user.userType === 'SUPERADMIN') {
            return true;
        } else {
            return false;
        }
    };

    var checkUser = function(req) {
        var user = req.session.auth || {};
        var inputData = req.body;
        var query = req.query;
        var appCustomer = inputData.appCustomer || query.appCustomer;
        var userAppCustomer = user.appCustomer;
        if (user && user.loggedIn && (appCustomer === userAppCustomer.toString() || user.userType === 'SUPERADMIN')) {
            return true;
        } else {
            return false;
        }
    };


    var restrictedDbData = function(req, res) {
        var data = {};
        var query = req.query;
        if (checkSuperAdminUser(req)) {
            data = config.task.dbData(req, res, !query.appCustomer && masterDb);
            res.status(200).send(data);
        } else {
            res.status(401).send(data);
        }
        return data;
    };

    var removeAppCustomer = function(req, res) {
        var query = req.query;
        if (query.appCustomer) {
            del(["./data/appCustomer-" + query.appCustomer]);
            res.status(200).send({});
        } else {
            res.status(401).send({});
        }
    };

    var getAppCustomer = function(req, res) {
        var data;
        data = masterDb.getData('/tables/appCustomers');
        res.status(200).send(data);
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
    config.app.use('/api/auth/data/:table', function(req, res, next) {
        if (checkUser(req)) {
            var data = config.task.dbData(req);
            res.status(200).send(data);
        } else {
            res.status(401).send({});
        }

    });
    config.app.use('/api/auth/logout', config.task.authLogout);
    config.app.use('/api/auth/login', config.task.authLogin);
    config.app.use("/api/auth/checkLoggedIn", config.task.checkLoggedIn);
    config.app.use("/api/auth/removeAppCustomer", removeAppCustomer);
    config.app.use("/api/auth/getAppCustomer", getAppCustomer);
    config.app.use("/api/auth/restrict/:table", restrictedDbData);
};