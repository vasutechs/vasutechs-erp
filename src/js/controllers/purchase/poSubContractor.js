erpApp.controller('poSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            context.actions.getPartStock(context);
        },
        checkAcceptedQty: function(context, data, key, field) {
            var partNo = data.id,
                serviceconf = this.getServiceConfig('production.flowMaster'),
                operationFrom,
                qtyCanMake;
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var flowMasterData = res.data,
                    prevOpp;
                for (var i in flowMasterData) {
                    if (flowMasterData[i].partNo === partNo) {
                        for (var j in flowMasterData[i].mapping) {
                            prevOpp = flowMasterData[i].mapping[j - 1];
                            if (prevOpp && flowMasterData[i].mapping[j].source === 'Sub-Contractor') {
                                operationFrom = prevOpp.id;
                            }
                        }
                    }
                }
                data.operationFrom = operationFrom;
            });
        },
        callBackChangeMapping: function(context, data, key, field) {
            context.actions.checkAcceptedQty(context, data, key, field);
        }
    });

    $scope.context = erpAppConfig.modules.purchase.poSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);