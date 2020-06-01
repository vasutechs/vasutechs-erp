erpConfig.moduleFiles.grnGeneralSupplier = function() {
    var orgItemVal = null;
    return {
        getPOGeneralSupplier: function(context, data, key, field) {
            context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                dataFrom: 'purchase.poGeneralSupplier',
                replaceName: 'poNo',
                filter: {
                    generalSupplierCode: key,
                    status: 0
                }
            });
            context.methods.makeOptionsFields(context, context.form.fields['poNo']);
        },
        updatePTTotal: function(context, data, updateValue) {
            var total = 0;
            var qty = updateValue || 0;
            total = qty * data.rate;
            data.total = parseFloat(total).toFixed(2);
            context.methods.updatePOTotalAmount(context);
        },
        callBackAdd: function(context) {
            orgItemVal = null;
        },
        callBackEdit: function(context, key) {
            context.form.mapping.actions.delete = false;
            orgItemVal = angular.copy(context.data);
            context.data['generalSupplierInvoiceDate'] = new Date(context.data['generalSupplierInvoiceDate']);
        },
        updatePoGeneralSupplier: function(context) {
            context.methods.getData('purchase.poGeneralSupplier', context.data.poNo).then(function(res) {
                var poGeneralSupplierData = res.data;
                poGeneralSupplierData.status = 1;
                poGeneralSupplierData.id = context.data.poNo;
                context.methods.updateData('purchase.poGeneralSupplier', poGeneralSupplierData);
            });
        },
        callBackSubmit: function(context) {
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
                context.methods.updatePartStock(newContext);

            }
            context.methods.updatePoGeneralSupplier(context);
        }
    };
};