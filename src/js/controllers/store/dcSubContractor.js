erpApp.controller('dcSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            context.actions.getPartStock(context);
        },
        getPOSubContractor: function(context, data, key, field) {
            context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                filter: {
                    subContractorCode: key,
                    status: 0
                }
            });
            context.actions.makeOptionsFields(context.form.fields['poNo']);
        },
        callBackChangeMapping: function(context) {
            context.actions.checkAcceptedQty(context);
        },
        checkAcceptedQty: function(context) {
            var serviceconf = this.getServiceConfig('production.flowMaster'),
                partNo,
                operationFrom;
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var flowMasterData = res.data,
                    prevOpp,
                    qty;
                for (var i in context.data.mapping) {
                    partNo = context.data.mapping[i].id;
                    qty = context.data.mapping[i].acceptedQty;
                    for (var j in flowMasterData) {
                        if (flowMasterData[j].partNo === partNo) {
                            for (var k in flowMasterData[j].mapping) {
                                prevOpp = flowMasterData[j].mapping[k - 1];
                                if (prevOpp && flowMasterData[j].mapping[k].source === 'Sub-Contractor') {
                                    operationFrom = prevOpp.id;
                                }
                                
                                if(prevOpp && (context.partStock[partNo + '-' + prevOpp.id] === undefined || context.partStock[partNo + '-' + prevOpp.id].partStockQty < qty)){
                                    context.data.mapping[i].acceptedQty = qty = null;
                                }
                            }
                        }
                    }
                    context.data.mapping[i].operationFrom = operationFrom;
                }
            });
        },
        callBackUpdatePartTotal: function(context) {
            // var qty = 0,
            //     poQty = parseInt(context.actions.getPOQty(context));
            // for (var i in context.data.mapping) {
            //     qty += parseInt(context.data.mapping[i].acceptedQty);
            // }
            // context.actions.getDCQty(context).then(function(DCStock) {
            //     qty += parseInt(DCStock);
            //     if (poQty < qty) {
            //         context.data.mapping[i].acceptedQty = qty = null;
            //     }
            // });
        },
        getPOQty: function(context) {
            var poSubContractor = context.form.fields['poNo'].options[context.data.poNo];
            var poQty = 0;
            var poNo = context.data.poNo;

            for (var i in poSubContractor.mapping) {
                poQty += poSubContractor.mapping[i].acceptedQty;
            }
            return poQty;
        },
        updatePoSubContractor: function(context) {
            var poSubContractor = context.form.fields['poNo'].options[context.data.poNo];
            var poQty = context.actions.getPOQty(context);
            poSubContractor.status = 1;
            context.actions.getDCQty(context).then(function(DCStock) {
                if (parseInt(poQty) <= parseInt(DCStock)) {
                    context.actions.updateData('purchase.poSubContractor', poSubContractor);
                }
            });
        },
        getDCQty: function(context) {
            var DCQty = 0;
            return context.actions.getData('store.dcSubContractor').then(function(res) {
                var listViewData = res.data;
                for (var i in listViewData) {
                    if (context.data.poNo === listViewData[i].poNo) {
                        for (var j in listViewData[i].mapping) {
                            DCQty += parseInt(listViewData[i].mapping[j].acceptedQty);
                        }
                    }
                }
                return DCQty;
            });
        },
        callBackSubmit: function(context) {
            for (var i in context.data.mapping) {
                var data = angular.copy(context.data.mapping[i]);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                data.subContractorCode = context.data.subContractorCode;
                newContext.data = data;
                context.actions.updateSCStock(newContext);
                newContext.updateCurStock = false;
                context.actions.updatePartStock(newContext);
            }
            context.actions.updatePoSubContractor(context);
        }
    });

    $scope.context = erpAppConfig.modules.store.dcSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);