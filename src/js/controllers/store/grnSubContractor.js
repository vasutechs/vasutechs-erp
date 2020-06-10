erpConfig.moduleFiles.grnSubContractor = function(context) {
    var orgItemVal = null
    return {
        callBackAdd: function() {
            orgItemVal = null;
        },
        callBackEdit: function() {
            context.controller.form.mapping.actions.delete = false;
            orgItemVal = angular.copy(context.controller.data);
            context.controller.data['subContractorDCDate'] = new Date(context.controller.data['subContractorDCDate']);
        },
        callBackList: function() {
            context.controller.grnSC = true;
        },
        getDCSubContractor: function(data, key, field) {
            context.controller.form.fields['dcNo'] = angular.extend(context.controller.form.fields['dcNo'], {
                filter: {
                    poNo: key,
                    status: 0
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['dcNo']);
        },
        getPOSubContractor: function(data, key, field) {
            context.controller.form.fields['poNo'] = angular.extend(context.controller.form.fields['poNo'], {
                filter: {
                    subContractorCode: key
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['poNo']);
        },
        updateDCSubContractor: function() {
            var dcSubContractor = context.controller.form.fields['dcNo'].options[context.controller.data.dcNo];
            var grnQty = 0;
            var dcQty = 0;
            var qty = 0;
            var updateDC = true;
            dcSubContractor.status = 1;
            for (var i in context.controller.data.mapping) {
                dcQty = context.controller.methods.getDCQty(context.controller.data.mapping[i]);
                grnQty = parseInt(context.controller.grnQty[context.controller.data['dcNo'] + '-' + context.controller.data.mapping[i].id]) || 0;
                qty = parseInt(context.controller.data.mapping[i].acceptedQty) + grnQty;
                if (parseInt(dcQty) > parseInt(qty)) {
                    updateDC = false;
                }
            }
            if (updateDC) {
                context.commonFact.updateData('store.dcSubContractor', dcSubContractor);
            }

        },
        callBackChangeMapping: function() {
            context.commonFact.getSCStock().then(function() {
                if (orgItemVal) {
                    for (var i in orgItemVal.mapping) {
                        var scStockMap = orgItemVal.mapping[i].id + '-' + orgItemVal.mapping[i].operationFrom;
                        if (context.controller.partStock[scStockMap]) {
                            context.controller.partStock[scStockMap].partStockQty = parseInt(context.controller.partStock[scStockMap].partStockQty) + parseInt(orgItemVal.mapping[i].acceptedQty);
                        }
                    }
                }
            });
            context.controller.methods.getGrnQty();
        },
        callBackUpdatePartTotal: function(data, newValue, field, fieldMapKey) {
            var qty = parseInt(data.acceptedQty),
                dcQty = parseInt(context.controller.methods.getDCQty(data)),
                grnQty = context.controller.grnQty[context.controller.data['dcNo'] + '-' + data.id] || 0;

            qty += parseInt(grnQty);
            if (dcQty < qty) {
                data.acceptedQty = null;
            }
            context.commonFact.updatePOTotalAmount();
        },
        getDCQty: function(data) {
            var dcSubContractor = context.controller.form.fields['dcNo'].options[context.controller.data.dcNo];
            var dcQty = 0;
            var poNo = context.controller.data.poNo;

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
        getGrnQty: function(partNo) {
            var grnQtyTag;
            var grnQty;
            context.controller.grnQty = [];

            return context.commonFact.getData('store.grnSubContractor').then(function(res) {
                var listViewData = res.data;
                for (var i in listViewData) {
                    if (context.controller.data.dcNo === listViewData[i].dcNo) {
                        for (var j in listViewData[i].mapping) {
                            if (listViewData[i].mapping[j].id !== orgItemVal.mapping[j].id) {
                                grnQtyTag = listViewData[i].dcNo + '-' + listViewData[i].mapping[j].id;
                                if (partNo === undefined || listViewData[i].mapping[j].id === partNo) {
                                    grnQty = parseInt(listViewData[i].mapping[j].acceptedQty);
                                }
                                context.controller.grnQty[grnQtyTag] = context.controller.grnQty[grnQtyTag] === undefined ? grnQty : parseInt(context.controller.grnQty[grnQtyTag]) + grnQty;
                            }
                        }
                    }
                }
                return grnQty;
            });
        },
        callBackSubmit: function() {
            var newQty;
            var acceptedQty;
            for (var i in context.controller.data.mapping) {
                var data = angular.copy(context.controller.data.mapping[i]);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                newContext.controller.data = data;
                newContext.updatePrevStock = false;
                if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                    acceptedQty = parseInt(newContext.controller.data.acceptedQty) - parseInt(orgItemVal.mapping[i].acceptedQty);
                    newContext.controller.data.acceptedQty = acceptedQty;
                }
                context.commonFact.updatePartStock(newContext);
                var scData = angular.copy(data);
                var newScContext = angular.copy(context);
                scData.subContractorCode = context.controller.data.subContractorCode;
                scData.acceptedQty = 0 - scData.acceptedQty;
                newScContext.data = scData;
                context.commonFact.updateSCStock(newScContext);
            }
            context.controller.methods.updateDCSubContractor();
        }
    };
};