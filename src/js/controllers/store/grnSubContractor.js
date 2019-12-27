erpApp.controller('grnSubContractorCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var orgItemVal = null,
        actions = {
            callBackAdd: function(context) {
                orgItemVal = null;
            },
            callBackEdit: function(context) {
                var poNoField = context.form.fields['poNo'];
                var dcNoField = context.form.fields['dcNo'];
                context.form.mapping.actions.delete = false;
                orgItemVal = angular.copy(context.data);
                context.data['subContractorDCDate'] = new Date(context.data['subContractorDCDate']);
                poNoField.filter = {};
                dcNoField.filter = {};
                context.actions.makeOptionsFields(context, poNoField).then(function() {
                    context.actions.makeOptionsFields(context, dcNoField).then(function() {
                        context.actions.callBackChangeMapping(context);
                    });
                });

            },
            callBackList: function(context) {
                context.grnSC = true;
            },
            getDCSubContractor: function(context, data, key, field) {
                context.form.fields['dcNo'] = angular.extend(context.form.fields['dcNo'], {
                    filter: {
                        poNo: key,
                        status: 0
                    }
                });
                context.actions.makeOptionsFields(context, context.form.fields['dcNo']);
            },
            getPOSubContractor: function(context, data, key, field) {
                context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                    filter: {
                        subContractorCode: key
                    }
                });
                context.actions.makeOptionsFields(context, context.form.fields['poNo']);
            },
            updateDCSubContractor: function(context) {
                var dcSubContractor = context.form.fields['dcNo'].options[context.data.dcNo];
                var grnQty = 0;
                var dcQty = 0;
                var qty = 0;
                var updateDC = true;
                dcSubContractor.status = 1;
                for (var i in context.data.mapping) {
                    dcQty = context.actions.getDCQty(context, context.data.mapping[i]);
                    grnQty = parseInt(context.grnQty[context.data['dcNo'] + '-' + context.data.mapping[i].id]) || 0;
                    qty = parseInt(context.data.mapping[i].acceptedQty) + grnQty;
                    if (parseInt(dcQty) > parseInt(qty)) {
                        updateDC = false;
                    }
                }
                if (updateDC) {
                    context.actions.updateData('store.dcSubContractor', dcSubContractor);
                }

            },
            callBackChangeMapping: function(context) {
                context.actions.getSCStock(context).then(function() {
                    if (orgItemVal) {
                        for (var i in orgItemVal.mapping) {
                            var scStockMap = orgItemVal.mapping[i].id + '-' + orgItemVal.mapping[i].operationFrom;
                            if (context.partStock[scStockMap]) {
                                context.partStock[scStockMap].partStockQty = parseInt(context.partStock[scStockMap].partStockQty) + parseInt(orgItemVal.mapping[i].acceptedQty);
                            }
                        }
                    }
                });
                context.actions.getGrnQty(context);
            },
            callBackUpdatePartTotal: function(context, data, newValue, field, fieldMapKey) {
                var qty = parseInt(data.acceptedQty),
                    dcQty = parseInt(context.actions.getDCQty(context, data)),
                    grnQty = context.grnQty[context.data['dcNo'] + '-' + data.id] || 0;

                qty += parseInt(grnQty);
                if (dcQty < qty) {
                    data.acceptedQty = null;
                }
            },
            getDCQty: function(context, data) {
                var dcSubContractor = context.form.fields['dcNo'].options[context.data.dcNo];
                var dcQty = 0;
                var poNo = context.data.poNo;

                for (var i in dcSubContractor.mapping) {
                    if (data && data.id) {
                        if (dcSubContractor.mapping[i].id === data.id) {
                            dcQty += parseInt(dcSubContractor.mapping[i].acceptedQty);
                        }
                    } else {
                        dcQty += parseInt(dcSubContractor.mapping[i].acceptedQty);
                    }
                }
                return dcQty;
            },
            getGrnQty: function(context, partNo) {
                var grnQtyTag;
                var grnQty;
                context.grnQty = [];

                return context.actions.getData('store.grnSubContractor').then(function(res) {
                    var listViewData = res.data;
                    for (var i in listViewData) {
                        if (context.data.dcNo === listViewData[i].dcNo) {
                            for (var j in listViewData[i].mapping) {
                                if (listViewData[i].mapping[j].id !== orgItemVal.mapping[j].id) {
                                    grnQtyTag = listViewData[i].dcNo + '-' + listViewData[i].mapping[j].id;
                                    if (partNo === undefined || listViewData[i].mapping[j].id === partNo) {
                                        grnQty = parseInt(listViewData[i].mapping[j].acceptedQty);
                                    }
                                    context.grnQty[grnQtyTag] = context.grnQty[grnQtyTag] === undefined ? grnQty : parseInt(context.grnQty[grnQtyTag]) + grnQty;
                                }
                            }
                        }
                    }
                    return grnQty;
                });
            },
            callBackSubmit: function(context) {
                var newQty;
                var acceptedQty;
                for (var i in context.data.mapping) {
                    var data = angular.copy(context.data.mapping[i]);
                    var newContext = angular.copy(context);
                    data.partNo = data.id;
                    newContext.data = data;
                    newContext.updatePrevStock = false;
                    if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                        acceptedQty = parseInt(newContext.data.acceptedQty) - parseInt(orgItemVal.mapping[i].acceptedQty);
                        newContext.data.acceptedQty = acceptedQty;
                    }
                    context.actions.updatePartStock(newContext);
                    var scData = angular.copy(data);
                    var newScContext = angular.copy(context);
                    scData.subContractorCode = context.data.subContractorCode;
                    scData.acceptedQty = 0 - scData.acceptedQty;
                    newScContext.data = scData;
                    context.actions.updateSCStock(newScContext);
                }
                context.actions.updateDCSubContractor(context);
            }
        };

    commonFact.initCtrl($scope, 'store.grnSubContractor', actions);

}]);