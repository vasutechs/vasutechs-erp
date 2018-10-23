erpApp.directive('customForm', ['erpAppConfig', function(erpAppConfig) {
    var customFormComp = function($scope, element, attrs) {
        var applyFieldValues = function($scope) {
            for (var i in $scope.context.form.fields) {
                if ($scope.context.form.fields[i].type === 'select') {
                    if($scope.context.page.printView){
                        $scope.context.actions.replaceViewDataVal($scope.context.data, $scope.context.form.fields[i]);
                    }
                    else{
                        $scope.context.actions.makeOptionsFields($scope.context.form.fields[i]);
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
        templateUrl: 'template/components/customForm.html',
        link: customFormComp
    };
}]);