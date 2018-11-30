erpApp.controller('settingsCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    commonFact.initCtrl($scope, 'admin.settings').then(function() {
        if ($scope.context.listViewData.length === 0) {
            $scope.context.actions.add($scope.context);
        }
    });

}]);