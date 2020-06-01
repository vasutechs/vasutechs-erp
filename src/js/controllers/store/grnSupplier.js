erpConfig.moduleFiles.grnSupplier = function() {
    var orgItemVal = null;
    return {
        getPOSupplier: function(context, data, key, field) {
            context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                dataFrom: 'purchase.poSupplier',
                replaceName: 'poNo',
                filter: {
                    supplierCode: key,
                    status: 0
                }
            });
            context.methods.makeOptionsFields(context, context.form.fields['poNo']);
        },
        updateRmTotal: function(context, data, updateValue) {
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
            context.data['supplierInvoiceDate'] = new Date(context.data['supplierInvoiceDate']);
        },
        updateRMStockQty: function(context) {
            context.methods.getData('report.rmStock').then(function(res) {
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

                for (var i in context.data.mapping) {
                    existingStock = rmStock[context.data.mapping[i].id];
                    qty = context.data.mapping[i].acceptedQty || context.data.mapping[i].receivedQty;
                    if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                        oldQty = orgItemVal.mapping[i].acceptedQty || orgItemVal.mapping[i].receivedQty;
                        qty = parseInt(qty) - parseInt(oldQty);
                    }
                    rmStockQty = existingStock && parseInt(existingStock.rmStockQty) + parseInt(qty) || parseInt(qty);
                    data = {
                        id: existingStock && existingStock.id || undefined,
                        rmCode: context.data.mapping[i].id,
                        rmStockQty: rmStockQty,
                        uomCode: context.data.mapping[i].uomCode
                    }
                    context.methods.updateData('report.rmStock', data);
                }
            });
        },
        updatePoSupplier: function(context) {
            context.methods.getData('purchase.poSupplier', context.data.poNo).then(function(res) {
                var poSupplierData = res.data;
                poSupplierData.status = 1;
                poSupplierData.id = context.data.poNo;
                context.methods.updateData('purchase.poSupplier', poSupplierData);
            });
        },
        callBackSubmit: function(context) {
            context.methods.updateRMStockQty(context);
            context.methods.updatePoSupplier(context);
        }
    };
};