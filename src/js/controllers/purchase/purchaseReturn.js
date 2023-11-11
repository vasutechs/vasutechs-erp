erpConfig.moduleFiles.purchaseReturn = function(context) {
    var orgItemVal = null;
    return {
        callBackList: function() {
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
            data.rate = selectedRM.rate;
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
        updateRMStockQty: function(isDel) {
            context.commonFact.getData('report.rmStock').then(function(res) {
                var rmStockData = res.data,
                    rmStock = {};
                var existingStock;
                var qty;
                var oldQty;
                var rmStockQty;
                var data;
                for (var i in rmStockData) {
                    rmStock[rmStockData[i].rmCode] = rmStockData[i] && rmStockData[i] || undefined;
                }

                for (var i in context.controller.data.mapping) {
                    existingStock = rmStock[context.controller.data.mapping[i].id];
                    qty = context.controller.data.mapping[i].qty;
                    if(isDel){
                        rmStockQty = existingStock && parseInt(existingStock.rmStockQty) - parseInt(qty) || 0 - parseInt(qty);
                    }
                    else{
                        rmStockQty = existingStock && parseInt(existingStock.rmStockQty) + parseInt(qty) || parseInt(qty);
                    }
                    
                    data = {
                        id: existingStock && existingStock.id || undefined,
                        rmCode: context.controller.data.mapping[i].id,
                        rmStockQty: rmStockQty,
                        uomCode: existingStock.uomCode
                    }
                    context.commonFact.updateData('report.rmStock', data);
                }
            });
        },
        callBackSubmit: function() {
            context.controller.methods.updateRMStockQty();
        },
        callBeforeDelete: function(id, item) {
            context.controller.methods.updateRMStockQty(true);
        }
    };
};