erpApp.directive('customForm', ['erpAppConfig', function(erpAppConfig) {
    var customFormComp = function($scope, element, attrs) {
        element.ready(function() {
            $scope.context.actions.applyFieldValues($scope.context);
        });
    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/customForm.html',
        link: customFormComp
    };
}]);