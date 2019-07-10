erpApp.controller('poSupplierCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        updateRmTotal: function(context, data) {
            var total = 0,
                totalBeforTax = 0;
            var qty = data['qty'] || 0;
            var extraAmount = data.extraAmount || 0;
            totalBeforTax = qty * data.rate;
            totalBeforTax += extraAmount;
            total = totalBeforTax + (totalBeforTax * (data.gst / 100));
            data.total = parseFloat(total).toFixed(2);
        },
        updateRMDetails: function(mapping) {
            context.actions.getData('purchase.rmMaster', mapping.id).then(function(res) {
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
    };

    commonFact.initCtrl($scope, 'purchase.poSupplier', actions);

}]);