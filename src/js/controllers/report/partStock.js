erpApp.controller('partStockCtrl', ['$scope', 'commonFact', '$location', 'serviceApi', function($scope, commonFact, $location, serviceApi) {
    var actions = {
        callBackList: function(context) {
            var newList = angular.copy(context.listViewData);
            if ($location.search() && $location.search()['showall'] === 'no') {
                newList = context.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.listViewData = newList
            }

            context.actions.getData('marketing.partMaster').then(function(res) {
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
        updateOperationFrom: function(context, data, key, field) {
            if (context.data.partNo) {
                var restriction = {
                    partNo: context.data.partNo
                };
                context.actions.getOperationFromFlow(context, context.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(context, data, key, field) {
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

                context.actions.getOperationFromFlow(context, context.form.fields['operationTo'], restriction);
            }
        },
        submit: function(context) {
            var submitService;
            if (context.data.id) {
                submitService = context.actions.updateData(context.module, context.data)
            } else {
                context.updatePrevStock = false;
                context.data.acceptedQty = context.data.partStockQty;
                submitService = context.actions.updatePartStock(context);
            }

            submitService.then(function() {
                context.page.name = 'list';
                context.actions.list(context);
            });
        }
    };

    commonFact.initCtrl($scope, 'report.partStock', actions);

}]);