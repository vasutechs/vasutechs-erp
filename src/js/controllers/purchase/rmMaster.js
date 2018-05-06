erpApp.controller('rmMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = commonFact.defaultActions;
    $scope.context = erpAppConfig.modules.purchase.rmMaster;
    $scope.context.actions = actions;
    $scope.context.actions.makeOptionsFields(erpAppConfig.modules.marketing.uomMaster.services.list, $scope.context.form.fields[5].options, 'uomName');
    $scope.context.actions.list($scope.context);
}]);