erpApp.controller('bomCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            $scope.context.actions.makeOptionsFields(context.form.fields[0]);
            $scope.context.actions.makeOptionsFields(context.form.fields[1]);
        },
        callBackList: function(context){
            context.actions.displayViewDataVal(erpAppConfig.modules.marketing.partMaster.services.list, context.listViewData, 'partNo', 'partName', true);
        }
    });
    $scope.context = erpAppConfig.modules.production.bom;
    $scope.context.actions = actions;
    $scope.context.actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.context.actions.list($scope.context);
}]);