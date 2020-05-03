module.exports = function(config, task, gulp) {
    var JsonDB = require('node-json-db');
    var url = require('url');
    var fs = require('fs');
    var path = require('path');
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
                data = db.getData('/tables' + dataPath);
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
        var uploadThisDb;
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
    task.apiConnect = function() {

        var httpMiddleWare = config.httpMiddleWare;
        // respond to all requests
        httpMiddleWare.use(function(req, res) {
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

            if (apiUrl.indexOf('/api') > -1) {
                req.on('data', function(resData) {
                    inputData += resData;
                });
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

            } else if (apiUrl.indexOf('/releaseProject') > -1) {
                var projectName = config.release.namePefix + '.zip';
                config.dist.path = config.release.dist;
                config.release.status = true;
                task.buildProject();
                config.buildPromise.then(function(resData) {
                    res.writeHead(200, {
                        'Content-Type': 'application/octet-stream',
                        'Content-Disposition': 'attachment; filename=' + projectName,
                        'Content-Length': resData.length
                    });

                    res.end(resData);
                });

            } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end();
            }
        });
    };


    gulp.task('server', task.server = function() {
        var connect = require('connect');
        var http = require('http');

        var middleWare = connect();

        middleWare.use(require('serve-static')(config.webServer.distPath));
        config.httpMiddleWare = middleWare;
        task.apiConnect();
        //create node.js http server and listen on port
        http.createServer(middleWare).listen(config.webServer.serverPort).on('listening', function() {
            require('open')(config.webServer.serverPath);
        });

    });

};