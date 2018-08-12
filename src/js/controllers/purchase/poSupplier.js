erpApp.controller('poSupplierCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateRmTotal: function(data, updateValue) {
            var total = 0,
                totalBeforTax = 0;
            totalBeforTax = updateValue * data.rate;
            total = totalBeforTax + (totalBeforTax * (data.gst / 100)) + (totalBeforTax * (data.cgst / 100)) + (totalBeforTax * (data.sgst / 100))
            data.total = parseFloat(total).toFixed(2);
        },
        updateRMDetails: function(mapping) {
            var serviceconf = {
                url: erpAppConfig.modules.purchase.rmMaster.services.list.url + "/" + mapping.id,
                method: 'GET'
            };
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var rmData = res.data;
                for (var mapKey in rmData) {
                    if (mapping[mapKey] === null || mapping[mapKey] === '') {
                        mapping[mapKey] = rmData[mapKey];
                    }
                }
            });
        },
        callBackChangeMapping: function(data, key, field) {
            for (var key in data.mapping) {
                this.updateRMDetails(data.mapping[key]);
            }
        }
    });

    $scope.context = erpAppConfig.modules.purchase.poSupplier;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);