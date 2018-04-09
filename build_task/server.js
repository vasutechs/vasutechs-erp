module.exports = function(gulp, config, task) {
    gulp.task('server', task.server = function() {
        var connect = require('connect');
        var http = require('http');

        var middleWare = connect();

        middleWare.use(require('serve-static')(config.webServer.distPath));
        config.httpMiddleWare = middleWare;
        task.dbConnect();
        //create node.js http server and listen on port
        http.createServer(middleWare).listen(config.webServer.serverPort).on('listening', function(){
            require('open')(config.webServer.serverPath);
        });

    });
};