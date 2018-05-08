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
            newId;
        inputData = JSON.parse(inputData);
        if (!inputData.id && !inputData.delete) {
            lastData = db.getData('/tables' + dataPath);
            lastData = lastData && lastData[lastData.length - 1];
            newId = lastData && lastData.id && parseInt(lastData.id) + 1 || 1;
            inputData['id'] = newId;
            dataPath = dataPath + '[]';
        }
        try {
            if (inputData.delete) {
                db.delete('/tables' + dataPath + '[' + inputData.key + ']');
                data = {
                    status: 'success',
                    data: 'Success'
                };
            } else {
                db.push('/tables' + dataPath, inputData, true);
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
                    data = apiPath[1] === '/download' ? db.getData('/') : req.method === 'POST' ? setTableData(apiPath[1], inputData) : getTableData(apiPath[1]);
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