erpApp.directive('listView', ['erpAppConfig', function(erpAppConfig) {
    var listViewComp = function($scope, element, attrs) {
    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/listView.html',
        link: listViewComp
    };
}]);

erpApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
})