erpConfig.moduleFiles.startFrom = function() {
    return function(input, start) {
        start = +start; //parse to int
        return input && input.slice(start) || false;
    }
};
erpApp.filter('startFrom', erpConfig.moduleFiles.startFrom);