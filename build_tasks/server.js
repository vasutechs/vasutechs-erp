module.exports = function(config, task, gulp) {
    var JsonDB = require('node-json-db');
    var url = require('url');
    var masterDb = new JsonDB("data/database", true, true);
    var db;
    var currentYearDb = new JsonDB("data/" + new Date().getFullYear() + "/database", true, true);
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

    var uploadDb = function(inputData) {
        db.delete('/tables');
        db.push('/tables', JSON.parse(inputData), true);
        db.push('/updated', new Date(), true);
        data = db.getData('/tables');
        return data;
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
                db = currentYearDb;
            } else {
                db = masterDb;
            }
            if (apiUrl.indexOf('/api') > -1) {
                req.on('data', function(resData) {
                    inputData += resData;
                });
                req.on('end', function(data) {
                    if (apiPath[1] === '/download') {
                        data = db.getData('/');
                    } else if (apiPath[1] === '/upload') {
                        data = uploadDb(inputData);
                    } else if (apiPath[1] === '/calendarYear') {
                        db = currentYearDb = new JsonDB("data/" + year[1] + "/database", true, true)
                    } else if (req.method === 'POST') {
                        data = setTableData(apiPath[1], inputData);
                    } else {
                        data = getTableData(apiPath[1]);
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                });

            } else if (apiUrl.indexOf('/releaseProject') > -1) {
                task.buildProject();
                res.end();
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