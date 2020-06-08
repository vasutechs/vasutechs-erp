erpConfig.moduleFiles.grnGeneralSupplier = function(context) {
    var orgItemVal = null;
    return {
        getPOGeneralSupplier: function(data, key, field) {
            context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                dataFrom: 'purchase.poGeneralSupplier',
                replaceName: 'poNo',
                filter: {
                    generalSupplierCode: key,
                    status: 0
                }
            });
            context.commonFact.makeOptionsFields(context.form.fields['poNo']);
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
            context.form.mapping.actions.delete = false;
            orgItemVal = angular.copy(context.data);
            context.data['generalSupplierInvoiceDate'] = new Date(context.data['generalSupplierInvoiceDate']);
        },
        updatePoGeneralSupplier: function() {
            context.commonFact.getData('purchase.poGeneralSupplier', context.data.poNo).then(function(res) {
                var poGeneralSupplierData = res.data;
                poGeneralSupplierData.status = 1;
                poGeneralSupplierData.id = context.data.poNo;
                context.commonFact.updateData('purchase.poGeneralSupplier', poGeneralSupplierData);
            });
        },
        callBackSubmit: function() {
            var newQty;
            var acceptedQty;
            for (var i in context.data.mapping) {
                var data = angular.copy(context.data.mapping[i]);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                data.operationTo = context.erpAppConfig.finalStageOpp;
                newContext.data = data;
                newContext.updatePrevStock = false;
                if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                    acceptedQty = parseInt(newContext.data.acceptedQty) - parseInt(orgItemVal.mapping[i].acceptedQty);
                    newContext.data.acceptedQty = acceptedQty;
                }
                context.commonFact.updatePartStock(newContext);

            }
            context.methods.updatePoGeneralSupplier();
        }
    };
};