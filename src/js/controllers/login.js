erpApp.controller('loginCtrl', ['$scope', 'appfact', 'commonFact', 'authFact', '$location',
    function($scope, appfact, commonFact, authFact, location) {
        var actions = {
            submit: function(context) {
                authFact.login(context).then(function(userDetail) {
                    if (!userDetail || !userDetail.userType) {
                        context.alertMessage = 'Invalid User!!!';
                    } else {
                        commonFact.defaultActions.goToPage(erpAppConfig.modules.dashboard.page.link, true);
                    }
                });
            }
        };

        var erpAppConfig = appfact.getErpAppConfig();
        var context = angular.copy(erpAppConfig.modules.login);

        if (location.search() && location.search()['type'] === 'logout') {
            authFact.setUserDetail(undefined);
            location.search('');
            commonFact.defaultActions.goToPage(erpAppConfig.modules.dashboard.page.link, true);
        }

        context.actions = angular.extend(angular.copy(commonFact.defaultActions), actions || {});
        context.actions[context.page.name](context);
        $scope.context = context;
    }
]);