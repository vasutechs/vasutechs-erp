erpApp.controller('poSubContractorCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
	var actions = {
		updateTaxPart: function(context, data, newValue, mapKey, field) {
            var acceptedQtyField = context.form.mapping.fields['acceptedQty'];
            context.actions.updatePartTotal(context, data, data[acceptedQtyField.id], mapKey, acceptedQtyField);
        }
	};
    commonFact.initCtrl($scope, 'purchase.poSubContractor', actions);

}]);