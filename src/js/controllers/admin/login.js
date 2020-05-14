erpApp.controller('loginCtrl', ['$scope', 'commonFact', 'authFact', '$location', function($scope, commonFact, authFact, location) {
    var actions = {
        submit: function(context) {
            authFact.login(context).then(function(userDetail) {
                if (!userDetail || !userDetail.userType) {
                    context.alertMessage = 'Invalid User!!!';
                } else {
                    commonFact.defaultActions.goToPage(appConfig.modules.dashboard.page.link, true);
                }
            });
        }
    };

    var appConfig = commonFact.getErpAppConfig();
    var context = angular.copy(appConfig.modules.admin.login);

    if (location.search() && location.search()['type'] === 'logout') {
        authFact.setUserDetail(undefined);
        location.search('');
        commonFact.defaultActions.goToPage(appConfig.modules.dashboard.page.link, true);
    }

    context.appConfig = appConfig;
    context.actions = angular.extend(angular.copy(commonFact.defaultActions), actions || {});
    context.actions[context.page.name](context);
    $scope.context = context;
}]);