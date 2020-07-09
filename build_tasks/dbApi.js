module.exports = function(config) {
    var JsonDB = require('node-json-db');
    var fs = require('fs');
    var cryptr = new(require('cryptr'))(config.appName);

    var getTableData = function(table, dbConfig) {
        var data;
        try {
            data = table && dbConfig.currentDb.getData('/tables' + table) || dbConfig.currentDb.getData('/');
            if (data.password) {
                data.password = '';
            }
        } catch (error) {
            data = null;
        };
        return data;
    };


    var setTableData = function(table, inputData, dbConfig) {
        var lastData,
            newId,
            id = '';
        var data;
        if (inputData.password) {
            inputData.password = cryptr.encrypt(inputData.password);
        }
        if (!inputData.id && !inputData.delete) {
            try {
                lastData = dbConfig.currentDb.getData('/tables' + table);
            } catch (error) {
                dbConfig.currentDb.push('/tables' + table, {}, true);
                lastData = dbConfig.currentDb.getData('/tables' + table);
            };
            lastData = lastData && lastData[Object.keys(lastData)[Object.keys(lastData).length - 1]];
            newId = lastData && lastData.id && parseInt(lastData.id) + 1 || 1;
            inputData['id'] = newId;
            inputData['added'] = new Date();
            table += '/' + newId;
        }
        try {
            dbConfig.databaseType && dbConfig.currentDb.push('/type', dbConfig.databaseType, true);
            dbConfig.year && dbConfig.currentDb.push('/year', dbConfig.year, true);
            dbConfig.appCustomer && dbConfig.currentDb.push('/appCustomer', dbConfig.appCustomer, true);
            dbConfig.currentDb.push('/updated', new Date(), true);
            dbConfig.currentDb.push('/updatedUserId', inputData.updatedUserId, true);
            if (inputData.delete) {
                dbConfig.currentDb.delete('/tables' + table);
                data = {};
            } else {
                inputData['updated'] = new Date();
                dbConfig.currentDb.push('/tables' + table, inputData, true);
                data = dbConfig.currentDb.getData('/tables' + table);
            }

        } catch (error) {
            data = null;
        };
        return data;
    };

    var uploadDb = function(inputData, dbConfig) {
        var type = inputData.type || null;
        if (inputData.appCustomer && type && dbConfig.appCustomer === inputData.appCustomer && dbConfig.databaseType === type) {
            dbConfig.currentDb.delete('/');
            dbConfig.currentDb.push('/', inputData, true);
            dbConfig.currentDb.push('/updatedUserId', inputData.updatedUserId, true);
            dbConfig.currentDb.push('/updated', new Date(), true);
            return dbConfig.currentDb.getData('/tables');
        }
        return {};
    };

    var getYearListDb = function(dbConfig) {
        var dir = "./data/appCustomer-" + dbConfig.appCustomer;
        var files = fs.readdirSync(dir);
        var listDbYears = [];
        for (var i in files) {
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                listDbYears.push(files[i]);
            }
        }
        return listDbYears;
    };

    var setCustomerCurrentDb = function(appCustomer, year) {
        var dbConfig = {};
        if (appCustomer) {
            if (year) {
                dbConfig.currentDb = new JsonDB("./data/appCustomer-" + appCustomer + "/" + year + "/database", true, true);
                dbConfig.databaseType = "yearly-" + year;
                dbConfig.year = year;
            } else {
                dbConfig.currentDb = new JsonDB("./data/appCustomer-" + appCustomer + "/database", true, true);
                dbConfig.databaseType = "appCustomerMaster";
            }
            dbConfig.appCustomer = appCustomer;
            return dbConfig;
        }
        return false;
    };


    var updateDataId = function(params, inputData, query) {
        var table = '/' + params.table;
        var id = inputData.id || query.id
        table += id ? ('/' + id) : '';
        return table;
    };

    config.task.dbData = function(req, res, localDb) {
        var data = {};
        var inputData = req.body || {};
        var params = req.params || {};
        var query = req.query || {};
        var table = updateDataId(params, inputData, query);
        var dbConfig = setCustomerCurrentDb(inputData.appCustomer || query.appCustomer, inputData.year || query.year) || {};
        if (localDb) {
            dbConfig.currentDb = localDb;
        }
        if (dbConfig.currentDb) {
            if (table === '/databaseDownload') {
                data = dbConfig.currentDb.getData('/');
            } else if (table === '/getYearDatabases') {
                data = { list: getYearListDb(dbConfig) };
            } else if (table === '/databaseUpload') {
                data = uploadDb(inputData, dbConfig);
            } else if (req.method === 'POST') {
                data = setTableData(table, inputData, dbConfig);
            } else {
                data = getTableData(table, dbConfig);
            }

        }
        return data;
    };

    config.task.login = function(req, localDb) {
        var data = null;
        var inputData = req.body || {};
        var query = req.query || {};
        var dbConfig = setCustomerCurrentDb(inputData.appCustomer || query.appCustomer, inputData.year || query.year) || {};
        if (localDb) {
            dbConfig.currentDb = localDb;
        }
        if (dbConfig.currentDb) {
            var users = dbConfig.currentDb.getData('/tables/users');
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
                    dbConfig.currentDb.push('/tables/users/' + users[i].id, users[i], true);
                }
            }
        }
        return data;
    };



    // respond to all requests
    config.app.use('/api/data/:table', function(req, res) {
        var data = config.task.dbData(req);
        res.status(200).send(data);

    });

    config.app.use('/api/login', function(req, res) {
        var data = config.task.login(req);
        res.status(200).send(data);

    });

};