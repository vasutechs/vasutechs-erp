module.exports = function(config) {
    var JsonDB = require('node-json-db');
    var fs = require('fs');
    var cryptr = new(require('cryptr'))(config.appName);

    config.currentDb = {};

    config.task.getTableData = function(table) {
        var data;
        try {
            data = table && config.currentDb.getData('/tables' + table) || config.currentDb.getData('/');
            if (data.password) {
                data.password = '';
            }
        } catch (error) {
            data = {};
        };
        return data;
    };


    config.task.setTableData = function(table, inputData) {
        var lastData,
            newId,
            id = '';
        var data;
        if (inputData.password) {
            inputData.password = cryptr.encrypt(inputData.password);
        }
        if (!inputData.id && !inputData.delete) {
            try {
                lastData = config.currentDb.getData('/tables' + table);
            } catch (error) {
                config.currentDb.push('/tables' + table, {}, true);
                lastData = config.currentDb.getData('/tables' + table);
            };
            lastData = lastData && lastData[Object.keys(lastData)[Object.keys(lastData).length - 1]];
            newId = lastData && lastData.id && parseInt(lastData.id) + 1 || 1;
            inputData['id'] = newId;
            inputData['added'] = new Date();
            table += '/' + newId;
        }
        try {
            config.databaseType && config.currentDb.push('/type', config.databaseType, true);
            config.appCustomer && config.currentDb.push('/appCustomer', config.appCustomer, true);
            config.currentDb.push('/updated', new Date(), true);
            config.currentDb.push('/updatedUserId', inputData.updatedUserId, true);
            if (inputData.delete) {
                config.currentDb.delete('/tables' + table);
                data = config.currentDb.getData('/tables' + table);
            } else {
                inputData['updated'] = new Date();
                config.currentDb.push('/tables' + table, inputData, true);
                data = config.currentDb.getData('/tables' + table);
            }

        } catch (error) {
            console.log(error);
            data = {};
        };
        return data;
    };

    var uploadTableData = function(inputData) {
        var inputVal = JSON.parse(inputData);
        config.databaseType = "yearly-" + new Date().getFullYear();
        for (var table in inputVal) {
            for (var data in inputVal[table]) {
                config.task.setTableData('/' + table, JSON.stringify(inputVal[table][data]));
            }
        }
        return currentYearDb.getData('/tables');
    };

    var uploadDb = function(inputData) {
        var inputVal = JSON.parse(inputData);
        var type = inputVal.type || null;
        var year = type && type.split('yearly-');
        var uploadThisDb = masterDb;
        if (!inputVal.tables) {
            return uploadTableData(inputData);
        } else {
            if (!type) {
                return {};
            }
            if (type !== 'master') {
                uploadThisDb = new JsonDB("data/" + year[1] + "/database", true, true);
            }
            uploadThisDb.delete('/');
            uploadThisDb.push('/', inputVal, true);
            uploadThisDb.push('/updated', new Date(), true);
            return uploadThisDb.getData('/tables');
        }

    };

    var getListDb = function() {
        var dir = './data';
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

    config.task.updateDataId = function(params, inputData, query) {
        var table = '/' + params.table;
        var id = inputData.id || query.id
        table += id ? ('/' + id) : '';
        return table;
    };

    config.task.dbData = function(req, res) {
        var data = {};
        var inputData = req.body;
        var params = req.params;
        var query = req.query;
        var table = config.task.updateDataId(params, inputData, query);
        if (config.task.setCustomerCurrentDb(query, inputData.appCustomer || query.appCustomer)) {
            if (table === 'download') {
                data = config.task.getTableData(inputData);
            } else if (table === 'getDatabases') {
                data = { list: getListDb(inputData) };
            } else if (table === 'upload') {
                data = uploadDb(inputData);
            } else if (req.method === 'POST') {
                data = config.task.setTableData(table, inputData);
            } else {
                data = config.task.getTableData(table);
            }

        }
        return data;
    };

    config.task.setCustomerCurrentDb = function(query, appCustomer) {
        var year = query.year;

        if (appCustomer) {
            if (year && year[1]) {
                config.currentDb = new JsonDB("./data/appCustomer-" + appCustomer + "/" + year[1] + "/database", true, true);
                config.databaseType = "yearly-" + year[1];
            } else {
                config.currentDb = new JsonDB("./data/appCustomer-" + appCustomer + "/database", true, true);
                config.databaseType = "appCustomerMaster";
                config.appCustomer = appCustomer;
            }
            return true;
        } else {
            config.currentDb = {};
            config.databaseType = undefined;
            config.appCustomer = undefined;
            return false;
        }
    };

    config.task.login = function(req, loginDb) {
        var data = {};
        var inputData = req.body;
        var query = req.query;

        loginDb = loginDb || config.task.setCustomerCurrentDb(query, inputData.appCustomer || query.appCustomer);
        if (loginDb) {
            var users = loginDb.getData('/tables/users');
            for (var i in users) {
                if (users[i].userName === inputData.userName && inputData.password === cryptr.decrypt(users[i].password)) {
                    data = {
                        id: users[i].id,
                        userName: users[i].userName,
                        userType: users[i].userType,
                        appCustomer: config.appCustomer,
                        loggedIn: true
                    };
                }
            }
        }
        return data;
    };

    // respond to all requests
    config.app.use('/api/data/:table', function(req, res) {
        var data = config.task.dbData(req);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));

    });

    config.app.use('/api/login', function(req, res) {
        var data = config.task.dbData(req, res);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));

    });

};