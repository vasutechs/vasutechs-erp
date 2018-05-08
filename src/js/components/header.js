erpApp.directive('header', ['erpAppConfig', function(erpAppConfig) {
    var headerComp = function($scope, element, attrs) {
        $scope.appName = erpAppConfig.appName;
        $scope.appNavMenus = erpAppConfig.appNavMenus;
        $scope.modules = erpAppConfig.modules;
        $scope.dataDownloadUrl = erpAppConfig.dataDownloadUrl;
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