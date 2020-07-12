module.exports = function(config) {

    var JsonDB = require('node-json-db');
    var del = require('del');
    var masterDb = new JsonDB("./data/database", true, true);
    var authApis = {
        '/api/auth/logout': 'authLogout',
        '/api/auth/login': 'authLogin',
        '/api/auth/appCustomerlogin': 'appCustomerlogin',
        '/api/auth/checkLoggedIn': 'checkLoggedIn',
        '/api/auth/removeAppCustomer': 'removeAppCustomer',
        '/api/auth/getAppCustomer': 'getAppCustomer'
    };

    var apiMethods = {
        authLogout: function(req, res, next) {
            req.session.destroy();
            return {};
        },
        authLogin: function(req, res) {
            var data = config.task.login(req, masterDb) || config.task.login(req) || null;
            if (data && data.userName) {
                setAuthSession(req, data);
            }
            return data;
        },
        appCustomerlogin: function(req, res) {
            var user = req.session.auth || {};
            var inputData = req.body;
            var query = req.query;
            var appCustomer = inputData.appCustomer || query.appCustomer;
            var data;
            if (checkSuperAdminUser(req)) {
                user.appCustomer = appCustomer;
                setAuthSession(req, user);
                data = user;
            }
            return data;
        },
        restrictedDbData: function(req, res) {
            var data;
            if (checkSuperAdminUser(req)) {
                data = config.task.dbData(req, res, masterDb);
            }
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(401).send({});
            }
        },
        removeAppCustomer: function(req, res) {
            var query = req.query;
            var data;
            if (query.appCustomer) {
                del(["./data/appCustomer-" + query.appCustomer]);
                data = {};
            }
            return data;
        },
        getAppCustomer: function(req, res) {
            var data;
            data = masterDb.getData('/tables/appCustomers');
            return data;
        },
        downloadAppCustomers: function(req, res) {
            if (checkSuperAdminUser(req) && req.query.appCustomer) {
                var releaseProjectData = masterDb.getData('/tables/appCustomers/' + req.query.appCustomer);
                var projectName = config.release.namePefix + releaseProjectData.companyName + '.zip';
                if (releaseProjectData) {
                    config.task.releaseProject(req, res, releaseProjectData);
                    config.buildPromise.then(function(resData) {

                        res.writeHead(200, {
                            'Content-Type': 'application/octet-stream',
                            'Content-Disposition': 'attachment; filename=' + projectName,
                            'Content-Length': resData.length
                        });

                        res.end(resData);
                    });
                } else {
                    res.status(401).send({});
                }
            } else {
                res.status(401).send({});
            }
        },
        checkLoggedIn: function(req, res) {
            var data;
            if (req.session.auth && req.session.auth.loggedIn) {
                data = req.session.auth;
            }
            return data;
        },
        getTableData: function(req, res) {
            var data;
            if (checkUser(req)) {
                data = config.task.dbData(req);
            }
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(401).send({});
            }
        }
    }

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

    var callAuthApis = function(req, res) {
        var api = req.baseUrl;
        var data = authApis[api] && apiMethods[authApis[api]] && apiMethods[authApis[api]](req, res);
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(401).send({});
        }

    };

    for (var apiUrl in authApis) {
        config.app.use(apiUrl, callAuthApis);
    }

    config.app.use("/api/auth/downloadAppCustomers", apiMethods.downloadAppCustomers);
    config.app.use("/api/auth/restrict/:table", apiMethods.restrictedDbData);
    config.app.use("/api/auth/data/:table", apiMethods.getTableData);

};