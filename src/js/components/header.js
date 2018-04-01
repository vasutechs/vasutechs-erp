erpApp.directive('header', ['erpAppConfig', function(erpAppConfig) {
    var headerComp = function($scope) {
    	$scope.appName = erpAppConfig.appName;
    	$scope.navMenus = erpAppConfig.navMenus;
    };
    return {
        restrict: 'E',
        templateUrl: 'template/header.html',
        link: headerComp
    };
}]);