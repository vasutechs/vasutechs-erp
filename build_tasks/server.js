var config = require('./config')();
var JsonDB = require('node-json-db');
var url = require('url');
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
var apiConnect = function() {
    // respond to all requests
    config.httpMiddleWare.use(function(req, res) {
        var apiUrl = url.parse(req.url, true).pathname,
            apiPath = apiUrl.split('/api'),
            year = apiUrl.match(new RegExp("YEAR-(.*)/api")),
            inputData = '';
        if (year && year[1]) {
            db = calendarYear === year[1] && currentYearDb || new JsonDB("data/" + year[1] + "/database", true, true);
            databaseType = "yearly-" + year[1];
        } else {
            db = masterDb;
            databaseType = "master";
        }
        req.on('data', function(resData) {
            inputData += resData;
        });
        if (apiUrl.indexOf('/api') > -1) {

            req.on('end', function(data) {
                if (apiPath[1] === '/download') {
                    data = db.getData('/');
                } else if (apiPath[1] === '/getDatabases') {
                    data = { list: getListDb() };
                } else if (apiPath[1] === '/upload') {
                    data = uploadDb(inputData);
                } else if (apiPath[1] === '/calendarYear') {
                    db = currentYearDb = new JsonDB("data/" + year[1] + "/database", true, true);
                } else if (req.method === 'POST') {
                    data = setTableData(apiPath[1], inputData);
                } else {
                    data = getTableData(apiPath[1]);
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            });

        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end();
        }
    });
};


var serverAPi = function(newConfig) {
    var http = require('http');
    config = Object.assign(config, newConfig || {});
    console.log(config);
    config.httpMiddleWare.use(require('serve-static')(config.webServer.distPath));
    apiConnect();
    //create node.js http server and listen on port
    return http.createServer(config.httpMiddleWare).listen(config.webServer.serverPort).on('listening', function() {
        require('open')(config.webServer.serverPath);
    });
};
if (config.arg.run) {
    serverAPi();
}
module.exports = serverAPi;