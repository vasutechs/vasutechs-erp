module.exports = function(config) {
    config.clientDbApi = function() {
        var MongoClient = require('mongodb').MongoClient;
        var clientDb;
        MongoClient.connect(config.mangoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            clientDb = db;
            console.log('Connected to Database');
        });
        var getTableData = function(table, dbConfig, query) {
            var data;
            var filter = getFilter(query);
            try {
                data = table && dbConfig.currentDb.collection(table).find(filter).toArray().then(function(res) {
                    return res.length == 1 && filter.id && res[0] || res;
                });
            } catch (error) {
                data = null;
            };
            return data || {};
        };

        var getNextSequence = function(table, dbConfig, id) {
            return getTableData(table, dbConfig).then(function(lastData) {
                lastData = lastData && lastData[lastData.length - 1];
                newId = lastData && lastData.id && parseInt(lastData.id) + 1 || 1;
                return newId;
            });
        }


        var setTableData = function(table, dbConfig, inputData, query) {
            var data = {};
            var filter = getFilter(query, inputData);
            var updatedInput;
            updateDatabaseDetails(dbConfig, inputData);
            try {
                if (!inputData.id && !inputData.delete) {
                    data = getNextSequence(table, dbConfig, 'id').then(function(newId) {
                        inputData['id'] = newId;
                        inputData['added'] = new Date();
                        return dbConfig.currentDb.collection(table).insertOne(inputData).then(function() {
                            return getTableData(table, dbConfig);
                        });
                    });

                } else if (inputData.delete) {
                    dbConfig.currentDb.collection(table).deleteOne(filter);
                    data = {};
                } else if (inputData.id) {
                    delete inputData['_id'];
                    inputData['updated'] = new Date();
                    updatedInput = { $set: inputData };
                    data = dbConfig.currentDb.collection(table).updateOne(filter, updatedInput).then(function() {
                        return getTableData(table, dbConfig);
                    });
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

            dbConfig.currentDb.collection('databaseDetails').updateOne({ id: 1 }, { $set: details });
        };

        var uploadDb = function(inputData, dbConfig) {
            var databaseDetails = inputData.tables && inputData.tables.databaseDetails[1] || inputData.tables.databaseDetails[0];
            if (databaseDetails && databaseDetails.appCustomer && databaseDetails.type && dbConfig.appCustomer === databaseDetails.appCustomer && dbConfig.type === databaseDetails.type) {
                for (var table in inputData.tables) {
                    dbConfig.currentDb.collection(table).deleteMany({});
                    var arrOfVals = [];
                    var tableData;
                    for (var obj in inputData.tables[table]) {
                        tableData = inputData.tables[table][obj];
                        delete tableData['_id'];
                        arrOfVals.push(tableData);
                    }
                    dbConfig.currentDb.collection(table).insertMany(arrOfVals);
                }
                updateDatabaseDetails(dbConfig, inputData);
            }
            return {};
        };

        var downloadDb = function(dbConfig) {
            var data = {
                tables: {}
            };
            var dataProm = [];
            return dbConfig.currentDb.listCollections().toArray().then(function(collInfos) {
                for (var i in collInfos) {
                    let table = collInfos[i].name;
                    dataProm.push(dbConfig.currentDb.collection(table).find().toArray().then(function(res) {
                        data.tables[table] = res;
                        return data;
                    }));
                }
                return Promise.all(dataProm).then(function() {
                    return data;
                });

            });

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
            if (clientDb) {
                if (appCustomer && !masterDb) {
                    if (year) {
                        dbConfig.currentDb = clientDb.db('appCustomer-' + appCustomer + '-' + year);
                        dbConfig.type = "yearly-" + year;
                        dbConfig.year = year;
                    } else {
                        dbConfig.currentDb = clientDb.db('appCustomer-' + appCustomer);
                        dbConfig.type = "appCustomerMaster";
                    }
                    dbConfig.appCustomer = appCustomer;
                    return dbConfig;
                } else if (masterDb) {
                    dbConfig.currentDb = clientDb.db('appMaster');
                    return dbConfig;
                }
            }

            return false;
        };


        var getFilter = function(query, inputData) {
            var id = inputData && inputData.id || query && query.id;
            var filter = id && {
                id: parseInt(id)
            } || {};

            Object.assign(filter, query && query.filter || {});
            return filter;
        };

        return {
            getTableData: getTableData,
            setTableData: setTableData,
            uploadDb: uploadDb,
            getYearListDb: getYearListDb,
            setCustomerCurrentDb: setCustomerCurrentDb,
            updateDatabaseDetails: updateDatabaseDetails,
            downloadDb: downloadDb
        };
    };
};