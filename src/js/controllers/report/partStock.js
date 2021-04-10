erpConfig.moduleFiles.partStock = function(context) {
    return {
        callBackList: function() {
            var newList = angular.copy(context.controller.listViewData);
            if (context.commonFact.location.search() && context.commonFact.location.search()['showall'] === 'no') {
                newList = context.controller.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.controller.listViewData = newList
            }

            context.commonFact.getData('marketing.partMaster').then(function(res) {
                var listViewData = angular.copy(context.controller.listViewDataMaster);
                for (var i in listViewData) {
                    var stockData = context.controller.listViewData[i];
                    var partNo = stockData.partNo;
                    var partDetails = partNo && res.data[partNo];
                    stockData.rate = context.commonFact.getRate(partDetails);
                    stockData.totalAmount = stockData.rate && (stockData.rate * stockData.partStockQty);
                }
            });
        },
        updateOperationFrom: function() {
            if (context.controller.data.partNo && context.controller.form.fields['operationFrom']) {
                var restriction = {
                    partNo: context.controller.data.partNo
                };
                context.commonFact.getOperationFromFlow(context.controller.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(data, key, field) {
            if (context.controller.data.partNo && context.controller.form.fields['operationTo']) {
                var partNo = context.controller.data.partNo,
                    restriction = {
                        partNo: partNo
                    };

                if (data.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: data.operationFrom
                    });
                }

                context.commonFact.getOperationFromFlow(context.controller.form.fields['operationTo'], restriction);
            }
        },
        submit: function() {
            var submitService;
            if (!context.controller.data.operationFrom && !context.controller.data.operationTo) {
                context.controller.data.operationTo = context.erpAppConfig.finalStageOpp;
            }
            if (context.controller.data.id) {
                submitService = context.commonFact.updateData(context.controller, context.controller.data)
            } else {
                context.updatePrevStock = false;
                context.controller.data.acceptedQty = context.controller.data.partStockQty;
                submitService = context.commonFact.updatePartStock();
            }

            submitService.then(function() {
                context.controller.page.name = 'list';
                context.commonFact.list();
            });
        }
    };
};