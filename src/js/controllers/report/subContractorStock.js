erpApp.controller('subContractorStockCtrl', ['$scope', 'commonFact', '$location', 'serviceApi', function($scope, commonFact, $location, serviceApi) {
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
            context.actions.getFlowMaster(context);
        },
        callBackEdit: function(context) {
            setTimeout(function() {
                context.actions.updateOperationFrom(context);
                context.actions.updateOperationTo(context);
            }, 1000);
        },
        getPartNos: function(context) {
            var partNos = [];
            if (context.data.subContractorCode) {
                context.actions.getData('purchase.subContractorMaster', context.data.subContractorCode).then(function(res) {
                    var data = res.data;
                    for (var i in data.mapping) {
                        partNos.push(data.mapping[i].id);
                    }
                    context.form.fields['partNo'].filter = {
                        id: partNos
                    };
                    context.actions.makeOptionsFields(context, context.form.fields['partNo']);
                });
            }
        },
        updateOperationFrom: function(context, data, key, field) {
            var prevOpp;
            var operationFrom;
            if (context.data && context.data.partNo) {
                var restriction = {
                    partNo: context.data.partNo
                };
                for (var j in context.flowMasterData) {
                    if (context.flowMasterData[j].partNo === context.data.partNo) {
                        for (var k in context.flowMasterData[j].mapping) {
                            prevOpp = context.flowMasterData[j].mapping[k - 1];
                            if (prevOpp && context.flowMasterData[j].mapping[k].source === 'Sub-Contractor') {
                                operationFrom = prevOpp.id;
                            }
                        }
                    }
                }
                restriction.filter = {
                    id: operationFrom
                }
                context.actions.getOperationFromFlow(context, context.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(context, data, key, field) {
            if (context.data && context.data.partNo) {
                var partNo = context.data.partNo,
                    restriction = {
                        partNo: partNo
                    };

                if (context.data.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: context.data.operationFrom
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
                context.data.acceptedQty = context.data.partStockQty;
                submitService = context.actions.updateSCStock(context);
            }

            submitService.then(function() {
                context.page.name = 'list';
                context.actions.list(context);
            });
        }
    };

    commonFact.initCtrl($scope, 'report.subContractorStock', actions);

}]);