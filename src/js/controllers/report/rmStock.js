erpConfig.moduleFiles.rmStock = function(context) {
    return {
        callBackList: function() {
            var newList = angular.copy(context.listViewData);
            if ($location.search() && $location.search()['showall'] === 'no') {
                newList = context.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.listViewData = newList
            }
            context.commonFact.getData('purchase.rmMaster').then(function(res) {
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
        submit: function() {
            var stockData;
            context.commonFact.getData('report.rmStock').then(function(res) {
                stockData = res.data;
                for (var i in stockData) {
                    if (!context.data.id && stockData[i].rmCode === context.data.rmCode) {
                        context.data.id = stockData[i].id;
                        context.data.rmStockQty = parseInt(context.data.rmStockQty) + parseInt(stockData[i].rmStockQty);
                    }
                }
                commonFact.submit();
            });

        }
    };
};