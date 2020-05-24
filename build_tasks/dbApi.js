module.exports = function() {
    var masterDb = new JsonDB("data/database", true, true);
    var db;
    var databaseType;
    var calendarYear = new Date().getMonth() >= 3 ? new Date().getFullYear() : new Date().getFullYear() - 1;
    var currentYearDb = new JsonDB("data/" + calendarYear + "/database", true, true);
    var getTableData = function(dataPath, inputData) {
        var data;
        try {
            data = db.getData('/tables' + dataPath);
        } catch (error) {
            data = {};
        };
        return data;
    };

    var setTableData = function(dataPath, inputData) {
        var lastData,
            newId,
            id = '';
        inputData = JSON.parse(inputData);
        if (!inputData.id && !inputData.delete) {
            try {
                lastData = db.getData('/tables' + dataPath);
            } catch (error) {
                db.push('/tables' + dataPath, {}, true);
                lastData = db.getData('/tables' + dataPath);
            };
            lastData = lastData && lastData[Object.keys(lastData)[Object.keys(lastData).length - 1]];
            newId = lastData && lastData.id && parseInt(lastData.id) + 1 || 1;
            inputData['id'] = newId;
            inputData['added'] = new Date();
        }
        try {
            db.push('/type', databaseType, true);
            db.push('/updated', new Date(), true);
            if (inputData.delete) {
                db.delete('/tables' + dataPath + '/' + inputData.key);
                data = db.getData('/tables' + dataPath);
            } else {
                id = '/' + inputData.id;
                inputData['updated'] = new Date();
                db.push('/tables' + dataPath + id, inputData, true);
                data = db.getData('/tables' + dataPath + id);
            }

        } catch (error) {
            data = {};
        };
        return data;
    };

    var uploadTableData = function(inputData) {
        var inputVal = JSON.parse(inputData);
        db = currentYearDb;
        databaseType = "yearly-" + new Date().getFullYear();
        for (var table in inputVal) {
            for (var data in inputVal[table]) {
                setTableData('/' + table, JSON.stringify(inputVal[table][data]));
            }
        }
        return db.getData('/tables');
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
};