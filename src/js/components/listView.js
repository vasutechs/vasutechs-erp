erpApp.directive('listView', ['erpAppConfig', function(erpAppConfig) {
    return {
        restrict: 'E',
        templateUrl: 'template/components/listView.html'
    };
}]);

erpApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
})