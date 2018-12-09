erpApp.controller('grnSupplierCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var orgItemVal = null,
        actions = {
            getPOSupplier: function(context, data, key, field) {
                context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                    dataFrom: 'purchase.poSupplier',
                    replaceName: 'poNo',
                    filter: {
                        supplierCode: key,
                        status: 0
                    }
                });
                context.actions.makeOptionsFields(context, context.form.fields['poNo']);
            },
            updateRmTotal: function(context, data, updateValue) {
                var total = 0,
                    totalBeforTax = 0;
                totalBeforTax = updateValue * data.rate;
                total = totalBeforTax + (totalBeforTax * (data.gst / 100))
                data.total = parseFloat(total).toFixed(2);
            },
            callBackAdd: function(context) {
                orgItemVal = null;
            },
            callBackEdit: function(context, key) {
                var poNoField = context.form.fields['poNo'];
                context.form.mapping.actions.delete = false;
                orgItemVal = angular.copy(context.data);
                poNoField.filter = {};
                context.actions.makeOptionsFields(context, poNoField);
                context.data['supplierInvoiceDate'] = new Date(context.data['supplierInvoiceDate']);
            },
            updateRMStockQty: function(context) {
                var serviceconf = context.actions.getServiceConfig('report.rmStock');
                serviceApi.callServiceApi(serviceconf).then(function(res) {
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
                        serviceconf = existingStock && context.actions.getServiceConfig('report.rmStock', 'POST') || context.actions.getServiceConfig('report.rmStock', 'POST');
                        serviceApi.callServiceApi(serviceconf, data);
                    }
                });
            },
            updatePoSupplier: function(context) {
                context.actions.getData('purchase.poSupplier', context.data.poNo).then(function(res) {
                    var poSupplierData = res.data;
                    poSupplierData.status = 1;
                    poSupplierData.id = context.data.poNo;
                    context.actions.updateData('purchase.poSupplier', poSupplierData);
                });
            },
            callBackSubmit: function(context) {
                context.actions.updateRMStockQty(context);
                context.actions.updatePoSupplier(context);
            }
        };

    commonFact.initCtrl($scope, 'store.grnSupplier', actions);

}]);