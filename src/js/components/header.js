erpApp.directive('header', ['appFact', 'commonFact', '$location', 'authFact', function(appFact, commonFact, $location, authFact) {
    var headerComp = function($scope, element, attrs) {
        var erpAppConfig = appFact.erpAppConfig || null;
        var headerContext = {};
        erpAppConfig.calendarYear = new Date().getMonth() >= erpAppConfig.yearChangeMonth ? new Date().getFullYear() : new Date().getFullYear() - 1;
        headerContext.appName = erpAppConfig.appName;
        headerContext.appNavMenus = erpAppConfig.appNavMenus;
        headerContext.modules = erpAppConfig.modules;
        headerContext.calendarYear = erpAppConfig.calendarYear;
        headerContext.downloadDbName = headerContext.calendarYear + '-' + ('' + parseInt(headerContext.calendarYear + 1)).substring(2);
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
                erpAppConfig.calendarYear = context.calendarYear;
                commonFact.defaultActions.getData('calendarYear');
                commonFact.defaultActions.goToPage(erpAppConfig.modules.dashboard.page.link);
            },
            downloadData: function(context) {
                angular.element('#downloadModal').modal('show');
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