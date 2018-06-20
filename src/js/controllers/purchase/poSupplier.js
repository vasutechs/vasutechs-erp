erpApp.controller('poSupplierCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            context.actions.makeOptionsFields(context.form.fields[2]);
            context.actions.makeOptionsFields(context.form.mapping.fields[0]);
        },
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
        },
        callBackEdit: function(context, key){
            context.actions.displayViewDataVal(erpAppConfig.modules.purchase.supplierMaster.services.list, context.data, 'supplierCode', 'supplierName');
            context.actions.displayViewDataVal(erpAppConfig.modules.purchase.rmMaster.services.list, context.data.mapping, 'id', 'rmName', true);
        }
    });

    $scope.context = erpAppConfig.modules.purchase.poSupplier;
    $scope.context.actions = actions;
    $scope.context.actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.context.actions.list($scope.context);

}]);