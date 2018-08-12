erpApp.controller('rmStockCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;

    $scope.context = erpAppConfig.modules.report.rmStock;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);