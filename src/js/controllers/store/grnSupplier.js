erpConfig.moduleFiles.grnSupplier = function(context) {
    var orgItemVal = null;
    return {
        getPOSupplier: function(data, key, field) {
            if (context.controller.page.name !== 'add') {
                return;
            }
            var poNo = angular.extend(context.controller.form.fields['poNo'], {
                dataFrom: 'purchase.poSupplier',
                replaceName: 'poNo',
                filter: {
                    supplierCode: key,
                    status: 0
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['poNo']).then(function() {
                context.controller.form.fields['poNo'].filter = undefined;
            });

        },
        updateRmTotal: function(data, updateValue) {
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
            context.controller.data['supplierInvoiceDate'] = new Date(context.controller.data['supplierInvoiceDate']);
        },
        updateRMStockQty: function() {
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
                    qty = context.controller.data.mapping[i].acceptedQty || context.controller.data.mapping[i].receivedQty;
                    if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                        oldQty = orgItemVal.mapping[i].acceptedQty || orgItemVal.mapping[i].receivedQty;
                        qty = parseInt(qty) - parseInt(oldQty);
                    }
                    rmStockQty = existingStock && parseInt(existingStock.rmStockQty) + parseInt(qty) || parseInt(qty);
                    data = {
                        id: existingStock && existingStock.id || undefined,
                        rmCode: context.controller.data.mapping[i].id,
                        rmStockQty: rmStockQty,
                        uomCode: context.controller.data.mapping[i].uomCode
                    }
                    context.commonFact.updateData('report.rmStock', data);
                }
            });
        },
        updatePoSupplier: function() {
            context.commonFact.getData('purchase.poSupplier', context.controller.data.poNo).then(function(res) {
                var poSupplierData = res.data;
                poSupplierData.status = 1;
                poSupplierData.id = context.controller.data.poNo;
                context.commonFact.updateData('purchase.poSupplier', poSupplierData);
            });
        },
        callBackSubmit: function() {
            context.controller.methods.updateRMStockQty();
            context.controller.methods.updatePoSupplier();
        }
    };
};