erpApp.controller('partMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            $scope.context.actions.makeOptionsFields(erpAppConfig.modules.purchase.rmMaster.services.list, context.form.fields[2].options, 'rmName');
            $scope.context.actions.makeOptionsFields(erpAppConfig.modules.marketing.uomMaster.services.list, context.form.fields[6].options, 'uomName');
        }
    });
    $scope.context = erpAppConfig.modules.marketing.partMaster;
    $scope.context.actions = actions;
    $scope.context.actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.context.actions.list($scope.context);
}]);