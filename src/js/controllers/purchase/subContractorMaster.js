erpApp.controller('subContractorMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            context.actions.makeOptionsFields(context.form.mapping.fields[0]);
            context.actions.makeOptionsFields(context.form.mapping.fields[1]);
        }
    });

    $scope.context = erpAppConfig.modules.purchase.subContractorMaster;
    $scope.context.actions = actions;
    $scope.context.actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.context.actions.list($scope.context);

}]);