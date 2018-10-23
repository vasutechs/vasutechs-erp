erpApp.controller('subContractorMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            var serviceconf = this.getServiceConfig('production.flowMaster'),
                partNos = [];
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var flowMasterData = res.data;
                for (var i in flowMasterData) {
                    for (var j in flowMasterData[i].mapping) {
                        if (flowMasterData[i].mapping[j].source === 'Sub-Contractor') {
                            partNos.push(flowMasterData[i].partNo);
                        }
                    }
                }
                context.form.mapping.fields['id'].filter = {
                    id: partNos
                };
            });
        }
    });

    $scope.context = erpAppConfig.modules.purchase.subContractorMaster;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);