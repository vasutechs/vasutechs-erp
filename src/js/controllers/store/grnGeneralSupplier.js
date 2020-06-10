erpConfig.moduleFiles.grnGeneralSupplier = function(context) {
    var orgItemVal = null;
    return {
        getPOGeneralSupplier: function(data, key, field) {
            context.controller.form.fields['poNo'] = angular.extend(context.controller.form.fields['poNo'], {
                dataFrom: 'purchase.poGeneralSupplier',
                replaceName: 'poNo',
                filter: {
                    generalSupplierCode: key,
                    status: 0
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['poNo']);
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
                data.operationTo = context.erpAppConfig.finalStageOpp;
                newContext.controller.data = data;
                newContext.updatePrevStock = false;
                if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                    acceptedQty = parseInt(newContext.controller.data.acceptedQty) - parseInt(orgItemVal.mapping[i].acceptedQty);
                    newContext.controller.data.acceptedQty = acceptedQty;
                }
                context.commonFact.updatePartStock(newContext);

            }
            context.controller.methods.updatePoGeneralSupplier();
        }
    };
};