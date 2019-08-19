erpApp.controller('poSubContractorCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        updateTaxPart: function(context, data, newValue, field, fieldMapKey) {
            var acceptedQtyField = context.form.mapping.fields['acceptedQty'];
            context.actions.updatePartTotal(context, data, data[acceptedQtyField.id], acceptedQtyField, fieldMapKey);
        }
    };
    commonFact.initCtrl($scope, 'purchase.poSubContractor', actions);

}]);