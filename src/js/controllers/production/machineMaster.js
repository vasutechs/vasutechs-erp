erpApp.controller('machineMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;
    $scope.context = erpAppConfig.modules.production.machineMaster;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);