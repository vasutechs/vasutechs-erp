module.exports = function(gulp, config, task) {
    var JsonDB = require('node-json-db');
    var url = require('url');
    var db = new JsonDB("data/database", true, true);
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

    gulp.task('db-connect', task.dbConnect = function() {

        var httpMiddleWare = config.httpMiddleWare;
        // respond to all requests
        httpMiddleWare.use(function(req, res) {
            var apiUrl = url.parse(req.url, true).pathname,
                apiPath = apiUrl.split('/api'),
                data,
                inputData = '';
            if (apiUrl.indexOf('/api') > -1) {
                req.on('data', function(data) {
                    inputData += data;
                });

                req.on('end', function(data) {
                    if (apiPath[1] === '/download') {
                        data = db.getData('/');
                    } else if (apiPath[1] === '/upload') {
                        data = uploadDb(inputData);
                    } else if (req.method === 'POST') {
                        data = setTableData(apiPath[1], inputData);
                    } else {
                        data = getTableData(apiPath[1])
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                });

            } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end();
            }
        });
    });
};