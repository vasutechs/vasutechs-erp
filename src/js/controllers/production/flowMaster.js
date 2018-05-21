erpApp.controller('flowMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            $scope.context.actions.makeOptionsFields(erpAppConfig.modules.marketing.partMaster.services.list, context.form.fields[0].options, 'partName', 'partNo');
            $scope.context.actions.makeOptionsFields(erpAppConfig.modules.production.operationMaster.services.list, context.form.mapping.fields[0].options, 'opName');
        }
    });
    $scope.context = erpAppConfig.modules.production.flowMaster;
    $scope.context.actions = actions;
    $scope.context.actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.context.actions.list($scope.context);
}]);