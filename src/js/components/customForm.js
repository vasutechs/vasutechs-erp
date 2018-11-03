erpApp.directive('customForm', ['erpAppConfig', function(erpAppConfig) {
    var customFormComp = function($scope, element, attrs) {
        if (!$scope.context.page.printView) {
            $scope.context.actions.applyFieldValues($scope.context, $scope.context.form.fields, $scope.context.data);
        } else {
            element.ready(function() {
                $scope.context.actions.applyFieldValues($scope.context, $scope.context.form.fields, $scope.context.printData, true);
            });
        }
    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/customForm.html',
        link: customFormComp
    };
}]);