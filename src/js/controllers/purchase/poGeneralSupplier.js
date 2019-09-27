erpApp.controller('poGeneralSupplierCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        updatePartDetails: function(mapping) {
            context.actions.getData('marketing.partMaster', mapping.id).then(function(res) {
                var partData = res.data;
                for (var mapKey in rmData) {
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
    };

    commonFact.initCtrl($scope, 'purchase.poGeneralSupplier', actions);

}]);