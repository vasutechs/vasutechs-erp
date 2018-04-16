erpApp.factory('commonFact', ['erpAppConfig', '$location', function(erpAppConfig, $location) {
    var getPage = function() {
    	var pagePathArr = $location.path().split('/').join('.'),
    	page = eval('erpAppConfig.pages'+ pagePathArr);
        return page;
    };
    return {
        getPage: getPage
    };
}]);