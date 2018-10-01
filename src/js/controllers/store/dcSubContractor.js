erpApp.controller('dcSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        getPOSubContractor: function(context, data, key, field) {
            context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                filter: {
                    subContractorCode: key,
                    status: 0
                }
            });
            context.actions.makeOptionsFields(context.form.fields['poNo']);
        },
        updatePoSubContractor: function(context) {
            context.actions.getData('purchase.poSubContractor', context.data.poNo).then(function(res) {
                var poSubContractor = res.data;
                poSubContractor.status = 1;
                poSubContractor.id = context.data.poNo;
                context.actions.updateData('purchase.poSubContractor', poSubContractor);
            });
        },
        callBackSubmit: function(context) {
            context.actions.updatePoSubContractor(context);
        },
        callBackChangeMapping: function(context, data, key) {
            var restriction = {
                    partNo: data.id,
                    source: ['In-House']
                },
                serviceconf = context.actions.getServiceConfig('report.partStock');
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var partStockData = res.data,
                    partStock = {};
                for (var i in partStockData) {
                    partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                }
                restriction.partStock = partStock;
                context.actions.getOperationFromFlow(context, context.form.mapping.fields['operationFrom'], restriction);

            });
        }
    });

    $scope.context = erpAppConfig.modules.store.dcSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);