erpApp.controller('flowMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;
    $scope.context = erpAppConfig.modules.production.flowMaster;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);