erpApp.controller('rmStockCtrl', ['$scope', 'commonFact', '$location', function($scope, commonFact, $location) {
    var actions = {
        callBackList: function(context) {
            var newList = angular.copy(context.listViewData);
            if ($location.search() && $location.search()['showall'] === 'no') {
                newList = context.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.listViewData = newList
            }
            context.actions.getData('purchase.rmMaster').then(function(res) {
                var listViewData = angular.copy(context.listViewDataMaster);
                for (var i in listViewData) {
                    var stockData = context.listViewData[i];
                    var rmCode = stockData.rmCode;
                    var rmDetails = rmCode && res.data[rmCode];
                    stockData.rate = rmDetails && rmDetails.rate;
                    stockData.totalAmount = stockData.rate && (stockData.rate * stockData.rmStockQty);
                }
            });
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
    };

    commonFact.initCtrl($scope, 'report.rmStock', actions);

}]);