module.exports = function(config) {
    var fs = require('fs');
    var cryptr = new(require('cryptr'))(config.appName);
    var localJsonDbApi = function() {
        var JsonDB = require('node-json-db');
        var getTableData = function getTableData(table, dbConfig, query) {
            var data;
            table = updateDataId(table, query);
            try {
                data = table && dbConfig.currentDb.getData('/tables/' + table) || dbConfig.currentDb.getData('/tables');
            } catch (error) {
                data = null;
            };
            return data || {};
        };


        var setTableData = function(table, dbConfig, inputData, query) {
            var lastData,
                newId,
                id = '';
            var data;
            table = updateDataId(table, query, inputData);
            if (!inputData.id && !inputData.delete) {
                try {
                    lastData = getTableData(table, dbConfig);
                } catch (error) {

                };
                lastData = lastData && lastData[Object.keys(lastData)[Object.keys(lastData).length - 1]];
                newId = lastData && lastData.id && parseInt(lastData.id) + 1 || 1;
                inputData['id'] = newId;
                inputData['added'] = new Date();
                table += '/' + newId;
            }
            try {

                if (inputData.delete) {
                    dbConfig.currentDb.delete('/tables/' + table);
                    data = {};
                } else {
                    inputData['updated'] = new Date();
                    dbConfig.currentDb.push('/tables/' + table, inputData, true);
                    data = getTableData(table, dbConfig);
                    updateDatabaseDetails(dbConfig, inputData);
                }

            } catch (error) {
                console.log(error);
                data = null;
            };
            return data;
        };

        var updateDatabaseDetails = function(dbConfig, inputData) {
            var details = {
                id: 1,
                type: dbConfig.type || 'appMaster',
                year: dbConfig.year,
                appCustomer: dbConfig.appCustomer,
                updated: new Date(),
                updatedUserId: inputData.updatedUserId
            };
            dbConfig.currentDb.push('/tables/databaseDetails/1', details, true);
        };

        var uploadDb = function(inputData, dbConfig) {
            var databaseDetails = inputData.tables && inputData.tables.databaseDetails[1];
            if (databaseDetails && databaseDetails.appCustomer && databaseDetails.type && dbConfig.appCustomer === databaseDetails.appCustomer && dbConfig.type === databaseDetails.type) {
                dbConfig.currentDb.delete('/');
                dbConfig.currentDb.push('/', inputData, true);
                return getTableData(null, dbConfig);
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

        var setCustomerCurrentDb = function(appCustomer, year, masterDb) {
            var dbConfig = {};
            if (appCustomer) {
                if (year) {
                    dbConfig.currentDb = new JsonDB("./data/appCustomer-" + appCustomer + "/" + year + "/database", true, true);
                    dbConfig.type = "yearly-" + year;
                    dbConfig.year = year;
                } else {
                    dbConfig.currentDb = new JsonDB("./data/appCustomer-" + appCustomer + "/database", true, true);
                    dbConfig.type = "appCustomerMaster";
                }
                dbConfig.appCustomer = appCustomer;
                return dbConfig;
            } else if (masterDb) {
                dbConfig.currentDb = new JsonDB("./data/database", true, true);
                return dbConfig;
            }
            return false;
        };


        var updateDataId = function(table, query, inputData) {
            var id = inputData && inputData.id || query && query.id;
            table += id ? ('/' + id) : '';
            return table;
        };

        return {
            getTableData: getTableData,
            setTableData: setTableData,
            uploadDb: uploadDb,
            getYearListDb: getYearListDb,
            setCustomerCurrentDb: setCustomerCurrentDb,
            updateDatabaseDetails: updateDatabaseDetails
        }
    };
    var mangoDbApi = function() {
        var mongoClient;
        require('mongodb').MongoClient.connect(config.mangoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            mongoClient = db;
            console.log('Connected to Database');
        });
        var getTableData = function getTableData(table, dbConfig, query) {
            var data;
            table = updateDataId(table, query);
            try {
                data = table && dbConfig.currentDb.collection(table).find();
            } catch (error) {
                data = null;
            };
            return data || {};
        };


        var setTableData = function(table, dbConfig, inputData, query) {
            var lastData,
                newId,
                id = '';
            var data;
            table = updateDataId(table, query, inputData);
            if (!inputData.id && !inputData.delete) {
                try {
                    lastData = getTableData(table, dbConfig);
                } catch (error) {

                };
                lastData = lastData && lastData[Object.keys(lastData)[Object.keys(lastData).length - 1]];
                newId = lastData && lastData.id && parseInt(lastData.id) + 1 || 1;
                inputData['id'] = newId;
                inputData['added'] = new Date();
                table += '/' + newId;
            }
            try {

                if (inputData.delete) {
                    dbConfig.currentDb.delete('/tables/' + table);
                    data = {};
                } else {
                    inputData['updated'] = new Date();
                    dbConfig.currentDb.push('/tables/' + table, inputData, true);
                    data = getTableData(table, dbConfig);
                }

            } catch (error) {
                console.log(error);
                data = null;
            };
            return data;
        };

        var updateDatabaseDetails = function(dbConfig, inputData) {
            var details = {
                id: 1,
                type: dbConfig.type || 'appMaster',
                year: dbConfig.year,
                appCustomer: dbConfig.appCustomer,
                updated: new Date(),
                updatedUserId: inputData.updatedUserId
            };

            setTableData('databaseDetails', dbConfig, details);
        };

        var uploadDb = function(inputData, dbConfig) {
            var databaseDetails = inputData.tables && inputData.tables.databaseDetails[1];
            if (databaseDetails && databaseDetails.appCustomer && databaseDetails.type && dbConfig.appCustomer === databaseDetails.appCustomer && dbConfig.type === databaseDetails.type) {
                dbConfig.currentDb.delete('/');
                dbConfig.currentDb.push('/', inputData, true);
                updateDatabaseDetails(dbConfig, inputData);
                return getTableData(null, dbConfig);
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

        var setCustomerCurrentDb = function(appCustomer, year, masterDb) {
            var dbConfig = {};
            if (appCustomer) {
                if (year) {
                    dbConfig.currentDb = new JsonDB("./data/appCustomer-" + appCustomer + "/" + year + "/database", true, true);
                    dbConfig.type = "yearly-" + year;
                    dbConfig.year = year;
                } else {
                    dbConfig.currentDb = new JsonDB("./data/appCustomer-" + appCustomer + "/database", true, true);
                    dbConfig.type = "appCustomerMaster";
                }
                dbConfig.appCustomer = appCustomer;
                return dbConfig;
            } else if (masterDb) {
                //console.log(mongoClient);
                dbConfig.currentDb = mongoClient.db("appMaster");
                return dbConfig;
            }
            return false;
        };


        var updateDataId = function(table, query, inputData) {
            var id = inputData && inputData.id || query && query.id;
            table += id ? ('/' + id) : '';
            return table;
        };

        return {
            getTableData: getTableData,
            setTableData: setTableData,
            uploadDb: uploadDb,
            getYearListDb: getYearListDb,
            setCustomerCurrentDb: setCustomerCurrentDb,
            updateDatabaseDetails: updateDatabaseDetails
        }
    };
    var dbApi = localJsonDbApi(); //mangoDbApi(); //localJsonDbApi();


    config.task.dbData = function(req, res, masterDb) {
        var data = {};
        var inputData = req.body || {};
        var params = req.params || {};
        var query = req.query || {};
        var table = params.table;
        var dbConfig = dbApi.setCustomerCurrentDb(inputData.appCustomer || query.appCustomer, inputData.year || query.year, masterDb) || {};
        if (dbConfig.currentDb) {
            if (table === '/databaseDownload') {
                data = dbConfig.currentDb.getData('/');
            } else if (table === '/getYearDatabases') {
                data = { list: dbApi.getYearListDb(dbConfig) };
            } else if (table === '/databaseUpload') {
                data = dbApi.uploadDb(inputData, dbConfig);
            } else if (req.method === 'POST') {
                if (inputData.password) {
                    inputData.password = cryptr.encrypt(inputData.password);
                }
                data = dbApi.setTableData(table, dbConfig, inputData, query);
            } else {
                data = dbApi.getTableData(table, dbConfig, query);
                if (data.password) {
                    data.password = '';
                }
            }

        }
        return data;
    };

    config.task.login = function(req, masterDb) {
        var data = null;
        var inputData = req.body || {};
        var query = req.query || {};
        var dbConfig = dbApi.setCustomerCurrentDb(inputData.appCustomer || query.appCustomer, inputData.year || query.year, masterDb) || {};

        if (dbConfig.currentDb) {
            var users = dbApi.getTableData('users', dbConfig);
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
                    dbApi.setTableData('users', dbConfig, users[i]);
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