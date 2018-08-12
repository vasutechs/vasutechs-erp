erpApp.directive('listView', ['erpAppConfig', function(erpAppConfig) {
    var listViewComp = function($scope, element, attrs) {
    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/listView.html',
        link: listViewComp
    };
}]);