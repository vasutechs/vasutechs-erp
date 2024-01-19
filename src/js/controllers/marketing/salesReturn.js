erpConfig.moduleFiles.salesReturn = function(context) {
    var orgItemVal = null;
    return {
        callBackList: function() {
            context.commonFact.getPartStock();
            orgItemVal = null;
            context.controller.orgItemVal = orgItemVal;
        },
        getCustomerPart: function(data, key, field, fieldMapKey){
            var partNos = [];
            if (key) {
                for(var i in field.options[key].mapping){
                    partNos.push(field.options[key].mapping[i]['id']);
                }
                context.controller.form.mapping.fields['id'].filter = {
                    id: partNos
                }
                context.commonFact.makeOptionsFields(context.controller.form.mapping.fields['id']);

            }
            
        },
        getCustomerPartRate: function(data){
            var selectedPart = context.commonFact.findObjectByKey(context.controller.form.fields['customerCode'].options[context.controller.data.customerCode].mapping, 'id', data.id);
            data.rate = selectedPart.rate;
            if (context.controller.partStock[selectedPart.id + '-' + context.erpAppConfig.finalStageOpp]) {
                data.operationFrom = context.controller.partStock[selectedPart.id + '-' + context.erpAppConfig.finalStageOpp].operationFrom;
                data.operationTo = context.controller.partStock[selectedPart.id + '-' + context.erpAppConfig.finalStageOpp].operationTo;
            }
            context.controller.methods.updateSalesReturnTotal(data);
        },
        updateSalesReturnTotal: function(data){
            var taxRateTotal = 0,
                cgstTotal = 0,
                sgstTotal = 0,
                igstTotal = 0,
                total = 0,
                itemTotal = 0,
                subTotal = 0;
                data.total = 0;
            var customerDetail = context.controller.form.fields['customerCode'].options[context.controller.data.customerCode];

            for(var i in context.controller.data.mapping){
                context.controller.data.mapping[i].amount = 0;
                if(context.controller.data.mapping[i].rate && context.controller.data.mapping[i].qty){
                    itemTotal = context.controller.data.mapping[i].rate * context.controller.data.mapping[i].qty;
                    subTotal += itemTotal;
                    context.controller.data.mapping[i].amount = parseFloat(itemTotal, 2);
                }
            }
            cgstTotal = customerDetail.cgst && (subTotal * customerDetail.cgst / 100) || 0;
            sgstTotal = customerDetail.sgst && (subTotal * customerDetail.sgst / 100) || 0;
            igstTotal = customerDetail.igst && (subTotal * customerDetail.igst / 100) || 0;
            taxRateTotal = (cgstTotal + sgstTotal + igstTotal);
            total = subTotal + taxRateTotal;
            context.controller.data.subTotal = parseFloat(subTotal);
            context.controller.data.gstTotal = parseFloat(taxRateTotal);
            context.controller.data.total = parseFloat(total);
        },
        callBackSubmit: function() {
            for(var i in context.controller.data.mapping){
                var newContext = angular.copy(context);
                newContext.controller.updatePrevStock = false;
                newContext.controller.data = context.controller.data.mapping[i];
                newContext.controller.data.partNo = newContext.controller.data.id;
                newContext.controller.data.acceptedQty = parseInt(newContext.controller.data.qty);
                context.commonFact.updatePartStock(newContext);
            }
            
        },
        callBeforeDelete: function(id, item) {
            for(var i in item.mapping){
                var newContext = angular.copy(context);
                newContext.controller.updatePrevStock = false;
                newContext.controller.data = item.mapping[i];
                newContext.controller.data.partNo = newContext.controller.data.id;
                newContext.controller.data.acceptedQty = 0 - parseInt(newContext.controller.data.qty);
                context.commonFact.updatePartStock(newContext);
            }
        }
    };
};