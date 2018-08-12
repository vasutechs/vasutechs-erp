erpApp.directive('customForm', ['erpAppConfig', function(erpAppConfig) {
    var customFormComp = function($scope, element, attrs) {
        element.ready(function() {
            for (var i in $scope.context.form.fields) {
                if ($scope.context.form.fields[i].type === 'select' && $scope.context.form.fields[i].dataFrom!==undefined && $scope.context.form.fields[i].optionFieldName!==undefined) {
                    if($scope.context.page.printView){
                        $scope.context.form.fields[i] = angular.extend($scope.context.form.fields[i], {
                            'isSingle': true,
                            'value': $scope.context.form.fields[i].id,
                            'replaceValue': $scope.context.form.fields[i].optionFieldName
                        });
                        $scope.context.actions.replaceViewDataVal($scope.context.data, $scope.context.form.fields[i]);
                    }
                    else{
                        $scope.context.actions.makeOptionsFields($scope.context.form.fields[i]);
                    }
                }
            }
        });
    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/customForm.html',
        link: customFormComp
    };
}]);