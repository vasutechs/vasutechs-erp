erpApp.controller('bomCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            $scope.context.actions.makeOptionsFields(erpAppConfig.modules.marketing.partMaster.services.list, context.form.fields[0].options, 'partName','partNo');
            $scope.context.actions.makeOptionsFields(erpAppConfig.modules.purchase.rmMaster.services.list, context.form.fields[1].options, 'rmName');
        }
    });
    $scope.context = erpAppConfig.modules.production.bom;
    $scope.context.actions = actions;
    $scope.context.actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.context.actions.list($scope.context);
}]);