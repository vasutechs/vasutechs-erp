erpApp.directive('listView', [function() {
    return {
        restrict: 'E',
        templateUrl: 'template/components/listView.html'
    };
}]);

erpApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input && input.slice(start) || false;
    }
});