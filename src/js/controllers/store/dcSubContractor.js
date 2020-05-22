erpApp.controller('dcSubContractorCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var orgItemVal = null,
        actions = {
            callBackList: function(context) {
                context.actions.getPartStock(context);
            },
            callBackEdit: function(context) {
                context.form.mapping.actions.delete = false;
                orgItemVal = angular.copy(context.data);
                context.actions.getDCQty(context);
            },
            getPOSubContractor: function(context, data, key, field) {
                context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                    filter: {
                        subContractorCode: key,
                        status: 0
                    }
                });
                context.actions.makeOptionsFields(context, context.form.fields['poNo']);
                context.actions.changeMapping(context, context.data, context.data['subContractorCode'], context.form.fields['subContractorCode']);
            },
            callBackChangeMapping: function(context) {
                context.actions.checkAcceptedQty(context);
                context.actions.getDCQty(context);
            },
            checkAcceptedQty: function(context) {
                var partNo,
                    operationFrom;
                context.actions.getData('production.flowMaster').then(function(res) {
                    var flowMasterData = res.data,
                        prevOpp,
                        qty;
                    var dcPartStockQty;
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

                                    if (operationFrom) {
                                        dcPartStockQty = context.partStock[partNo + '-' + operationFrom].partStockQty;

                                        if (dcPartStockQty === undefined || dcPartStockQty < qty) {
                                            context.data.mapping[i].acceptedQty = qty = null;
                                        }
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
                    poQty = parseInt(context.actions.getPOQty(context, data)),
                    dcQty = context.dcQty && context.dcQty[context.data['poNo'] + '-' + data.id] || 0;

                qty += parseInt(dcQty);
                if (poQty < qty) {
                    data.acceptedQty = null;
                }
                context.actions.updatePOTotalAmount(context);
            },
            getPOQty: function(context, data) {
                var poSubContractor = context.form.fields['poNo'].options[context.data.poNo];
                var poQty = 0;
                var poNo = context.data.poNo;

                for (var i in poSubContractor.mapping) {
                    if (data && data.id) {
                        if (poSubContractor.mapping[i].id === data.id) {
                            poQty += parseInt(poSubContractor.mapping[i].acceptedQty);
                        }
                    } else {
                        poQty += parseInt(poSubContractor.mapping[i].acceptedQty);
                    }
                }
                return poQty;
            },
            updatePoSubContractor: function(context) {
                var poSubContractor = context.form.fields['poNo'].options[context.data.poNo];
                var poQty = 0;
                var dcQty = 0;
                var qty = 0;
                poSubContractor.status = 1;
                for (var i in context.data.mapping) {
                    poQty = context.actions.getPOQty(context, context.data.mapping[i]);
                    dcQty = parseInt(context.dcQty[context.data['poNo'] + '-' + context.data.mapping[i].id]) || 0;
                    qty = parseInt(context.data.mapping[i].acceptedQty) + dcQty;
                    if (parseInt(poQty) > parseInt(qty)) {
                        poSubContractor.status = 0;
                    }
                }

                context.actions.updateData('purchase.poSubContractor', poSubContractor);

            },
            getDCQty: function(context, partNo) {
                var dcQtyTag;
                var dcQty;
                context.dcQty = [];
                return context.actions.getData('store.dcSubContractor').then(function(res) {
                    var listViewData = res.data;
                    for (var i in listViewData) {
                        if (context.data.poNo === listViewData[i].poNo && (!orgItemVal || listViewData[i].id !== orgItemVal.id)) {
                            for (var j in listViewData[i].mapping) {
                                dcQtyTag = listViewData[i].poNo + '-' + listViewData[i].mapping[j].id;
                                if (partNo === undefined || listViewData[i].mapping[j].id === partNo) {
                                    dcQty = parseInt(listViewData[i].mapping[j].acceptedQty);
                                }
                                context.dcQty[dcQtyTag] = context.dcQty[dcQtyTag] === undefined ? dcQty : parseInt(context.dcQty[dcQtyTag]) + dcQty;
                            }
                        }
                    }
                    return dcQty;
                });
            },
            callBackSubmit: function(context) {
                var acceptedQty;
                for (var i in context.data.mapping) {
                    var data = angular.copy(context.data.mapping[i]);
                    var newContext = angular.copy(context);
                    data.partNo = data.id;
                    data.subContractorCode = context.data.subContractorCode;
                    if (orgItemVal && orgItemVal.mapping[i] && orgItemVal.mapping[i].acceptedQty) {
                        acceptedQty = parseInt(data.acceptedQty) - parseInt(orgItemVal.mapping[i].acceptedQty);
                        data.acceptedQty = acceptedQty;
                    }
                    newContext.data = data;
                    context.actions.updateSCStock(newContext);
                    newContext.updateCurStock = false;
                    context.actions.updatePartStock(newContext);
                }
                context.actions.updatePoSubContractor(context);
            },
            callBeforeDelete: function(context, id, item) {
                var acceptedQty;
                var poSubContractor = context.form.fields['poNo'].allOptions[item.poNo];
                for (var i in item.mapping) {
                    var data = angular.copy(item.mapping[i]);
                    var newContext = angular.copy(context);
                    data.partNo = data.id;
                    data.subContractorCode = item.subContractorCode;
                    acceptedQty = 0 - parseInt(data.acceptedQty);
                    data.acceptedQty = acceptedQty;

                    newContext.data = data;
                    context.actions.updateSCStock(newContext);
                    newContext.updateCurStock = false;
                    context.actions.updatePartStock(newContext);
                }
                poSubContractor.status = 0;
                context.actions.updateData('purchase.poSubContractor', poSubContractor);
            }
        };

    commonFact.initCtrl($scope, 'store.dcSubContractor', actions);

}]);