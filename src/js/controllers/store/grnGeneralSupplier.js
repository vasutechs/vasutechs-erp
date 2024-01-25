erpConfig.moduleFiles.grnGeneralSupplier = function(context) {
    var orgItemVal = null;
    return {
        getPOGeneralSupplier: function(data, key, field) {
            if (context.controller.page.name !== 'add') {
                return;
            }
            context.controller.form.fields['poNo'] = angular.extend(context.controller.form.fields['poNo'], {
                dataFrom: 'purchase.poGeneralSupplier',
                replaceName: 'poNo',
                filter: {
                    generalSupplierCode: key,
                    status: 0
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['poNo']).then(function() {
                context.controller.form.fields['poNo'].filter = undefined;
            });
        },
        updatePTTotal: function(data, updateValue) {
            var total = 0;
            var qty = updateValue || 0;
            total = qty * data.rate;
            data.total = parseFloat(total).toFixed(2);
            context.commonFact.updatePOTotalAmount();
        },
        callBackAdd: function() {
            orgItemVal = null;
            if(context.erpAppConfig.isSale){
                context.controller.form.fields['supplierCode'] = angular.extend(context.controller.form.fields['supplierCode'], {
                    "updateData": ["mapping", "gst", "sgst", "cgst", "igst"],
                    "action": "changeMapping",
                    "updateMapping": true,
                });
                context.controller.form.mapping.fields['acceptedQty'].name = 'Received Qty';
            }
        },
        callBackEdit: function(key) {
            context.controller.form.mapping.actions.delete = false;
            orgItemVal = angular.copy(context.controller.data);
            context.controller.data['generalSupplierInvoiceDate'] = new Date(context.controller.data['generalSupplierInvoiceDate']);
        },
        updatePoGeneralSupplier: function() {
            context.commonFact.getData('purchase.poGeneralSupplier', context.controller.data.poNo).then(function(res) {
                var poGeneralSupplierData = res.data;
                poGeneralSupplierData.status = 1;
                poGeneralSupplierData.id = context.controller.data.poNo;
                context.commonFact.updateData('purchase.poGeneralSupplier', poGeneralSupplierData);
            });
        },
        callBackSubmit: function() {
            var newQty;
            var acceptedQty;
            for (var i in context.controller.data.mapping) {
                var data = angular.copy(context.controller.data.mapping[i]);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                if(!context.erpAppConfig.isSale){
                    data.operationTo = context.erpAppConfig.finalStageOpp;
                }
                newContext.controller.data = data;
                newContext.controller.updatePrevStock = false;
                if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                    acceptedQty = parseInt(newContext.controller.data.acceptedQty) - parseInt(orgItemVal.mapping[i].acceptedQty);
                    newContext.controller.data.acceptedQty = acceptedQty;
                }
                context.commonFact.updatePartStock(newContext);

            }
            if(!context.erpAppConfig.isSale){
                context.controller.methods.updatePoGeneralSupplier();
            }
        }
    };
};