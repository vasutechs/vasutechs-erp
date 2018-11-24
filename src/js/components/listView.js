erpApp.directive('listView', ['erpAppConfig', function(erpAppConfig) {
    var listViewComp = function($scope, element, attrs) {
        element.ready(function() {
            var listView = $scope.context.listView;
            for (var i in listView) {
                if (listView[i].isFilterBy && listView[i].type === 'select') {
                    $scope.context.actions.makeOptionsFields($scope.context, listView[i]);
                }
            }
        });
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