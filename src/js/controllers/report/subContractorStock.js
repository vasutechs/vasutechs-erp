erpApp.controller('subContractorStockCtrl', ['erpAppConfig', '$scope', 'commonFact', '$location', 'serviceApi', function(erpAppConfig, $scope, commonFact, $location, serviceApi) {
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
        submit: function(context) {
            var submitService;
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');
            if (context.data.id) {
                submitService = serviceApi.callServiceApi(serviceconf, context.data)
            } else {
                context.data.acceptedQty = context.data.partStockQty;
                submitService = context.actions.updateSCStock(context);
            }

            submitService.then(function(){
                context.page.name = 'list';
                context.actions.list(context);
            });
        }
    });

    $scope.context = erpAppConfig.modules.report.subContractorStock;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);