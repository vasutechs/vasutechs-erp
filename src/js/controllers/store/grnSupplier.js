erpApp.controller('grnSupplierCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        getPOSupplier: function(context, data, key, field) {
        	context.form.fields[3].options = {};
            context.actions.makeOptionsFields(erpAppConfig.modules.purchase.poSupplier.services.list, context.form.fields[3].options, 'poNo', null, { supplierCode: key });
        },
        callBackEdit: function(context, key) {
            context.data['supplierDCDate'] = context.actions.dateFormatChange(context.data['supplierDCDate']);
            context.actions.displayViewDataVal(erpAppConfig.modules.purchase.supplierMaster.services.list, context.data, 'supplierCode', 'supplierName');
            context.actions.displayViewDataVal(erpAppConfig.modules.purchase.rmMaster.services.list, context.data.mapping, 'id', 'rmName', true);
        },
        updateRMStockQty: function(context) {
            var serviceconf = {
                url: 'api/rmStock/data',
                method: 'GET'
            };
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var rmStockData = res.data;

                for (var i in context.data.mapping) {
                    var rmStockQty = rmStockData[context.data.mapping[i].id] && parseInt(rmStockData[context.data.mapping[i].id].rmStockQty) + parseInt(context.data.mapping[i].qty) || parseInt(context.data.mapping[i].qty);
                    var data = {
                        id: context.data.mapping[i].id,
                        rmStockQty: rmStockQty
                    }
                    serviceconf = {
                        url: 'api/rmStock/data/' + context.data.mapping[i].id,
                        method: 'POST'
                    }
                    console.log(data);
                    serviceApi.callServiceApi(serviceconf, data);
                }
            });
        },
        callBackSubmit: function(context) {
            context.actions.updateRMStockQty(context);
        }
    });
    $scope.context = erpAppConfig.modules.store.grnSupplier;
    $scope.context.actions = actions;
    $scope.context.actions.makeOptionsFields(erpAppConfig.modules.purchase.supplierMaster.services.list, $scope.context.form.fields[2].options, 'supplierName');
    $scope.context.actions.makeOptionsFields(erpAppConfig.modules.purchase.rmMaster.services.list, $scope.context.form.mapping.fields[0].options, 'rmName');
    $scope.context.actions.list($scope.context);
}]);