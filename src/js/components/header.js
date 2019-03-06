erpApp.directive('header', ['commonFact', '$location', 'authFact', function(commonFact, $location, authFact) {
    var headerComp = function($scope, element, attrs) {
        var appConfig = commonFact.getErpAppConfig();
        var headerContext = {};
        appConfig.calendarYear = new Date().getMonth() > 4 ? new Date().getFullYear() : new Date().getFullYear() - 1;
        headerContext.appName = appConfig.appName;
        headerContext.appNavMenus = appConfig.appNavMenus;
        headerContext.modules = appConfig.modules;
        headerContext.dataDownloadUrl = appConfig.dataDownloadUrl;
        headerContext.calendarYear = appConfig.calendarYear;
        headerContext.calendarYearList = [];
        headerContext.isLogin = authFact.isLogin();
        for (var i = 10; i >= 0; i--) {
            var nextYear = parseInt(headerContext.calendarYear - i + 1);

            headerContext.calendarYearList.push({
                optionId: headerContext.calendarYear - i,
                optionName: headerContext.calendarYear - i + '-' + ('' + nextYear).substring(2)
            });
        }
        headerContext.actions = {
            showSubModule: commonFact.defaultActions.showSubModule,
            changeCalendarYear: function(context) {
                appConfig.calendarYear = context.calendarYear;
                $location.path(appConfig.modules.dashboard.page.link);
            }
        };
        $scope.headerContext = headerContext;

    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/header.html',
        link: headerComp
    };
}]);