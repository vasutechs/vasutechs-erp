module.exports = function (config) {
    config.dbApi = function () {
        var cryptr = new(require('cryptr'))(config.appName);
        var dbApi = (config.arg.mangoDb || config.arg.mangoDb) && config.clientDbApi() || config.localJsonDbApi();
        config.task.deleteCustomer = dbApi.deleteCustomer;
        config.task.getListDb = dbApi.getListDb;
        config.task.dbData = function (req, res, masterDb) {
            var data = {};
            var inputData = req.body || {};
            var params = req.params || {};
            var query = req.query || {};
            var table = params.table;
            var dbConfig = dbApi.setCustomerCurrentDb(inputData.appCustomer || query.appCustomer, inputData.year || query.year, masterDb) || {};

            if (dbConfig.currentDb) {
                if (table === 'databaseDownload') {
                    data = dbApi.downloadDb(dbConfig);
                } else if (table === 'getYearDatabases') {
                    data = dbApi.getYearListDb(dbConfig);
                } else if (table === 'databaseUpload') {
                    data = dbApi.uploadDb(inputData, dbConfig);
                } else if (table === 'syncServer') {
                    data = config.task.storeDataServer(inputData, query, req, res);
                } else if (req.method === 'POST') {
                    if (inputData.password) {
                        inputData.password = cryptr.encrypt(inputData.password);
                    }
                    data = dbApi.setTableData(table, dbConfig, inputData, query);
                } else {
                    data = dbApi.getTableData(table, dbConfig, query);
                }

            }
            return data;
        };
        config.task.setCustomerCurrentDb = dbApi.setCustomerCurrentDb;
        config.task.getTableData = dbApi.getTableData;
        config.task.setTableData = dbApi.setTableData;

        config.task.login = function (req, masterDb) {

            var inputData = req.body || {};
            var query = req.query || {};
            var dbConfig = dbApi.setCustomerCurrentDb(inputData.appCustomer || query.appCustomer, inputData.year || query.year, masterDb) || {};
            var getLoginUser = function (users) {
                var data = null;
                for (var i in users) {
                    if (users[i].userName === inputData.userName && inputData.password === cryptr.decrypt(users[i].password)) {
                        data = {
                            id: users[i].id,
                            userName: users[i].userName,
                            userType: users[i].userType,
                            appCustomer: inputData.appCustomer || query.appCustomer,
                            loggedIn: true
                        };
                        users[i].laskLogin = new Date();
                        dbApi.setTableData('users', dbConfig, users[i], {}, true);
                    }
                }
                return data;
            };
            if (dbConfig.currentDb) {
                var userList = dbApi.getTableData('users', dbConfig);
                return userList.then && userList.then(function (users) {
                    return getLoginUser(users);
                }) || getLoginUser(userList);

            }
            return {};
        };
		
        // respond to all requests
        config.app.use('/api/data/:table', function (req, res) {
            var data = config.task.dbData(req, res) || {};
            data && data.then && data.then(function (resData) {
                res.status(200).send(data)
            }) || res.status(200).send(data);
        });
		
		config.app.use('/api/localBackUpDb', function (req, res) {
            var data = dbApi.localBackUpDb(res);
            res.status(200).send(data);

        });

        config.app.use('/api/login', function (req, res) {
            var data = config.task.login(req);
            res.status(200).send(data);

        });
    };
};
