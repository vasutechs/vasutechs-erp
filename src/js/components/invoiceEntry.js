erpApp.directive('entryInvoice', function() {
    var entryInvoice = function($scope, element, attrs) {
        element.ready(function() {
            $scope.context.actions.applyFieldValues($scope.context);

            if (!$scope.context.page.printView) {
                $scope.context.actions.applyFieldValues($scope.context, $scope.context.form.mapping.fields, $scope.context.data.mapping);
            } else {
                $scope.context.actions.applyFieldValues($scope.context, $scope.context.form.mapping.fields, $scope.context.printData.mapping, true);
            }

        });
    };

    return {
        restrict: 'E',
        templateUrl: 'template/components/entryInvoice.html',
        link: entryInvoice
    };
})