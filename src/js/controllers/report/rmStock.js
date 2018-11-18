erpApp.controller('rmStockCtrl', ['erpAppConfig', '$scope', 'commonFact', '$location', function(erpAppConfig, $scope, commonFact, $location) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            var newList = angular.copy(context.listViewData);
            if ($location.search() && $location.search()['showall'] === 'no') {
                newList = context.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.listViewData = newList
            }
        },
        submit: function(context) {
            var stockData;
            context.actions.getData('report.rmStock').then(function(res) {
                stockData = res.data;
                for (var i in stockData) {
                    if (!context.data.id && stockData[i].rmCode === context.data.rmCode) {
                        context.data.id = stockData[i].id;
                        context.data.rmStockQty = parseInt(context.data.rmStockQty) + parseInt(stockData[i].rmStockQty);
                    }
                }
                commonFact.defaultActions.submit(context);
            });

        }
    });

    $scope.context = erpAppConfig.modules.report.rmStock;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);