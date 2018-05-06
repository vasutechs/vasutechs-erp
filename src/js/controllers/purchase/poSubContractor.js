erpApp.controller('poSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            context.actions.makeOptionsFields(erpAppConfig.modules.purchase.subContractorMaster.services.list, $scope.context.form.fields[2].options, 'subContractorName');
            $scope.context.actions.makeOptionsFields(erpAppConfig.modules.marketing.partMaster.services.list, $scope.context.form.mapping.fields[0].options, 'partName');
        }
    });

    $scope.context = erpAppConfig.modules.purchase.poSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.context.actions.list($scope.context);

}]);