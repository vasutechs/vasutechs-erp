erpApp.controller('partStockCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;

    $scope.context = erpAppConfig.modules.report.partStock;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);