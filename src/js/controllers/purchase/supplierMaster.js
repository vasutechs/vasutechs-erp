erpApp.controller('supplierMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;

    $scope.context = erpAppConfig.modules.purchase.supplierMaster;
    $scope.context.actions = actions;
    $scope.context.actions.makeOptionsFields($scope.context.form.mapping.fields[0]);
    $scope.context.actions.list($scope.context);
}]);