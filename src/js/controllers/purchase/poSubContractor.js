erpApp.controller('poSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updatePartTotal: function(context, data, updateValue) {
            var total = 0,
                totalBeforTax = 0;
            totalBeforTax = updateValue * data.rate;
            total = totalBeforTax + (totalBeforTax * (data.gst / 100)) + (totalBeforTax * (data.cgst / 100)) + (totalBeforTax * (data.sgst / 100))
            data.total = parseFloat(total).toFixed(2);
        },
        updatePartDetails: function(mapping) {
            var serviceconf = {
                url: erpAppConfig.modules.marketing.partMaster.services.list.url + "/" + mapping.id,
                method: 'GET'
            };
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var partData = res.data;
                for (var mapKey in partData) {
                    if (mapping[mapKey] === null || mapping[mapKey] === '') {
                        mapping[mapKey] = partData[mapKey];
                    }
                }
            });
        },
        callBackChangeMapping: function(data, key, field) {
            for (var key in data.mapping) {
                this.updatePartDetails(data.mapping[key]);
            }
        }
    });

    $scope.context = erpAppConfig.modules.purchase.poSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);