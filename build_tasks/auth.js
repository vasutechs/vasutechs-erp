module.exports = function(config) {

    var JsonDB = require('node-json-db');
    var del = require('del');
    var masterDb = new JsonDB("./data/database", true, true);

    var authLogout = function(req, res, next) {
        req.session.destroy();
        res.status(200).send({});
    };

    var authLogin = function(req, res) {
        var data = config.task.login(req, masterDb) || config.task.login(req) || {};
        if (data.userName) {
            setAuthSession(req, data);
            res.status(200).send(data);
        } else {
            res.status(200).send({});
        }
    };

    var appCustomerlogin = function(req, res) {
        var user = req.session.auth || {};
        var inputData = req.body;
        var query = req.query;
        var appCustomer = inputData.appCustomer || query.appCustomer;
        if (checkSuperAdminUser(req)) {
            user.appCustomer = appCustomer;
            setAuthSession(req, user);
            res.status(200).send(user);
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
            data = config.task.dbData(req, res, masterDb);
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

    var downloadAppCustomers = function(req, res) {
        if (checkSuperAdminUser(req) && req.query.appCustomer) {
            var releaseProjectData = masterDb.getData('/tables/appCustomers/' + req.query.appCustomer);
            config.task.releaseProject(req, res, releaseProjectData);
        } else {
            res.status(401).send({});
        }
    };


    var checkLoggedIn = function(req, res) {
        if (req.session.auth && req.session.auth.loggedIn) {
            res.status(200).send(req.session.auth);
        } else {
            res.status(401).send({});
        }
    };



    // redirect to login form
    config.app.use('/api/auth/data/:table', function(req, res, next) {
        if (checkUser(req)) {
            var data = config.task.dbData(req);
            res.status(200).send(data);
        } else {
            res.status(401).send({});
        }

    });
    config.app.use('/api/auth/logout', authLogout);
    config.app.use('/api/auth/login', authLogin);
    config.app.use('/api/auth/appCustomerlogin', appCustomerlogin);
    config.app.use("/api/auth/checkLoggedIn", checkLoggedIn);
    config.app.use("/api/auth/removeAppCustomer", removeAppCustomer);
    config.app.use("/api/auth/getAppCustomer", getAppCustomer);
    config.app.use("/api/auth/downloadAppCustomers", downloadAppCustomers);
    config.app.use("/api/auth/restrict/:table", restrictedDbData);
};