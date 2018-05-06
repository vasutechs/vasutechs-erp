erpApp.controller('poSupplierCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            context.actions.makeOptionsFields(erpAppConfig.modules.purchase.supplierMaster.services.list, $scope.context.form.fields[2].options, 'supplierName');
            context.actions.makeOptionsFields(erpAppConfig.modules.purchase.rmMaster.services.list, $scope.context.form.mapping.fields[0].options, 'rmName');
        }
    });

    $scope.context = erpAppConfig.modules.purchase.poSupplier;
    $scope.context.actions = actions;
    $scope.context.actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.context.actions.list($scope.context);

}]);