erpApp.controller('rmMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;
    $scope.context = erpAppConfig.modules.purchase.rmMaster;
    $scope.context.actions = actions;
    $scope.context.actions.makeOptionsFields($scope.context.form.fields[5]);
    $scope.context.actions.list($scope.context);
}]);