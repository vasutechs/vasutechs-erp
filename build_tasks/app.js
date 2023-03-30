var app = function() {
    var config = require('./config')();
    var cookieParser = require("cookie-parser");
    var session = require("express-session");
    var express = require("express");
    var arg = require('minimist')(process.argv);
    const fs = require('fs');
    var open = require('open');
    var server = function() {
        var createServer = function() {
            config.app.listen(config.webServer.serverPort, function() {
                open(config.webServer.serverPath + ':' + config.webServer.serverPort);
            }).on('error', function(err) {
                config.webServer.serverPort++;
                createServer();
            });
        };
        createServer();
        config.dbApi();
    };

    config.arg = arg;
    config.app = express();
    config.app.use(express.json({ limit: '50mb' }));
    config.app.use(express.urlencoded({ extended: false, limit: '50mb' }));
    config.app.use(cookieParser());
    config.app.use(
        session({
            secret: config.appName,
            name: config.appName,
            resave: true,
            saveUninitialized: true,
            //cookie: { maxAge: 15000 } /* 6000 ms? 6 seconds -> wut? :S */
        })
    );

    config.app.use(express.static(config.webServer.distPath));

    fs.readdirSync(config.buildTasks).forEach(file => {
        if (file !== 'app.js' && file !== 'config.js') {
            require('./' + file)(config);
        }
    });

    // (()=>{
    //     var JsonDB = require('node-json-db');
    //     config.localJsonDbApi().getListDb().map((db)=>{
            
    //         try{
    //             let currentDb = new JsonDB('./data/'+db.name).getData('/tables');
    //             for(let i in currentDb){
    //                 for(let j in currentDb[i]){
    //                     for(let k in currentDb[i][j]){
    //                         if(k === 'mapping'){
    //                             currentDb[i][j][k].map((val, id)=>{
    //                                 for(let l in val){
    //                                     if(l === 'rate' && typeof val[l] == 'string'){
    //                                         val[l] = parseFloat(val[l]);
    //                                         return val;
    //                                     }
    //                                 }
                                    
    //                             });
    //                         }
                            
    //                     }
                        
    //                 }
    //                 //console.log(currentDb, i, currentDb[i]);
    //                 new JsonDB('./data/'+db.name).push('/tables/' + i, currentDb[i], true)
    //             }
    //         }
    //         catch(e){
    //             console.log(e);
    //         }
            
    //     })
    // })();

    config.arg.run && server();
}

module.exports = app();