erpApp.directive('mappingForm', ['erpAppConfig', function(erpAppConfig) {
    var mappingFormComp = function($scope, element, attrs) {
        var applyFieldValues = function($scope) {
            for (var i in $scope.context.form.mapping.fields) {
                var type = $scope.context.form.mapping.fields[i].type,
                    dataFrom = $scope.context.form.mapping.fields[i].dataFrom;
                if (type === 'select') {
                    if ($scope.context.page.printView) {
                        $scope.context.actions.replaceViewDataVal($scope.context.data.mapping, $scope.context.form.mapping.fields[i]);
                    } else {
                        $scope.context.actions.makeOptionsFields($scope.context.form.mapping.fields[i]);
                    }
                }

            }
        };
        if (!$scope.context.page.printView) {
            applyFieldValues($scope);
        } else {
            element.ready(function() {
                applyFieldValues($scope);
            });
        }
    };

    return {
        restrict: 'E',
        templateUrl: 'template/components/mappingForm.html',
        link: mappingFormComp
    };
}]);