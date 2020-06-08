erpConfig.moduleFiles.subContractorStock = function(context) {
    return {
        callBackList: function() {
            var newList = angular.copy(context.listViewData);
            if ($location.search() && $location.search()['showall'] === 'no') {
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
            context.commonFact.getFlowMaster();
        },
        callBackEdit: function() {
            setTimeout(function() {
                context.methods.updateOperationFrom();
                context.methods.updateOperationTo();
            }, 1000);
        },
        getPartNos: function() {
            var partNos = [];
            if (context.data.subContractorCode) {
                context.commonFact.getData('purchase.subContractorMaster', context.data.subContractorCode).then(function(res) {
                    var data = res.data;
                    for (var i in data.mapping) {
                        partNos.push(data.mapping[i].id);
                    }
                    context.form.fields['partNo'].filter = {
                        id: partNos
                    };
                    context.commonFact.makeOptionsFields(context.form.fields['partNo']);
                });
            }
        },
        updateOperationFrom: function() {
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
                context.commonFact.getOperationFromFlow(context.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function() {
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

                context.commonFact.getOperationFromFlow(context.form.fields['operationTo'], restriction);
            }
        },
        submit: function() {
            var submitService;
            if (context.data.id) {
                submitService = context.commonFact.updateData(context, context.data)
            } else {
                context.data.acceptedQty = context.data.partStockQty;
                submitService = context.commonFact.updateSCStock();
            }

            submitService.then(function() {
                context.page.name = 'list';
                context.commonFact.list();
            });
        }
    };
};