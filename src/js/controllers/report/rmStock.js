erpApp.controller('rmStockCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            var newList = angular.copy(context.listViewData);
            newList = context.listViewData.filter(function(data) {
                return data.rmStockQty > 0;
            });
            context.listViewData = newList
        }
    });

    $scope.context = erpAppConfig.modules.report.rmStock;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);