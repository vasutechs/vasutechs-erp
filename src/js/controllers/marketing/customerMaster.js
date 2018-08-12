erpApp.controller('customerMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;

    $scope.context = erpAppConfig.modules.marketing.customerMaster;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);