erpApp.controller('rmStockCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context){
            context.actions.displayViewDataVal(erpAppConfig.modules.purchase.rmMaster.services.list, context.listViewData, 'id', 'rmName', true);
        }
    });

    $scope.context = erpAppConfig.modules.report.rmStock;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);