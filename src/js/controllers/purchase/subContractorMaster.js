erpApp.controller('subContractorMasterCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
    	callBackChangeMapping: function(context, data, key){
    		var restriction = {
                    partNo: key,
                    source: ['Sub-Contractor']
                };
    		context.actions.getOperationFromFlow(context, context.form.mapping.fields['operationTo'], restriction);
    	}
    });

    $scope.context = erpAppConfig.modules.purchase.subContractorMaster;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);