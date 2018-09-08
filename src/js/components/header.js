erpApp.directive('header', ['erpAppConfig', '$location', function(erpAppConfig, $location) {
    var headerComp = function($scope, element, attrs) {
        $scope.appName = erpAppConfig.appName;
        $scope.appNavMenus = erpAppConfig.appNavMenus;
        $scope.modules = erpAppConfig.modules;
        $scope.dataDownloadUrl = erpAppConfig.dataDownloadUrl;
        $scope.calendarYear = erpAppConfig.calendarYear;
        $scope.calendarYearList = [];
        for (var i = 10; i >= 0; i--) {
            $scope.calendarYearList.push({
                optionId: $scope.calendarYear - i,
                optionName: $scope.calendarYear - i
            });
        }
        $scope.showSubModule = function(module) {
            var isSubModule = false;
            $scope.subModules = {};

            for (var i in module) {
                if(i!=='name' && i!=='title' && i!=='icon' && i!=='page'){
                    $scope.subModules[i] = module[i];
                    isSubModule = true;
                }
            }
            return isSubModule;
        }
        $scope.changeCalendarYear = function() {
            erpAppConfig.calendarYear = $scope.calendarYear;
            $location.path(erpAppConfig.modules.dashboard.page.link);
        }
        // Force the toggled class to be removed when a collapsible nav link is clicked
        element.ready(function() {
            element.find('.navbar-sidenav .nav-link-collapse').click(function(e) {
                e.preventDefault();
                //$('.nav-item ul').removeClass('show');
            });
        });
    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/header.html',
        link: headerComp
    };
}]);