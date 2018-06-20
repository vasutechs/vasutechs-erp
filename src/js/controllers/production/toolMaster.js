erpApp.controller('toolMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;
    $scope.context = erpAppConfig.modules.production.toolMaster;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);