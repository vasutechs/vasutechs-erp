erpApp.controller('grnSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        getDCSubContractor: function(context, data, key, field) {
            context.form.fields['dcNo'] = angular.extend(context.form.fields['dcNo'], {
                filter: {
                    poNo: key,
                    status: 0
                }
            });
            context.actions.makeOptionsFields(context.form.fields['dcNo']);
        },
        getPOSubContractor: function(context, data, key, field) {
            context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                filter: {
                    subContractorCode: key
                }
            });
            context.actions.makeOptionsFields(context.form.fields['poNo']);
        },
        updateDCSubContractor: function(context) {
            context.actions.getData('store.dcSubContractor', context.data.dcNo).then(function(res) {
                var dcSubContractor = res.data;
                dcSubContractor.status = 1;
                dcSubContractor.id = context.data.dcNo;
                context.actions.updateData('store.dcSubContractor', dcSubContractor);
            });
        },
        callBackChangeMapping: function(context){
            var serviceconf = context.actions.getServiceConfig('report.partStock');
            context.grnSC = true;
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var partStockData = res.data,
                partStock = {};
                for (var i in partStockData) {
                    partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                }
                context.partStockDetail = partStock;
            });
        },
        callBackSubmit: function(context) {
            var newQty;
            for (var i in context.data.mapping) {
                context.data.mapping[i].partNo = context.data.mapping[i].id;
                newQty = context.data.mapping[i].receivedQty - context.data.mapping[i].acceptedQty;
                if (newQty !== undefined) {
                    context.data.mapping[i].acceptedQty = newQty;
                    context.actions.updatePartStock({
                        updatePrevStock: false,
                        data: context.data.mapping[i]
                    });
                }
            }
            context.actions.updateDCSubContractor(context);
        }
    });;

    $scope.context = erpAppConfig.modules.store.grnSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);