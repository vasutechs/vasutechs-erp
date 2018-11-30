erpApp.controller('dcSubContractorCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
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
            context.actions.makeOptionsFields(context, context.form.fields['poNo']);
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
        callBackUpdatePartTotal: function(context, data) {
            var qty = parseInt(data.acceptedQty),
                poQty = parseInt(context.actions.getPOQty(context, data));
                
            context.actions.getDCQty(context).then(function(DCStock) {
                qty += parseInt(DCStock);
                if (poQty < qty) {
                    data.acceptedQty = null;
                }
            });
        },
        getPOQty: function(context, data) {
            var poSubContractor = context.form.fields['poNo'].options[context.data.poNo];
            var poQty = 0;
            var poNo = context.data.poNo;

            for (var i in poSubContractor.mapping) {
                if(data && data.id){
                    if(poSubContractor.mapping[i].id === data.id){
                        poQty += poSubContractor.mapping[i].acceptedQty;
                    }
                }
                else{
                    poQty += poSubContractor.mapping[i].acceptedQty;
                }
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
    };

    commonFact.initCtrl($scope, 'store.dcSubContractor', actions);

}]);