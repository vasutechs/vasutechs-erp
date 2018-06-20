erpApp.controller('empMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;
    $scope.context = erpAppConfig.modules.marketing.empMaster;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);