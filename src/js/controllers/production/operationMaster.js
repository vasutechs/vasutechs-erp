erpApp.controller('operationMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;
    $scope.context = erpAppConfig.modules.production.operationMaster;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);