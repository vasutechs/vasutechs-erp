erpApp.controller('settingsCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    commonFact.initCtrl($scope, 'admin.settings').then(function() {
        $scope.context.actions.edit($scope.context, 1);
    });

}]);