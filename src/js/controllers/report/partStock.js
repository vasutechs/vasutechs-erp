erpApp.controller('partStockCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
    	callBackList: function(context){
    		for (var x in context.listViewData) {
    			console.log(context.listViewData[x]);
    		}
    	},
    	updatePartDetails: function(context, data, key, field) {
            if (context.data.partNo) {
                context.actions.getOperationFromFlow(context, context.form.fields['operationFrom'], context.data.partNo, 'In-house');
                context.form.fields['operationTo'].startWith = context.data.operationFrom;
                context.actions.getOperationFromFlow(context, context.form.fields['operationTo'], context.data.partNo, 'In-house');
            }
        }
    });

    $scope.context = erpAppConfig.modules.report.partStock;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);