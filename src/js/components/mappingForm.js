erpApp.directive('mappingForm', ['erpAppConfig', function(erpAppConfig) {
    var mappingFormComp = function($scope, element, attrs) {
        element.ready(function() {
            for (var i in $scope.context.form.mapping.fields) {

                if ($scope.context.form.mapping.fields[i].type === 'select' && $scope.context.form.mapping.fields[i].dataFrom !== undefined && $scope.context.form.mapping.fields[i].optionFieldName !== undefined) {
                    if ($scope.context.page.printView) {
                        $scope.context.form.mapping.fields[i] = angular.extend($scope.context.form.mapping.fields[i], {
                            'value': $scope.context.form.mapping.fields[i].id,
                            'replaceValue': $scope.context.form.mapping.fields[i].optionFieldName
                        });
                        $scope.context.actions.replaceViewDataVal($scope.context.data.mapping, $scope.context.form.mapping.fields[i]);
                    } else {
                        $scope.context.actions.makeOptionsFields($scope.context.form.mapping.fields[i]);
                    }
                }

            }
        });
    };

    return {
        restrict: 'E',
        templateUrl: 'template/components/mappingForm.html',
        link: mappingFormComp
    };
}]);