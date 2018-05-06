erpApp.controller('supplierMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;

    $scope.context = erpAppConfig.modules.purchase.supplierMaster;
    $scope.context.actions = actions;
    $scope.context.actions.makeOptionsFields(erpAppConfig.modules.purchase.rmMaster.services.list, $scope.context.form.mapping.fields[0].options, 'rmName');
    $scope.context.actions.list($scope.context);
}]);