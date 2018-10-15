erpApp.controller('subContractorStockCtrl', ['erpAppConfig', '$scope', 'commonFact', function(erpAppConfig, $scope, commonFact) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            var newList = angular.copy(context.listViewData);
            newList = context.listViewData.filter(function(data) {
                return data.scStockQty > 0;
            });
            context.listViewData = newList
        },
        updatePartDetails: function(context, data, key, field) {
            var restriction = {
                partNo: context.data.partNo,
                source: ['In-House']
            };
            if (context.data.partNo) {
                context.actions.getOperationFromFlow(context, context.form.fields['operationFrom'], restriction);
                restriction.startWith = context.data.operationFrom;
                context.actions.getOperationFromFlow(context, context.form.fields['operationTo'], restriction);
            }
        }
    });

    $scope.context = erpAppConfig.modules.report.subContractorStock;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);