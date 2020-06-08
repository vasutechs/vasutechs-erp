erpConfig.moduleFiles.partStock = function(context) {
    return {
        callBackList: function() {
            var newList = angular.copy(context.listViewData);
            if (context.commonFact.location.search() && context.commonFact.location.search()['showall'] === 'no') {
                newList = context.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.listViewData = newList
            }

            context.commonFact.getData('marketing.partMaster').then(function(res) {
                var listViewData = angular.copy(context.listViewDataMaster);
                for (var i in listViewData) {
                    var stockData = context.listViewData[i];
                    var partNo = stockData.partNo;
                    var partDetails = partNo && res.data[partNo];
                    stockData.rate = partDetails && partDetails.rate;
                    stockData.totalAmount = stockData.rate && (stockData.rate * stockData.partStockQty);
                }
            });
        },
        updateOperationFrom: function() {
            if (context.data.partNo) {
                var restriction = {
                    partNo: context.data.partNo
                };
                context.commonFact.getOperationFromFlow(context.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(data, key, field) {
            if (context.data.partNo) {
                var partNo = context.data.partNo,
                    restriction = {
                        partNo: partNo
                    };

                if (data.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: data.operationFrom
                    });
                }

                context.commonFact.getOperationFromFlow(context.form.fields['operationTo'], restriction);
            }
        },
        submit: function() {
            var submitService;
            if (context.data.id) {
                submitService = context.commonFact.updateData(context, context.data)
            } else {
                context.updatePrevStock = false;
                context.data.acceptedQty = context.data.partStockQty;
                submitService = context.commonFact.updatePartStock();
            }

            submitService.then(function() {
                context.page.name = 'list';
                context.commonFact.list();
            });
        }
    };
};