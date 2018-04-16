erpApp.directive('header', ['erpAppConfig', function(erpAppConfig) {
    var headerComp = function($scope, element, attrs) {
        $scope.appName = erpAppConfig.appName;
        $scope.appNavMenus = erpAppConfig.appNavMenus;
        // Force the toggled class to be removed when a collapsible nav link is clicked
        element.ready(function() {
            element.find(".navbar-sidenav .nav-link-collapse").click(function(e) {
                e.preventDefault();
                $("body").removeClass("sidenav-toggled");
            });
        });
    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/header.html',
        link: headerComp
    };
}]);