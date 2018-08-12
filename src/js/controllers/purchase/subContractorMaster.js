erpApp.controller('subContractorMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;

    $scope.context = erpAppConfig.modules.purchase.subContractorMaster;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);