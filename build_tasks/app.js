var app = function() {
    var config = require('./config')();
    const fs = require('fs');

    fs.readdirSync(config.buildTasks).forEach(file => {
        if (file !== 'app.js' && file !== 'config.js') {
            require('./' + file)(config);
        }
    });
}

module.exports = app();