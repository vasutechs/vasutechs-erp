erpApp.controller('bomCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.copy(commonFact.defaultActions);
    $scope.context = erpAppConfig.modules.production.bom;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);