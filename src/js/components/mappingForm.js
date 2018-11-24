erpApp.directive('mappingForm', ['erpAppConfig', function(erpAppConfig) {
    var mappingFormComp = function($scope, element, attrs) {
        element.ready(function() {
            if (!$scope.context.page.printView) {
                $scope.context.actions.applyFieldValues($scope.context, $scope.context.form.mapping.fields, $scope.context.data.mapping);
            } else {
                $scope.context.actions.applyFieldValues($scope.context, $scope.context.form.mapping.fields, $scope.context.printData.mapping, true);
            }
        });
    };

    return {
        restrict: 'E',
        templateUrl: 'template/components/mappingForm.html',
        link: mappingFormComp
    };
}]);