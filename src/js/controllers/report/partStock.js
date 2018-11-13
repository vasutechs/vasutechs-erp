erpApp.controller('partStockCtrl', ['erpAppConfig', '$scope', 'commonFact', '$location', function(erpAppConfig, $scope, commonFact, $location) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            var newList = angular.copy(context.listViewData);
            if ($location.search() && $location.search()['showall'] === 'no') {
                newList = context.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.listViewData = newList
            }
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
        // },
        // preSubmit: function(context){
        //     console.log(context);
        }
    });

    $scope.context = erpAppConfig.modules.report.partStock;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);