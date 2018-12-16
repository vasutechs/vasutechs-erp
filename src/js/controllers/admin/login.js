erpApp.controller('loginCtrl', ['$scope', 'commonFact', 'authFact', '$location', function($scope, commonFact, authFact, location) {
    var actions = {
        submit: function(context) {
            authFact.login(context).then(function(userDetail) {
                if (!userDetail || !userDetail.userType) {
                    context.alertMessage = 'Invalid User!!!';
                }
                else{
                	location.path(appConfig.modules.dashboard.page.link);
                	window.location.reload();
                }
            });
        }
    };

    var appConfig = commonFact.getErpAppConfig();
    var context = angular.copy(eval('appConfig.modules.admin.login'));

    if (location.search() && location.search()['type'] === 'logout') {
    	authFact.setUserDetail(undefined);
    	location.search('');
    	location.path(appConfig.modules.dashboard.page.link);
    	window.location.reload();
    }

    context.appConfig = appConfig;
    context.actions = angular.extend(angular.copy(commonFact.defaultActions), actions || {});
    context.actions[context.page.name](context);
    $scope.context = context;
}]);