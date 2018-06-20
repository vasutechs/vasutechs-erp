erpApp.controller('partMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            $scope.context.actions.makeOptionsFields(context.form.fields[2]);
            $scope.context.actions.makeOptionsFields(context.form.fields[6]);
        }
    });
    $scope.context = erpAppConfig.modules.marketing.partMaster;
    $scope.context.actions = actions;
    $scope.context.actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.context.actions.list($scope.context);
}]);