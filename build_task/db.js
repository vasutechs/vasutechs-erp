module.exports = function(gulp, config, task) {
    var JsonDB = require('node-json-db');
    var url = require('url');
    var db = new JsonDB("data/database", true, true);
    var getTableData = function(dataPath, inputData) {
        var data;
        try {
            data = db.getData('/tables' + dataPath);
        } catch (error) {
            data = error;
        };
        return data;
    };

    var setTableData = function(dataPath, inputData) {
        var lastData,
            dataKeys,
            newId,
            dataObject = {};
        inputData = JSON.parse(inputData);
        if (!inputData.id) {
            dataKeys = Object.keys(db.getData('/tables' + dataPath));
            lastData = dataKeys[dataKeys.length - 1];
            newId = lastData > 0 && parseInt(lastData) + 1 || 1;
            inputData['id'] = newId;
            dataObject[newId] = inputData;
        } else {
            dataObject = inputData;
            dataPath = dataPath + '/' + inputData.id;
            db.delete('/tables' + dataPath);
        }
        try {
            if (inputData.delete) {
                db.delete('/tables' + dataPath);
                data = {
                    status: 'success',
                    data: 'Success'
                };
            } else {
                db.push('/tables' + dataPath, dataObject, false);
                data = db.getData('/tables' + dataPath);
            }

        } catch (error) {
            data = error;
        };
        return data;
    }


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
                    data = req.method === 'GET' ? getTableData(apiPath[1]) : setTableData(apiPath[1], inputData);
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