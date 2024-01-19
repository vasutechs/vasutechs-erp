erpConfig.moduleFiles.purchaseReturn = function(context) {
    var orgItemVal = null;
    return {
        callBackList: function() {
            context.commonFact.getPartStock();
            orgItemVal = null;
            context.controller.orgItemVal = orgItemVal;
        },
        getSupplierRm: function(data, key, field, fieldMapKey){
            var rmCodes = [];
            if (key) {
                for(var i in field.options[key].mapping){
                    rmCodes.push(field.options[key].mapping[i]['id']);
                }
                context.controller.form.mapping.fields['id'].filter = {
                    id: rmCodes
                }
                context.commonFact.makeOptionsFields(context.controller.form.mapping.fields['id']);
            }
        },
        getSupplierRmRate: function(data){
            var selectedRM = context.commonFact.findObjectByKey(context.controller.form.fields['supplierCode'].options[context.controller.data.supplierCode].mapping, 'id', data.id);
            var partNo;
            data.rate = selectedRM.rate;
            context.commonFact.getData('marketing.partMaster').then(function (res) {
                for(var i in res.data){
                    if(res.data[i].rmCode === data.id){
                        data.partNo = res.data[i].id;
                        if (context.controller.partStock[data.partNo + '-' + context.erpAppConfig.finalStageOpp]) {
                            data.operationFrom = context.controller.partStock[data.partNo + '-' + context.erpAppConfig.finalStageOpp].operationFrom;
                            data.operationTo = context.controller.partStock[data.partNo + '-' + context.erpAppConfig.finalStageOpp].operationTo;
                        }
                    }
                }
            });
            context.controller.methods.updatePurchaseReturnTotal(data);
        },
        updatePurchaseReturnTotal: function(data){
            var taxRateTotal = 0,
                cgstTotal = 0,
                sgstTotal = 0,
                igstTotal = 0,
                total = 0,
                itemTotal = 0,
                subTotal = 0;
                data.total = 0;
            var supplierDetail = context.controller.form.fields['supplierCode'].options[context.controller.data.supplierCode];

            for(var i in context.controller.data.mapping){
                context.controller.data.mapping[i].amount = 0;
                if(context.controller.data.mapping[i].rate && context.controller.data.mapping[i].qty){
                    itemTotal = context.controller.data.mapping[i].rate * context.controller.data.mapping[i].qty;
                    subTotal += itemTotal;
                    context.controller.data.mapping[i].amount = parseFloat(itemTotal, 2);
                }
            }
            cgstTotal = supplierDetail.cgst && (subTotal * supplierDetail.cgst / 100) || 0;
            sgstTotal = supplierDetail.sgst && (subTotal * supplierDetail.sgst / 100) || 0;
            igstTotal = supplierDetail.igst && (subTotal * supplierDetail.igst / 100) || 0;
            taxRateTotal = (cgstTotal + sgstTotal + igstTotal);
            total = subTotal + taxRateTotal;
            context.controller.data.subTotal = parseFloat(subTotal, 2);
            context.controller.data.gstTotal = parseFloat(taxRateTotal, 2);
            context.controller.data.total = parseFloat(total, 2);
        },
        callBackSubmit: function() {
            for(var i in context.controller.data.mapping){
                var newContext = angular.copy(context);
                newContext.controller.updatePrevStock = false;
                newContext.controller.data = context.controller.data.mapping[i];
                newContext.controller.data.acceptedQty = 0 - parseInt(newContext.controller.data.qty);
                context.commonFact.updatePartStock(newContext);
            }
            
        },
        callBeforeDelete: function(id, item) {
            for(var i in item.mapping){
                var newContext = angular.copy(context);
                newContext.controller.updatePrevStock = false;
                newContext.controller.data = item.mapping[i];
                newContext.controller.data.acceptedQty = parseInt(newContext.controller.data.qty);
                context.commonFact.updatePartStock(newContext);
            }
        }
    };
};