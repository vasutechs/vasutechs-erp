erpApp.controller('uomMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;
    $scope.context = erpAppConfig.modules.marketing.uomMaster;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);