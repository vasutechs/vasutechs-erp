erpApp.controller('grnSupplierCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        getPOSupplier: function(context, data, key, field) {
            context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                dataFrom: 'purchase.poSupplier',
                replaceName: 'poNo',
                filter: { 
                    supplierCode: key,
                    status: 0 
                }
            });
            context.actions.makeOptionsFields(context.form.fields['poNo']);
        },
        updateRmTotal: function(context, data, updateValue) {
            var total = 0,
                totalBeforTax = 0;
            totalBeforTax = updateValue * data.rate;
            total = totalBeforTax + (totalBeforTax * (data.gst / 100))
            data.total = parseFloat(total).toFixed(2);
        },
        callBackEdit: function(context, key) {
            context.data['supplierDCDate'] = context.actions.dateFormatChange(context.data['supplierDCDate']);
        },
        updateRMStockQty: function(context) {
            var serviceconf = context.actions.getServiceConfig('report.rmStock');
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var rmStockData = res.data,
                    rmStock = {};
                for (var i in rmStockData) {
                    rmStock[rmStockData[i].rmCode] = rmStockData[i] && rmStockData[i] || undefined;
                }

                for (var i in context.data.mapping) {
                    var existingStock = rmStock[context.data.mapping[i].id];
                    var rmStockQty = existingStock && parseInt(existingStock.rmStockQty) + parseInt(context.data.mapping[i].qty) || parseInt(context.data.mapping[i].qty);
                    var data = {
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
                context.actions.updateData('purchase.poSupplier', poSupplierData, context.data.poNo);
            });
        },
        callBackSubmit: function(context) {
            context.actions.updateRMStockQty(context);
            context.actions.updatePoSupplier(context);
        }
    });
    $scope.context = erpAppConfig.modules.store.grnSupplier;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);