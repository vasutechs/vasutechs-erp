erpConfig.moduleFiles.subContractorStock = function(context) {
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
                    stockData.rate = partDetails && context.commonFact.getRate(partDetails);
                    stockData.totalAmount = stockData.rate && (stockData.rate * stockData.partStockQty);
                }
            });
            context.commonFact.getFlowMaster();
        },
        callBackEdit: function() {
            setTimeout(function() {
                context.controller.methods.updateOperationFrom();
                context.controller.methods.updateOperationTo();
            }, 1000);
        },
        getPartNos: function() {
            var partNos = [];
            if (context.controller.data.subContractorCode) {
                context.commonFact.getData('purchase.subContractorMaster', context.controller.data.subContractorCode).then(function(res) {
                    var data = res.data;
                    for (var i in data.mapping) {
                        partNos.push(data.mapping[i].id);
                    }
                    context.controller.form.fields['partNo'].filter = {
                        id: partNos
                    };
                    context.commonFact.makeOptionsFields(context.controller.form.fields['partNo']);
                });
            }
        },
        updateOperationFrom: function() {
            var prevOpp;
            var operationFrom;
            if (context.controller.data && context.controller.data.partNo) {
                var restriction = {
                    partNo: context.controller.data.partNo
                };
                for (var j in context.controller.flowMasterData) {
                    if (context.controller.flowMasterData[j].partNo === context.controller.data.partNo) {
                        for (var k in context.controller.flowMasterData[j].mapping) {
                            prevOpp = context.controller.flowMasterData[j].mapping[k - 1];
                            if (prevOpp && context.controller.flowMasterData[j].mapping[k].source === 'Sub-Contractor') {
                                operationFrom = prevOpp.id;
                            }
                        }
                    }
                }
                restriction.filter = {
                    id: operationFrom
                }
                context.commonFact.getOperationFromFlow(context.controller.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function() {
            if (context.controller.data && context.controller.data.partNo) {
                var partNo = context.controller.data.partNo,
                    restriction = {
                        partNo: partNo
                    };

                if (context.controller.data.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: context.controller.data.operationFrom
                    });
                }

                context.commonFact.getOperationFromFlow(context.controller.form.fields['operationTo'], restriction);
            }
        },
        submit: function() {
            var submitService;
            if (context.controller.data.id) {
                submitService = context.commonFact.updateData(context.controller, context.controller.data)
            } else {
                context.controller.data.acceptedQty = context.controller.data.partStockQty;
                submitService = context.commonFact.updateSCStock();
            }

            submitService.then(function() {
                context.controller.page.name = 'list';
                context.commonFact.list();
            });
        }
    };
};