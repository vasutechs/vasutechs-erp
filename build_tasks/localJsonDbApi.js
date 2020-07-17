module.exports = function(config) {
    config.localJsonDbApi = function() {
        var fs = require('fs');
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
        };
    };
};