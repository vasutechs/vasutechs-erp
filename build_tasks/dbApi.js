module.exports = function() {
    var JsonDB = require('node-json-db');
    var fs = require('fs');
    var masterDb = new JsonDB("data/database", true, true);
    var currentDb;
    var databaseType;
    var calendarYear = new Date().getMonth() >= 3 ? new Date().getFullYear() : new Date().getFullYear() - 1;
    var currentYearDb = new JsonDB("data/" + calendarYear + "/database", true, true);
    var getTableData = function(dataPath) {
        var data;
        try {
            data = dataPath && currentDb.getData('/tables' + dataPath) || currentDb.getData('/');
        } catch (error) {
            data = {};
        };
        return data;
    };

    var setCurrentDb = function(year) {
        if (year && year[1]) {
            currentDb = currentYearDb = calendarYear === year[1] && currentYearDb || new JsonDB("data/" + year[1] + "/database", true, true);
            databaseType = "yearly-" + year[1];
        } else {
            currentDb = masterDb;
            databaseType = "master";
        }
    };

    var setTableData = function(dataPath, inputData) {
        var lastData,
            newId,
            id = '';
        inputData = JSON.parse(inputData);
        if (!inputData.id && !inputData.delete) {
            try {
                lastData = currentDb.getData('/tables' + dataPath);
            } catch (error) {
                currentDb.push('/tables' + dataPath, {}, true);
                lastData = currentDb.getData('/tables' + dataPath);
            };
            lastData = lastData && lastData[Object.keys(lastData)[Object.keys(lastData).length - 1]];
            newId = lastData && lastData.id && parseInt(lastData.id) + 1 || 1;
            inputData['id'] = newId;
            inputData['added'] = new Date();
        }
        try {
            currentDb.push('/type', databaseType, true);
            currentDb.push('/updated', new Date(), true);
            if (inputData.delete) {
                currentDb.delete('/tables' + dataPath + '/' + inputData.key);
                data = currentDb.getData('/tables' + dataPath);
            } else {
                id = '/' + inputData.id;
                inputData['updated'] = new Date();
                currentDb.push('/tables' + dataPath + id, inputData, true);
                data = currentDb.getData('/tables' + dataPath + id);
            }

        } catch (error) {
            data = {};
        };
        return data;
    };

    var uploadTableData = function(inputData) {
        var inputVal = JSON.parse(inputData);
        currentDb = currentYearDb;
        databaseType = "yearly-" + new Date().getFullYear();
        for (var table in inputVal) {
            for (var data in inputVal[table]) {
                setTableData('/' + table, JSON.stringify(inputVal[table][data]));
            }
        }
        return currentDb.getData('/tables');
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

    var dbConnect = function(req, res, inputData) {
        var apiUrl = req.originalUrl;
        var apiPath = apiUrl.split('/api');
        var year = apiUrl.match(new RegExp("YEAR-(.*)/api"));
        var data;

        setCurrentDb(year);
        if (apiPath[1] === '/download') {
            data = getTableData();
        } else if (apiPath[1] === '/getDatabases') {
            data = { list: getListDb() };
        } else if (apiPath[1] === '/upload') {
            data = uploadDb(inputData);
        } else if (apiPath[1] === '/calendarYear') {
            setCurrentDb(year);
        } else if (req.method === 'POST') {
            data = setTableData(apiPath[1], inputData);
        } else {
            data = getTableData(apiPath[1] || apiUrl);
        }
        return data;
    };

    return {
        dbConnect: dbConnect
    }
};